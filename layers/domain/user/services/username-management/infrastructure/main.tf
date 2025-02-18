terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    key = "domain/user/username-management/terraform.tfstate"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Service     = "username-management"
      Domain      = "user"
    }
  }
}

# DynamoDB table for username counts
resource "aws_dynamodb_table" "username_counts" {
  name           = "${var.environment}-moult-username-counts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "baseUsername"

  attribute {
    name = "baseUsername"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }
}

# DynamoDB table for username assignments
resource "aws_dynamodb_table" "username_assignments" {
  name           = "${var.environment}-moult-username-assignments"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "username"
  range_key      = "userId"

  attribute {
    name = "username"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "baseUsername"
    type = "S"
  }

  # GSI for querying by userId
  global_secondary_index {
    name               = "UserIdIndex"
    hash_key           = "userId"
    projection_type    = "ALL"
    write_capacity     = 0
    read_capacity      = 0
  }

  # GSI for querying by baseUsername
  global_secondary_index {
    name               = "BaseUsernameIndex"
    hash_key           = "baseUsername"
    projection_type    = "ALL"
    write_capacity     = 0
    read_capacity      = 0
  }

  point_in_time_recovery {
    enabled = true
  }
}

# SSM Parameters for table names and ARNs
resource "aws_ssm_parameter" "username_counts_table_name" {
  name  = "/moult/${var.environment}/domain/user/username-counts/table/name"
  type  = "String"
  value = aws_dynamodb_table.username_counts.name
}

resource "aws_ssm_parameter" "username_counts_table_arn" {
  name  = "/moult/${var.environment}/domain/user/username-counts/table/arn"
  type  = "String"
  value = aws_dynamodb_table.username_counts.arn
}

resource "aws_ssm_parameter" "username_assignments_table_name" {
  name  = "/moult/${var.environment}/domain/user/username-assignments/table/name"
  type  = "String"
  value = aws_dynamodb_table.username_assignments.name
}

resource "aws_ssm_parameter" "username_assignments_table_arn" {
  name  = "/moult/${var.environment}/domain/user/username-assignments/table/arn"
  type  = "String"
  value = aws_dynamodb_table.username_assignments.arn
} 