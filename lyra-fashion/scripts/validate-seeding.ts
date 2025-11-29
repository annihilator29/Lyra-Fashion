/**
 * Seeding Validation Script for Lyra Fashion
 * Purpose: Validate seeding logic and provide execution instructions
 */

import { createClient } from '../src/lib/supabase/client';

interface ValidationResult {
  database_accessible: boolean;
  table_exists: boolean;
  seeding_ready: boolean;
  message: string;
}

async function validateSeeding(): Promise<ValidationResult> {
  const supabase = createClient();
  
  try {
    console.log('🔍 Validating database seeding setup...');

    // Test database connectivity
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116') {
        // Table doesn't exist
        return {
          database_accessible: true,
          table_exists: false,
          seeding_ready: false,
          message: 'Products table does not exist. Please run the initial migration first.'
        };
      }
      throw error;
    }

    // Check current product count
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    const currentCount = count || 0;

    return {
      database_accessible: true,
      table_exists: true,
      seeding_ready: true,
      message: `Database is accessible. Current products: ${currentCount}. Ready for seeding.`
    };

  } catch (error) {
    console.error('❌ Database validation failed:', error);
    return {
      database_accessible: false,
      table_exists: false,
      seeding_ready: false,
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

function printSeedingInstructions(): void {
  console.log(`
📋 SEEDING EXECUTION INSTRUCTIONS
=================================

Method 1: Using SQL Script (Recommended)
----------------------------------------
1. Access your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of 'supabase/seed.sql'
4. Execute the script
5. Verify with: SELECT COUNT(*) FROM products;

Method 2: Using TypeScript Script
----------------------------------
1. Ensure dependencies are installed:
   npm install

2. Run the seeding script:
   npx ts-node scripts/seed.ts

3. Or compile and run:
   npx tsc scripts/seed.ts --outDir dist
   node dist/seed.js

Method 3: Direct SQL Execution
------------------------------
1. Connect to your Supabase database
2. Execute the SQL from supabase/seed.sql

VERIFICATION QUERIES:
--------------------
-- Check total product count
SELECT COUNT(*) as total_products FROM products;

-- Check products by category
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;

-- Sample product with transparency data
SELECT name, category, price, 
       JSON_PRETTY(transparency_data) as transparency_breakdown
FROM products 
LIMIT 3;

-- Verify all required fields
SELECT 
  COUNT(*) as total,
  COUNT(name) as has_name,
  COUNT(slug) as has_slug,
  COUNT(price) as has_price,
  COUNT(category) as has_category,
  COUNT(images) as has_images,
  COUNT(transparency_data) as has_transparency
FROM products;
`);
}

async function main() {
  console.log('🚀 Lyra Fashion Seeding Validation');
  console.log('=====================================\n');

  const validation = await validateSeeding();
  
  console.log(`Database Accessible: ${validation.database_accessible ? '✅' : '❌'}`);
  console.log(`Products Table Exists: ${validation.table_exists ? '✅' : '❌'}`);
  console.log(`Seeding Ready: ${validation.seeding_ready ? '✅' : '❌'}`);
  console.log(`Status: ${validation.message}\n`);

  if (validation.database_accessible && validation.table_exists) {
    console.log('🎯 Seeding Status: READY');
    printSeedingInstructions();
  } else if (validation.database_accessible && !validation.table_exists) {
    console.log('⚠️  Action Required: Run migration first');
    console.log('   Execute: supabase migration up');
  } else {
    console.log('💥 Database connection issues detected');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { validateSeeding, type ValidationResult };