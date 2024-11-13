##################################################################################
# LOCALS
##################################################################################

locals {

  common_tags = {
    Environment = var.environment
  }

  name_prefix = "${var.prefix}-${var.environment}"

}

##################################################################################
# RESOURCES
##################################################################################


resource "digitalocean_app" "static-site-example" {
  spec {
    name   = "nestosoft-web"
    region = "ams"

    static_site {
      name = "nestosoft"
    }
  }
}
