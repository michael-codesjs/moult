terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the infrastructure is created in."
}

variable "repository" {
  type        = string
  default     = "moult"
  description = "Repository name."
}

variable "organisation" {
  type        = string
  default     = "moult"
  description = "Organisation or Username."
}

module "roles" {
  source          = "./roles"
  repository      = var.repository
  organisation    = var.organisation
  prod_bucket_arn = module.state_buckets.prod_bucket_arn
  dev_bucket_arn  = module.state_buckets.dev_bucket_arn
}

module "state_buckets" {
  source = "./state-buckets"
}

module "locks" {
  source = "./locks"
}

resource "local_file" "export" {

  content = <<EOS
      DEV_DEPLOY_ROLE_ARN: ${module.roles.dev_role_arn}
      PROD_DEPLOY_ROLE_ARN: ${module.roles.prod_role_arn}
    EOS

  filename = ".env"

}