resource "aws_dynamodb_table" "aggregate_table" {
    
    name = "moult-user-aggregate-table"

    hash_key = "id"

    billing_mode   = "PROVISIONED"
    read_capacity  = "1"
    write_capacity = "1"
    
    stream_enabled   = true
    stream_view_type = "NEW_AND_OLD_IMAGES"

    attribute {
      name = "id"
      type = "S"
    }
    
    tags = {
      Name        = "moult-user-aggregate-table-${var.stage}"
      Description = "moult user aggregate table."
      Application = "moult"
      Service     = "user"
      Domain      = "authentication"
      Stage       = var.stage
    }

}

resource "aws_ssm_parameter" "aggregate_table_name" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-aggregate-table/name"
  type  = "SecureString"
  value = aws_dynamodb_table.aggregate_table.name
}

resource "aws_ssm_parameter" "aggregate_table_arn" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-aggregate-table/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.aggregate_table.arn
}

resource "aws_ssm_parameter" "aggregate_table_stream_arn" {
  name  ="/moult/${var.stage}/domain/user/infrastructure/storage/moult-user-aggregate-table/stream/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.aggregate_table.stream_arn
}