##################################################################################
# RESOURCES
##################################################################################

resource "digitalocean_app" "nestosoft-web" {
  spec {
    name   = "nestosoft-web"
    region = "lon"

    static_site {
      name             = "nestosoft-web"
      source_dir       = "/"
      output_dir       = "dist"
      build_command    = <<-EOT
                          cp .env.digital-ocean .env.production
                          npm run build
                        EOT
      environment_slug = "node-js"

      git {
        repo_clone_url = "https://github.com/nestosoft/nestosoft_web.git"
        branch         = "main"
      }
    }

    alert {
      disabled = false
      rule     = "DEPLOYMENT_FAILED"
    }
    alert {
      disabled = false
      rule     = "DOMAIN_FAILED"
    }

    ingress {
      rule {
        component {
          name                 = "nestosoft-web"
          preserve_path_prefix = false
          rewrite              = null
        }
        match {
          path {
            prefix = "/"
          }
        }
      }
    }
  }


}

# COmmented as it has been imported already
# import {
#   to = digitalocean_app.nestosoft-web
#   id = "1a1f5b79-b5be-40a3-8549-86d7e05d3815"
# }
