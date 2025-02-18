output "username_counts_table_name" {
  description = "Name of the username counts DynamoDB table"
  value       = aws_dynamodb_table.username_counts.name
}

output "username_counts_table_arn" {
  description = "ARN of the username counts DynamoDB table"
  value       = aws_dynamodb_table.username_counts.arn
}

output "username_assignments_table_name" {
  description = "Name of the username assignments DynamoDB table"
  value       = aws_dynamodb_table.username_assignments.name
}

output "username_assignments_table_arn" {
  description = "ARN of the username assignments DynamoDB table"
  value       = aws_dynamodb_table.username_assignments.arn
}

output "ssm_parameter_prefix" {
  description = "SSM parameter prefix for this service"
  value       = "/moult/${var.environment}/domain/user"
} 