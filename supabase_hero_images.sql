-- Run this in your Supabase SQL Editor to create the hero_images table

CREATE TABLE IF NOT EXISTS hero_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Enable Row Level Security (RLS)
-- ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to read active images
-- CREATE POLICY "Allow public read of active hero images" ON hero_images
--   FOR SELECT USING (active = true);

-- Create policy to allow authenticated admins to manage everything
-- CREATE POLICY "Allow admins to manage hero images" ON hero_images
--   FOR ALL USING (auth.role() = 'service_role');
