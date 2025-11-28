# Story 2.4: Product Search Implementation

Status: ready-for-dev

## Story

As a Shopper,
I want to search for products by name or description,
so that I can quickly find specific items.

## Acceptance Criteria

1. A search bar is available in the header or PLP.
2. Typing in the search bar updates the URL with a `?q=` query parameter.
3. The product grid filters to show only matching items.
4. Search is debounced (e.g., 300ms) to prevent excessive API calls.
5. "No results found" state is displayed if no items match.
6. Search works in combination with filters (e.g., "Red Dress").

## Tasks / Subtasks

- [ ] Implement Search Input Component. (AC: 1, 2, 4)
  - [ ] Create `src/components/shop/search-bar.tsx`.
  - [ ] Use `use-debounce` to handle input changes.
  - [ ] Update URL using `useRouter` or `nuqs`.
- [ ] Update Data Fetching Logic. (AC: 3, 6)
  - [ ] Update `getProducts` to accept a `query` parameter.
  - [ ] Use Supabase `ilike` or Full Text Search on `name` and `description`.
- [ ] Handle Empty States. (AC: 5)
  - [ ] Update `src/app/shop/page.tsx` to show a "No results" message if `products.length === 0`.
- [ ] Verify Mobile Responsiveness.
  - [ ] Ensure search bar is accessible on mobile (maybe hidden behind an icon).

## Dev Notes

- **Architecture:**
  - **Debouncing:** Crucial for performance.
  - **Supabase Search:** `ilike` is sufficient for MVP. Full Text Search (Postgres `tsvector`) is better for scale but might be overkill for < 100 items.
- **UX:**
  - Search should probably reset pagination (if implemented).

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/epics.md#Story 2.4: Product Search Implementation]

## Dev Agent Record

### Context Reference

- docs/stories/2-4-product-search-implementation.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
