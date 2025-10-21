# Hosting Fixes for Bluesheep Hotel Website

## Issues Fixed

### 1. Added .htaccess File

- Created `.htaccess` file for proper client-side routing
- Added compression and caching headers
- Added security headers
- Handles trailing slashes correctly

### 2. Environment Variables

Make sure these are set in your hosting platform:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 3. Build Configuration

The project is already configured for static export with:

- `output: "export"` in next.config.ts
- `trailingSlash: true` for proper routing
- `images: { unoptimized: true }` for static hosting

## Deployment Steps

### For Yeti Cloud by DataHub:

1. **Set Environment Variables** in your Yeti Cloud dashboard:

   - NODE_ENV=production
   - NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

2. **Deploy via Git** (Recommended):

   - Repository: https://github.com/Ghoral/Bluesheep_web.git
   - Branch: dev
   - Build Command: npm run build
   - Output Directory: out

3. **Or Deploy via ZIP**:
   - Run: `bash deploy-yeti-cloud.sh`
   - Upload the generated ZIP file

### For Other Hosting Platforms:

1. **Netlify**:

   - Build command: `npm run build`
   - Publish directory: `out`
   - Add redirects in `netlify.toml` (already configured)

2. **Vercel**:

   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `out`

3. **Apache/Nginx**:
   - Upload the `out` directory contents
   - Ensure `.htaccess` is uploaded (for Apache)
   - Configure server for SPA routing

## Common Issues and Solutions

### Issue: "Page not found" errors

**Solution**: Ensure `.htaccess` file is uploaded and mod_rewrite is enabled

### Issue: Images not loading

**Solution**: Check that all images in `public/` folder are copied to the root of your hosting directory

### Issue: Supabase connection errors

**Solution**: Verify environment variables are set correctly in your hosting platform

### Issue: Build fails

**Solution**:

1. Run `npm install` first
2. Check for TypeScript errors: `npm run lint`
3. Ensure all dependencies are installed

## File Structure After Deployment

```
/
├── index.html
├── .htaccess (for Apache)
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
├── dining-area.jpg
├── hero-bg.jpg
├── hotel-exterior.jpg
├── hotel-room.jpg
├── logo.jpg
├── phoksundo-lake.jpg
└── ... (other public assets)
```

## Testing Your Deployment

1. **Check all pages load correctly**:

   - Home page: `/`
   - Rooms: `/rooms/`
   - Contact: `/contact/`
   - Menu: `/menu/`
   - Camping: `/camping/`

2. **Test functionality**:

   - Image galleries work
   - WhatsApp links work
   - Email links work
   - Phone links work

3. **Check console for errors**:
   - Open browser dev tools
   - Look for JavaScript errors
   - Check network requests

## Quick Deployment Commands

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test locally (optional)
npx serve out

# Create deployment package (for ZIP upload)
bash deploy-yeti-cloud.sh
```

## Support

If you're still having issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure all files from the `out` directory are uploaded
4. Check server error logs
5. Verify the `.htaccess` file is present and working
