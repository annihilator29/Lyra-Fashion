-- Create wishlists table
CREATE TABLE wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique index to prevent duplicate wishlist entries
CREATE UNIQUE INDEX idx_unique_wishlist_user_product ON wishlists (user_id, product_id);

-- Create indexes for performance
CREATE INDEX idx_wishlists_user_id ON wishlists (user_id);
CREATE INDEX idx_wishlists_product_id ON wishlists (product_id);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own wishlist items" ON wishlists
 FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" ON wishlists
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own wishlist" ON wishlists
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policy for update if needed
CREATE POLICY "Users can update their own wishlist" ON wishlists
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);