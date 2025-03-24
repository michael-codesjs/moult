resource "aws_cognito_user_pool" "user_pool" {

  name                = "moult-user-pool-${var.stage}"
  deletion_protection = var.stage == "prod" ? "ACTIVE" : "INACTIVE"
  username_attributes = ["email", "phone_number"]

  username_configuration {
    case_sensitive = false
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "admin_only"
      priority = 1
    }
  }

  password_policy {
    minimum_length    = 7
    require_lowercase = false
    require_uppercase = false
    require_symbols   = false
    require_numbers   = false
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = true
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = false
    mutable             = true
    string_attribute_constraints {
      min_length = 3
      max_length = 256
    }
  }

  schema {
    name                = "phone_number"
    attribute_data_type = "String"
    required            = false
    mutable             = true
    string_attribute_constraints {
      min_length = 3
      max_length = 256
    }
  }

  schema {
    name                = "preferred_username"
    attribute_data_type = "String"
    required            = false
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  lifecycle {
    ignore_changes = [
      lambda_config
    ]
  }

  user_pool_add_ons {
    advanced_security_mode = "OFF" # or "AUDIT" or "ENFORCED" based on your needs
  }

}

resource "aws_ssm_parameter" "userPoolName" {
  name  = "/moult/${var.stage}/infrastructure/authentication/user-pool/name"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.name
}

resource "aws_ssm_parameter" "userPoolId" {
  name  = "/moult/${var.stage}/infrastructure/authentication/user-pool/id"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.id
}

resource "aws_ssm_parameter" "userPoolARN" {
  name  = "/moult/${var.stage}/infrastructure/authentication/user-pool/arn"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.arn
}

output "cognito_user_pool_id" {
  value       = aws_cognito_user_pool.user_pool.id
  description = "Cognito user pool ID."
}

output "cognito_user_pool_name" {
  value       = aws_cognito_user_pool.user_pool.name
  description = "Cognito user pool name."
}

output "cognito_user_pool_arn" {
  value       = aws_cognito_user_pool.user_pool.arn
  description = "Cognito user pool ARN."
}
