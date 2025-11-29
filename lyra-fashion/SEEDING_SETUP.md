# Product Seeding Setup Guide

## 🎯 Overview

This guide explains how to seed the Lyra Fashion products database with 22 high-quality products across 4 categories.

## 📋 Prerequisites

### 1. Supabase Configuration

You need the following environment variables in `lyra-fashion/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**To get these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the `URL` (for NEXT_PUBLIC_SUPABASE_URL)
4. Copy the `service_role` key (for SUPABASE_SERVICE_ROLE_KEY) - NOT the anon key!

### 2. Database Schema

Ensure migrations have been run:

```bash
cd lyra-fashion
npx supabase db push
```

The required schema is in `lyra-fashion/supabase/migrations/20251128_init_schema.sql`

## 🚀 Seeding Options

### Option 1: TypeScript Seeding (Recommended)

**Advantages:**
- Comprehensive validation
- Detailed error messages
- Progress reporting
- Environment variable checking

**Steps:**

```bash
cd lyra-fashion
npm run seed
```

Expected output:
```
🌱 Starting Lyra Fashion database seeding...

📋 Validating product data...
   ✅ 22 products validated

🗑️  Clearing existing products...
   ✅ Cleared 0 existing products

📦 Inserting 22 products...
   ✅ Successfully inserted 22 products

🔍 Running verification queries...

   📊 Total products: 22

   📦 Products by category:
      - Accessories: 6 products (avg: $62.67)
      - Dresses: 5 products (avg: $153.60)
      - Outerwear: 5 products (avg: $199.60)
      - Tops: 6 products (avg: $98.42)

   💰 Price range: $18.00 - $325.00

🎉 Database seeding completed successfully!
```

### Option 2: SQL Seeding

**Advantages:**
- Faster execution
- Direct database access
- Can be run from Supabase Dashboard

**Steps:**

1. Open Supabase Dashboard → SQL Editor
2. Copy contents from `lyra-fashion/supabase/seed.sql`
3. Paste and execute

OR via command line:

```bash
cd lyra-fashion
psql $DATABASE_URL < supabase/seed.sql
```

## ✅ Validation

After seeding, run the comprehensive validation script:

```bash
cd lyra-fashion
npm run validate:seed
```

### Validation Tests (10 total):

1. **Product Count**: Verifies exactly 22 products exist
2. **Required Fields**: Checks all products have name, slug, price, category, images
3. **Price Type**: Ensures prices are INTEGER cents (not DECIMAL)
4. **Slug Uniqueness**: Verifies all slugs are unique
5. **Category Distribution**: Confirms 4 categories with correct product counts
6. **Image URLs**: Validates all image URLs are properly formatted
7. **Transparency Structure**: Checks transparency_data JSONB structure
8. **Transparency Sums**: Verifies transparency costs sum to product price
9. **Price Range**: Analyzes price distribution
10. **Timestamps**: Validates created_at and updated_at fields

Expected output:
```
✅ Product Count: 22 products found (expected 22)
✅ Required Fields: All products have required fields
✅ Price Type: All prices are valid INTEGER cents
✅ Slug Uniqueness: All slugs are unique
✅ Category Distribution: Found: Dresses(5), Tops(6), Outerwear(5), Accessories(6)
✅ Image URLs: All image URLs are valid
✅ Transparency Structure: All transparency data has correct structure
✅ Transparency Sums: All transparency data sums = product prices
✅ Price Range: $18.00 - $325.00
✅ Timestamps: All timestamps are valid

📊 Validation Summary

Total Tests: 10
✅ Passed: 10
❌ Failed: 0
Success Rate: 100.0%

🎉 All validation tests passed! Database is ready for use.
```

## 📦 Product Data

### Categories & Count
- **Dresses**: 5 products ($89 - $285)
- **Tops**: 6 products ($45 - $245)
- **Outerwear**: 5 products ($112 - $325)
- **Accessories**: 6 products ($18 - $185)

### Key Features
- ✅ All prices in INTEGER cents (schema compliant)
- ✅ Comprehensive transparency data (fabric, labor, transport, markup)
- ✅ High-quality Unsplash images (800px)
- ✅ Realistic product descriptions with material certifications
- ✅ Proper indexing on category, slug, and price

## 🐛 Troubleshooting

### Error: Missing environment variables

```
❌ Missing required environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
```

**Solution**: Add the variables to `lyra-fashion/.env.local` file

### Error: Cannot find module '@supabase/supabase-js'

```bash
cd lyra-fashion
npm install
```

### Error: Transparency data mismatch

This indicates a potential bug in the seed data. The validation script will show which products have issues. This should NOT happen with the redeveloped seed data.

### Error: Connection refused

- Verify Supabase URL is correct
- Check if Supabase project is running
- Ensure service role key is valid (not anon key)

## 📝 Seed Data Details

### Price Format (CRITICAL!)
- **Schema**: INTEGER (cents)
- **Example**: Price $89.00 → stored as 8900
- **NOT**: DECIMAL like 89.99

### Transparency Data Structure
```json
{
  "fabric": 2800,     // cents
  "labor": 3200,      // cents
  "transport": 600,   // cents
  "markup": 2300      // cents
}
// Sum MUST equal product price in cents
```

## 🎓 TypeScript Types

The redeveloped `database.types.ts` includes:

**Interfaces:**
- `Product`, `ProductInsert`, `ProductUpdate`
- `Profile`, `ProfileInsert`, `ProfileUpdate`
- `TransparencyData`
- `Database` (complete schema)

**Utility Functions:**
- `centsToFormattedPrice(cents)` - Converts 8900 → "$89.00"
- `dollarsToCents(dollars)` - Converts 89.00 → 8900
- `validateTransparencyData(price, data)` - Validates sum = price
- `calculateTransparencyPercentages(data)` - Gets % breakdown
- `addFormattedPrice(product)` - Adds formatted price to product object

## ✨ Next Steps

After successful seeding:

1. Verify in Supabase Dashboard → Table Editor → products
2. Run a test query:
   ```sql
   SELECT name, price, category FROM products LIMIT 5;
   ```
3. Build product listing page (Story 2.2)
4. Implement filtering and search (Stories 2.3, 2.4)

## 📚 Related Documentation

- Epic 2 Tech Spec: `docs/tech-spec-epic-2.md`
- Story 2.1: `docs/stories/2-1-product-data-model-seeding.md`
- Database Schema: `lyra-fashion/supabase/migrations/20251128_init_schema.sql`
