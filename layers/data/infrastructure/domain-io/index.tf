variable "stage" {
  type = string
  default = "dev"
  description = "Stage the domain-io/estate infrastructure is created in."
}

variable "region" {
  type = string
  default = "eu-central-1"
  description = "Region the domain-io/estate infrastructure is created in."
}