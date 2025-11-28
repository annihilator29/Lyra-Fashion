# Story 2.5: Product Detail Page (PDP) - Core Info

Status: ready-for-dev

## Story

As a Shopper,
I want to view detailed information about a specific product,
so that I can make an informed purchase decision.

## Acceptance Criteria

1. A PDP exists at `/shop/product/[slug]`.
2. The page displays: Product Name, Price, Description, Images, and Category.
3. The page displays the "Transparency Module" (Cost Breakdown) using the JSONB data.
4. Users can select Size and Color (UI only for now, no cart yet).
5. "Add to Bag" button exists (can be disabled or show a toast for now).
6. SEO metadata (Title, Description) is dynamically generated from product data.

## Tasks / Subtasks

- [ ] Create PDP Layout. (AC: 1, 2)
  - [ ] `src/app/shop/product/[slug]/page.tsx`.
  - [ ] Fetch product by slug using `getProductBySlug`.
  - [ ] Handle 404 if product not found.
- [ ] Implement Product Gallery. (AC: 2)
  - [ ] Create `src/components/product/product-gallery.tsx`.
  - [ ] Display main image and thumbnails.
- [ ] Implement Product Info Section. (AC: 2, 4, 5)
  - [ ] Display Name, Price, Description.
  - [ ] Create `src/components/product/variant-selector.tsx` (Size/Color).
  - [ ] Add "Add to Bag" button.
- [ ] Implement Transparency Module. (AC: 3)
  - [ ] Create `src/components/product/transparency-card.tsx`.
  - [ ] Visualize `transparency_data` (Fabric, Labor, Transport, Markup).
- [ ] Add SEO Metadata. (AC: 6)
  - [ ] Use `generateMetadata` in `page.tsx`.

## Dev Notes

- **Architecture:**
  - **Server Components:** Fetch data on the server.
  - **Client Components:** Gallery (interactive), Variant Selector (state), Transparency Card (interactive tooltip?).
- **Transparency Module:**
  - This is a key differentiator. Make it look premium.
  - Data: `{ fabric: 1500, labor: 2000, ... }` -> Display as "$15.00", "$20.00".

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/ux-design-specification.md#2.4 Novel UX Patterns]
- [Source: docs/epics.md#Story 2.5: Product Detail Page (PDP) - Core Info]

## Dev Agent Record

### Context Reference

- docs/stories/2-5-product-detail-page-pdp-core-info.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
