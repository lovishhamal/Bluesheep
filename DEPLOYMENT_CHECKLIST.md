# 🚀 Bluesheep Hotel - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

Make sure these are set in your hosting platform:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 2. Build Test

```bash
# Test the build locally
npm install
npm run build

# Check if out directory is created
ls -la out/
```

### 3. Files to Upload

Ensure these files are included in your deployment:

- All files from `out/` directory
- `.htaccess` file (for Apache servers)
- All images from `public/` folder

## 🎯 Deployment Methods

### Method 1: Yeti Cloud by DataHub (Recommended)

#### Git Repository Deployment:

1. **Repository**: `https://github.com/Ghoral/Bluesheep_web.git`
2. **Branch**: `dev`
3. **Build Command**: `npm run build`
4. **Output Directory**: `out`
5. **Environment Variables**: Set in Yeti Cloud dashboard

#### ZIP Upload Deployment:

```bash
# Run the deployment script
bash deploy-yeti-cloud.sh

# Upload the generated ZIP file to Yeti Cloud
```

### Method 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `out`
3. **Environment Variables**: Set in Netlify dashboard
4. **Redirects**: Already configured in `netlify.toml`

### Method 3: Vercel

1. **Framework**: Next.js
2. **Build Command**: `npm run build`
3. **Output Directory**: `out`
4. **Environment Variables**: Set in Vercel dashboard

### Method 4: Apache/Nginx Server

1. Upload all files from `out/` directory
2. Ensure `.htaccess` is uploaded (for Apache)
3. Configure server for SPA routing
4. Set environment variables in server configuration

## 🔧 Common Issues & Solutions

### Issue: "Page not found" errors

**Solution**:

- Ensure `.htaccess` file is uploaded
- Check that mod_rewrite is enabled (Apache)
- Verify all route files have corresponding `index.html` files

### Issue: Images not loading

**Solution**:

- Check that all images in `public/` folder are copied to the root
- Verify image paths are correct
- Check browser console for 404 errors

### Issue: Supabase connection errors

**Solution**:

- Verify environment variables are set correctly
- Check Supabase project is active
- Test connection in browser console

### Issue: Build fails

**Solution**:

- Run `npm install` first
- Check for TypeScript errors: `npm run lint`
- Ensure all dependencies are installed
- Check Node.js version (18+ required)

## 📁 File Structure After Deployment

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
├── logo.png
├── phoksundo-lake.jpg
└── ... (other public assets)
```

## 🧪 Testing Your Deployment

### 1. Check All Pages Load:

- ✅ Home page: `/`
- ✅ Rooms: `/rooms/`
- ✅ Contact: `/contact/`
- ✅ Menu: `/menu/`
- ✅ Camping: `/camping/`

### 2. Test Functionality:

- ✅ Image galleries work
- ✅ WhatsApp links work
- ✅ Email links work
- ✅ Phone links work
- ✅ Booking modals open

### 3. Check Console for Errors:

- Open browser dev tools
- Look for JavaScript errors
- Check network requests
- Verify Supabase connection

## 🚨 Critical Files

### Must Include in Deployment:

- ✅ `.htaccess` (for Apache routing)
- ✅ All files from `out/` directory
- ✅ All images from `public/` folder
- ✅ Environment variables set

### Optional but Recommended:

- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `favicon.ico`

## 📞 Support

If you're still having issues:

1. **Check browser console** for JavaScript errors
2. **Verify environment variables** are set correctly
3. **Ensure all files** from `out` directory are uploaded
4. **Check server error logs** for detailed error messages
5. **Test locally** with `npx serve out` to verify build works

## 🎉 Success Indicators

Your deployment is successful when:

- ✅ All pages load without errors
- ✅ Images display correctly
- ✅ WhatsApp/Email/Phone links work
- ✅ Booking modals function properly
- ✅ No console errors
- ✅ Supabase connection works (if using database features)

## 📋 Quick Commands

```bash
# Build the project
npm run build

# Test locally
npx serve out

# Create deployment package
bash deploy-yeti-cloud.sh

# Check build output
ls -la out/
```
