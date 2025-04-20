resource "aws_dynamodb_table" "event_counts" {

  name         = "${var.stage}-moult-photos-events-counts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "aggregate_id"

  attribute {
    name = "aggregate_id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

}

resource "aws_ssm_parameter" "event_count_table_name" {
  name  = "/moult/${var.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-count-table/name"
  type  = "SecureString"
  value = aws_dynamodb_table.event_counts.name
}

resource "aws_ssm_parameter" "event_count_table_arn" {
  name  = "/moult/${var.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-count-table/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.event_counts.arn
}
