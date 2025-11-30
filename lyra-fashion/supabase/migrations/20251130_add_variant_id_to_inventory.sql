-- Add variant_id column to inventory table for future variant-based inventory tracking
-- Date: 2025-11-30

-- Add the variant_id column as optional (nullable) to maintain backward compatibility
ALTER TABLE public.inventory 
ADD COLUMN IF NOT EXISTS variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE;

-- Update RLS policies to ensure they work with the new column
-- Note: These policies already exist from the original inventory table creation,
-- but we're including them here as a reminder to ensure they still work properly

-- If product_variants table doesn't exist yet, we'll need to create it
-- For now, we're just adding the column as a reference point for future implementation