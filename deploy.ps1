# Deploy Next.js to Google Cloud Run

# Configurations
$PROJECT_ID = "v4fifa"
$PROJECT_NUMBER = "562792253797"
$SERVICE_NAME = "fifa2026-app"
$REGION = "us-central1" # You can change this if needed

Write-Host "Starting deployment to Google Cloud Run for project $PROJECT_ID..." -ForegroundColor Green

# Ensure you are logged in
# gcloud auth login
gcloud config set project $PROJECT_ID

# Deploy the application using Cloud Build and Cloud Run
# Notice: In a real production scenario, you should store secrets in Google Secret Manager.
# For simplicity, if you have setup Secret Manager, use --set-secrets, otherwise we set dummy vars for demonstration,
# but it is highly recommended to configure them in the Google Cloud Console later.
gcloud run deploy $SERVICE_NAME `
    --source . `
    --region $REGION `
    --allow-unauthenticated `
    --set-env-vars="NEXTAUTH_TRUST_HOST=1"

Write-Host "Deployment command finished." -ForegroundColor Green
Write-Host "IMPORTANT: Please go to the Google Cloud Console to securely configure your DATABASE_URL and AUTH_SECRET in Cloud Run's Variables & Secrets section." -ForegroundColor Yellow
