/**
 * Lyra Fashion Database Seeding Script
 * Redeveloped: 2025-11-29
 * 
 * Seeds the products table with 22 realistic products across 4 categories.
 * Uses correct INTEGER pricing (cents) matching the database schema.
 * 
 * Usage:
 *   npm run seed
 * 
 * Prerequisites:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`DEBUG: Loading env from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('DEBUG: Error loading .env.local:', result.error);
} else {
  console.log('DEBUG: .env.local loaded successfully');
}

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log(`DEBUG: NEXT_PUBLIC_SUPABASE_URL found: ${!!supabaseUrl}`);
console.log(`DEBUG: SUPABASE_SERVICE_ROLE_KEY found: ${!!supabaseServiceKey}`);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Transparency cost breakdown interface
 * All values in CENTS (integer)
 */
interface TransparencyData {
  fabric: number;    // Fabric cost in cents
  labor: number;     // Labor cost in cents
  transport: number; // Transport cost in cents
  markup: number;    // Retail markup in cents
}

/**
 * Product interface matching database schema
 */
interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;                        // Price in CENTS (integer, not decimal!)
  images: string[];
  category: string;
  transparency_data: TransparencyData;
}

/**
 * Seed data: Products across categories
 * CRITICAL: Prices are in CENTS (e.g., 8900 = $89.00)
 */
const products: Product[] = [
  // ==================== DRESSES (5 products) ====================
  {
    name: 'Organic Cotton Midi Dress',
    slug: 'organic-cotton-midi-dress',
    description: 'A flowing midi dress crafted from 100% GOTS-certified organic cotton. Perfect for everyday elegance with breathable fabric and timeless design. Features a relaxed fit and side pockets.',
    price: 8900, // $89.00
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 2800,
      labor: 3200,
      transport: 600,
      markup: 2300
    }
  },
  {
    name: 'Linen Summer Dress',
    slug: 'linen-summer-dress',
    description: 'Lightweight 100% French linen dress perfect for warm weather. Natural fibers breathe beautifully and the relaxed fit ensures all-day comfort. Adjustable tie waist.',
    price: 12500, // $125.00
    images: [
      'https://images.unsplash.com/photo-1572804013427-57d4d1c35c0c?w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 4500,
      labor: 3800,
      transport: 700,
      markup: 3500
    }
  },
  {
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    description: 'Luxurious silk evening gown with elegant drape. Hand-finished details and premium peace silk fabric create a stunning silhouette. Fully lined.',
    price: 28500, // $285.00
    images: [
      'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800',
      'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 12000,
      labor: 8900,
      transport: 1200,
      markup: 6400
    }
  },
  {
    name: 'Wrap Dress with Belt',
    slug: 'wrap-dress-with-belt',
    description: 'Versatile wrap dress in sustainable Tencel fabric that flatters every figure. Adjustable belt allows for customizable fit and the soft fabric drapes beautifully. Machine washable.',
    price: 15200, // $152.00
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 5200,
      labor: 4500,
      transport: 800,
      markup: 4700
    }
  },
  {
    name: 'Boho Maxi Dress',
    slug: 'boho-maxi-dress',
    description: 'Bohemian-inspired maxi dress with intricate hand-block printed patterns. Perfect for summer festivals and casual elegance. Made from lightweight organic cotton voile.',
    price: 9800, // $98.00
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 3600,
      labor: 3400,
      transport: 650,
      markup: 2150
    }
  },

  // ==================== TOPS (6 products) ====================
  {
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    description: 'Basic essential tee made from 100% GOTS-certified organic cotton. Soft, breathable, and sustainably sourced. The perfect foundation piece with a relaxed fit.',
    price: 4500, // $45.00
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 1800,
      labor: 1200,
      transport: 350,
      markup: 1150
    }
  },
  {
    name: 'Silk Blouse',
    slug: 'silk-blouse',
    description: 'Elegant peace silk blouse with subtle sheen and classic collar. Professional yet feminine, perfect for office wear or special occasions. French seam construction.',
    price: 16800, // $168.00
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 7500,
      labor: 4200,
      transport: 800,
      markup: 4300
    }
  },
  {
    name: 'Linen Button-Up',
    slug: 'linen-button-up',
    description: 'Classic linen shirt with button-up front and chest pocket. Natural fibers keep you cool while the structured design maintains a polished look. Available in natural and white.',
    price: 9200, // $92.00
    images: [
      'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 3800,
      labor: 2800,
      transport: 550,
      markup: 2050
    }
  },
  {
    name: 'Cashmere Sweater',
    slug: 'cashmere-sweater',
    description: 'Luxurious 100% Mongolian cashmere sweater with incredible softness. Timeless cable knit pattern and premium yarn create lasting comfort. Fully fashioned construction.',
    price: 24500, // $245.00
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 11500,
      labor: 6800,
      transport: 900,
      markup: 5300
    }
  },
  {
    name: 'Organic Hemp Tank',
    slug: 'organic-hemp-tank',
    description: 'Sustainable hemp tank top with natural moisture-wicking properties. Perfect for active lifestyles and eco-conscious fashion. Naturally antimicrobial.',
    price: 6200, // $62.00
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 2400,
      labor: 1900,
      transport: 450,
      markup: 1450
    }
  },
  {
    name: 'Bamboo Jersey Turtleneck',
    slug: 'bamboo-jersey-turtleneck',
    description: 'Soft bamboo jersey turtleneck with exceptional drape. Temperature-regulating fabric keeps you comfortable year-round. Stretchy and breathable.',
    price: 7800, // $78.00
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 3100,
      labor: 2300,
      transport: 500,
      markup: 1900
    }
  },

  // ==================== OUTERWEAR (5 products) ====================
  {
    name: 'Organic Cotton Cardigan',
    slug: 'organic-cotton-cardigan',
    description: 'Cozy cardigan perfect for layering. Made from organic cotton with a relaxed fit and button-front closure. Ribbed cuffs and hem for added comfort.',
    price: 11200, // $112.00
    images: [
      'https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=800'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 4200,
      labor: 3600,
      transport: 700,
      markup: 2700
    }
  },
  {
    name: 'Wool Blend Coat',
    slug: 'wool-blend-coat',
    description: 'Elegant wool blend coat with tailored silhouette. Classic design with modern sustainability through 50% recycled wool fibers. Double-breasted with notch lapels.',
    price: 32500, // $325.00
    images: [
      'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 14500,
      labor: 9200,
      transport: 1400,
      markup: 7400
    }
  },
  {
    name: 'Recycled Denim Jacket',
    slug: 'recycled-denim-jacket',
    description: 'Stylish denim jacket made from 80% recycled cotton denim. Durable construction with eco-friendly materials and classic styling. Adjustable waist tabs.',
    price: 18900, // $189.00
    images: [
      'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 6800,
      labor: 5600,
      transport: 950,
      markup: 5550
    }
  },
  {
    name: 'Linen Utility Vest',
    slug: 'linen-utility-vest',
    description: 'Practical linen vest with multiple cargo pockets. Perfect for transitional weather with natural temperature regulation. Relaxed fit with adjustable side ties.',
    price: 13800, // $138.00
    images: [
      'https://images.unsplash.com/photo-1485968579580-b8f02a3ae446?w=800'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 5100,
      labor: 4200,
      transport: 750,
      markup: 3750
    }
  },
  {
    name: 'Quilted Puffer Jacket',
    slug: 'quilted-puffer-jacket',
    description: 'Warm puffer jacket with recycled synthetic insulation. Water-resistant outer shell and packable design. Filled with 100% recycled polyester fill.',
    price: 22500, // $225.00
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 9500,
      labor: 6700,
      transport: 1100,
      markup: 5200
    }
  },

  // ==================== ACCESSORIES (6 products) ====================
  {
    name: 'Organic Cotton Tote Bag',
    slug: 'organic-cotton-tote-bag',
    description: 'Spacious tote bag crafted from GOTS-certified organic cotton canvas. Durable construction with reinforced handles for everyday use. Unbleached natural color.',
    price: 3500, // $35.00
    images: [
      'https://images.unsplash.com/photo-1593032457860-16fdc2e7e8b5?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 1200,
      labor: 1100,
      transport: 300,
      markup: 900
    }
  },
  {
    name: 'Handwoven Silk Scarf',
    slug: 'handwoven-silk-scarf',
    description: 'Artisanal silk scarf with handwoven details by fair-trade artisans. Each piece is unique with beautiful draping and luxurious feel. Naturally dyed.',
    price: 18500, // $185.00
    images: [
      'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 8200,
      labor: 5600,
      transport: 800,
      markup: 3900
    }
  },
  {
    name: 'Sustainable Leather Belt',
    slug: 'sustainable-leather-belt',
    description: 'Quality leather belt from vegetable-tanned, responsibly sourced hides. Classic design with brass hardware and adjustable sizing. Chrome-free tanning process.',
    price: 8900, // $89.00
    images: [
      'https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 3800,
      labor: 2500,
      transport: 650,
      markup: 1950
    }
  },
  {
    name: 'Bamboo Sunglasses',
    slug: 'bamboo-sunglasses',
    description: 'Eco-friendly sunglasses with bamboo frames and polarized lenses. UV400 protection with natural materials and lightweight comfort. Includes recycled case.',
    price: 12900, // $129.00
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 4800,
      labor: 4200,
      transport: 750,
      markup: 3150
    }
  },
  {
    name: 'Recycled Fabric Headband',
    slug: 'recycled-fabric-headband',
    description: 'Stylish headband made from upcycled fabric scraps. Elastic backing for comfortable fit with unique pattern combinations. Zero-waste production.',
    price: 1800, // $18.00
    images: [
      'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 600,
      labor: 700,
      transport: 200,
      markup: 300
    }
  },
  {
    name: 'Organic Cotton Socks Set',
    slug: 'organic-cotton-socks-set',
    description: 'Comfortable 3-pair sock set made from organic cotton with a touch of elastane. Soft, breathable, and durable with reinforced heel and toe. Unisex sizing.',
    price: 2400, // $24.00
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 900,
      labor: 800,
      transport: 250,
      markup: 450
    }
  }
];

function validateTransparencyData(product: Product): boolean {
  const { fabric, labor, transport, markup } = product.transparency_data;
  const sum = fabric + labor + transport + markup;

  if (sum !== product.price) {
    console.warn(`⚠️ Warning: ${product.name} transparency data (${sum}) doesn't match price (${product.price})`);
    return false;
  }
  return true;
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting Lyra Fashion database seeding...\\n');

    // Validate all products
    console.log('📋 Validating product data...');
    let validCount = 0;
    let invalidCount = 0;

    products.forEach(product => {
      if (validateTransparencyData(product)) {
        validCount++;
      } else {
        invalidCount++;
      }
    });

    console.log(`   ✅ ${validCount} products validated`);
    if (invalidCount > 0) {
      console.log(`   ⚠️ ${invalidCount} products have transparency data mismatches`);
    }
    console.log('');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const { error: deleteError, count } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('❌ Error clearing products:', deleteError.message);
      throw deleteError;
    }
    console.log(`   ✅ Cleared ${count || 0} existing products\\n`);

    // Insert new products
    console.log(`📦 Inserting ${products.length} products...`);
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) {
      console.error('❌ Error inserting products:', error.message);
      throw error;
    }

    console.log(`   ✅ Successfully inserted ${data?.length || 0} products\\n`);

    // Verification queries
    console.log('🔍 Running verification queries...\\n');

    // Total count
    const { count: totalCount, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`   📊 Total products: ${totalCount}`);
    }

    // Category breakdown
    const { data: categoryData, error: categoryError } = await supabase
      .from('products')
      .select('category, price');

    if (!categoryError && categoryData) {
      const categories = categoryData.reduce((acc: Record<string, { count: number; totalPrice: number }>, product) => {
        if (!acc[product.category]) {
          acc[product.category] = { count: 0, totalPrice: 0 };
        }
        acc[product.category].count++;
        acc[product.category].totalPrice += product.price;
        return acc;
      }, {});

      console.log('\\n   📦 Products by category:');
      Object.entries(categories).forEach(([category, stats]) => {
        const avgPrice = (stats.totalPrice / stats.count / 100).toFixed(2);
        console.log(`      - ${category}: ${stats.count} products (avg: $${avgPrice})`);
      });
    }

    // Price range
    const { data: priceData, error: priceError } = await supabase
      .from('products')
      .select('price')
      .order('price', { ascending: true });

    if (!priceError && priceData && priceData.length > 0) {
      const minPrice = (priceData[0].price / 100).toFixed(2);
      const maxPrice = (priceData[priceData.length - 1].price / 100).toFixed(2);
      console.log(`\\n   💰 Price range: $${minPrice} - $${maxPrice}`);
    }

    console.log('\\n🎉 Database seeding completed successfully!\\n');

  } catch (error) {
    console.error('\\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Execute seeding
seedDatabase();