
resource "google_artifact_registry_repository" "nestosoft-web" {
  location      = "europe-west2"
  repository_id = "nestosoft-web"
  description   = "Nestosoft web artifact"
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
}