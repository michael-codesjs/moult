terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    key = "domain/user/signatures/terraform.tfstate"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      stage = var.stage
      Service     = "signatures"
      Domain      = "user"
    }
  }
}

# DynamoDB table for username counts
resource "aws_dynamodb_table" "signature_counts" {
  name         = "${var.stage}-moult-signature-counts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "base_signature"

  attribute {
    name = "base_signature"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }
}

# DynamoDB table for signature assignments
resource "aws_dynamodb_table" "signature_assignments" {
  name         = "${var.stage}-moult-signature-assignments"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "signature"
  range_key    = "user_id"

  attribute {
    name = "signature"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "base_signature"
    type = "S"
  }

  # GSI for querying by user_id
  global_secondary_index {
    name            = "UserIdIndex"
    hash_key        = "user_id"
    projection_type = "ALL"
    write_capacity  = 5
    read_capacity   = 5
  }

  # GSI for querying by base_signature
  global_secondary_index {
    name            = "BaseSignatureIndex"
    hash_key        = "base_signature"
    projection_type = "ALL"
    write_capacity  = 5
    read_capacity   = 5
  }

  point_in_time_recovery {
    enabled = true
  }

}

# SSM Parameters for table names and ARNs
resource "aws_ssm_parameter" "signature_counts_table_name" {
  name  = "/moult/${var.stage}/domain/user/signatures/infrastructure/storage/signature-counts/table/name"
  type  = "String"
  value = aws_dynamodb_table.signature_counts.name
}

resource "aws_ssm_parameter" "signature_counts_table_arn" {
  name  = "/moult/${var.stage}/domain/user/signatures/infrastructure/storage/signature-counts/table/arn"
  type  = "String"
  value = aws_dynamodb_table.signature_counts.arn
}

resource "aws_ssm_parameter" "signature_assignments_table_name" {
  name  = "/moult/${var.stage}/domain/user/signatures/infrastructure/storage/signature-assignments/table/name"
  type  = "String"
  value = aws_dynamodb_table.signature_assignments.name
}

resource "aws_ssm_parameter" "signature_assignments_table_arn" {
  name  = "/moult/${var.stage}/domain/user/signatures/infrastructure/storage/signature-assignments/table/arn"
  type  = "String"
  value = aws_dynamodb_table.signature_assignments.arn
}
