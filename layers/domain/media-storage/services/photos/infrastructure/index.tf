provider "aws" {
  region = var.region
}

module "storage" {
  source = "./storage"

  environment = var.environment
  stage       = var.stage
  region      = var.region
}

variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the photos service infrastructure is created in."
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the photos service infrastructure is created in."
}

variable "environment" {
  type        = string
  default     = "dev"
  description = "Environment the photos service infrastructure is created in."
} 
