#!/bin/bash

# Yeti Cloud by DataHub Deployment Script
# This script prepares your Next.js app for deployment on Yeti Cloud

echo "🚀 Preparing Bluesheep Hotel for Yeti Cloud deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Build output directory 'out' not found"
    exit 1
fi

echo "✅ Build output directory found"

# Create deployment package
echo "📦 Creating deployment package..."
zip -r bluesheep-yeti-cloud-deployment.zip out/ package.json package-lock.json yeti-cloud-config.json

if [ $? -ne 0 ]; then
    echo "❌ Failed to create deployment package"
    exit 1
fi

echo "✅ Deployment package created: bluesheep-yeti-cloud-deployment.zip"

# Display deployment instructions
echo ""
echo "🎉 Deployment package ready!"
echo ""
echo "📋 Next steps for Yeti Cloud deployment:"
echo ""
echo "Method 1 - Git Repository (Recommended):"
echo "1. Go to your Yeti Cloud dashboard"
echo "2. Create a new environment"
echo "3. In Deployment Manager, select 'GIT/SVN'"
echo "4. Use repository: https://github.com/Ghoral/Bluesheep_web.git"
echo "5. Branch: dev"
echo "6. Build command: npm run build"
echo "7. Output directory: out"
echo ""
echo "Method 2 - ZIP Upload:"
echo "1. Go to your Yeti Cloud dashboard"
echo "2. Create a new environment"
echo "3. In Deployment Manager, select 'Archive'"
echo "4. Upload: bluesheep-yeti-cloud-deployment.zip"
echo "5. Deploy to your environment"
echo ""
echo "📁 Files ready for deployment:"
echo "- Static files in 'out/' directory"
echo "- Package configuration files"
echo "- Yeti Cloud configuration"
echo ""
echo "🔧 Don't forget to set environment variables in Yeti Cloud:"
echo "- NODE_ENV=production"
echo "- NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
echo ""
echo "✨ Happy deploying!"
