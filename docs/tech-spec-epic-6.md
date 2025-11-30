# Epic Technical Specification: Order History & Status

Date: 2025-11-28
Author: Bibek
Epic ID: 6
Status: Draft

---

## Overview

Epic 6, "Order History & Status," focuses on the post-purchase experience for customers. It allows users to view their past orders and track the status of current ones. A key differentiator for Lyra Fashion is the "Production Status Tracking," which gives customers visibility into the journey of their garment, reinforcing the brand's commitment to transparency and craftsmanship.

## Objectives and Scope

**In-Scope:**
-   **Order History:** List of all past orders with summary details (Date, Total, Status).
-   **Order Details:** Detailed view of a specific order (Items, Shipping Address, Payment Info).
-   **Order Tracking:** Real-time (simulated or actual) status updates (e.g., "Cut", "Sewn", "Quality Check", "Shipped").
-   **Transparency Integration:** Linking order items back to the specific artisan or factory data (if available/mocked).

**Out-of-Scope:**
-   Complex returns/refunds automation (Manual process for MVP).
-   Integration with real-world shipping carrier APIs (FedEx/UPS) for live tracking map (Simple text status for MVP).

## System Architecture Alignment

-   **Frontend:** Next.js App Router (`/account/orders`).
-   **Database:** Supabase (`orders`, `order_items`).
-   **State Management:** Server Components for fetching data; Client components for interactive tracking timeline.
-   **UI:** `shadcn/ui` for tables, cards, and timeline visualization.

## Detailed Design

### Services and Modules

| Module | Responsibility | Owner |
| :--- | :--- | :--- |
| `OrderService` | Fetches order history and details for the authenticated user. | Backend |
| `TrackingService` | Determines the current status of an order/item. For MVP, this might be time-based or manually updated in Admin. | Backend |

### Data Models and Contracts

**Orders Table (`orders`) - Existing**
-   `id`, `user_id`, `status`, `total_amount`, `created_at`.
-   *Update:* Add `tracking_number` (text, nullable).

**Order Status Enum**
-   `pending`, `processing`, `production`, `quality_check`, `shipped`, `delivered`, `cancelled`.

### APIs and Interfaces

**Server Actions (`src/app/actions/order.ts`)**
-   `getOrders(): Promise<OrderSummary[]>`
-   `getOrderDetails(orderId: string): Promise<OrderDetail | null>`

### Workflows and Sequencing

**1. View Order History**
1.  User navigates to `/account/orders`.
2.  `getOrders` fetches orders where `user_id == auth.uid()`.
3.  Page renders list sorted by date (newest first).

**2. Track Order**
1.  User clicks on an order.
2.  `getOrderDetails` fetches items and current status.
3.  UI displays a "Journey Timeline" showing completed and current steps.

## Non-Functional Requirements

### Performance
-   **Data Fetching:** Order history should load in < 200ms.
-   **Caching:** Cache order details for a short duration, revalidate on status change.

### Security
-   **RLS:** Strict RLS on `orders` and `order_items` to ensure users only see their own data.

### UX/UI
-   **Visuals:** Use the "Calm & Assured" aesthetic. The tracking timeline should look premium, not generic.

## Dependencies and Integrations

-   **Supabase:** Data source.
-   **Lucide React:** Icons for status steps (e.g., Scissors for "Cut", Box for "Shipped").

## Acceptance Criteria (Authoritative)

**AC-6.1: Order History**
1.  User can view a list of all past orders.
2.  List shows Date, Order ID, Status, and Total.
3.  User can filter by status (Open vs. Archived) - *Optional for MVP, nice to have*.

**AC-6.2: Production Status Tracking**
1.  User can view detailed status of an active order.
2.  Timeline visualizes steps: Placed -> Production -> Quality Check -> Shipped -> Delivered.
3.  "Production" step shows details about the crafting process (transparency angle).

## Traceability Mapping

| AC ID | Spec Section | Component/API | Test Idea |
| :--- | :--- | :--- | :--- |
| AC-6.1.1 | Workflows | `getOrders` | Fetch orders for user with 0, 1, and many orders. |
| AC-6.2.2 | Detailed Design | `TrackingTimeline` | Verify correct step is active based on DB status. |

## Risks, Assumptions, Open Questions

-   **Assumption:** We will manually update order statuses in the DB for the MVP demo, or use a scheduled job to simulate progress.

## Test Strategy Summary

-   **Unit:** Test `OrderService` fetching logic.
-   **E2E:** User logs in, goes to orders, checks details of a specific order.

## Post-Review Follow-ups

- [ ] Implement production status tracking timeline as specified in AC #6.2.2 for Story 6.1 - Missing detailed timeline visualization showing steps: Placed -> Production -> Quality Check -> Shipped -> Delivered [file: lyra-fashion/src/app/account/orders/[id]/page.tsx]
- [ ] Add missing E2E tests for authenticated users with order data for Story 6.1 [file: lyra-fashion/tests/e2e/order-history.spec.ts]
- [ ] Improve shipping_address typing for better type safety for Story 6.1 [file: lyra-fashion/src/types/database.types.ts:200-207]
