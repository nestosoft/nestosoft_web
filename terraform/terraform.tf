##################################################################################
# TERRAFORM
##################################################################################

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }

    tfe = {
      source  = "hashicorp/tfe"
      version = "~>0.0"
    }
  }
}

##################################################################################
# PROVIDERS INITIALISATION
##################################################################################

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}
