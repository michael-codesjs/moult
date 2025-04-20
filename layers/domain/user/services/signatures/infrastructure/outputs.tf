output "signature_counts_table_name" {
  description = "Name of the signature counts DynamoDB table"
  value       = aws_dynamodb_table.signature_counts.name
}

output "signature_counts_table_arn" {
  description = "ARN of the signature counts DynamoDB table"
  value       = aws_dynamodb_table.signature_counts.arn
}

output "signature_assignments_table_name" {
  description = "Name of the signature assignments DynamoDB table"
  value       = aws_dynamodb_table.signature_assignments.name
}

output "signature_assignments_table_arn" {
  description = "ARN of the signature assignments DynamoDB table"
  value       = aws_dynamodb_table.signature_assignments.arn
}

output "ssm_parameter_prefix" {
  description = "SSM parameter prefix for this service"
  value       = "/moult/${var.stage}/domain/user"
}
