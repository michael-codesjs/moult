data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

variable "repository" {
  type        = string
  default     = "moult"
  description = "Repository name."
}

variable "organisation" {
  type        = string
  default     = "michael-codesjs"
  description = "Organisation or user name."
}

variable "dev_bucket_arn" {
  type        = string
  nullable    = false
  description = "Dev state bucket."
}

variable "prod_bucket_arn" {
  type        = string
  nullable    = false
  description = "Prod state bucket."
}