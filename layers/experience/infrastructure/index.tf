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

variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the infrastructure is created in."
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the infrastructure is created in."
}

module "api" {
  source               = "./api"
  stage                = var.stage
  region               = var.region
}

module "authentication" {
  source = "./authentication"
  stage  = var.stage
  region = var.region
}


module "client_deployments" {
  source = "./client-deployments"
  stage  = var.stage
  region = var.region
  graphql_api_id = module.api.graphal_api_id
  graphql_api_endpoint = module.api.graphal_api_endpoint
  cognito_user_pool_arn = module.authentication.cognito_user_pool_arn
  cognito_user_pool_id = module.authentication.cognito_user_pool_id
  cognito_user_pool_name = module.authentication.cognito_user_pool_name
}