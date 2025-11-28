import { createClient } from '../client';
import { createServerClient } from '../server';

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://tjxpguthipsmakvtavth.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeHBndXRoaXBzbWFrdnRhdnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzMxMjksImV4cCI6MjA3OTkwOTEyOX0.MwcMtikmuJwsvUIYziZDKXjlZKVGOe2fOY4X4SnhMEc'
};

describe('Supabase Client Utilities', () => {
  beforeAll(() => {
    // Setup environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = mockEnv.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = mockEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  describe('Browser Client (createClient)', () => {
    test('creates a browser client successfully', () => {
      const client = createClient();
      
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.from).toBeDefined();
    });

    test('client has correct configuration', () => {
      const client = createClient();
      
      // The client should be initialized with the correct URL and key
      expect(client.supabaseUrl).toBe(mockEnv.NEXT_PUBLIC_SUPABASE_URL);
    });
  });

  describe('Server Client (createServerClient)', () => {
    test('creates a server client successfully', async () => {
      // Mock cookies
      const mockCookies = {
        getAll: () => [],
        setAll: () => {}
      };
      
      // Mock next/headers
      jest.mock('next/headers', () => ({
        cookies: () => Promise.resolve(mockCookies)
      }));
      
      const client = await createClient();
      
      expect(client).toBeDefined();
      expect(client.auth).toBeDefined();
      expect(client.from).toBeDefined();
    });
  });

  describe('Database Types', () => {
    test('database types are properly defined', () => {
      // Import types to ensure they compile correctly
      const { Database, Profile, Product, ProductInsert } = require('@/types/database.types');
      
      expect(Database).toBeDefined();
      expect(Profile).toBeDefined();
      expect(Product).toBeDefined();
      expect(ProductInsert).toBeDefined();
      
      // Validate structure
      expect(Profile).toHaveProperty('id');
      expect(Profile).toHaveProperty('email');
      expect(Profile).toHaveProperty('full_name');
      expect(Profile).toHaveProperty('avatar_url');
      
      expect(Product).toHaveProperty('id');
      expect(Product).toHaveProperty('name');
      expect(Product).toHaveProperty('slug');
      expect(Product).toHaveProperty('price');
      expect(Product).toHaveProperty('category');
    });
  });

  describe('Schema Validation', () => {
    test('profiles table schema is correct', () => {
      const { Database } = require('@/types/database.types');
      
      const profilesTable = Database.public.Tables.profiles;
      
      expect(profilesTable).toBeDefined();
      expect(profilesTable.Row).toHaveProperty('id');
      expect(profilesTable.Row).toHaveProperty('email');
      expect(profilesTable.Row).toHaveProperty('full_name');
      expect(profilesTable.Row).toHaveProperty('avatar_url');
      expect(profilesTable.Row).toHaveProperty('created_at');
      expect(profilesTable.Row).toHaveProperty('updated_at');
    });

    test('products table schema is correct', () => {
      const { Database } = require('@/types/database.types');
      
      const productsTable = Database.public.Tables.products;
      
      expect(productsTable).toBeDefined();
      expect(productsTable.Row).toHaveProperty('id');
      expect(productsTable.Row).toHaveProperty('name');
      expect(productsTable.Row).toHaveProperty('slug');
      expect(productsTable.Row).toHaveProperty('description');
      expect(productsTable.Row).toHaveProperty('price');
      expect(productsTable.Row).toHaveProperty('images');
      expect(productsTable.Row).toHaveProperty('category');
      expect(productsTable.Row).toHaveProperty('transparency_data');
      expect(productsTable.Row).toHaveProperty('created_at');
      expect(productsTable.Row).toHaveProperty('updated_at');
    });
  });
});

describe('Connection Test Utility', () => {
  test('test-connection module can be imported', () => {
    expect(() => require('../utils/test-connection')).not.toThrow();
  });

  test('exported functions exist', () => {
    const { testDatabaseConnection, runConnectionTest } = require('../utils/test-connection');
    
    expect(typeof testDatabaseConnection).toBe('function');
    expect(typeof runConnectionTest).toBe('function');
  });
});