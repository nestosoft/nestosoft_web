# Nestosoft website

[![Netlify Status](https://api.netlify.com/api/v1/badges/d186feb6-ef29-436a-ad03-5732ab0f1999/deploy-status)](https://app.netlify.com/sites/nestosoft/deploys)
[Nestosoft in netlify](https://netlify.nestosoft.com)
[Nestosoft in digital ocean](https://do.nestosoft.com)
[Nestosoft in Azure static web](https://azure.nestosoft.com)

# Uses:

- React
- Typescript
- Tailwind
- Vite
- Shadcn

## Shadcn

- https://ui.shadcn.com/docs/installation/vite

## deployments

- [x] Netlify -> netlify.nestosoft.com
  - via github actions
  - No terraform, Site is easy to setup manually, and the terraform provider is only to manage DNS and for building the site which we don't use
- [x] Azure static pages -> azure.nestosoft.com
  - via github actions
  - infrastructure setup with terraform
- [x] digital ocean app platorm -> do.nestosoft.com
  - terraform resource (created manually and imported)
  - deployment via digital ocean
  - github only trigger the deployment

az ad sp create-for-rbac --name terraform --role Contributor --scopes /subscriptions/<subscription_id>

az ad sp create-for-rbac --name terraform-nestosoft-web --role Contributor --scopes /subscriptions/bf63e21c-08f2-4d35-b7cb-bd9873095aef/resourceGroups/nestosoft-web
