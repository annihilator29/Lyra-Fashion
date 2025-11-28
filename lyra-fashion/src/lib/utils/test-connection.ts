import { createClient } from '../supabase/client';

export async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test health endpoint first
    const healthResponse = await fetch('/api/health');
    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);
    
    // Test database connection
    const supabase = createClient();
    
    // Try to query products table (should be empty but successful)
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, slug')
      .limit(5);
    
    if (productsError) {
      throw new Error(`Products table query failed: ${productsError.message}`);
    }
    
    console.log('✅ Products table accessible:', products?.length || 0, 'products found');
    
    // Try to query profiles table (should be empty but successful)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .limit(5);
    
    if (profilesError) {
      throw new Error(`Profiles table query failed: ${profilesError.message}`);
    }
    
    console.log('✅ Profiles table accessible:', profiles?.length || 0, 'profiles found');
    
    return {
      success: true,
      healthCheck: healthData,
      productsCount: products?.length || 0,
      profilesCount: profiles?.length || 0
    };
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function runConnectionTest() {
  console.log('🚀 Starting database connection test...');
  const result = await testDatabaseConnection();
  
  if (result.success) {
    console.log('🎉 All connection tests passed!');
    console.log('📊 Results:', {
      healthStatus: result.healthCheck.status,
      productsAccessible: true,
      profilesAccessible: true,
      timestamp: result.healthCheck.timestamp
    });
  } else {
    console.error('💥 Connection test failed:', result.error);
  }
  
  return result;
}

// If this file is run directly (not imported)
if (typeof window === 'undefined' && require.main === module) {
  runConnectionTest().catch(console.error);
}