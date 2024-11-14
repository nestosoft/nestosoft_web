##################################################################################
# LOCALS
##################################################################################

locals {

  common_tags = {
    Environment = var.environment
  }

  name_prefix = "${var.prefix}-${var.environment}"

}
