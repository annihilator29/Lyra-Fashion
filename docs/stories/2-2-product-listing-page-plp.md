# Story 2.2: Product Listing Page (PLP)

Status: ready-for-dev

## Story

As a User,
I want to browse a list of products,
so that I can see what items are available for purchase.

## Acceptance Criteria

1. A `/shop` page exists and displays a grid of products.
2. Products are fetched from Supabase using Server Components.
3. Each product card displays: Image, Name, Price, and Category.
4. The grid is responsive (1 column mobile, 2 tablet, 3-4 desktop).
5. Loading skeletons are shown while data is fetching.
6. Basic error handling (e.g., "Failed to load products") is implemented.

## Tasks / Subtasks

- [ ] Create Product Card Component. (AC: 3)
  - [ ] `src/components/product/product-card.tsx`
  - [ ] Use `next/image` for optimized images.
  - [ ] Display Name, Price (formatted), Category.
- [ ] Implement Data Fetching. (AC: 2)
  - [ ] Create `src/lib/api/products.ts` with `getProducts()`.
  - [ ] Use `supabase-js` to select `*` from `products`.
- [ ] Build PLP Page. (AC: 1, 4)
  - [ ] `src/app/shop/page.tsx`
  - [ ] Use CSS Grid for layout.
  - [ ] Map over products and render `ProductCard`.
- [ ] Add Loading State. (AC: 5)
  - [ ] Create `src/app/shop/loading.tsx` with skeleton cards.
- [ ] Add Error State. (AC: 6)
  - [ ] Create `src/app/shop/error.tsx`.

## Dev Notes

- **Architecture:**
  - Use **React Server Components (RSC)** for the page.
  - Fetch data directly in the component or via a lib helper.
  - **Styling:** Tailwind Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- **Performance:**
  - Ensure images are sized correctly (`sizes` prop in `next/image`).

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/epics.md#Story 2.2: Product Listing Page (PLP)]

## Dev Agent Record

### Context Reference

- docs/stories/2-2-product-listing-page-plp.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
