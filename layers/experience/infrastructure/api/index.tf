variable "stage" {
  type        = string
  nullable    = false
  description = "Stage the API infrastructure is created in."
}

variable "region" {
  type        = string
  nullable    = false
  description = "Region the API infrastructure is created in."
}

data "aws_cognito_user_pools" "cognito_user_pool" {
   name = "moult-user-pool-${var.stage}"
}