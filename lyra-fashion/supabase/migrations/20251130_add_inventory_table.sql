-- Create inventory table
-- Needed for Admin Dashboard story (7-1) to track low stock items metric
-- Date: 2025-11-30

CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER NOT NULL DEFAULT 0, -- Quantity reserved for pending orders
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add trigger for updated_at
CREATE TRIGGER handle_inventory_updated_at
    BEFORE UPDATE ON public.inventory
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inventory
-- Only authenticated users can access inventory data (for admin purposes)
CREATE POLICY "Authenticated users can view inventory" ON public.inventory
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage inventory" ON public.inventory
    FOR ALL TO authenticated USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON public.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_quantity ON public.inventory(quantity);