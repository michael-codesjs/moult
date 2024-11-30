provider "aws" {

  alias  = "useast1"
  region = "us-east-1"

}

resource "aws_appsync_graphql_api" "graphql_api" {

  provider = aws.useast1

  name                = "moult-api-${var.stage}"
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  schema              = file("${path.module}/../../schemas/graphql/schema.graphql")

  tags = {
    Name          = "moult-${var.stage}"
    Application   = "moult"
    Stage         = var.stage
    Description = "moult ${var.stage} GraphQL API."
  }

  user_pool_config {
    aws_region     = var.region
    default_action = "ALLOW"
    user_pool_id   = data.aws_cognito_user_pools.cognito_user_pool.id
  }

  additional_authentication_provider {
    authentication_type = "AWS_IAM"
  }

  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.api_log_role.arn
    field_log_level          = "ALL"
  }

}

resource "aws_iam_role" "api_log_role" {

  provider = aws.useast1

  name = "moult-graphql-api-log-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service : "appsync.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })

}

resource "aws_iam_role_policy_attachment" "api_log_policy_statement" {

  provider = aws.useast1

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  role       = aws_iam_role.api_log_role.name

}

resource "aws_acm_certificate" "api_certificate" {

  provider = aws.useast1

  domain_name       = "${var.stage != "prod" ? var.stage : ""}${var.stage != "prod" ? "." : ""}api.withmoult.com"
  validation_method = "DNS"

  tags = {
    Name          = "moult-${var.stage}-api-certificate"
    Application   = "moult"
    Stage = var.stage
    Description = "moult ${var.stage} GraphQL API Certificate."
  }

}

resource "aws_route53_record" "certificate_validation" {

  for_each = {
    for dvo in aws_acm_certificate.api_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      value  = dvo.resource_record_value
    }
  }

  zone_id = data.aws_ssm_parameter.moult_hosted_zone_id.value
  name    = each.value.name
  type    = each.value.type
  records = [each.value.value]
  ttl     = 60

}

resource "aws_appsync_domain_name" "custom_domain" {

  provider = aws.useast1
  
  domain_name = aws_acm_certificate.api_certificate.domain_name
  certificate_arn = aws_acm_certificate.api_certificate.arn

}

resource "aws_appsync_domain_name_api_association" "custom_domain_association" {

  provider = aws.useast1

  domain_name     = aws_appsync_domain_name.custom_domain.domain_name
  api_id          = aws_appsync_graphql_api.graphql_api.id

}

resource "aws_route53_record" "appsync_cname" {
  zone_id = data.aws_ssm_parameter.moult_hosted_zone_id.value
  name    = "${var.stage != "prod" ? var.stage : ""}${var.stage != "prod" ? "." : ""}api.withmoult.com"
  type    = "CNAME"
  ttl     = 300
  records = [aws_appsync_domain_name.custom_domain.appsync_domain_name]
}


resource "aws_ssm_parameter" "graphql_api_id" {

  name  = "/moult/${var.stage}/infrastructure/api/graphql/id"
  type  = "SecureString"
  value = aws_appsync_graphql_api.graphql_api.id

}

resource "aws_ssm_parameter" "graphql_api_endpoint" {

  name  = "/moult/${var.stage}/infrastructure/api/graphql/endpoint"
  type  = "String"
  value = aws_appsync_graphql_api.graphql_api.uris["GRAPHQL"]

}

output "graphal_api_id" {
  value = aws_appsync_graphql_api.graphql_api.id
}

output "graphal_api_endpoint" {
  value = aws_appsync_graphql_api.graphql_api.id
}