# ===============================
# Django Docker Web App Deployment
# ===============================

# Variables - customize these
$resourceGroup = "djangoaz-test"
$webAppName   = "django-superpos-$(Get-Random)"   # auto-unique
$dockerImage  = "shreyasthale/superpos-backend:latest"
$location     = "centralindia"
$planName     = "$webAppName-plan"
$sku          = "B1"     # Student friendly

# 1️⃣ Login to Azure (if not already)
# az login

# 2️⃣ Ensure resource group exists
Write-Host "Checking resource group..."
$rg = az group show --name $resourceGroup 2>$null

if (-not $rg) {
    Write-Host "Resource group not found, creating..."
    az group create --name $resourceGroup --location $location
} else {
    Write-Host "Resource group exists."
}

# 3️⃣ Create App Service Plan (Linux)
Write-Host "Creating App Service Plan..."
az appservice plan create `
    --name $planName `
    --resource-group $resourceGroup `
    --is-linux `
    --sku $sku `
    --location $location

# 4️⃣ Create Web App with Docker
Write-Host "Creating Web App..."
az webapp create `
    --resource-group $resourceGroup `
    --plan $planName `
    --name $webAppName `
    --deployment-container-image-name $dockerImage

# 5️⃣ Set environment variables for Django
Write-Host "Setting Django environment variables..."
az webapp config appsettings set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --settings `
    DJANGO_SETTINGS_MODULE=project.settings `
    DEBUG=False `
    ALLOWED_HOSTS="*"

# 6️⃣ Enable Always On
az webapp config set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --always-on true

# 7️⃣ Get public URL
$webAppUrl = az webapp show `
    --resource-group $resourceGroup `
    --name $webAppName `
    --query defaultHostName `
    --output tsv

Write-Host "✅ Deployment complete!"
Write-Host "Your Django app is live at: https://$webAppUrl"