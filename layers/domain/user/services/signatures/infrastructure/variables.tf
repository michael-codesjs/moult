variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-central-1"
}

variable "stage" {
  description = "stage name (e.g., dev, staging, prod)"
  type        = string
  default = "dev"
}

variable "service_name" {
  description = "Name of the service"
  type        = string
  default     = "signatures"
}

variable "domain" {
  description = "domain name"
  type        = string
  default     = "user"
} 