# SEO Setup Guide for Hotel Blue Sheep Inn

## ✅ What Has Been Configured

### 1. **Metadata & Keywords**

- Added "bluesheep", "hotel blue sheep", "best hotel in dunai", "best hotel in phoksundo", "hotel in dunai", "hotel in phoksundo" and all variations
- Optimized page titles to include key search terms
- Enhanced descriptions with target keywords

### 2. **Structured Data (JSON-LD)**

- **Hotel Schema**: Complete with alternate names including "Bluesheep", "bluesheep", "Blue Sheep Hotel", etc.
- **Organization Schema**: Added for brand recognition
- **LocalBusiness Schema**: Added for local SEO optimization
- All schemas include:
  - Multiple alternate names for brand recognition
  - Complete address and geo-coordinates
  - Phone number
  - Restaurant and camping information

### 3. **Robots.txt**

- Configured to allow all search engines to crawl your site
- Sitemap URL included: `https://hotelbluesheepinn.com/sitemap.xml`

### 4. **Sitemap.xml**

- All main pages included with proper priorities
- Homepage: Priority 1.0
- Rooms: Priority 0.9
- Menu & Camping: Priority 0.8
- Contact: Priority 0.6

## 🚀 Next Steps for Google Visibility

### 1. **Google Search Console Setup** (CRITICAL)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://hotelbluesheepinn.com`
3. Verify ownership using one of these methods:
   - **HTML tag method** (Recommended):
     - Copy the verification code from Google Search Console
     - Update `src/app/layout.tsx` line 156: Replace `"your-google-verification-code"` with your actual code
   - **DNS method**: Add a TXT record to your domain
   - **HTML file upload**: Upload the provided HTML file to your site root

### 2. **Submit Your Sitemap**

1. In Google Search Console, go to "Sitemaps"
2. Submit: `https://hotelbluesheepinn.com/sitemap.xml`
3. Google will start crawling your site

### 3. **Request Indexing** (After Verification)

1. In Google Search Console, use "URL Inspection" tool
2. Enter your homepage URL: `https://hotelbluesheepinn.com`
3. Click "Request Indexing"
4. Repeat for key pages: `/rooms`, `/menu`, `/camping`, `/contact`

### 4. **Google Business Profile** (For Local SEO)

1. Create/claim your Google Business Profile at [Google Business](https://business.google.com)
2. Use the exact business name: "Hotel Blue Sheep Inn"
3. Add alternate names: "Bluesheep", "Blue Sheep Hotel", etc.
4. Add complete address, phone number, and business hours
5. Add photos and get reviews

### 5. **Content Optimization Tips**

- Ensure your homepage has visible text mentioning "bluesheep", "best hotel in dunai", "best hotel in phoksundo"
- Add these keywords naturally in page content (not just metadata)
- Get backlinks from local directories and travel websites
- Encourage customer reviews on Google

### 6. **Monitor & Improve**

- Check Google Search Console weekly for:
  - Search queries people use to find you
  - Click-through rates
  - Indexing status
- Update content regularly to keep it fresh
- Monitor your rankings for target keywords

## ⏱️ Timeline Expectations

- **Initial Indexing**: 1-7 days after submitting sitemap
- **Ranking Improvements**: 2-4 weeks for new content
- **Full SEO Impact**: 3-6 months for competitive keywords

## 📝 Important Notes

1. **Google Verification Code**: You MUST update the verification code in `src/app/layout.tsx` after getting it from Google Search Console
2. **Consistency**: Use the same business name and information across all platforms (Google Business, website, social media)
3. **Patience**: SEO takes time. Don't expect immediate results, but the setup is now optimized for long-term success

## 🔍 Testing Your SEO

After deployment, test your structured data:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

Test your sitemap:

- Visit: `https://hotelbluesheepinn.com/sitemap.xml`
- Should show all your pages in XML format

Test robots.txt:

- Visit: `https://hotelbluesheepinn.com/robots.txt`
- Should show your sitemap URL
