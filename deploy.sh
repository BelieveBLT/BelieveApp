#!/bin/bash
# Set path to local Node.js
export PATH=$PWD/node-v20.10.0-darwin-arm64/bin:$PATH

echo "🚀 Starting Vercel Deployment..."
echo "Verify that you are logged in (browser will open if needed)."

# Run Vercel (Prod)
vercel --token 9hWbmrcaJw0WZuDmzkJIfEaz --prod
