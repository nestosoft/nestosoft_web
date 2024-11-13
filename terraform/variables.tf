# Set the variable value in *.tfvars file
# or using -var="do_token=..." CLI option
variable "do_token" {}

variable "prefix" {
  type        = string
  description = "(Required) Prefix to use for all resources in this module."
}

variable "environment" {
  type        = string
  description = "(Required) Environment of all resources"
}
