# Story 2.3: Product Filtering & Sorting

Status: ready-for-dev

## Story

As a Shopper,
I want to filter and sort products,
so that I can easily find items that match my preferences.

## Acceptance Criteria

1. Sidebar or top bar allows filtering by Category (e.g., Dresses, Tops).
2. Users can sort products by "Price: Low to High", "Price: High to Low", and "Newest".
3. Filter and Sort state is synchronized with the URL (e.g., `?category=dresses&sort=price_asc`).
4. Changing filters updates the product grid without a full page reload (Client-side navigation or Server Action).
5. "Clear All" button resets filters.
6. Mobile users have a collapsible filter drawer.

## Tasks / Subtasks

- [ ] Implement Filter UI. (AC: 1, 6)
  - [ ] Create `src/components/shop/filter-sidebar.tsx`.
  - [ ] Use `shadcn/ui` Accordion for categories.
  - [ ] Implement mobile drawer (Sheet component).
- [ ] Implement Sort UI. (AC: 2)
  - [ ] Create `src/components/shop/sort-dropdown.tsx`.
  - [ ] Use `shadcn/ui` Select component.
- [ ] Implement URL State Management. (AC: 3)
  - [ ] Use `nuqs` (or `useSearchParams` + `useRouter`) to manage state.
  - [ ] Ensure back button works correctly.
- [ ] Connect to Data Fetching. (AC: 4)
  - [ ] Update `getProducts` in `src/lib/api/products.ts` to accept filter/sort params.
  - [ ] Update `src/app/shop/page.tsx` to pass search params to `getProducts`.
- [ ] Add "Clear All" functionality. (AC: 5)

## Dev Notes

- **Architecture:**
  - **URL-Driven State:** This is critical for shareability and SEO.
  - **Server Components:** The page receives search params and fetches data.
  - **Client Components:** Filter/Sort UI updates the URL.
- **Libraries:**
  - `nuqs` (Next.js URL Query States) is recommended for type-safe search params.

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/epics.md#Story 2.3: Product Filtering & Sorting]

## Dev Agent Record

### Context Reference

- docs/stories/2-3-product-filtering-sorting.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
