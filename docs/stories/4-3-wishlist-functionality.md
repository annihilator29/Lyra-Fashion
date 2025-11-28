# Story 4.3: Wishlist Functionality

Status: ready-for-dev

## Story

As a Customer,
I want to save items to a wishlist,
so that I can purchase them later.

## Acceptance Criteria

1. Authenticated user can add a product to their wishlist from the Product Detail Page.
2. Authenticated user can remove a product from their wishlist.
3. User can view a list of all wishlisted items on the `/account/wishlist` page.
4. Wishlist items link correctly to their respective Product Detail Pages.
5. Duplicate items cannot be added (handled by DB constraint and UI check).

## Tasks / Subtasks

- [ ] Task 1: Create Wishlist Service (Server Actions) (AC: 1, 2)
  - [ ] Implement `addToWishlist` server action
  - [ ] Implement `removeFromWishlist` server action
  - [ ] Implement `getWishlist` server action
  - [ ] Create `wishlists` table with RLS policies
- [ ] Task 2: Add Wishlist Button to Product Detail Page (AC: 1, 5)
  - [ ] Create WishlistButton component
  - [ ] Implement optimistic UI updates
  - [ ] Handle duplicate prevention (check before adding)
  - [ ] Show appropriate icon (filled/outlined heart)
- [ ] Task 3: Create Wishlist Page (AC: 3, 4)
  - [ ] Create `src/app/account/wishlist/page.tsx`
  - [ ] Fetch wishlist data using `getWishlist`
  - [ ] Display wishlisted products with images and details
  - [ ] Link to Product Detail Pages
- [ ] Task 4: E2E Tests (AC: 1-5)
  - [ ] Write Playwright test for add to wishlist
  - [ ] Write test for remove from wishlist
  - [ ] Write test for viewing wishlist page
  - [ ] Write test for preventing duplicates

## Dev Notes

- **Architecture:** Server Actions for mutations, optimistic UI for better UX.
- **Database:** `wishlists` table with unique constraint on (user_id, product_id).
- **UI:** Use Lucide's Heart icon (filled vs. outlined states).
- **Security:** RLS ensures users only access their own wishlist items.

### Project Structure Notes

- **Service:** `src/app/actions/wishlist.ts`
- **Component:** `src/components/shop/wishlist-button.tsx`
- **Page:** `src/app/account/wishlist/page.tsx`

### References

- [Source: docs/tech-spec-epic-4.md#Detailed Design]
- [Source: docs/architecture.md#Data Architecture]
- [Source: docs/epics.md#Story 4.3]

## Dev Agent Record

### Context Reference

- docs/stories/4-3-wishlist-functionality.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
