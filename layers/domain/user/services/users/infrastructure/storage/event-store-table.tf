resource "aws_dynamodb_table" "event_store_table" {
    
    name = "moult-user-event-store-table"
    

    billing_mode   = "PROVISIONED"
    read_capacity  = "1"
    write_capacity = "1"
    
    stream_enabled   = true
    stream_view_type = "NEW_AND_OLD_IMAGES"

    hash_key = "id"
    range_key = "version"

    attribute {
      name = "id"
      type = "S"
    }

    attribute {
      name = "version"
      type = "N"
    }
    
    tags = {
      Name        = "moult-user-event-store-${var.stage}"
      Description = "moult user event store table."
      Application = "moult"
      Service     = "user"
      Domain      = "user"
      Stage       = var.stage
    }

}

resource "aws_ssm_parameter" "event_store_table_name" {
  name  = "/moult/${var.stage}/domain/user/users/infrastructure/storage/moult-user-event-store-table/name"
  type  = "SecureString"
  value = aws_dynamodb_table.event_store_table.name
}

resource "aws_ssm_parameter" "event_store_table_arn" {
  name  = "/moult/${var.stage}/domain/user/users/infrastructure/storage/moult-user-event-store-table/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.event_store_table.arn
}

resource "aws_ssm_parameter" "event_store_table_stream_arn" {
  name  ="/moult/${var.stage}/domain/user/users/infrastructure/storage/moult-user-event-store-table/stream/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.event_store_table.stream_arn
}