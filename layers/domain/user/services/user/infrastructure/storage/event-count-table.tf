resource "aws_dynamodb_table" "event_counts" {

  name         = "${var.stage}-moult-events-counts"
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
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-count-table/name"
  type  = "SecureString"
  value = aws_dynamodb_table.event_counts.name
}

resource "aws_ssm_parameter" "event_count_table_arn" {
  name  = "/moult/${var.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-count-table/arn"
  type  = "SecureString"
  value = aws_dynamodb_table.event_counts.arn
}
