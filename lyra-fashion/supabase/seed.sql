-- Product Seeding Script for Lyra Fashion
-- Generated: 2025-11-28T20:11:29.646Z
-- Purpose: Populate products table with 20+ realistic items

-- Clear existing products (if any)
DELETE FROM public.products;

-- Insert realistic product data
INSERT INTO public.products (name, slug, description, price, images, category, transparency_data) VALUES

-- DRESSES
('Organic Cotton Midi Dress', 'organic-cotton-midi-dress', 'A flowing midi dress crafted from 100% organic cotton. Perfect for everyday elegance with breathable fabric and timeless design.', 8900, ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'], 'Dresses', '{"fabric": 2800, "labor": 3200, "transport": 600, "markup": 2300}'),

('Linen Summer Dress', 'linen-summer-dress', 'Lightweight linen dress perfect for warm weather. Natural fibers breathe beautifully and the relaxed fit ensures all-day comfort.', 12500, ARRAY['https://images.unsplash.com/photo-1572804013427-57d4d1c35c0c?w=400', 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400'], 'Dresses', '{"fabric": 4500, "labor": 3800, "transport": 700, "markup": 3500}'),

('Silk Evening Gown', 'silk-evening-gown', 'Luxurious silk evening gown with elegant drape. Hand-finished details and premium silk fabric create a stunning silhouette.', 28500, ARRAY['https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400', 'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'], 'Dresses', '{"fabric": 12000, "labor": 8900, "transport": 1200, "markup": 6400}'),

('Wrap Dress with Belt', 'wrap-dress-with-belt', 'Versatile wrap dress that flatters every figure. Adjustable belt allows for customizable fit and the soft fabric drapes beautifully.', 15200, ARRAY['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400'], 'Dresses', '{"fabric": 5200, "labor": 4500, "transport": 800, "markup": 4700}'),

('Boho Maxi Dress', 'boho-maxi-dress', 'Bohemian-inspired maxi dress with intricate patterns. Perfect for summer festivals and casual elegance with flowing fabric.', 9800, ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'], 'Dresses', '{"fabric": 3600, "labor": 3400, "transport": 650, "markup": 2150}'),

-- TOPS
('Organic Cotton T-Shirt', 'organic-cotton-t-shirt', 'Basic essential tee made from organic cotton. Soft, breathable, and sustainably sourced. The perfect foundation piece.', 4500, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=400'], 'Tops', '{"fabric": 1800, "labor": 1200, "transport": 350, "markup": 1150}'),

('Silk Blouse', 'silk-blouse', 'Elegant silk blouse with subtle sheen. Professional yet feminine, perfect for office wear or special occasions.', 16800, ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'], 'Tops', '{"fabric": 7500, "labor": 4200, "transport": 800, "markup": 4300}'),

('Linen Button-Up', 'linen-button-up', 'Classic linen shirt with button-up front. Natural fibers keep you cool while the structured design maintains a polished look.', 9200, ARRAY['https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=400'], 'Tops', '{"fabric": 3800, "labor": 2800, "transport": 550, "markup": 2050}'),

('Cashmere Sweater', 'cashmere-sweater', 'Luxurious cashmere sweater with incredible softness. Timeless cable knit pattern and premium yarn create lasting comfort.', 24500, ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'], 'Tops', '{"fabric": 11500, "labor": 6800, "transport": 900, "markup": 5300}'),

('Organic Hemp Tank', 'organic-hemp-tank', 'Sustainable hemp tank top with natural moisture-wicking properties. Perfect for active lifestyles and eco-conscious fashion.', 6200, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], 'Tops', '{"fabric": 2400, "labor": 1900, "transport": 450, "markup": 1450}'),

-- OUTERWEAR
('Organic Cotton Cardigan', 'organic-cotton-cardigan', 'Cozy cardigan perfect for layering. Made from organic cotton with a relaxed fit and button-front closure.', 11200, ARRAY['https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=400'], 'Outerwear', '{"fabric": 4200, "labor": 3600, "transport": 700, "markup": 2700}'),

('Wool Blend Coat', 'wool-blend-coat', 'Elegant wool blend coat with tailored silhouette. Classic design with modern sustainability through recycled wool fibers.', 32500, ARRAY['https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400'], 'Outerwear', '{"fabric": 14500, "labor": 9200, "transport": 1400, "markup": 7400}'),

('Recycled Denim Jacket', 'recycled-denim-jacket', 'Stylish denim jacket made from recycled cotton denim. Durable construction with eco-friendly materials and classic styling.', 18900, ARRAY['https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'], 'Outerwear', '{"fabric": 6800, "labor": 5600, "transport": 950, "markup": 4550}'),

('Linen Utility Vest', 'linen-utility-vest', 'Practical linen vest with multiple pockets. Perfect for transitional weather with natural temperature regulation.', 13800, ARRAY['https://images.unsplash.com/photo-1485968579580-b8f02a3ae446?w=400'], 'Outerwear', '{"fabric": 5100, "labor": 4200, "transport": 750, "markup": 2750}'),

-- ACCESSORIES
('Organic Cotton Tote Bag', 'organic-cotton-tote-bag', 'Spacious tote bag crafted from organic cotton canvas. Durable construction with reinforced handles for everyday use.', 3500, ARRAY['https://images.unsplash.com/photo-1593032457860-16fdc2e7e8b5?w=400'], 'Accessories', '{"fabric": 1200, "labor": 1100, "transport": 300, "markup": 900}'),

('Handwoven Silk Scarf', 'handwoven-silk-scarf', 'Artisanal silk scarf with handwoven details. Each piece is unique with beautiful draping and luxurious feel.', 18500, ARRAY['https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'], 'Accessories', '{"fabric": 8200, "labor": 5600, "transport": 800, "markup": 3900}'),

('Sustainable Leather Belt', 'sustainable-leather-belt', 'Quality leather belt from responsibly sourced hides. Classic design with brass hardware and adjustable sizing.', 8900, ARRAY['https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=400'], 'Accessories', '{"fabric": 3800, "labor": 2500, "transport": 650, "markup": 1950}'),

('Bamboo Sunglasses', 'bamboo-sunglasses', 'Eco-friendly sunglasses with bamboo frames. UV protection with natural materials and lightweight comfort.', 12900, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], 'Accessories', '{"fabric": 4800, "labor": 4200, "transport": 750, "markup": 2150}'),

('Recycled Fabric Headband', 'recycled-fabric-headband', 'Stylish headband made from recycled fabric scraps. Elastic backing for comfortable fit with unique pattern combinations.', 1800, ARRAY['https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400'], 'Accessories', '{"fabric": 600, "labor": 700, "transport": 200, "markup": 300}'),

('Organic Cotton Socks Set', 'organic-cotton-socks-set', 'Comfortable sock set made from organic cotton. Soft, breathable, and durable with reinforced heel and toe.', 2400, ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'], 'Accessories', '{"fabric": 900, "labor": 800, "transport": 250, "markup": 450}'),

('Linen Napkin Set', 'linen-napkin-set', 'Set of four premium linen napkins. Natural fiber with beautiful drape and easy care. Perfect for sustainable table setting.', 3200, ARRAY['https://images.unsplash.com/photo-1593032457860-16fdc2e15b1d7e6e8b5?w=400'], 'Accessories', '{"fabric": 1400, "labor": 1000, "transport": 300, "markup": 500}');

-- Verify the insertion
SELECT COUNT(*) as total_products FROM public.products;

-- Show product breakdown by category
SELECT category, COUNT(*) as product_count, AVG(price) as avg_price 
FROM public.products 
GROUP BY category 
ORDER BY category;

-- Sample data verification
SELECT name, category, price, JSON_PRETTY(transparency_data) as transparency 
FROM public.products 
LIMIT 3;