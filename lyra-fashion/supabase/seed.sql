-- Lyra Fashion Product Seeding Script
-- Redeveloped: 2025-11-29
-- Purpose: Populate products table with 20+ realistic items with proper schema alignment

-- Clear existing products
TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;

-- Insert 22 realistic products across 4 categories
-- Note: Prices are in CENTS (integer), transparency_data values are in CENTS
INSERT INTO public.products (name, slug, description, price, images, category, transparency_data) VALUES

-- DRESSES (5 products)
(
  'Organic Cotton Midi Dress',
  'organic-cotton-midi-dress',
  'A flowing midi dress crafted from 100% GOTS-certified organic cotton. Perfect for everyday elegance with breathable fabric and timeless design. Features a relaxed fit and side pockets.',
  8900, -- $89.00
  ARRAY[
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'
  ],
  'Dresses',
  '{"fabric": 2800, "labor": 3200, "transport": 600, "markup": 2300}'::jsonb
),
(
  'Linen Summer Dress',
  'linen-summer-dress',
  'Lightweight 100% French linen dress perfect for warm weather. Natural fibers breathe beautifully and the relaxed fit ensures all-day comfort. Adjustable tie waist.',
  12500, -- $125.00
  ARRAY[
    'https://images.unsplash.com/photo-1572804013427-57d4d1c35c0c?w=800',
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=800'
  ],
  'Dresses',
  '{"fabric": 4500, "labor": 3800, "transport": 700, "markup": 3500}'::jsonb
),
(
  'Silk Evening Gown',
  'silk-evening-gown',
  'Luxurious silk evening gown with elegant drape. Hand-finished details and premium peace silk fabric create a stunning silhouette. Fully lined.',
  28500, -- $285.00
  ARRAY[
    'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800',
    'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
  ],
  'Dresses',
  '{"fabric": 12000, "labor": 8900, "transport": 1200, "markup": 6400}'::jsonb
),
(
  'Wrap Dress with Belt',
  'wrap-dress-with-belt',
  'Versatile wrap dress in sustainable Tencel fabric that flatters every figure. Adjustable belt allows for customizable fit and the soft fabric drapes beautifully. Machine washable.',
  15200, -- $152.00
  ARRAY[
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800'
  ],
  'Dresses',
  '{"fabric": 5200, "labor": 4500, "transport": 800, "markup": 4700}'::jsonb
),
(
  ' Boho Maxi Dress',
  'boho-maxi-dress',
  'Bohemian-inspired maxi dress with intricate hand-block printed patterns. Perfect for summer festivals and casual elegance. Made from lightweight organic cotton voile.',
  9800, -- $98.00
  ARRAY[
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
  ],
  'Dresses',
  '{"fabric": 3600, "labor": 3400, "transport": 650, "markup": 2150}'::jsonb
),

-- TOPS (6 products  
(
  'Organic Cotton T-Shirt',
  'organic-cotton-t-shirt',
  'Basic essential tee made from 100% GOTS-certified organic cotton. Soft, breathable, and sustainably sourced. The perfect foundation piece with a relaxed fit.',
  4500, -- $45.00
  ARRAY[
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=800'
  ],
  'Tops',
  '{"fabric": 1800, "labor": 1200, "transport": 350, "markup": 1150}'::jsonb
),
(
  'Silk Blouse',
  'silk-blouse',
  'Elegant peace silk blouse with subtle sheen and classic collar. Professional yet feminine, perfect for office wear or special occasions. French seam construction.',
  16800, -- $168.00
  ARRAY[
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
  ],
  'Tops',
  '{"fabric": 7500, "labor": 4200, "transport": 800, "markup": 4300}'::jsonb
),
(
  'Linen Button-Up',
  'linen-button-up',
  'Classic linen shirt with button-up front and chest pocket. Natural fibers keep you cool while the structured design maintains a polished look. Available in natural and white.',
  9200, -- $92.00
  ARRAY[
    'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=800'
  ],
  'Tops',
  '{"fabric": 3800, "labor": 2800, "transport": 550, "markup": 2050}'::jsonb
),
(
  'Cashmere Sweater',
  'cashmere-sweater',
  'Luxurious 100% Mongolian cashmere sweater with incredible softness. Timeless cable knit pattern and premium yarn create lasting comfort. Fully fashioned construction.',
  24500, -- $245.00
  ARRAY[
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
  ],
  'Tops',
  '{"fabric": 11500, "labor": 6800, "transport": 900, "markup": 5300}'::jsonb
),
(
  'Organic Hemp Tank',
  'organic-hemp-tank',
  'Sustainable hemp tank top with natural moisture-wicking properties. Perfect for active lifestyles and eco-conscious fashion. Naturally antimicrobial.',
  6200, -- $62.00
  ARRAY[
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
  ],
  'Tops',
  '{"fabric": 2400, "labor": 1900, "transport": 450, "markup": 1450}'::jsonb
),
(
  'Bamboo Jersey Turtleneck',
  'bamboo-jersey-turtleneck',
  'Soft bamboo jersey turtleneck with exceptional drape. Temperature-regulating fabric keeps you comfortable year-round. Stretchy and breathable.',
  7800, -- $78.00
  ARRAY[
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
  ],
  'Tops',
  '{"fabric": 3100, "labor": 2300, "transport": 500, "markup": 1900}'::jsonb
),

-- OUTERWEAR (5 products)
(
  'Organic Cotton Cardigan',
  'organic-cotton-cardigan',
  'Cozy cardigan perfect for layering. Made from organic cotton with a relaxed fit and button-front closure. Ribbed cuffs and hem for added comfort.',
  11200, -- $112.00
  ARRAY[
    'https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=800'
  ],
  'Outerwear',
  '{"fabric": 4200, "labor": 3600, "transport": 700, "markup": 2700}'::jsonb
),
(
  'Wool Blend Coat',
  'wool-blend-coat',
  'Elegant wool blend coat with tailored silhouette. Classic design with modern sustainability through 50% recycled wool fibers. Double-breasted with notch lapels.',
  32500, -- $325.00
  ARRAY[
    'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800'
  ],
  'Outerwear',
  '{"fabric": 14500, "labor": 9200, "transport": 1400, "markup": 7400}'::jsonb
),
(
  'Recycled Denim Jacket',
  'recycled-denim-jacket',
  'Stylish denim jacket made from 80% recycled cotton denim. Durable construction with eco-friendly materials and classic styling. Adjustable waist tabs.',
  18900, -- $189.00
  ARRAY[
    'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
  ],
  'Outerwear',
  '{"fabric": 6800, "labor": 5600, "transport": 950, "markup": 4550}'::jsonb
),
(
  'Linen Utility Vest',
  'linen-utility-vest',
  'Practical linen vest with multiple cargo pockets. Perfect for transitional weather with natural temperature regulation. Relaxed fit with adjustable side ties.',
  13800, -- $138.00
  ARRAY[
    'https://images.unsplash.com/photo-1485968579580-b8f02a3ae446?w=800'
  ],
  'Outerwear',
  '{"fabric": 5100, "labor": 4200, "transport": 750, "markup": 2750}'::jsonb
),
(
  'Quilted Puffer Jacket',
  'quilted-puffer-jacket',
  'Warm puffer jacket with recycled synthetic insulation. Water-resistant outer shell and packable design. Filled with 100% recycled polyester fill.',
  22500, -- $225.00
  ARRAY[
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800'
  ],
  'Outerwear',
  '{"fabric": 9500, "labor": 6700, "transport": 1100, "markup": 5200}'::jsonb
),

-- ACCESSORIES (6 products)
(
  'Organic Cotton Tote Bag',
  'organic-cotton-tote-bag',
  'Spacious tote bag crafted from GOTS-certified organic cotton canvas. Durable construction with reinforced handles for everyday use. Unbleached natural color.',
  3500, -- $35.00
  ARRAY[
    'https://images.unsplash.com/photo-1593032457860-16fdc2e7e8b5?w=800'
  ],
  'Accessories',
  '{"fabric": 1200, "labor": 1100, "transport": 300, "markup": 900}'::jsonb
),
(
  'Handwoven Silk Scarf',
  'handwoven-silk-scarf',
  'Artisanal silk scarf with handwoven details by fair-trade artisans. Each piece is unique with beautiful draping and luxurious feel. Naturally dyed.',
  18500, -- $185.00
  ARRAY[
    'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
  ],
  'Accessories',
  '{"fabric": 8200, "labor": 5600, "transport": 800, "markup": 3900}'::jsonb
),
(
  'Sustainable Leather Belt',
  'sustainable-leather-belt',
  'Quality leather belt from vegetable-tanned, responsibly sourced hides. Classic design with brass hardware and adjustable sizing. Chrome-free tanning process.',
  8900, -- $89.00
  ARRAY[
    'https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=800'
  ],
  'Accessories',
  '{"fabric": 3800, "labor": 2500, "transport": 650, "markup": 1950}'::jsonb
),
(
  'Bamboo Sunglasses',
  'bamboo-sunglasses',
  'Eco-friendly sunglasses with bamboo frames and polarized lenses. UV400 protection with natural materials and lightweight comfort. Includes recycled case.',
  12900, -- $129.00
  ARRAY[
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
  ],
  'Accessories',
  '{"fabric": 4800, "labor": 4200, "transport": 750, "markup": 2150}'::jsonb
),
(
  'Recycled Fabric Headband',
  'recycled-fabric-headband',
  'Stylish headband made from upcycled fabric scraps. Elastic backing for comfortable fit with unique pattern combinations. Zero-waste production.',
  1800, -- $18.00
  ARRAY[
    'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800'
  ],
  'Accessories',
  '{"fabric": 600, "labor": 700, "transport": 200, "markup": 300}'::jsonb
),
(
  'Organic Cotton Socks Set',
  'organic-cotton-socks-set',
  'Comfortable 3-pair sock set made from organic cotton with a touch of elastane. Soft, breathable, and durable with reinforced heel and toe. Unisex sizing.',
  2400, -- $24.00
  ARRAY[
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
  ],
  'Accessories',
  '{"fabric": 900, "labor": 800, "transport": 250, "markup": 450}'::jsonb
);

-- Verification Queries
-- Total product count
SELECT COUNT(*) as total_products FROM public.products;

-- Products by category
SELECT 
  category, 
  COUNT(*) as product_count,
  ROUND(AVG(price)::numeric, 2) as avg_price_cents,
  ROUND((AVG(price) / 100.0)::numeric, 2) as avg_price_dollars
FROM public.products 
GROUP BY category 
ORDER BY category;

-- Sample transparency data verification
SELECT 
  name,
  category,
  price as price_cents,
  ROUND((price / 100.0)::numeric, 2) as price_dollars,
  transparency_data->>'fabric' as fabric_cost_cents,
  transparency_data->>'labor' as labor_cost_cents,
  transparency_data->>'transport' as transport_cost_cents,
  transparency_data->>'markup' as markup_cents
FROM public.products 
LIMIT 5;

-- Verify all products have required fields
SELECT 
  COUNT(*) FILTER (WHERE name IS NOT NULL) as has_name,
  COUNT(*) FILTER (WHERE slug IS NOT NULL) as has_slug,
  COUNT(*) FILTER (WHERE price > 0) as has_price,
  COUNT(*) FILTER (WHERE category IS NOT NULL) as has_category,
  COUNT(*) FILTER (WHERE array_length(images, 1) > 0) as has_images,
  COUNT(*) FILTER (WHERE transparency_data IS NOT NULL) as has_transparency_data,
  COUNT(*) as total
FROM public.products;