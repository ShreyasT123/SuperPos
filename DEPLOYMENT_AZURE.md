# Azure Deployment Guide for SuperPos Backend

This guide provides step-by-step instructions for deploying the SuperPos Django backend to Azure using Docker and Terraform.

## Prerequisites

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed.
- [Terraform](https://www.terraform.io/downloads.html) installed.
- A GitHub repository for your project.

## 1. Infrastructure Provisioning (Terraform)

The infrastructure is defined in `SuperPos/main.tf`.

1.  Navigate to the `SuperPos` directory:
    ```bash
    cd SuperPos
    ```
2.  Initialize Terraform:
    ```bash
    terraform init
    ```
3.  Apply the configuration:
    ```bash
    terraform apply
    ```
    Take note of the `acr_login_server` and `webapp_url` outputs.

## 2. Environment Variables & Secrets

You must configure the following environment variables in the Azure Portal for your Web App (`Configuration` > `Application settings`):

| Variable | Description |
| :--- | :--- |
| `SECRET_KEY` | A long, random string for Django security. |
| `DEBUG` | Set to `False` for production. |
| `ALLOWED_HOSTS` | Set to your Web App URL (e.g., `superpos-app.azurewebsites.net`). |
| `CORS_ALLOWED_ORIGINS` | Set to your frontend URL (e.g., `https://super-pos-beta.vercel.app`). |
| `GENERATIVEAI_API_KEY` | Your Google Gemini API key. |

## 3. CI/CD Setup (GitHub Actions)

The deployment is automated via `.github/workflows/azure-deploy.yml`. You need to set the following secrets in your GitHub repository (`Settings` > `Secrets and variables` > `Actions`):

- `AZURE_CREDENTIALS`: The JSON output from creating an Azure Service Principal.
  ```bash
  az ad sp create-for-rbac --name "SuperPosDeploy" --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/superpos-rg --sdk-auth
  ```
- `ACR_LOGIN_SERVER`: The `acr_login_server` from Terraform output.
- `ACR_USERNAME`: The admin username for your ACR (can be found in the Azure Portal or via `az acr credential show`).
- `ACR_PASSWORD`: The admin password for your ACR.

## 4. Serving Static Files

The app uses **WhiteNoise** to serve static files directly from the web server. This is already configured in `settings.py`. The `Dockerfile` runs `collectstatic` during the build process.

## 5. Monitoring and Logging

- **Logs**: Django is configured to output logs to `stdout`. You can view these logs in the Azure Portal under `App Service logs` > `Log stream`.
- **Application Insights**: It is highly recommended to enable Application Insights for the App Service to get detailed telemetry and error reporting.

## 6. Local Testing with Docker

To test the container locally:
```bash
docker build -t superpos ./SuperPos
docker run -p 8000:8000 -e SECRET_KEY=local-dev -e DEBUG=True superpos
```
