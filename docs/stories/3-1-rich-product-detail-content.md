# Story 3.1: Rich Product Detail Content

Status: ready-for-dev

## Story

As a Shopper,
I want to see the "Craftsmanship Story" for a product,
so that I understand the value and quality.

## Acceptance Criteria

1. PDP includes a "Craftsmanship" or "Origin" section below the main product info.
2. This section displays data from the `craftsmanship_content` JSONB field.
3. Content includes: Origin Story, Material Details, and Artisan Note.
4. Layout uses high-quality imagery (e.g., split screen or parallax).
5. If no craftsmanship data exists, the section is hidden.
6. Images are optimized and lazy-loaded.

## Tasks / Subtasks

- [ ] Update Data Model. (AC: 2)
  - [ ] Add `craftsmanship_content` JSONB column to `products` table (via migration).
  - [ ] Update `seed.ts` to include mock craftsmanship stories.
- [ ] Create Craftsmanship Component. (AC: 1, 3, 4)
  - [ ] `src/components/product/craftsmanship-section.tsx`.
  - [ ] Design a layout that highlights text and images (e.g., 50/50 split).
- [ ] Integrate into PDP. (AC: 1, 5)
  - [ ] Update `src/app/shop/product/[slug]/page.tsx` to render the component.
  - [ ] Pass `product.craftsmanship_content` prop.
- [ ] Optimize Performance. (AC: 6)
  - [ ] Use `next/image` with proper sizing.

## Dev Notes

- **Data Structure:**
  ```json
  {
    "origin_story": "Hand-stitched in Milan...",
    "material_details": "100% Organic Cotton...",
    "artisan_note": "Crafted by Marco...",
    "images": ["/images/factory-1.jpg"]
  }
  ```
- **UX:** This section is about *emotion*. Use generous whitespace and elegant typography (Serif).

### References

- [Source: docs/tech-spec-epic-3.md#3.2 UI/UX Components]
- [Source: docs/epics.md#Story 3.1: Rich Product Detail Content]

## Dev Agent Record

### Context Reference

- docs/stories/3-1-rich-product-detail-content.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
