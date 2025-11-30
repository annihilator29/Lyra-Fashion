# Lyra Fashion - Product Seeding Guide

## Overview
This guide provides comprehensive instructions for seeding the Lyra Fashion product database with realistic data for development and testing.

## Generated Data
- **Total Products:** 20 realistic fashion items
- **Categories:** Dresses, Tops, Outerwear, Accessories
- **Data Quality:** Professional product names, descriptions, and pricing
- **Transparency Data:** Complete cost breakdown for each item

## Seeding Files Created

### 1. SQL Script (`supabase/seed.sql`)
```sql
-- Direct SQL execution file
-- Contains 20 INSERT statements with complete product data
-- Includes verification queries
```

**Usage:**
```bash
# Copy contents to Supabase SQL Editor and execute
# Or run via CLI if you have local Supabase setup
```

### 2. TypeScript Script (`scripts/seed.ts`)
```typescript
// Programmatic seeding with Supabase client
// Includes error handling and validation
// Provides detailed logging
```

**Usage:**
```bash
npx ts-node scripts/seed.ts
```

### 3. Validation Script (`scripts/validate-seeding.ts`)
```typescript
// Pre-seed validation and troubleshooting
// Database connectivity testing
// Execution instructions
```

**Usage:**
```bash
npx ts-node scripts/validate-seeding.ts
```

## Product Data Structure

Each product includes:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Product name |
| `slug` | TEXT | URL-friendly identifier |
| `description` | TEXT | Product description |
| `price` | INTEGER | Price in cents (e.g., 8900 = $89.00) |
| `images` | TEXT[] | Array of image URLs |
| `category` | TEXT | Product category |
| `transparency_data` | JSONB | Cost breakdown object |

### Transparency Data Structure
```json
{
  "fabric": 2800,     // Fabric cost in cents
  "labor": 3200,      // Labor cost in cents
  "transport": 600,   // Transport cost in cents
  "markup": 2300      // Business markup in cents
}
```

## Execution Methods

### Method 1: Supabase Dashboard (Recommended)
1. Log into your Supabase project
2. Navigate to **SQL Editor**
3. Open `supabase/seed.sql`
4. Copy all contents
5. Paste into SQL Editor
6. Click **Run** to execute
7. Verify success with the included queries

### Method 2: TypeScript Script
```bash
# Install dependencies if needed
npm install

# Run seeding script
npx ts-node scripts/seed.ts
```

### Method 3: Command Line (if using local Supabase)
```bash
# If you have Supabase CLI installed
supabase db reset
# Then run seed.sql manually
```

## Verification Steps

### 1. Count Check
```sql
SELECT COUNT(*) as total_products FROM products;
-- Expected: 20
```

### 2. Category Breakdown
```sql
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;
-- Expected: 4 categories with 5,5,4,6 products respectively
```

### 3. Data Integrity
```sql
SELECT name, category, price, 
       JSON_PRETTY(transparency_data) as transparency
FROM products 
LIMIT 3;
-- Verify all fields are populated correctly
```

### 4. Price Validation
```sql
SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price
FROM products;
-- Verify reasonable price range
```

## Product Categories & Counts

| Category | Products | Examples |
|----------|----------|----------|
| Dresses | 5 | Midi dress, evening gown, wrap dress |
| Tops | 5 | T-shirt, silk blouse, cashmere sweater |
| Outerwear | 4 | Cardigan, coat, denim jacket |
| Accessories | 6 | Tote bag, silk scarf, leather belt |

## Troubleshooting

### Common Issues

**Issue:** "relation products does not exist"
- **Solution:** Run the initial migration first
- **Command:** `supabase migration up`

**Issue:** "permission denied for table products"
- **Solution:** Check RLS policies and user permissions
- **Verify:** Run `SELECT * FROM products LIMIT 1;`

**Issue:** Images not loading
- **Solution:** URLs are from Unsplash - check internet connection
- **Alternative:** Replace with local image paths

**Issue:** TypeScript script fails to run
- **Solution:** Install dependencies
- **Command:** `npm install`

### Validation Commands

Run the validation script to check setup:
```bash
npx ts-node scripts/validate-seeding.ts
```

This will:
- ✅ Test database connectivity
- ✅ Verify products table exists
- ✅ Check current product count
- ✅ Provide specific troubleshooting steps

## Data Quality Features

### Realistic Product Names
- Professional fashion terminology
- Material-specific descriptors
- Style and fit variations

### Accurate Pricing
- Price ranges from $18-$325
- Reflects sustainable fashion premium
- Realistic cost structures

### Transparency Data
- Detailed cost breakdowns
- Fabric, labor, transport, markup components
- Educational value for customers

### Image Integration
- High-quality Unsplash images
- Consistent styling
- Professional product photography

## Post-Seeding Steps

1. **Verify Data:** Run verification queries
2. **Test Frontend:** Check product display
3. **Validate API:** Test product endpoints
4. **Review RLS:** Ensure proper access policies
5. **Update Types:** Regenerate TypeScript types if needed

## Next Steps After Seeding

1. **Frontend Integration:** Build product listing pages
2. **Search Implementation:** Add product search functionality
3. **Filter System:** Implement category and price filtering
4. **Product Details:** Create detailed product pages
5. **Cart Integration:** Enable product add-to-cart functionality

## Support

For issues with seeding:
1. Check the validation script output
2. Verify database connectivity
3. Review Supabase dashboard for error logs
4. Consult the troubleshooting section above

---

**Seeding Files Generated:** 2025-11-28T20:13:09.328Z
**Total Products:** 20
**Ready for Development:** ✅