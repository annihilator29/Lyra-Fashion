-- Lyra Fashion Products Table Schema
-- Generated: 2025-11-28

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    images TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    transparency_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);

-- Sample data seeding
INSERT INTO products (name, slug, description, price, images, category, transparency_data) VALUES
-- Dresses
('Elegant Evening Dress', 'elegant-evening-dress', 'A stunning evening dress perfect for special occasions', 299.99, 
 ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'], 
 'Dresses', 
 '{"fabric": 15000, "labor": 8000, "transport": 500, "markup": 6700}'::jsonb),

('Casual Summer Dress', 'casual-summer-dress', 'Light and comfortable dress for everyday wear', 89.99,
 ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'],
 'Dresses',
 '{"fabric": 4500, "labor": 3000, "transport": 300, "markup": 1200}'::jsonb),

('Business Professional Dress', 'business-professional-dress', 'Sophisticated dress for professional settings', 159.99,
 ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8'],
 'Dresses',
 '{"fabric": 8000, "labor": 5000, "transport": 400, "markup": 3600}'::jsonb),

('Maxi Flowy Dress', 'maxi-flowy-dress', 'Long flowing dress with elegant drape', 129.99,
 ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'],
 'Dresses',
 '{"fabric": 6000, "labor": 4000, "transport": 350, "markup": 2650}'::jsonb),

('Cocktail Party Dress', 'cocktail-party-dress', 'Stylish dress for cocktails and parties', 199.99,
 ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8'],
 'Dresses',
 '{"fabric": 10000, "labor": 6000, "transport": 450, "markup": 3550}'::jsonb),

-- Tops
('Silk Blouse', 'silk-blouse', 'Luxurious silk blouse with modern cut', 129.99,
 ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
 'Tops',
 '{"fabric": 6500, "labor": 4000, "transport": 400, "markup": 2100}'::jsonb),

('Cotton Button-Up', 'cotton-button-up', 'Classic cotton button-up shirt', 79.99,
 ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
 'Tops',
 '{"fabric": 3500, "labor": 2500, "transport": 300, "markup": 1700}'::jsonb),

('Cropped Sweater', 'cropped-sweater', 'Cozy cropped sweater for layering', 89.99,
 ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105'],
 'Tops',
 '{"fabric": 4500, "labor": 3000, "transport": 300, "markup": 1200}'::jsonb),

('V-Neck Tee', 'v-neck-tee', 'Comfortable V-neck t-shirt in premium cotton', 49.99,
 ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
 'Tops',
 '{"fabric": 2000, "labor": 1500, "transport": 250, "markup": 1250}'::jsonb),

('Off-Shoulder Top', 'off-shoulder-top', 'Trendy off-shoulder top with elastic waist', 69.99,
 ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105'],
 'Tops',
 '{"fabric": 3000, "labor": 2000, "transport": 280, "markup": 1720}'::jsonb),

-- Outerwear
('Classic Blazer', 'classic-blazer', 'Tailored blazer for professional and casual wear', 189.99,
 ARRAY['https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'],
 'Outerwear',
 '{"fabric": 9500, "labor": 6000, "transport": 500, "markup": 3500}'::jsonb),

('Denim Jacket', 'denim-jacket', 'Timeless denim jacket with modern fit', 119.99,
 ARRAY['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f'],
 'Outerwear',
 '{"fabric": 6000, "labor": 3500, "transport": 400, "markup": 2100}'::jsonb),

('Wool Coat', 'wool-coat', 'Elegant wool coat for cold weather', 249.99,
 ARRAY['https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'],
 'Outerwear',
 '{"fabric": 12500, "labor": 7500, "transport": 600, "markup": 4350}'::jsonb),

('Leather Jacket', 'leather-jacket', 'Premium leather jacket with zip details', 399.99,
 ARRAY['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f'],
 'Outerwear',
 '{"fabric": 20000, "labor": 12000, "transport": 800, "markup": 7200}'::jsonb),

('Trench Coat', 'trench-coat', 'Classic trench coat with belt and lapels', 229.99,
 ARRAY['https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'],
 'Outerwear',
 '{"fabric": 11500, "labor": 7000, "transport": 550, "markup": 4950}'::jsonb),

-- Accessories
('Leather Handbag', 'leather-handbag', 'Genuine leather handbag with multiple compartments', 179.99,
 ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62'],
 'Accessories',
 '{"fabric": 9000, "labor": 5500, "transport": 450, "markup": 3050}'::jsonb),

('Silk Scarf', 'silk-scarf', 'Luxurious silk scarf with artistic print', 79.99,
 ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26'],
 'Accessories',
 '{"fabric": 4000, "labor": 2000, "transport": 300, "markup": 1700}'::jsonb),

('Gold Pendant Necklace', 'gold-pendant-necklace', 'Delicate gold necklace with pendant', 149.99,
 ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'],
 'Accessories',
 '{"fabric": 7500, "labor": 4000, "transport": 400, "markup": 3100}'::jsonb),

('Designer Sunglasses', 'designer-sunglasses', 'Stylish sunglasses with UV protection', 199.99,
 ARRAY['https://images.unsplash.com/photo-1511499767150-a48a237f0083'],
 'Accessories',
 '{"fabric": 10000, "labor": 6000, "transport": 500, "markup": 4000}'::jsonb),

('Canvas Tote Bag', 'canvas-tote-bag', 'Eco-friendly canvas tote with handles', 39.99,
 ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62'],
 'Accessories',
 '{"fabric": 1500, "labor": 1000, "transport": 200, "markup": 1300}'::jsonb);

-- Verify data
SELECT COUNT(*) as total_products, 
       COUNT(DISTINCT category) as total_categories,
       MIN(price) as min_price,
       MAX(price) as max_price
FROM products;