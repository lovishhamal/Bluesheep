# Deployment Guide for Yeti Cloud by DataHub

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Yeti Cloud by DataHub account
- Git repository (GitHub/GitLab)

## Build Configuration

### 1. Static Export Setup

The project is configured for static export with the following settings in `next.config.ts`:

```typescript
output: "export",
trailingSlash: true,
images: {
  unoptimized: true,
}
```

### 2. Build Command

```bash
npm run build
```

This will create an `out` directory with static files.

## Yeti Cloud by DataHub Deployment Steps

### Method 1: Git Repository Deployment (Recommended)

#### 1. Create Environment

- Log in to your Yeti Cloud dashboard
- Click "New Environment"
- Choose technology stack: **Node.js**
- Select application server: **Apache/Nginx**
- Configure scaling settings
- Name your environment (e.g., "bluesheep-hotel")

#### 2. Deploy via Git

- Navigate to "Deployment Manager"
- Select "GIT/SVN" option
- Provide repository details:
  - **Name**: bluesheep-hotel
  - **Repository URL**: `https://github.com/Ghoral/Bluesheep_web.git`
  - **Branch**: `dev` (or `main`)
  - **Build Command**: `npm run build`
  - **Output Directory**: `out`
- If private repository, provide Git credentials
- Click "Add + Deploy"

### Method 2: ZIP File Upload

#### 1. Prepare Files

```bash
# Build the project
npm run build

# Create deployment package
zip -r bluesheep-deployment.zip out/ package.json package-lock.json
```

#### 2. Upload to Yeti Cloud

- In Deployment Manager, select "Archive"
- Upload the ZIP file
- Deploy to your environment

### 3. Environment Variables

Set these in your Yeti Cloud environment:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. File Structure

After deployment, your directory should look like:

```
/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── camping/
│   └── index.html
├── contact/
│   └── index.html
├── menu/
│   └── index.html
├── rooms/
│   └── index.html
└── .htaccess
```

## Troubleshooting

### "Page temporarily unavailable" Error

1. Check if `.htaccess` file is uploaded and accessible
2. Verify mod_rewrite is enabled on the server
3. Ensure all files in `out` directory are uploaded
4. Check server error logs

### Routing Issues

1. Verify `.htaccess` rewrite rules are working
2. Check if trailing slashes are handled correctly
3. Ensure all route files have corresponding `index.html` files

### Build Issues

1. Run `npm install` before building
2. Check for TypeScript errors: `npm run lint`
3. Verify all dependencies are installed

## Yeti Cloud Specific Configuration

### Configuration File

The project includes `yeti-cloud-config.json` with deployment settings:

```json
{
  "appName": "bluesheep-hotel",
  "environment": "production",
  "buildCommand": "npm run build",
  "staticFiles": "./out",
  "deploymentType": "static",
  "framework": "nextjs",
  "nodeVersion": "18"
}
```

### Deployment Options

1. **Git Repository**: Connect your GitHub repository directly
2. **ZIP Upload**: Upload built files as archive
3. **CLI Deployment**: Use Yeti Cloud CLI tools (if available)

## Support

For Yeti Cloud specific issues, contact DataHub support with:

- Your domain name
- Error messages from server logs
- Build output from `npm run build`
- Repository URL: `https://github.com/Ghoral/Bluesheep_web.git`
