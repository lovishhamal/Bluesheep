# Making Itinerary Pages Dynamic - Instructions

## What Changed

All three itinerary pages are now **dynamic** - they fetch content from your `travel_guide` table instead of using static data.

## Database Setup

### Step 1: Update your `travel_guide` table entries

In your Supabase SQL Editor, run these UPDATE statements to set the category for existing entries:

```sql
-- Set category for Phoksundo guide (Updates rows with "Phoksundo" in title)
UPDATE travel_guide 
SET category = 'phoksundo' 
WHERE title ILIKE '%phoksundo%';

-- Set category for Dho Tarap guide (Updates rows with "Upper Dolpa", "Dho", or "Tarap" in title)
UPDATE travel_guide 
SET category = 'dho-tarap' 
WHERE title ILIKE '%upper%' OR title ILIKE '%dho%' OR title ILIKE '%tarap%';

-- Set category for Lower Dolpa guide (Updates rows with "Lower Dolpa" in title)
UPDATE travel_guide 
SET category = 'lower-dolpa' 
WHERE title ILIKE '%lower%';
```

### Step 2: Verify the categories

```sql
SELECT id, title, category, type, "order", price
FROM travel_guide 
WHERE type = 'list'
ORDER BY "order";
```

## How It Works

1. **Dynamic Content**: Each itinerary page now calls `getTravelGuideByCategory(category)` to fetch content from your database
2. **SEO Preserved**: All SEO metadata (keywords, descriptions, structured data) is still optimized
3. **Fallback**: If no guide is found in the database, the page shows a 404
4. **Revalidation**: Pages revalidate every hour (3600 seconds) to fetch fresh content

## Page Mappings

| URL | Category | Fetches From |
|-----|----------|--------------|
| `/itineraries/phoksundo/` | `phoksundo` | `travel_guide` where `category='phoksundo'` |
| `/itineraries/dho-tarap/` | `dho-tarap` | `travel_guide` where `category='dho-tarap'` |
| `/itineraries/lower-dolpa/` | `lower-dolpa` | `travel_guide` where `category='lower-dolpa'` |

## What You Need To Do

1. **Run the SQL updates** above in Supabase to set categories for your existing guide
2. **Verify** your Phoksundo guide has `category = 'phoksundo'`
3. **(Optional)** Create guides for Dho Tarap and Lower Dolpa if you haven't already:
   - Add new entries to `travel_guide` table
   - Set `type = 'list'`
   - Set `category = 'dho-tarap'` or `'lower-dolpa'`
   - Fill in title, description, price
4. **Deploy** your changes

## Creating New Itinerary Guides

To add a new itinerary guide to your database:

```sql
INSERT INTO travel_guide (
  title, 
  description, 
  price, 
  "order", 
  type, 
  category
) VALUES (
  'Trek to Dho Tarap - Upper Dolpa',
  '<h1>Your full HTML content here...</h1>',
  200000,
  2,
  'list',
  'dho-tarap'
);
```

The pages will automatically display your database content!

## Benefits

✅ **Easy Updates**: Edit content in Supabase - no code changes needed
✅ **Dynamic Pricing**: Update prices in database, reflects on site within 1 hour
✅ **Consistent**: Uses same content renderer as `/travel-guide/[slug]` pages
✅ **SEO Optimized**: All SEO features preserved (keywords, structured data)
✅ **Fallback Safe**: Shows 404 if guide not found
