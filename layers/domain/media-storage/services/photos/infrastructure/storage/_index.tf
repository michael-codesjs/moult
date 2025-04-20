variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the media storage infrastructure is created in."
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the media storage infrastructure is created in."
}

variable "environment" {
  type        = string
  default     = "dev"
  description = "Environment the media storage infrastructure is created in."
} 
