resource "aws_db_instance" "default" {
  identifier             = "moult-db-${var.stage}"
  allocated_storage      = 20
  db_name                = "moult_db_${var.stage}"
  engine                 = "postgres"
  engine_version         = "15.8"
  instance_class         = "db.t3.micro"
  username               = "postgres"
  password               = "postgres"
  parameter_group_name   = "default.postgres15"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.postgres.id]

  # Free tier optimizations
  storage_type        = "gp2"
  multi_az            = false
  publicly_accessible = true

  # Performance and backup settings
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  # Security settings
  storage_encrypted   = true
  deletion_protection = var.stage == "prod" ? true : false

  tags = {
    Environment = var.stage
    Project     = "moult"
  }
}

# Output the RDS endpoint for easy access
output "rds_endpoint" {
  value       = aws_db_instance.default.endpoint
  description = "RDS endpoint for database connections"
}

# Store the connection string in SSM Parameter Store
resource "aws_ssm_parameter" "database_url" {
  name  = "/moult/${var.stage}/infrastructure/storage/postgres/url"
  type  = "SecureString"
  value = "postgresql://${aws_db_instance.default.username}:${aws_db_instance.default.password}@${aws_db_instance.default.endpoint}/${aws_db_instance.default.db_name}"
}
