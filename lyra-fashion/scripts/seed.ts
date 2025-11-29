/**
 * Product Seeding Script for Lyra Fashion
 * Generated: 2025-11-28T20:12:01.467Z
 * Purpose: Populate products table with 20+ realistic items using TypeScript
 */

import { createClient } from '../src/lib/supabase/client';

interface Product {
  name: string;
  slug: string;
  description: string;
  price: number; // in cents
  images: string[];
  category: string;
  transparency_data: {
    fabric: number;
    labor: number;
    transport: number;
    markup: number;
  };
}

interface SeedingResult {
  success: boolean;
  message: string;
  inserted_count?: number;
  error?: string;
}

async function seedProducts(): Promise<SeedingResult> {
  const supabase = createClient();
  
  try {
    console.log('🌱 Starting product seeding...');

    // Product data
    const products: Product[] = [
      // DRESSES
      {
        name: 'Organic Cotton Midi Dress',
        slug: 'organic-cotton-midi-dress',
        description: 'A flowing midi dress crafted from 100% organic cotton. Perfect for everyday elegance with breathable fabric and timeless design.',
        price: 8900,
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
        ],
        category: 'Dresses',
        transparency_data: { fabric: 2800, labor: 3200, transport: 600, markup: 2300 }
      },
      {
        name: 'Linen Summer Dress',
        slug: 'linen-summer-dress',
        description: 'Lightweight linen dress perfect for warm weather. Natural fibers breathe beautifully and the relaxed fit ensures all-day comfort.',
        price: 12500,
        images: [
          'https://images.unsplash.com/photo-1572804013427-57d4d1c35c0c?w=400',
          'https://images.unsplash.com/photo-1544441893-675973e31985?w=400'
        ],
        category: 'Dresses',
        transparency_data: { fabric: 4500, labor: 3800, transport: 700, markup: 3500 }
      },
      {
        name: 'Silk Evening Gown',
        slug: 'silk-evening-gown',
        description: 'Luxurious silk evening gown with elegant drape. Hand-finished details and premium silk fabric create a stunning silhouette.',
        price: 28500,
        images: [
          'https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400',
          'https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'
        ],
        category: 'Dresses',
        transparency_data: { fabric: 12000, labor: 8900, transport: 1200, markup: 6400 }
      },
      {
        name: 'Wrap Dress with Belt',
        slug: 'wrap-dress-with-belt',
        description: 'Versatile wrap dress that flatters every figure. Adjustable belt allows for customizable fit and the soft fabric drapes beautifully.',
        price: 15200,
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
          'https://images.unsplash.com/photo-1485968579580-b8f02a3ae446?w=400'
        ],
        category: 'Dresses',
        transparency_data: { fabric: 5200, labor: 4500, transport: 800, markup: 4700 }
      },
      {
        name: 'Boho Maxi Dress',
        slug: 'boho-maxi-dress',
        description: 'Bohemian-inspired maxi dress with intricate patterns. Perfect for summer festivals and casual elegance with flowing fabric.',
        price: 9800,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'],
        category: 'Dresses',
        transparency_data: { fabric: 3600, labor: 3400, transport: 650, markup: 2150 }
      },

      // TOPS
      {
        name: 'Organic Cotton T-Shirt',
        slug: 'organic-cotton-t-shirt',
        description: 'Basic essential tee made from organic cotton. Soft, breathable, and sustainably sourced. The perfect foundation piece.',
        price: 4500,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          'https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=400'
        ],
        category: 'Tops',
        transparency_data: { fabric: 1800, labor: 1200, transport: 350, markup: 1150 }
      },
      {
        name: 'Silk Blouse',
        slug: 'silk-blouse',
        description: 'Elegant silk blouse with subtle sheen. Professional yet feminine, perfect for office wear or special occasions.',
        price: 16800,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'],
        category: 'Tops',
        transparency_data: { fabric: 7500, labor: 4200, transport: 800, markup: 4300 }
      },
      {
        name: 'Linen Button-Up',
        slug: 'linen-button-up',
        description: 'Classic linen shirt with button-up front. Natural fibers keep you cool while the structured design maintains a polished look.',
        price: 9200,
        images: ['https://images.unsplash.com/photo-1503342394126-2b6b6ac5b9b4?w=400'],
        category: 'Tops',
        transparency_data: { fabric: 3800, labor: 2800, transport: 550, markup: 2050 }
      },
      {
        name: 'Cashmere Sweater',
        slug: 'cashmere-sweater',
        description: 'Luxurious cashmere sweater with incredible softness. Timeless cable knit pattern and premium yarn create lasting comfort.',
        price: 24500,
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'],
        category: 'Tops',
        transparency_data: { fabric: 11500, labor: 6800, transport: 900, markup: 5300 }
      },
      {
        name: 'Organic Hemp Tank',
        slug: 'organic-hemp-tank',
        description: 'Sustainable hemp tank top with natural moisture-wicking properties. Perfect for active lifestyles and eco-conscious fashion.',
        price: 6200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        category: 'Tops',
        transparency_data: { fabric: 2400, labor: 1900, transport: 450, markup: 1450 }
      },

      // OUTERWEAR
      {
        name: 'Organic Cotton Cardigan',
        slug: 'organic-cotton-cardigan',
        description: 'Cozy cardigan perfect for layering. Made from organic cotton with a relaxed fit and button-front closure.',
        price: 11200,
        images: ['https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=400'],
        category: 'Outerwear',
        transparency_data: { fabric: 4200, labor: 3600, transport: 700, markup: 2700 }
      },
      {
        name: 'Wool Blend Coat',
        slug: 'wool-blend-coat',
        description: 'Elegant wool blend coat with tailored silhouette. Classic design with modern sustainability through recycled wool fibers.',
        price: 32500,
        images: ['https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400'],
        category: 'Outerwear',
        transparency_data: { fabric: 14500, labor: 9200, transport: 1400, markup: 7400 }
      },
      {
        name: 'Recycled Denim Jacket',
        slug: 'recycled-denim-jacket',
        description: 'Stylish denim jacket made from recycled cotton denim. Durable construction with eco-friendly materials and classic styling.',
        price: 18900,
        images: ['https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'],
        category: 'Outerwear',
        transparency_data: { fabric: 6800, labor: 5600, transport: 950, markup: 4550 }
      },
      {
        name: 'Linen Utility Vest',
        slug: 'linen-utility-vest',
        description: 'Practical linen vest with multiple pockets. Perfect for transitional weather with natural temperature regulation.',
        price: 13800,
        images: ['https://images.unsplash.com/photo-1485968579580-b8f02a3ae446?w=400'],
        category: 'Outerwear',
        transparency_data: { fabric: 5100, labor: 4200, transport: 750, markup: 2750 }
      },

      // ACCESSORIES
      {
        name: 'Organic Cotton Tote Bag',
        slug: 'organic-cotton-tote-bag',
        description: 'Spacious tote bag crafted from organic cotton canvas. Durable construction with reinforced handles for everyday use.',
        price: 3500,
        images: ['https://images.unsplash.com/photo-1593032457860-16fdc2e7e6e8b5?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 1200, labor: 1100, transport: 300, markup: 900 }
      },
      {
        name: 'Handwoven Silk Scarf',
        slug: 'handwoven-silk-scarf',
        description: 'Artisanal silk scarf with handwoven details. Each piece is unique with beautiful draping and luxurious feel.',
        price: 18500,
        images: ['https://images.unsplash.com/photo-1585487000143-66d203d3e98e?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 8200, labor: 5600, transport: 800, markup: 3900 }
      },
      {
        name: 'Sustainable Leather Belt',
        slug: 'sustainable-leather-belt',
        description: 'Quality leather belt from responsibly sourced hides. Classic design with brass hardware and adjustable sizing.',
        price: 8900,
        images: ['https://images.unsplash.com/photo-1550904042-15b1d7e6e8b5?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 3800, labor: 2500, transport: 650, markup: 1950 }
      },
      {
        name: 'Bamboo Sunglasses',
        slug: 'bamboo-sunglasses',
        description: 'Eco-friendly sunglasses with bamboo frames. UV protection with natural materials and lightweight comfort.',
        price: 12900,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 4800, labor: 4200, transport: 750, markup: 2150 }
      },
      {
        name: 'Recycled Fabric Headband',
        slug: 'recycled-fabric-headband',
        description: 'Stylish headband made from recycled fabric scraps. Elastic backing for comfortable fit with unique pattern combinations.',
        price: 1800,
        images: ['https://images.unsplash.com/photo-1566479179817-c0a7bcf9e8b5?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 600, labor: 700, transport: 200, markup: 300 }
      },
      {
        name: 'Organic Cotton Socks Set',
        slug: 'organic-cotton-socks-set',
        description: 'Comfortable sock set made from organic cotton. Soft, breathable, and durable with reinforced heel and toe.',
        price: 2400,
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 900, labor: 800, transport: 250, markup: 450 }
      },
      {
        name: 'Linen Napkin Set',
        slug: 'linen-napkin-set',
        description: 'Set of four premium linen napkins. Natural fiber with beautiful drape and easy care. Perfect for sustainable table setting.',
        price: 3200,
        images: ['https://images.unsplash.com/photo-1593032457860-16fdc2e15b1d7e6e8b5?w=400'],
        category: 'Accessories',
        transparency_data: { fabric: 1400, labor: 1000, transport: 300, markup: 500 }
      }
    ];

    console.log(`📦 Inserting ${products.length} products...`);

    // Clear existing products
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      throw new Error(`Failed to clear existing products: ${deleteError.message}`);
    }

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) {
      throw new Error(`Failed to insert products: ${error.message}`);
    }

    const insertedCount = data?.length || 0;
    console.log(`✅ Successfully inserted ${insertedCount} products`);

    // Verify insertion
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Total products in database: ${count}`);

    // Show category breakdown
    const { data: categoryData } = await supabase
      .from('products')
      .select('category')
      .then(async (result) => {
        if (result.data) {
          const categoryCounts = result.data.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          console.log('📈 Products by category:');
          Object.entries(categoryCounts).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} products`);
          });
        }
        return result;
      });

    return {
      success: true,
      message: `Successfully seeded ${insertedCount} products`,
      inserted_count: insertedCount
    };

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    return {
      success: false,
      message: 'Seeding failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Lyra Fashion product seeding...');
  
  const result = await seedProducts();
  
  if (result.success) {
    console.log('🎉 Seeding completed successfully!');
    console.log(`✅ ${result.message}`);
  } else {
    console.log('💥 Seeding failed!');
    console.log(`❌ Error: ${result.error}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { seedProducts, type SeedingResult };