# Vercel Deployment Setup

## Environment Variables

To enable Google Sheets integration, you need to set the following environment variables in your Vercel project:

### Required Environment Variables:

1. **VITE_GOOGLE_PROJECT_ID** - Your Google Cloud Project ID
2. **VITE_GOOGLE_PRIVATE_KEY_ID** - Private key ID from your service account
3. **VITE_GOOGLE_PRIVATE_KEY** - Private key from your service account (include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
4. **VITE_GOOGLE_CLIENT_EMAIL** - Service account email
5. **VITE_GOOGLE_CLIENT_ID** - Client ID from your service account
6. **VITE_GOOGLE_CLIENT_X509_CERT_URL** - Certificate URL from your service account

### How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its corresponding value
5. Redeploy your project

### Without Environment Variables:

The application will work perfectly without these variables, but:
- Assessment results will not be submitted to Google Sheets
- You'll see a warning in the console about missing credentials
- All other functionality (testing, scoring, results display) works normally

### Testing the Setup:

1. Complete a test assessment
2. Check the browser console for Sheet3 submission messages
3. If credentials are set correctly, you'll see "Results successfully submitted to Sheet3"
4. If not set, you'll see "Sheet3 submission skipped - credentials not configured"

## Current Status

✅ **Assessment functionality** - Works perfectly  
✅ **Selection number fix** - Sends 1-5 instead of 0s  
✅ **Vercel deployment** - Successfully deployed  
⚠️ **Google Sheets integration** - Requires environment variables setup
