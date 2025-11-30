# Database Setup Instructions

## Overview

The database schema for Story 1-3 has been created and is ready to be applied to your Supabase project. The schema includes:

- **profiles** table (extends auth.users)
- **products** table (includes JSONB transparency_data)
- Row Level Security (RLS) policies
- Performance indexes

## How to Apply the Database Migration

### Option 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com/dashboard)
   - Navigate to your Lyra Fashion project

2. **Go to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Select "New query"

3. **Apply the Migration**
   - Copy the contents of `supabase/migrations/20251128_init_schema.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute the SQL

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
cd lyra-fashion
npx supabase db push
```

### Option 3: Manual Table Creation

If you prefer to create tables manually in the Dashboard:

1. Go to "Table Editor"
2. Create `profiles` table with these columns:
   - `id` (UUID, Primary Key, References auth.users.id)
   - `email` (Text)
   - `full_name` (Text)  
   - `avatar_url` (Text)
   - `created_at` (Timestamp with time zone, Default: now())
   - `updated_at` (Timestamp with time zone, Default: now())

3. Create `products` table with these columns:
   - `id` (UUID, Primary Key, Default: gen_random_uuid())
   - `name` (Text, Not Null)
   - `slug` (Text, Not Null, Unique)
   - `description` (Text)
   - `price` (Integer, Not Null)
   - `images` (Text Array)
   - `category` (Text, Not Null)
   - `transparency_data` (JSONB)
   - `created_at` (Timestamp with time zone, Default: now())
   - `updated_at` (Timestamp with time zone, Default: now())

4. **Enable RLS** on both tables in the Table Editor

## Verification Steps

After applying the migration:

1. **Check Tables Exist**
   - Go to "Table Editor" in Supabase Dashboard
   - Verify `profiles` and `products` tables are visible

2. **Test Health Endpoint**
   - Start your development server: `npm run dev`
   - Visit: `http://localhost:3000/api/health`
   - Should return: `{ "status": "ok", "timestamp": "...", "message": "Lyra Fashion API is healthy" }`

3. **Test Database Connection**
   - Import and run the test function:
   ```typescript
   import { runConnectionTest } from '@/lib/utils/test-connection';
   
   // Call in a React component or API route
   await runConnectionTest();
   ```

## RLS Policies Applied

### Profiles Table
- **View Policy:** Users can view their own profile
- **Update Policy:** Users can update their own profile  
- **Insert Policy:** Users can insert their own profile

### Products Table
- **View Policy:** Anyone can view products (public read)
- **Management Policy:** Authenticated users can manage products (admin)

## Files Created

- `supabase/migrations/20251128_init_schema.sql` - Complete database schema
- `src/lib/utils/test-connection.ts` - Connection testing utility
- `src/types/database.types.ts` - TypeScript type definitions

## Troubleshooting

**If tables don't appear:**
1. Check you're connected to the correct Supabase project
2. Ensure the SQL executed without errors
3. Refresh the Table Editor page

**If RLS policies block access:**
1. Check the policies are enabled in Table Editor > Policies
2. Ensure you're authenticated for profile operations

**If health endpoint fails:**
1. Verify `.env.local` has correct Supabase credentials
2. Check server logs for errors
3. Ensure port 3000 is available

## Support

If you encounter issues:
1. Check the validation report: `src/lib/utils/validation-report.md`
2. Review Supabase logs in the Dashboard
3. Verify environment variables are set correctly