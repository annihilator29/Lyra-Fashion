-- Add craftsmanship_content JSONB column to products table
-- Migration: Story 3.1 - Rich Product Detail Content
-- Date: 2025-11-29

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS craftsmanship_content JSONB DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.products.craftsmanship_content IS 'Craftsmanship storytelling content with origin_story, material_details, artisan_note, and images array';
