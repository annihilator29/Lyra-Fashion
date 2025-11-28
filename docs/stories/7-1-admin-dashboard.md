# Story 7.1: Admin Dashboard

Status: ready-for-dev

## Story

As an Admin,
I want to view a dashboard with key business metrics,
so that I can monitor the health of the store.

## Acceptance Criteria

1. Secure `/admin` route accessible only to users with 'admin' role.
2. Unauthenticated or unauthorized users are redirected to login or home.
3. Dashboard displays "Total Revenue" card.
4. Dashboard displays "Total Orders" card.
5. Dashboard displays "Low Stock Items" count.
6. Sidebar navigation allows switching between Dashboard, Products, Orders, and Inventory.

## Tasks / Subtasks

- [ ] Task 1: Setup Admin Layout & Auth (AC: 1, 2, 6)
  - [ ] Create `src/app/admin/layout.tsx` with Sidebar
  - [ ] Implement `AdminGuard` (Middleware or HOC) to check role
  - [ ] Create Admin Login page (if distinct from customer login)
- [ ] Task 2: Create Dashboard Metrics Service (AC: 3, 4, 5)
  - [ ] Implement `getAdminMetrics` server action
  - [ ] Query DB for total revenue (sum of paid orders)
  - [ ] Query DB for total order count
  - [ ] Query DB for count of items where quantity < threshold
- [ ] Task 3: Build Dashboard UI (AC: 3, 4, 5)
  - [ ] Create `src/app/admin/dashboard/page.tsx`
  - [ ] Create `MetricCard` component
  - [ ] Display metrics with simple charts (optional, using Recharts)
- [ ] Task 4: E2E Tests (AC: 1-6)
  - [ ] Test admin access control (allow admin, block customer)
  - [ ] Verify metrics display correct data (mocked)

## Dev Notes

- **Security:** This is the highest priority. Ensure no data leaks to non-admins.
- **Role Management:** For MVP, manually set a flag in `profiles` or use a hardcoded email list in the guard if RBAC is too complex.
- **UI:** Use a distinct layout (e.g., Sidebar on left) to differentiate from the shop front.

### Project Structure Notes

- **Layout:** `src/app/admin/layout.tsx`
- **Page:** `src/app/admin/dashboard/page.tsx`
- **Component:** `src/components/admin/sidebar.tsx`

### References

- [Source: docs/tech-spec-epic-7.md#Detailed Design]
- [Source: docs/architecture.md#Security]

## Dev Agent Record

### Context Reference

- docs/stories/7-1-admin-dashboard.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
