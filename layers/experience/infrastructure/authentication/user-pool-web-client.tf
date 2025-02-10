resource "aws_cognito_user_pool_client" "user_pool_web_client" {

  name                = "moult-main-${var.stage}"
  user_pool_id        = aws_cognito_user_pool.user_pool.id
  
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",           # Enable SRP authentication
    "ALLOW_REFRESH_TOKEN_AUTH",      # Allow refresh token usage
    # "ALLOW_USER_PASSWORD_AUTH",      # Enable basic password authentication
    "ALLOW_CUSTOM_AUTH"              # Required for custom authentication flows
  ]

  prevent_user_existence_errors = "ENABLED"
  generate_secret              = false
  
  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  access_token_validity  = 60     # 1 hour
  id_token_validity     = 60     # 1 hour
  refresh_token_validity = 30    # 30 days
}

resource "aws_ssm_parameter" "userPoolClientId" {
  name  = "/moult/${var.stage}/infrastructure/authentication/user-pool/client/main/id"
  type  = "SecureString"
  value = aws_cognito_user_pool_client.user_pool_web_client.id
}