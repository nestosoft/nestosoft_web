
variable "region" {
  type        = string
  description = "(Optional) AWS Region to use. Default: eu-west-2"
  default     = "eu-west-2"
}

variable "prefix" {
  type        = string
  description = "(Required) Prefix to use for all resources in this module."
}

variable "environment" {
  type        = string
  description = "(Required) Environment of all resources"
}

variable "billing_code" {
  type        = string
  description = "(Required) Billing code for network resources"
}

# Application variables

variable "ip_range" {
  default = "0.0.0.0/0"
}

variable "instance_type" {
  type        = string
  description = "(Optional) EC2 Instance type to use for web app. Defaults to t4g.nano."
  default     = "t4g.nano"
}

variable "api_key" {
  type        = string
  description = "(Required) API key for web app to talk to SaaS platform."
}

variable "public_subnets" {
  type        = list(string)
  description = "(Required) List of subnet IDs for EC2 instance deployments."
}

variable "vpc_id" {
  type        = string
  description = "(Required) VPC ID of VPC for application deployment."
}


