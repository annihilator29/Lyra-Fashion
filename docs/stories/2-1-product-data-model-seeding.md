# Story 2.1: Product Data Model & Seeding

Status: ready-for-dev

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

- [ ] Finalize `products` table schema. (AC: 1)
  - [ ] Ensure columns: `id`, `name`, `slug`, `price`, `description`, `category`, `images`, `transparency_data`, `created_at`.
  - [ ] Add indexes on `category` and `slug` for performance.
- [ ] Create Seeding Script. (AC: 2)
  - [ ] Create `supabase/seed.sql` or a TypeScript script `scripts/seed.ts`.
  - [ ] Define mock data for 20+ items across categories (Dresses, Tops, Pants).
  - [ ] Include realistic transparency cost breakdowns.
- [ ] Execute Seeding. (AC: 3)
  - [ ] Run the seed script against the local/dev database.
  - [ ] Verify data integrity via Supabase Dashboard or SQL query.
- [ ] Update Types.
  - [ ] Regenerate `database.types.ts` if schema changed.

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
