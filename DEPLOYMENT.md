# Deployment Guide for Yeti Cloud (Data Hub)

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Yeti Cloud account with Data Hub

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

## Yeti Cloud Deployment Steps

### 1. Upload Files

Upload the entire `out` directory contents to your Yeti Cloud hosting directory.

### 2. Configure Web Server

Ensure your Yeti Cloud hosting supports:

- Apache with mod_rewrite enabled
- Static file serving
- URL rewriting for SPA routing

### 3. Environment Variables

If using Supabase, ensure these environment variables are set in your build process:

```
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

## Alternative Deployment Methods

### Using Git

If Yeti Cloud supports Git deployment:

1. Push your code to a Git repository
2. Connect the repository to Yeti Cloud
3. Set build command: `npm run build`
4. Set output directory: `out`

### Manual Upload

1. Run `npm run build` locally
2. Compress the `out` directory
3. Upload and extract on Yeti Cloud
4. Ensure `.htaccess` is in the root directory

## Support

For Yeti Cloud specific issues, contact Data Hub support with:

- Your domain name
- Error messages from server logs
- Build output from `npm run build`
