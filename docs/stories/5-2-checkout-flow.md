# Story 5.2: Checkout Flow

Status: ready-for-dev

## Story

As a Customer,
I want to complete my purchase,
so that I can receive my products.

## Acceptance Criteria

1. User can navigate to checkout from the cart.
2. User can enter shipping information (Name, Address, City, Zip, Country).
3. User sees an order summary (Items, Subtotal, Shipping Cost, Total) before payment.
4. User cannot proceed to payment without valid shipping info.
5. Checkout page is responsive and works on mobile.

## Tasks / Subtasks

- [ ] Task 1: Create Checkout Layout (AC: 1, 5)
  - [ ] Create `src/app/(shop)/checkout/layout.tsx` (optional, if distinct layout needed)
  - [ ] Create `src/app/(shop)/checkout/page.tsx`
  - [ ] Design responsive grid (Left: Forms, Right: Summary)
- [ ] Task 2: Create Shipping Form (AC: 2, 4)
  - [ ] Create `ShippingForm` component using `react-hook-form` and `zod`
  - [ ] Validate required fields
  - [ ] Persist state (optional: local storage or lift state to parent)
- [ ] Task 3: Create Order Summary Component (AC: 3)
  - [ ] Create `OrderSummary` component
  - [ ] Connect to `useCartStore` to display items and totals
  - [ ] Calculate dummy shipping cost (e.g., flat $10) for MVP
- [ ] Task 4: E2E Tests (AC: 1-4)
  - [ ] Test navigation to checkout
  - [ ] Test form validation
  - [ ] Test summary calculation

## Dev Notes

- **Architecture:** Client-side form handling first. Payment step will be added in Story 5.3.
- **State:** Use local state or a context for the checkout wizard steps.
- **UI:** `shadcn/ui` Form components.

### Project Structure Notes

- **Page:** `src/app/(shop)/checkout/page.tsx`
- **Components:** `src/components/checkout/shipping-form.tsx`, `src/components/checkout/order-summary.tsx`

### References

- [Source: docs/tech-spec-epic-5.md#Detailed Design]
- [Source: docs/epics.md#Story 5.2]

## Dev Agent Record

### Context Reference

- docs/stories/5-2-checkout-flow.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
