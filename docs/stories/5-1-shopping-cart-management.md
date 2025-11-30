# Story 5.1: Shopping Cart Management

Status: done

## Story

As a Customer,
I want to manage my shopping cart,
so that I can review items before checkout.

## Acceptance Criteria

1. User can add items to the cart from the Product Detail Page.
2. User can view the cart page with a list of items, quantities, and total price.
3. User can increase or decrease the quantity of an item.
4. User can remove an item from the cart.
5. Cart state persists across page reloads (using local storage).
6. Cart icon in the header shows the current item count.

## Tasks / Subtasks

- [x] Task 1: Setup Zustand Store (AC: 1, 3, 4, 5)
  - [x] Install `zustand`
  - [x] Create `src/lib/store/cart.ts`
  - [x] Implement `addItem`, `removeItem`, `updateQuantity`, `clearCart` actions
  - [x] Configure persistence with `persist` middleware
- [x] Task 2: Create Add to Cart Component (AC: 1)
  - [x] Create `AddToCartButton` component
  - [x] Connect to store's `addItem`
  - [x] Handle variant selection (Size/Color)
- [x] Task 3: Create Cart Page (AC: 2, 3, 4)
  - [x] Create `src/app/(shop)/cart/page.tsx`
  - [x] Display cart items table/list
  - [x] Implement quantity controls (+/-)
  - [x] Implement remove button
  - [x] Display subtotal and total
- [x] Task 4: Update Header Cart Icon (AC: 6)
  - [x] Connect Header component to store
  - [x] Display badge with item count (handle hydration mismatch)
- [x] Task 5: Unit Tests (AC: 1-5)
  - [x] Test Zustand store logic (add, remove, update, persist)

## Dev Notes

- **Architecture:** Client-side state management using Zustand.
- **Persistence:** Use `persist` middleware to save to `localStorage`.
- **Hydration:** Be careful with Next.js hydration errors when reading from localStorage. Use a custom hook or `useEffect` to ensure component is mounted before rendering store data.
- **UI:** `shadcn/ui` Button, Table (for cart items).

### Project Structure Notes

- **Store:** `src/lib/store/cart.ts`
- **Page:** `src/app/(shop)/cart/page.tsx`
- **Components:** `src/components/shop/add-to-cart.tsx`, `src/components/shop/cart-summary.tsx`

### References

- [Source: docs/tech-spec-epic-5.md#Detailed Design]
- [Source: docs/architecture.md#State Management]

## Dev Agent Record

### Context Reference

- docs/stories/5-1-shopping-cart-management.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

- Implemented Zustand store with persistence for cart management.
- Created `AddToCart` component with variant selection.
- Updated `Header` to show cart icon with real-time item count.
- Created `CartPage` to manage cart items.
- Added comprehensive unit tests for the store.

### File List

- lyra-fashion/package.json
- lyra-fashion/src/lib/store/cart.ts
- lyra-fashion/src/components/shop/add-to-cart.tsx
- lyra-fashion/src/components/layout/header.tsx
- lyra-fashion/src/app/(shop)/cart/page.tsx
- lyra-fashion/tests/cart.test.ts
- lyra-fashion/src/app/layout.tsx
- lyra-fashion/jest.config.js
