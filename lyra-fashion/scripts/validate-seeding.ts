/**
 * Lyra Fashion - Database Seeding Validation Script
 * Redeveloped: 2025-11-29
 * 
 * Comprehensive validation of product data seeding.
 * Runs 10+ checks to ensure data integrity and schema compliance.
 * 
 * Usage:
 *   npm run validate:seed
 * 
 * Prerequisites:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Products table must be seeded
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import type { Product, TransparencyData } from '../src/types/database.types';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Validation results tracking
interface ValidationResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: ValidationResult[] = [];

function addResult(name: string, passed: boolean, details: string) {
  results.push({ name, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}: ${details}`);
}

/**
 * Main validation function
 */
async function validateSeeding() {
  console.log('🔍 Validating Lyra Fashion Database Seeding\n');
  console.log('='.repeat(60));
  console.log('\n');

  try {
    // ==================== Test 1: Product Count ====================
    console.log('Test 1: Verifying product count...');
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      addResult('Product Count', false, `Error: ${countError.message}`);
    } else {
      const expected = 22;
      const passed = count === expected;
      addResult(
        'Product Count',
        passed,
        passed ? `${count} products found (expected ${expected})` : `Found ${count}, expected ${expected}`
      );
    }

    // ==================== Test 2: Required Fields ====================
    console.log('\nTest 2: Checking required fields...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError || !products) {
      addResult('Required Fields', false, `Error fetching products: ${productsError?.message}`);
    } else {
      const missingFields: string[] = [];

      products.forEach((product: Product) => {
        if (!product.name) missingFields.push(`${product.id}: missing name`);
        if (!product.slug) missingFields.push(`${product.id}: missing slug`);
        if (!product.price || product.price <= 0) missingFields.push(`${product.id}: invalid price`);
        if (!product.category) missingFields.push(`${product.id}: missing category`);
        if (!product.images || product.images.length === 0) missingFields.push(`${product.id}: missing images`);
      });

      const passed = missingFields.length === 0;
      addResult(
        'Required Fields',
        passed,
        passed ? 'All products have required fields' : `Issues: ${missingFields.join(', ')}`
      );
    }

    // ==================== Test 3: Price Type Validation ====================
    console.log('\nTest 3: Validating price types (must be INTEGER cents)...');
    if (products) {
      const invalidPrices: string[] = [];

      products.forEach((product: Product) => {
        // Check if price is an integer
        if (!Number.isInteger(product.price)) {
          invalidPrices.push(`${product.name}: ${product.price} (not an integer)`);
        }
        // Check if price is in reasonable cent range ($1.00 - $10,000.00)
        if (product.price < 100 || product.price > 1000000) {
          invalidPrices.push(`${product.name}: ${product.price} cents (out of range)`);
        }
      });

      const passed = invalidPrices.length === 0;
      addResult(
        'Price Type',
        passed,
        passed ? 'All prices are valid INTEGER cents' : `Issues: ${invalidPrices.join(', ')}`
      );
    }

    // ==================== Test 4: Slug Uniqueness ====================
    console.log('\nTest 4: Checking slug uniqueness...');
    if (products) {
      const slugs = products.map((p: Product) => p.slug);
      const uniqueSlugs = new Set(slugs);
      const passed = slugs.length === uniqueSlugs.size;

      addResult(
        'Slug Uniqueness',
        passed,
        passed ? 'All slugs are unique' : `${slugs.length - uniqueSlugs.size} duplicate slugs found`
      );
    }

    // ==================== Test 5: Category Distribution ====================
    console.log('\nTest 5: Analyzing category distribution...');
    if (products) {
      const categories = products.reduce((acc: Record<string, number>, product: Product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      const expectedCategories = ['Dresses', 'Tops', 'Outerwear', 'Accessories'];
      const allCategoriesPresent = expectedCategories.every(cat => categories[cat] > 0);

      addResult(
        'Category Distribution',
        allCategoriesPresent,
        `Found: ${Object.entries(categories).map(([cat, count]) => `${cat}(${count})`).join(', ')}`
      );
    }

    // ==================== Test 6: Image URLs ====================
    console.log('\nTest 6: Validating image URLs...');
    if (products) {
      const invalidImages: string[] = [];

      products.forEach((product: Product) => {
        product.images.forEach((url: string, index: number) => {
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            invalidImages.push(`${product.name}[${index}]: ${url}`);
          }
        });
      });

      const passed = invalidImages.length === 0;
      addResult(
        'Image URLs',
        passed,
        passed ? 'All image URLs are valid' : `Invalid URLs: ${invalidImages.join(', ')}`
      );
    }

    // ==================== Test 7: Transparency Data Structure ====================
    console.log('\nTest 7: Validating transparency data structure...');
    if (products) {
      const invalidTransparency: string[] = [];

      products.forEach((product: Product) => {
        const td = product.transparency_data;

        if (!td) {
          invalidTransparency.push(`${product.name}: missing transparency_data`);
        } else {
          if (typeof td.fabric !== 'number') invalidTransparency.push(`${product.name}: fabric not a number`);
          if (typeof td.labor !== 'number') invalidTransparency.push(`${product.name}: labor not a number`);
          if (typeof td.transport !== 'number') invalidTransparency.push(`${product.name}: transport not a number`);
          if (typeof td.markup !== 'number') invalidTransparency.push(`${product.name}: markup not a number`);
        }
      });

      const passed = invalidTransparency.length === 0;
      addResult(
        'Transparency Structure',
        passed,
        passed ? 'All transparency data has correct structure' : `Issues: ${invalidTransparency.slice(0, 3).join(', ')}`
      );
    }

    // ==================== Test 8: Transparency Data Sums ====================
    console.log('\nTest 8: Verifying transparency data sums match prices...');
    if (products) {
      const mismatchs: string[] = [];

      products.forEach((product: Product) => {
        const td = product.transparency_data;
        if (td) {
          const sum = td.fabric + td.labor + td.transport + td.markup;
          if (sum !== product.price) {
            mismatchs.push(`${product.name}: sum=${sum}, price=${product.price}, diff=${product.price - sum}`);
          }
        }
      });

      const passed = mismatchs.length === 0;
      addResult(
        'Transparency Sums',
        passed,
        passed ? 'All transparency data sums = product prices' : `Mismatches: ${mismatchs.slice(0, 3).join('; ')}`
      );
    }

    // ==================== Test 9: Price Range ====================
    console.log('\nTest 9: Checking price range...');
    if (products) {
      const prices = products.map((p: Product) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      const minDollars = (minPrice / 100).toFixed(2);
      const maxDollars = (maxPrice / 100).toFixed(2);

      addResult(
        'Price Range',
        true,
        `$${minDollars} - $${maxDollars}`
      );
    }

    // ==================== Test 10: Timestamps ====================
    console.log('\nTest 10: Validating timestamps...');
    if (products) {
      const invalidTimestamps: string[] = [];

      products.forEach((product: Product) => {
        const createdAt = new Date(product.created_at);
        const updatedAt = new Date(product.updated_at);

        if (isNaN(createdAt.getTime())) {
          invalidTimestamps.push(`${product.name}: invalid created_at`);
        }
        if (isNaN(updatedAt.getTime())) {
          invalidTimestamps.push(`${product.name}: invalid updated_at`);
        }
      });

      const passed = invalidTimestamps.length === 0;
      addResult(
        'Timestamps',
        passed,
        passed ? 'All timestamps are valid' : `Issues: ${invalidTimestamps.join(', ')}`
      );
    }

    // ==================== Summary ====================
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Validation Summary\n');

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    const total = results.length;

    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);

    if (failed === 0) {
      console.log('🎉 All validation tests passed! Database is ready for use.\n');
      process.exit(0);
    } else {
      console.log('⚠️ Some validation tests failed. Please review and fix issues.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Validation failed with error:', error);
    process.exit(1);
  }
}

// Run validation
validateSeeding();