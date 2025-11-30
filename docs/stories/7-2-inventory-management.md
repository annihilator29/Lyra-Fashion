# Story 7.2: Inventory Management

Status: review

## Story

As an Admin,
I want to manage product inventory levels,
so that I can ensure stock accuracy and prevent overselling.

## Acceptance Criteria

1. Admin can view a paginated list of all products and their variants with current stock levels.
2. Admin can manually update the stock quantity for a specific product variant.
3. Items with stock below the low stock threshold (default 5) are visually highlighted (e.g., red badge).
4. Stock updates are reflected immediately in the admin view and customer-facing product pages.
5. Only users with 'admin' role can access the inventory management page and perform updates.

## Tasks / Subtasks

- [x] Task 1: Database & Service Layer (AC: 1, 2, 4)
  - [x] Create `inventory` table in Supabase (if not already created in 7.1 or earlier) with `product_id`, `variant_id`, `quantity`, `low_stock_threshold`.
  - [x] Implement `InventoryService` with methods: `getInventoryList`, `updateStock`.
  - [x] Create Server Action `updateInventoryAction(id, quantity)` with admin role check.
- [x] Task 2: Inventory List UI (AC: 1, 3, 5)
  - [x] Create `src/app/admin/inventory/page.tsx`.
  - [x] Implement data table using `tanstack/react-table` (or shadcn `Table`) to display products.
  - [x] Add columns: Product Name, Variant (Size/Color), SKU (if avail), Current Stock, Status.
  - [x] Implement visual highlighting for low stock items (quantity < threshold).
- [x] Task 3: Stock Update Interaction (AC: 2, 4)
  - [x] Create `StockUpdateDialog` or inline edit component.
  - [x] Connect update form to `updateInventoryAction`.
  - [x] Implement toast notification on success/error.
- [x] Task 4: E2E Tests (AC: 1-5)
  - [x] Test admin access to inventory page.
  - [x] Test updating stock and verifying the new value persists.
  - [x] Verify low stock indicator appears when quantity is low.

## Dev Notes

- **Data Model:** The `inventory` table should link to `products` and `product_variants`. If `product_variants` doesn't exist yet, link directly to `products` for MVP, but plan for variants.
- **Optimistic UI:** Consider using `useOptimistic` for stock updates to make the admin interface feel snappy.
- **Concurrency:** For MVP, last-write-wins is acceptable. Future iterations might need optimistic locking.

### Project Structure Notes

- **Page:** `src/app/admin/inventory/page.tsx`
- **Service:** `src/services/admin/inventory-service.ts`
- **Component:** `src/components/admin/inventory-table.tsx`

### References

- [Source: docs/tech-spec-epic-7.md#Detailed Design]
- [Source: docs/stories/7-1-admin-dashboard.md]

## Dev Agent Record

### Context Reference

- docs/stories/7-2-inventory-management.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List

- `src/services/admin/inventory-service.ts`
- `src/app/actions/admin.ts` (updated)
- `src/app/admin/inventory/page.tsx`
- `src/components/admin/inventory-table.tsx`
- `tests/e2e/inventory-management.spec.ts`
- `supabase/migrations/20251130_add_variant_id_to_inventory.sql`
