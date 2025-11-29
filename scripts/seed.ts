// Lyra Fashion Database Seeding Script
// Generated: 2025-11-28

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  transparency_data: {
    fabric: number;
    labor: number;
    transport: number;
    markup: number;
  };
}

const products: Product[] = [
  // Dresses
  {
    name: 'Elegant Evening Dress',
    slug: 'elegant-evening-dress',
    description: 'A stunning evening dress perfect for special occasions',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 15000,
      labor: 8000,
      transport: 500,
      markup: 6700
    }
  },
  {
    name: 'Casual Summer Dress',
    slug: 'casual-summer-dress',
    description: 'Light and comfortable dress for everyday wear',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 4500,
      labor: 3000,
      transport: 300,
      markup: 1200
    }
  },
  {
    name: 'Business Professional Dress',
    slug: 'business-professional-dress',
    description: 'Sophisticated dress for professional settings',
    price: 159.99,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 8000,
      labor: 5000,
      transport: 400,
      markup: 3600
    }
  },
  {
    name: 'Maxi Flowy Dress',
    slug: 'maxi-flowy-dress',
    description: 'Long flowing dress with elegant drape',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 6000,
      labor: 4000,
      transport: 350,
      markup: 2650
    }
  },
  {
    name: 'Cocktail Party Dress',
    slug: 'cocktail-party-dress',
    description: 'Stylish dress for cocktails and parties',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8'
    ],
    category: 'Dresses',
    transparency_data: {
      fabric: 10000,
      labor: 6000,
      transport: 450,
      markup: 3550
    }
  },

  // Tops
  {
    name: 'Silk Blouse',
    slug: 'silk-blouse',
    description: 'Luxurious silk blouse with modern cut',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 6500,
      labor: 4000,
      transport: 400,
      markup: 2100
    }
  },
  {
    name: 'Cotton Button-Up',
    slug: 'cotton-button-up',
    description: 'Classic cotton button-up shirt',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 3500,
      labor: 2500,
      transport: 300,
      markup: 1700
    }
  },
  {
    name: 'Cropped Sweater',
    slug: 'cropped-sweater',
    description: 'Cozy cropped sweater for layering',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 4500,
      labor: 3000,
      transport: 300,
      markup: 1200
    }
  },
  {
    name: 'V-Neck Tee',
    slug: 'v-neck-tee',
    description: 'Comfortable V-neck t-shirt in premium cotton',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 2000,
      labor: 1500,
      transport: 250,
      markup: 1250
    }
  },
  {
    name: 'Off-Shoulder Top',
    slug: 'off-shoulder-top',
    description: 'Trendy off-shoulder top with elastic waist',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105'
    ],
    category: 'Tops',
    transparency_data: {
      fabric: 3000,
      labor: 2000,
      transport: 280,
      markup: 1720
    }
  },

  // Outerwear
  {
    name: 'Classic Blazer',
    slug: 'classic-blazer',
    description: 'Tailored blazer for professional and casual wear',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 9500,
      labor: 6000,
      transport: 500,
      markup: 3500
    }
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description: 'Timeless denim jacket with modern fit',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 6000,
      labor: 3500,
      transport: 400,
      markup: 2100
    }
  },
  {
    name: 'Wool Coat',
    slug: 'wool-coat',
    description: 'Elegant wool coat for cold weather',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 12500,
      labor: 7500,
      transport: 600,
      markup: 4350
    }
  },
  {
    name: 'Leather Jacket',
    slug: 'leather-jacket',
    description: 'Premium leather jacket with zip details',
    price: 399.99,
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 20000,
      labor: 12000,
      transport: 800,
      markup: 7200
    }
  },
  {
    name: 'Trench Coat',
    slug: 'trench-coat',
    description: 'Classic trench coat with belt and lapels',
    price: 229.99,
    images: [
      'https://images.unsplash.com/photo-1594226801341-65fb3b3faef8'
    ],
    category: 'Outerwear',
    transparency_data: {
      fabric: 11500,
      labor: 7000,
      transport: 550,
      markup: 4950
    }
  },

  // Accessories
  {
    name: 'Leather Handbag',
    slug: 'leather-handbag',
    description: 'Genuine leather handbag with multiple compartments',
    price: 179.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 9000,
      labor: 5500,
      transport: 450,
      markup: 3050
    }
  },
  {
    name: 'Silk Scarf',
    slug: 'silk-scarf',
    description: 'Luxurious silk scarf with artistic print',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 4000,
      labor: 2000,
      transport: 300,
      markup: 1700
    }
  },
  {
    name: 'Gold Pendant Necklace',
    slug: 'gold-pendant-necklace',
    description: 'Delicate gold necklace with pendant',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 7500,
      labor: 4000,
      transport: 400,
      markup: 3100
    }
  },
  {
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    description: 'Stylish sunglasses with UV protection',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 10000,
      labor: 6000,
      transport: 500,
      markup: 4000
    }
  },
  {
    name: 'Canvas Tote Bag',
    slug: 'canvas-tote-bag',
    description: 'Eco-friendly canvas tote with handles',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
    ],
    category: 'Accessories',
    transparency_data: {
      fabric: 1500,
      labor: 1000,
      transport: 200,
      markup: 1300
    }
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create products table
    const { error: createError } = await supabase.rpc('exec', {
      query: `
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

        CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
        CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
      `
    });

    if (createError) {
      console.error('❌ Error creating table:', createError.message);
      return;
    }

    console.log('✅ Products table created successfully');

    // Clear existing data
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.warn('⚠️ Warning: Could not clear existing data:', deleteError.message);
    }

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) {
      console.error('❌ Error inserting products:', error.message);
      return;
    }

    console.log(`✅ Successfully seeded ${data?.length || 0} products`);

    // Verify data
    const { data: countData, error: countError } = await supabase
      .from('products')
      .select('count', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 Total products in database: ${countData?.length || 0}`);
    }

    // Test queries
    const { data: categories } = await supabase
      .from('products')
      .select('category')
      .order('category');

    if (categories) {
      const uniqueCategories = [...new Set(categories.map(c => c.category))];
      console.log(`🏷️ Categories: ${uniqueCategories.join(', ')}`);
    }

    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run seeding
seedDatabase();