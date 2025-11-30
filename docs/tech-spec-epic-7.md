# Epic Technical Specification: Admin Dashboard & Inventory

Date: 2025-11-28
Author: Bibek
Epic ID: 7
Status: Draft

---

## Overview

Epic 7, "Admin Dashboard & Inventory," provides the internal tools necessary for Lyra Fashion's operations team to manage products, orders, and inventory. This includes a secure admin dashboard for viewing key metrics, managing product catalogs, updating order statuses, and tracking inventory levels. This epic is crucial for the "back-of-house" operations that support the customer-facing experience.

## Objectives and Scope

**In-Scope:**
-   **Admin Authentication:** Secure login for admin users (separate from customers or role-based).
-   **Dashboard Overview:** High-level metrics (Total Orders, Revenue, Low Stock Alerts).
-   **Product Management:** CRUD operations for products (Add, Edit, Delete/Archive).
-   **Order Management:** View all orders, update status (e.g., to "Shipped"), and view details.
-   **Inventory Management:** Track stock levels per variant, adjust stock manually.

**Out-of-Scope:**
-   Complex Analytics/Reporting (Basic metrics only for MVP).
-   Multi-vendor support.
-   Automated supplier ordering.

## System Architecture Alignment

-   **Frontend:** Next.js App Router (`/admin`).
-   **Authentication:** Supabase Auth with Role-Based Access Control (RBAC).
    -   Admins will have a specific `role` claim or be in a separate `admins` table/policy.
-   **Database:** Supabase (`products`, `orders`, `inventory`).
-   **UI:** `shadcn/ui` for a clean, functional admin interface (Data Tables, Forms, Charts).

## Detailed Design

### Services and Modules

| Module | Responsibility | Owner |
| :--- | :--- | :--- |
| `AdminAuthService` | Handles admin login and role verification. | Backend |
| `AdminProductService` | Manages product catalog (CRUD). | Backend |
| `AdminOrderService` | Manages customer orders and status updates. | Backend |
| `InventoryService` | Manages stock levels. | Backend |

### Data Models and Contracts

**Users Table (Update)**
-   Add `role` column (text, default 'customer') or use Supabase Custom Claims.
-   For MVP, we can use a simple `is_admin` boolean in the `profiles` table or a separate `admin_users` whitelist table.

**Inventory Table (`inventory`)**
```sql
create table inventory (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) not null,
  variant_id uuid, -- If using variants
  quantity integer default 0,
  low_stock_threshold integer default 5,
  updated_at timestamp with time zone default now()
);
```

### APIs and Interfaces

**Server Actions (`src/app/actions/admin.ts`)**
-   `getAdminMetrics(): Promise<AdminMetrics>`
-   `updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>`
-   `updateInventory(productId: string, quantity: number): Promise<void>`
-   `createProduct(data: ProductSchema): Promise<void>`

### Workflows and Sequencing

**1. Admin Login**
1.  Navigate to `/admin/login`.
2.  Authenticate.
3.  Middleware checks `admin` role.
4.  Redirect to `/admin/dashboard`.

**2. Update Order Status**
1.  Admin views Order List.
2.  Selects an order.
3.  Changes status dropdown to "Shipped".
4.  Server Action updates DB.
5.  (Optional) Triggers email notification (reusing Epic 5 logic).

## Non-Functional Requirements

### Security
-   **RBAC:** Strict enforcement. Only users with `admin` role can access `/admin` routes and execute admin Server Actions.
-   **Audit Logging:** (Nice to have) Log who changed what (e.g., "Admin X changed stock of Product Y").

### Usability
-   **Data Density:** Admin tables should be dense and sortable/filterable for efficiency.

## Dependencies and Integrations

-   **Recharts:** For simple dashboard charts (Revenue/Orders).
-   **TanStack Table:** For advanced data tables (sorting, filtering).

## Acceptance Criteria (Authoritative)

**AC-7.1: Admin Dashboard**
1.  Secure `/admin` route protected by role check.
2.  Dashboard shows key metrics: Total Revenue, Total Orders, Low Stock Items.
3.  Sidebar navigation to Products, Orders, Inventory.

**AC-7.2: Inventory Management**
1.  Admin can view list of all products with current stock levels.
2.  Admin can manually update stock quantity.
3.  Low stock items are visually highlighted.

## Traceability Mapping

| AC ID | Spec Section | Component/API | Test Idea |
| :--- | :--- | :--- | :--- |
| AC-7.1.1 | Security | Middleware | Try accessing /admin as normal user (403/Redirect). |
| AC-7.2.2 | APIs | `updateInventory` | Change stock, verify PDP reflects availability. |

## Risks, Assumptions, Open Questions

-   **Risk:** Accidental exposure of admin routes.
-   **Mitigation:** Middleware + RLS policies are mandatory.
-   **Assumption:** We will seed one initial admin user manually in the DB.

## Test Strategy Summary

-   **Unit:** Test RBAC logic.
-   **E2E:** Admin login, update stock, check customer view.

---

### Post-Review Follow-ups

-   [High] Fix RLS Policy: Update the `inventory` table's RLS policy in the migration file to restrict access to admin users only. (Story 7.1) [file: `supabase/migrations/20251130_add_inventory_table.sql`]
-   [High] Implement Redirect: Modify the `AdminLayout.tsx` or `useUser.ts` hook to redirect unauthorized users to the login or home page, satisfying AC2 and fixing the failing E2E test. (Story 7.1) [file: `src/app/admin/layout.tsx`]
-   [Low] Add DB Column: Add the `low_stock_threshold` column to the `inventory` table migration and update the `getAdminMetrics` server action to use it instead of a hardcoded value. (Story 7.1) [file: `supabase/migrations/20251130_add_inventory_table.sql`, `src/app/actions/admin.ts`]
-   [Medium] Implement cache revalidation (e.g., `revalidatePath` or `revalidateTag`) in `src/app/actions/admin.ts` after a successful `updateInventoryAction` to ensure customer-facing product pages reflect stock changes immediately. (Story 7.2) [file: `src/app/actions/admin.ts`]
-   [Low] Enhance `supabase/migrations/20251130_add_variant_id_to_inventory.sql` to explicitly ensure the `public.product_variants` table exists or include its creation within a prior/dependent migration for improved robustness. (Story 7.2) [file: `supabase/migrations/20251130_add_variant_id_to_inventory.sql`]
-   Note: Explore adding integration tests for direct database-level inventory operations to complement existing E2E tests.
-   Note: Enhance loading feedback in `lyra-fashion/src/components/admin/inventory-table.tsx` by showing individual item loading states during stock updates.
-   Note: Creating the `product_variants` table in its own dedicated migration file (e.g., `YYYYMMDD_create_product_variants_table.sql`) would improve migration modularity and readability, rather than including it in a migration primarily focused on adding a column to an existing table.
-   Note: Consider replacing native `img` tags with `next/image` in `lyra-fashion/src/components/admin/inventory-table.tsx` for product images to leverage Next.js's image optimization features (lazy loading, responsive sizing, format optimization).
-   Note: Audit logging for stock changes is a potential future enhancement for compliance.
