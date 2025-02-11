resource "aws_dynamodb_table" "user_credential_materialized_view_dynamoDb_table" {

  name = "moult-user-materialized-view-${var.stage}"

  tags = {
    Name        = "moult-user-materialized-view-${var.stage}"
    Application = "moult"
    Domain      = "authentication"
    Service     = "user"
    Stage       = var.stage
  }

  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  attribute {
    name = "EntityIndexPK"
    type = "S"
  }

  attribute {
    name = "EntityIndexSK"
    type = "S"
  }

  attribute {
    name = "CreatorIndexPK"
    type = "S"
  }

  attribute {
    name = "CreatorIndexSK"
    type = "S"
  }

  attribute {
    name = "EmailIndexPK"
    type = "S"
  }

   attribute {
    name = "PhoneNumberIndexPK"
    type = "S"
  }

  hash_key  = "PK"
  range_key = "SK"

  point_in_time_recovery {
    enabled = true
  }

  global_secondary_index {
    name            = "EntityIndex"
    hash_key        = "EntityIndexPK"
    range_key       = "EntityIndexSK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "CreatorIndex"
    hash_key        = "CreatorIndexPK"
    range_key       = "CreatorIndexSK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "EmailIndex"
    hash_key        = "EmailIndexPK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "PhoneNumberIndex"
    hash_key        = "PhoneNumberIndexPK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

}

resource "aws_ssm_parameter" "user_credentials_table_name" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/table/user/name"
  type  = "SecureString"
  value = aws_dynamodb_table.user_credential_materialized_view_dynamoDb_table.name
}

resource "aws_ssm_parameter" "user_credentials_table_arn" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/table/user/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.user_credential_materialized_view_dynamoDb_table.arn
}

resource "aws_ssm_parameter" "credentials_table_stream_arn" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/table/user/stream/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.user_credential_materialized_view_dynamoDb_table.stream_arn
}