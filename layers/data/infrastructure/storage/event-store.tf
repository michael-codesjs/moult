resource "aws_dynamodb_table" "event_source_table" {
    
    name = "moult-event-store-table"

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
        Name        = "moult-event-store-${var.stage}"
        Description = "moult event store table."
        Application = "moult"
        Service     = "estate"
        Stage       = var.stage
    }

}