terraform {
  
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  required_version = ">= 1.2.0"

  backend "s3" {}

}

variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the infrastructure is created in."
}

provider "aws" {
  region = "eu-central-1"
}