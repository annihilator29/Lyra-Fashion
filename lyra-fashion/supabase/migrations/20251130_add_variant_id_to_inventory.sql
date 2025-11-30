-- Add variant_id column to inventory table for future variant-based inventory tracking
-- Date: 2025-11-30

-- Create product_variants table if it doesn't exist (as it's a dependency for the foreign key)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Size: M", "Color: Blue"
    sku TEXT UNIQUE,    -- Stock Keeping Unit for this variant
    price INTEGER,      -- Price override for this variant (in cents), NULL means use product price
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add trigger for updated_at
CREATE OR REPLACE TRIGGER handle_product_variants_updated_at
    BEFORE UPDATE ON public.product_variants
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Enable RLS on product_variants table
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON public.product_variants(sku);

-- Add the variant_id column as optional (nullable) to maintain backward compatibility
ALTER TABLE public.inventory
ADD COLUMN IF NOT EXISTS variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE;

-- Update RLS policies to ensure they work with the new column
-- Note: These policies already exist from the original inventory table creation,
-- but we're including them here as a reminder to ensure they still work properly