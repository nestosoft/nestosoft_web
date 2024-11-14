data "azurerm_resource_group" "nestosoft-web" {
  name = "nestosoft-web"
}

resource "azurerm_static_web_app" "nesotosoft-web" {
  name                = "nestosoft-web"
  resource_group_name = data.azurerm_resource_group.nestosoft-web.name
  location            = data.azurerm_resource_group.nestosoft-web.location

  tags = local.common_tags
}

import {
  to = azurerm_static_web_app.nesotosoft-web
  id = "/subscriptions/bf63e21c-08f2-4d35-b7cb-bd9873095aef/resourceGroups/nestosoft-web/providers/Microsoft.Web/staticSites/nestosoft-web"
}
