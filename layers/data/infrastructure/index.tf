terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  # required_version = ">= 1.2.0"
  backend "s3" {}
}

provider "aws" {
  region = "eu-central-1"
}

variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the infrastructure is created in."
}

module "domain-io" {
  source = "./domain-io"
  stage  = var.stage
}

module "storage" {
  source = "./storage"
  stage  = var.stage
}