variable "stage" {
  type = string
  default = "dev"
  description = "Stage the authentication infrastructure is created in."
}

variable "region" {
  type = string
  default = "eu-central-1"
  description = "Region the authentication infrastructure is created in."
}

variable "graphql_api_id" {
  type = string
  nullable = false
}

variable "graphql_api_endpoint" {
  type = string
  nullable = false
}

variable "cognito_user_pool_id" {
  type = string
  nullable = false
}

variable "cognito_user_pool_arn" {
  type = string
  nullable = false
}

variable "cognito_user_pool_name" {
  type = string
  nullable = false
}