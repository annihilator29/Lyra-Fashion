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

### Review Follow-ups (AI)
- [x] [AI-Review][Medium] Implement cache revalidation (e.g., `revalidatePath` or `revalidateTag`) in `src/app/actions/admin.ts` after a successful `updateInventoryAction` to ensure customer-facing product pages reflect stock changes immediately.
- [x] [AI-Review][Low] Enhance `supabase/migrations/20251130_add_variant_id_to_inventory.sql` to explicitly ensure the `public.product_variants` table exists or include its creation within a prior/dependent migration for improved robustness.

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

- ✅ Resolved review finding [Medium]: Implemented cache revalidation in `src/app/actions/admin.ts` using `revalidateTag` to ensure customer-facing product pages reflect stock changes immediately.
- ✅ Resolved review finding [Low]: Enhanced `supabase/migrations/20251130_add_variant_id_to_inventory.sql` to explicitly create the `public.product_variants` table, ensuring dependencies are properly handled.

### File List

- `src/services/admin/inventory-service.ts`
- `src/app/actions/admin.ts` (updated)
- `src/app/admin/inventory/page.tsx`
- `src/components/admin/inventory-table.tsx`
- `tests/e2e/inventory-management.spec.ts`
- `supabase/migrations/20251130_add_variant_id_to_inventory.sql`

## Senior Developer Review (AI)

**Reviewer:** Bibek
**Date:** Sunday, November 30, 2025
**Outcome:** APPROVE

**Summary**:
Story 7.2 (Inventory Management) has been thoroughly reviewed. All acceptance criteria are fully implemented, and all tasks are verified. The implementation aligns well with architectural guidelines and security best practices. While no critical findings were identified, several advisory notes are provided for future enhancements and code quality improvements. This story is approved for completion.

**Key Findings**

**HIGH severity issues:** None found.
**MEDIUM severity issues:** None found.
**LOW severity issues:** None found.

**Acceptance Criteria Coverage**

| AC# | Description | Status | Evidence |
|-----|-------------|--------|----------|
| 1 | Admin can view a paginated list of all products and their variants with current stock levels. | IMPLEMENTED | `lyra-fashion/src/services/admin/inventory-service.ts` (getInventoryList); `lyra-fashion/src/app/admin/inventory/page.tsx` (pagination, InventoryTable). |
| 2 | Admin can manually update the stock quantity for a specific product variant. | IMPLEMENTED | `lyra-fashion/src/app/actions/admin.ts` (updateInventoryAction); `lyra-fashion/src/components/admin/inventory-table.tsx` (Update button, dialog). |
| 3 | Items with stock below the low stock threshold (default 5) are visually highlighted (e.g., red badge). | IMPLEMENTED | `lyra-fashion/src/services/admin/inventory-service.ts` (isLowStock); `lyra-fashion/src/components/admin/inventory-table.tsx` (conditional rendering of "Low Stock" badge). |
| 4 | Stock updates are reflected immediately in the admin view and customer-facing product pages. | IMPLEMENTED | `lyra-fashion/src/app/admin/inventory/page.tsx` (admin view refresh), `lyra-fashion/src/app/actions/admin.ts` (revalidateTag for cache revalidation). |
| 5 | Only users with 'admin' role can access the inventory management page and perform updates. | IMPLEMENTED | `lyra-fashion/src/app/actions/admin.ts` (admin role check in updateInventoryAction). |

**Summary:** 5 of 5 acceptance criteria fully implemented.

**Task Completion Validation**

| Task | Marked As | Verified As | Evidence |
|------|-----------|-------------|----------|
| Task 1: Database & Service Layer (AC: 1, 2, 4) | COMPLETE | VERIFIED COMPLETE | `lyra-fashion/supabase/migrations/20251130_add_inventory_table.sql`, `lyra-fashion/src/services/admin/inventory-service.ts`, `lyra-fashion/src/app/actions/admin.ts`. |
| Task 2: Inventory List UI (AC: 1, 3, 5) | COMPLETE | VERIFIED COMPLETE | `lyra-fashion/src/app/admin/inventory/page.tsx`, `lyra-fashion/src/components/admin/inventory-table.tsx`. |
| Task 3: Stock Update Interaction (AC: 2, 4) | COMPLETE | VERIFIED COMPLETE | `lyra-fashion/src/components/admin/inventory-table.tsx` (dialog, `handleUpdateStock`, toast notifications). |
| Task 4: E2E Tests (AC: 1-5) | COMPLETE | VERIFIED COMPLETE | `lyra-fashion/tests/e2e/inventory-management.spec.ts`. |

**Summary:** 4 of 4 completed tasks verified, 0 questionable, 0 falsely marked complete.

**Test Coverage and Gaps**

**Test Coverage:**
- E2E tests (`lyra-fashion/tests/e2e/inventory-management.spec.ts`) provide comprehensive coverage for admin access, inventory listing, stock updates, low stock indicators, and non-admin protection, directly addressing AC 1, 2, 3, and 5.

**Gaps:**
- Advisory: While E2E tests cover UI interactions well, adding dedicated integration tests for database-level inventory operations (e.g., ensuring `updateStock` correctly modifies the database and handles edge cases like invalid `product_id`) would strengthen overall test coverage.

**Architectural Alignment**

**Tech-spec Compliance:** ✅ Aligned with Epic 7 technical specification.
- Next.js App Router, Supabase Auth with RBAC, Supabase Database usage are all consistent.
- `updateInventoryAction` matches the API defined in the tech spec.
- UI components use `shadcn/ui` principles.

**Architecture Violations:** None found.

**Security Notes**

✅ **Security Strengths:**
- Server-side admin role verification in `lyra-fashion/src/app/actions/admin.ts`) prevents unauthorized stock modifications.
- Route protection for `/admin` paths via `AdminLayout.tsx` enforces access control at the page level.
- Input validation in UI components prevents negative stock quantities.

**Security Recommendations:**
- Advisory: Consider implementing audit logging for stock changes (who, what, when) as a "nice-to-have" for enhanced compliance, as per the tech spec.

**Best-Practices and References**

- **Next.js Server Actions**: Properly utilized for backend mutations with `useTransition` for UI responsiveness.
- **Supabase Integration**: Effective use of `@supabase/ssr` for server-side Supabase client and database interactions.
- **Role-Based Access Control**: Implemented effectively for both action and route protection.
- **E2E Testing**: Playwright tests are well-structured and cover critical flows.

**Action Items**

**Advisory Notes:**
- Note: Explore adding integration tests for direct database-level inventory operations to complement existing E2E tests.
- Note: Enhance loading feedback in `lyra-fashion/src/components/admin/inventory-table.tsx` by showing individual item loading states during stock updates.
- Note: Creating the `product_variants` table in its own dedicated migration file (e.g., `YYYYMMDD_create_product_variants_table.sql`) would improve migration modularity and readability, rather than including it in a migration primarily focused on adding a column to an existing table.
- Note: Consider replacing native `img` tags with `next/image` in `lyra-fashion/src/components/admin/inventory-table.tsx` for product images to leverage Next.js's image optimization features (lazy loading, responsive sizing, format optimization).
- Note: Audit logging for stock changes is a potential future enhancement for compliance.

## Change Log

- **Sunday, November 30, 2025**: Senior Developer Review notes appended.
- **Sunday, November 30, 2025**: Senior Developer Review completed (Outcome: Approve).