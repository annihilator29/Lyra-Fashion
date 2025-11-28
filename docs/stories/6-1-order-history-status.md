# Story 6.1: Order History & Status

Status: ready-for-dev

## Story

As a Customer,
I want to view my past orders and their current status,
so that I can track my purchases and review my history.

## Acceptance Criteria

1. User can navigate to `/account/orders` to see a list of all their orders.
2. The list displays Date, Order ID, Total Amount, and Current Status for each order.
3. Orders are sorted by date, with the most recent first.
4. User can click on an order to view its full details (items, shipping, payment).
5. Empty state is shown if the user has no orders.

## Tasks / Subtasks

- [ ] Task 1: Create Order Service (Server Actions) (AC: 1, 2, 3)
  - [ ] Implement `getOrders` server action (fetch from `orders` table with RLS)
  - [ ] Implement `getOrderDetails` server action (fetch `orders` + `order_items`)
- [ ] Task 2: Create Order History Page (AC: 1, 2, 3, 5)
  - [ ] Create `src/app/account/orders/page.tsx`
  - [ ] Create `OrderList` component
  - [ ] Create `OrderCard` component for individual items in the list
  - [ ] Handle empty state ("No orders found")
- [ ] Task 3: Create Order Details Page (AC: 4)
  - [ ] Create `src/app/account/orders/[id]/page.tsx`
  - [ ] Display shipping info, payment info, and item list
  - [ ] Show order summary (subtotal, shipping, total)
- [ ] Task 4: E2E Tests (AC: 1-5)
  - [ ] Test viewing order list with data
  - [ ] Test viewing order list without data
  - [ ] Test navigation to order details

## Dev Notes

- **Architecture:** Use Server Components for data fetching.
- **Security:** Ensure `getOrders` only returns data for `auth.uid()`.
- **UI:** Use `shadcn/ui` Card, Badge (for status), and Table components.

### Project Structure Notes

- **Page:** `src/app/account/orders/page.tsx`
- **Page:** `src/app/account/orders/[id]/page.tsx`
- **Service:** `src/app/actions/order.ts`

### References

- [Source: docs/tech-spec-epic-6.md#Detailed Design]
- [Source: docs/architecture.md#Data Architecture]

## Dev Agent Record

### Context Reference

- docs/stories/6-1-order-history-status.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
