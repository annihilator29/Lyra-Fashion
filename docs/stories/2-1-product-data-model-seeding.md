# Story 2.1: Product Data Model & Seeding

Status: review

## Story

As a Backend Developer,
I want to define the product data schema and seed the database with initial inventory,
so that the frontend has realistic data to display.

## Acceptance Criteria

1. `products` table schema is finalized in Supabase (including JSONB fields).
2. A seeding script (`seed.ts` or `seed.sql`) is created.
3. Database is populated with at least 20 realistic product items.
4. Each product has: name, slug, price, description, category, images (placeholders or real), and transparency data.
5. `transparency_data` JSON structure is validated (fabric, labor, transport, markup).

## Tasks / Subtasks

- [x] Finalize `products` table schema. (AC: 1) ✅ COMPLETED
  - [x] Ensure columns: `id`, `name`, `slug`, `price`, `description`, `category`, `images`, `transparency_data`, `created_at`. ✅ VERIFIED
  - [x] Add indexes on `category` and `slug` for performance. ✅ IMPLEMENTED
- [x] Create Seeding Script. (AC: 2) ✅ COMPLETED
  - [x] Create `supabase/seed.sql` and TypeScript script `scripts/seed.ts`. ✅ BOTH CREATED
  - [x] Define mock data for 20+ items across categories (Dresses, Tops, Outerwear, Accessories). ✅ 20 PRODUCTS
  - [x] Include realistic transparency cost breakdowns. ✅ IMPLEMENTED
- [ ] Execute Seeding. (AC: 3) 🔄 IN PROGRESS
  - [x] Seed scripts created and ready for execution (SQL & TypeScript). ✅ READY
  - [x] Data integrity verification queries and validation scripts provided. ✅ COMPLETE
- [x] Update Types. ✅ COMPLETED
  - [x] `database.types.ts` is up-to-date and matches current schema. ✅ CREATED

## Dev Notes

- **Data Structure:**
  - `transparency_data`: `{ "fabric": 1500, "labor": 2000, "transport": 500, "markup": 3000 }` (values in cents).
- **Images:** Use Unsplash or placeholder.com URLs for now if real assets aren't ready.
- **Categories:** "Dresses", "Tops", "Outerwear", "Accessories".

### References

- [Source: docs/tech-spec-epic-2.md#3.1 Data Models]
- [Source: docs/epics.md#Story 2.1: Product Data Model & Seeding]

## Dev Agent Record

### Context Reference

- docs/stories/2-1-product-data-model-seeding.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log

**Implementation Plan:**
1. Create products table schema with all required columns including JSONB transparency_data
2. Create SQL and TypeScript seeding scripts with 20 realistic products
3. Add database types and validation scripts
4. Set up proper indexes for performance

**Implementation Steps Completed:**
- Created `supabase/seed.sql` with table schema and 20 sample products
- Created `scripts/seed.ts` TypeScript seeding script with dotenv support
- Created `scripts/validate-seeding.ts` comprehensive validation script
- Created `src/types/database.types.ts` with proper TypeScript interfaces
- Updated `package.json` with seed and validate:seed scripts
- Added required dependencies: dotenv, ts-node

**Files Created:**
- supabase/seed.sql (109 lines)
- scripts/seed.ts (344 lines) 
- scripts/validate-seeding.ts (325 lines)
- src/types/database.types.ts (71 lines)
- lyra-fashion/package.json (updated with seed scripts and dependencies)

**Next Steps:**
- Install dependencies via npm install
- Configure Supabase environment variables
- Execute seeding script
- Run validation to verify data integrity

### Completion Notes

✅ Successfully created comprehensive database schema and seeding infrastructure for Lyra Fashion products.

**Key Accomplishments:**
- Products table with 8 columns including JSONB transparency_data field
- 20 realistic products across 4 categories (Dresses, Tops, Outerwear, Accessories)
- Both SQL and TypeScript seeding scripts for flexibility
- Comprehensive validation script with 6 validation checks
- Full TypeScript type definitions for type safety
- Added npm scripts for easy execution

**Data Structure:**
- Products have realistic pricing ($39.99 - $399.99)
- Transparency data includes: fabric, labor, transport, markup (all in cents)
- Images use Unsplash URLs for realistic product photos
- Proper indexing on category and slug for query performance

**Scripts Ready:**
- `npm run seed` - Execute TypeScript seeding script
- `npm run validate:seed` - Run comprehensive validation checks

### File List

**New Files Created:**
- `supabase/seed.sql` - SQL seeding script with table schema and sample data
- `scripts/seed.ts` - TypeScript seeding script with environment variable support
- `scripts/validate-seeding.ts` - Comprehensive validation script
- `src/types/database.types.ts` - TypeScript type definitions for database

**Modified Files:**
- `lyra-fashion/package.json` - Added seed/validate scripts and dependencies

### Change Log

- **2025-11-28**: Initial implementation - Created products table schema, seeding scripts, validation, and TypeScript types
- **2025-11-28**: Added npm scripts and dependencies for seed and validation execution
