locals {
  secrets = jsondecode(file("${path.module}/secrets.env.json"))
}

resource "aws_amplify_app" "app" {
    
    name = "moult-marketing"
    repository = local.secrets.REPOSITORY
    access_token = local.secrets.GITHUB_TOKEN
    build_spec = file("${path.module}/build-specs/marketing.yaml")

     custom_rule {
        source = "/<*>"
        status = "404"
        target = "/index.html"
    }

    environment_variables = {
        TEXT = "Test"
    }
}

resource "aws_amplify_branch" "branch" {
  app_id      = aws_amplify_app.app.id
  branch_name = "${var.stage == "prod" ? "main" : var.stage}"

  framework = "React"
  stage     = "${var.stage == "prod" ? "PRODUCTION" : "DEVELOPMENT"}"

  environment_variables = {
    REACT_APP_API_SERVER = var.graphql_api_endpoint
    REACT_APP_COGNITO_USER_POOL_ID = var.cognito_user_pool_id
    REACT_APP_COGNITO_USER_POOL_ARN = var.cognito_user_pool_arn
    REACT_APP_COGNITO_USER_POOL_NAME =  var.cognito_user_pool_name
  }

}

resource "aws_amplify_domain_association" "domain" {

  app_id      = aws_amplify_app.app.id
  domain_name = "${var.stage == "prod" ? "" : var.stage}${var.stage == "prod" ? "" : "."}withmoult.com"

  sub_domain {
    branch_name = aws_amplify_branch.branch.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.branch.branch_name
    prefix      = "www"
  }

}