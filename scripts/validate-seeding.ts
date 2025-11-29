// Lyra Fashion Database Seeding Validation Script
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

interface ValidationResult {
  passed: boolean;
  message: string;
  data?: any;
}

async function validateTableExists(): Promise<ValidationResult> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return {
        passed: false,
        message: `Table 'products' does not exist or is inaccessible: ${error.message}`
      };
    }

    return {
      passed: true,
      message: 'Products table exists and is accessible',
      data: data
    };
  } catch (error) {
    return {
      passed: false,
      message: `Error checking table existence: ${error}`
    };
  }
}

async function validateProductCount(): Promise<ValidationResult> {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (error) {
      return {
        passed: false,
        message: `Error querying products: ${error.message}`
      };
    }

    const expectedCount = 20;
    if (count === expectedCount) {
      return {
        passed: true,
        message: `✅ Product count correct: ${count}/${expectedCount}`,
        data: count
      };
    } else {
      return {
        passed: false,
        message: `❌ Product count mismatch: ${count}/${expectedCount}`,
        data: { actual: count, expected: expectedCount }
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Error validating product count: ${error}`
    };
  }
}

async function validateRequiredFields(): Promise<ValidationResult> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, price, category, transparency_data');

    if (error) {
      return {
        passed: false,
        message: `Error querying required fields: ${error.message}`
      };
    }

    if (!data || data.length === 0) {
      return {
        passed: false,
        message: 'No products found to validate'
      };
    }

    // Check first product for required fields
    const firstProduct = data[0];
    const requiredFields = ['id', 'name', 'slug', 'price', 'category', 'transparency_data'];
    const missingFields = requiredFields.filter(field => !(field in firstProduct) || firstProduct[field as keyof typeof firstProduct] === null);

    if (missingFields.length === 0) {
      return {
        passed: true,
        message: '✅ All required fields present in products',
        data: {
          totalProducts: data.length,
          sampleProduct: firstProduct
        }
      };
    } else {
      return {
        passed: false,
        message: `❌ Missing required fields: ${missingFields.join(', ')}`,
        data: { missingFields, sampleProduct: firstProduct }
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Error validating required fields: ${error}`
    };
  }
}

async function validateTransparencyData(): Promise<ValidationResult> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, transparency_data');

    if (error) {
      return {
        passed: false,
        message: `Error querying transparency data: ${error.message}`
      };
    }

    if (!data || data.length === 0) {
      return {
        passed: false,
        message: 'No products found to validate transparency data'
      };
    }

    const invalidTransparency = data.filter(product => {
      const td = product.transparency_data;
      return !td || 
             typeof td.fabric !== 'number' ||
             typeof td.labor !== 'number' ||
             typeof td.transport !== 'number' ||
             typeof td.markup !== 'number';
    });

    if (invalidTransparency.length === 0) {
      return {
        passed: true,
        message: '✅ All products have valid transparency_data structure',
        data: {
          validProducts: data.length,
          sampleTransparency: data[0].transparency_data
        }
      };
    } else {
      return {
        passed: false,
        message: `❌ ${invalidTransparency.length} products have invalid transparency_data`,
        data: { 
          invalidProducts: invalidTransparency.length,
          sampleInvalid: invalidTransparency[0]
        }
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Error validating transparency data: ${error}`
    };
  }
}

async function validateCategories(): Promise<ValidationResult> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category');

    if (error) {
      return {
        passed: false,
        message: `Error querying categories: ${error.message}`
      };
    }

    if (!data || data.length === 0) {
      return {
        passed: false,
        message: 'No products found to validate categories'
      };
    }

    const categories = [...new Set(data.map(item => item.category))];
    const expectedCategories = ['Dresses', 'Tops', 'Outerwear', 'Accessories'];

    const missingCategories = expectedCategories.filter(cat => !categories.includes(cat));
    const extraCategories = categories.filter(cat => !expectedCategories.includes(cat));

    if (missingCategories.length === 0 && extraCategories.length === 0) {
      return {
        passed: true,
        message: `✅ All expected categories present: ${categories.join(', ')}`,
        data: { categories }
      };
    } else {
      const issues = [];
      if (missingCategories.length > 0) {
        issues.push(`Missing: ${missingCategories.join(', ')}`);
      }
      if (extraCategories.length > 0) {
        issues.push(`Extra: ${extraCategories.join(', ')}`);
      }

      return {
        passed: false,
        message: `❌ Category validation issues: ${issues.join(' | ')}`,
        data: { categories, missingCategories, extraCategories }
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Error validating categories: ${error}`
    };
  }
}

async function validatePriceRanges(): Promise<ValidationResult> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('price')
      .order('price');

    if (error) {
      return {
        passed: false,
        message: `Error querying prices: ${error.message}`
      };
    }

    if (!data || data.length === 0) {
      return {
        passed: false,
        message: 'No products found to validate prices'
      };
    }

    const prices = data.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Check if prices are reasonable (between $1 and $1000)
    const unreasonablePrices = prices.filter(price => price < 1 || price > 1000);

    if (unreasonablePrices.length === 0) {
      return {
        passed: true,
        message: `✅ Price ranges are reasonable: $${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)} (avg: $${avgPrice.toFixed(2)})`,
        data: {
          minPrice,
          maxPrice,
          avgPrice,
          totalProducts: prices.length
        }
      };
    } else {
      return {
        passed: false,
        message: `❌ Found ${unreasonablePrices.length} products with unreasonable prices`,
        data: {
          unreasonablePrices,
          minPrice,
          maxPrice,
          avgPrice
        }
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Error validating price ranges: ${error}`
    };
  }
}

async function runAllValidations(): Promise<void> {
  console.log('🔍 Running database seeding validations...\n');

  const validations = [
    { name: 'Table Existence', fn: validateTableExists },
    { name: 'Product Count', fn: validateProductCount },
    { name: 'Required Fields', fn: validateRequiredFields },
    { name: 'Transparency Data', fn: validateTransparencyData },
    { name: 'Categories', fn: validateCategories },
    { name: 'Price Ranges', fn: validatePriceRanges }
  ];

  let passedCount = 0;
  let totalCount = validations.length;

  for (const validation of validations) {
    console.log(`\n📋 ${validation.name}:`);
    const result = await validation.fn();
    
    if (result.passed) {
      console.log(`✅ ${result.message}`);
      passedCount++;
    } else {
      console.log(`❌ ${result.message}`);
    }

    if (result.data) {
      console.log(`   Data:`, JSON.stringify(result.data, null, 2));
    }
  }

  console.log(`\n📊 Validation Summary: ${passedCount}/${totalCount} tests passed`);

  if (passedCount === totalCount) {
    console.log('🎉 All validations passed! Database seeding is successful.');
  } else {
    console.log('⚠️ Some validations failed. Please review the issues above.');
  }
}

// Run validations
runAllValidations();