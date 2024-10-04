resource "aws_dynamodb_table" "snapshot_table" {
    
    name = "moult-user-credentials-snapshot-table"

    hash_key = "id"
    range_key = "version"
    
    billing_mode   = "PROVISIONED"
    read_capacity  = "1"
    write_capacity = "1"
    
    stream_enabled   = true
    stream_view_type = "NEW_AND_OLD_IMAGES"

    attribute {
      name = "id"
      type = "S"
    }

    attribute {
      name = "version"
      type = "N"
    }
    
    tags = {
      Name        = "moult-user-credentials-snapshot-${var.stage}"
      Description = "moult user-credentials snapshot table."
      Application = "moult"
      Service     = "user-credentials"
      Domain      = "request"
      Stage       = var.stage
    }

}

resource "aws_ssm_parameter" "snapshot_table_name" {
  name  = "/moult/${var.stage}/domain/authentication/service/user-credentials/infrastructure/storage/moult-user-credentials-snapshot-table/name"
  type  = "SecureString"
  value = aws_dynamodb_table.event_store_table.name
}

resource "aws_ssm_parameter" "snapshot_table_arn" {
  name  = "/moult/${var.stage}/domain/authentication/service/user-credentials/infrastructure/storage/moult-user-credentials-snapshot-table/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.snapshot_table.arn
}

resource "aws_ssm_parameter" "snapshot_table_stream_arn" {
  name  ="/moult/${var.stage}/domain/user-credentials/infrastructure/storage/moult-user-credentials-snapshot-table/stream/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.snapshot_table.stream_arn
}