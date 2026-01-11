-- Migration: Add category column to travel_guide table
-- Run this in your Supabase SQL Editor

-- Step 1: Add category column
ALTER TABLE travel_guide ADD COLUMN IF NOT EXISTS category TEXT;

-- Step 2: Update existing guides based on title patterns
-- Phoksundo guides
UPDATE travel_guide 
SET category = 'phoksundo' 
WHERE (title ILIKE '%phoksundo%' OR title ILIKE '%phoksundo lake%')
  AND category IS NULL;

-- Dho Tarap guides  
UPDATE travel_guide 
SET category = 'dho-tarap' 
WHERE (title ILIKE '%dho%' OR title ILIKE '%tarap%' OR title ILIKE '%dho tarap%')
  AND category IS NULL;

-- Lower Dolpa guides (if you have any)
UPDATE travel_guide 
SET category = 'lower-dolpa' 
WHERE (title ILIKE '%lower dolpa%' OR title ILIKE '%lower dolpo%')
  AND category IS NULL;

-- Step 3: Update the RPC function to include category in results
-- (The existing get_travel_guides function should automatically include the new column)

-- Verification query - check the results
SELECT id, title, category, type, order 
FROM travel_guide 
WHERE type = 'list'
ORDER BY order;
