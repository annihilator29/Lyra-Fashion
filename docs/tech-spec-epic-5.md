# Epic Technical Specification: Commerce & Transactions

Date: 2025-11-28
Author: Bibek
Epic ID: 5
Status: Draft

---

## Overview

Epic 5, "Commerce & Transactions," covers the core e-commerce functionality of Lyra Fashion. It includes managing the shopping cart, processing secure payments via Stripe, and handling order creation and confirmation. This epic is critical for revenue generation and requires high reliability, security, and a seamless user experience to minimize cart abandonment.

## Objectives and Scope

**In-Scope:**
-   **Shopping Cart:** Client-side cart management (add, remove, update quantity) with persistence.
-   **Checkout Flow:** Multi-step or single-page checkout collecting shipping and payment information.
-   **Payment Integration:** Secure payment processing using Stripe Elements and Payment Intents.
-   **Order Management:** Creation of order records in the database upon successful payment.
-   **Order Confirmation:** User-facing success page and email notification (via Resend).

**Out-of-Scope:**
-   Complex tax calculations (using simple flat rates or Stripe Tax automatic calculation if easy to enable).
-   International shipping rates (flat rate for MVP).
-   Guest checkout (MVP will require auth or simple guest flow - let's aim for authenticated for simplicity in Epic 4 context, but allow guest if architecture permits. *Correction per PRD: Guest checkout is a requirement F-6*).
-   Discount codes/Coupons (Post-MVP).

## System Architecture Alignment

-   **Frontend:** Next.js App Router for pages.
-   **State Management:** **Zustand** for global cart state, persisted to `localStorage`.
-   **Payments:** **Stripe** integration.
    -   Client: `@stripe/stripe-js` and `@stripe/react-stripe-js` for Elements.
    -   Server: `stripe` (Node.js SDK) for creating Payment Intents and handling Webhooks.
-   **Database:** Supabase (PostgreSQL).
    -   `orders` and `order_items` tables.
-   **API:** Next.js Server Actions for order creation; API Route for Stripe Webhooks (`/api/webhooks/stripe`).

## Detailed Design

### Services and Modules

| Module | Responsibility | Owner |
| :--- | :--- | :--- |
| `CartStore` | Zustand store managing cart items, total calculation, and persistence. | Frontend |
| `CheckoutService` | Orchestrates the checkout process, creating Payment Intents. | Backend |
| `StripeService` | Wrapper around Stripe SDK for interactions (Payment Intents, Webhook verification). | Backend |
| `OrderService` | Handles order record creation and status updates. | Backend |
| `WebhookHandler` | Listens for Stripe events (`payment_intent.succeeded`) to finalize orders. | Backend |

### Data Models and Contracts

**Orders Table (`orders`)**
```sql
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users, -- Nullable for guest checkout
  guest_email text, -- If user_id is null
  status text check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount integer, -- In cents
  currency text default 'usd',
  shipping_address jsonb,
  stripe_payment_intent_id text unique,
  created_at timestamp with time zone default now()
);
```

**Order Items Table (`order_items`)**
```sql
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) not null,
  variant_id uuid, -- If using variants
  quantity integer not null,
  price_at_purchase integer not null, -- Store price at time of buying
  created_at timestamp with time zone default now()
);
```

### APIs and Interfaces

**Server Actions (`src/app/actions/checkout.ts`)**
-   `createPaymentIntent(items: CartItem[]): Promise<{ clientSecret: string }>`
-   `createOrder(orderData: CreateOrderSchema): Promise<{ orderId: string }>` (Optional, if not fully handled by webhook)

**API Route (`src/app/api/webhooks/stripe/route.ts`)**
-   `POST /api/webhooks/stripe`: Handles `payment_intent.succeeded`.

### Workflows and Sequencing

**Checkout Flow:**
1.  User goes to `/checkout`.
2.  `CartStore` hydrates items.
3.  `createPaymentIntent` called with cart items. Server calculates total (trusted source) and returns `clientSecret`.
4.  User enters Shipping Info.
5.  User enters Card Details (Stripe Element).
6.  User clicks "Pay".
7.  Stripe processes payment.
8.  On success, client redirects to `/checkout/success?orderId=...`.
9.  **Async:** Stripe sends `payment_intent.succeeded` webhook.
10. Server validates webhook signature.
11. Server creates/updates `orders` record to status 'paid'.

## Non-Functional Requirements

### Performance
-   **Cart Operations:** Instantaneous (client-side).
-   **Checkout Load:** < 1s to load Stripe Elements.
-   **Webhook Processing:** Must handle retries and be idempotent.

### Security
-   **PCI DSS:** No raw card data handling. Use Stripe Elements.
-   **Validation:** Validate cart totals on server before creating Payment Intent. Do not trust client-sent prices.
-   **Webhooks:** Verify Stripe signature to prevent spoofing.

### Reliability/Availability
-   **Cart Persistence:** `localStorage` ensures cart survives page reloads.
-   **Idempotency:** Webhook handler must handle duplicate events gracefully.

## Dependencies and Integrations

-   `zustand`: State management.
-   `stripe`: Node.js SDK.
-   `@stripe/stripe-js`, `@stripe/react-stripe-js`: Client SDKs.
-   `resend`: For order confirmation emails.

## Acceptance Criteria (Authoritative)

**AC-5.1: Shopping Cart**
1.  User can add items to cart (persisted).
2.  User can view cart with correct total.
3.  User can update quantities or remove items.

**AC-5.2: Checkout Flow**
1.  User can enter shipping address.
2.  User sees order summary before payment.

**AC-5.3: Payment Integration**
1.  User can pay via Credit Card (Stripe).
2.  Payment is processed securely.
3.  Server validates amount.

**AC-5.4: Order Confirmation**
1.  User sees success page with Order ID.
2.  Order record exists in DB with status 'paid'.
3.  User receives email confirmation.

## Traceability Mapping

| AC ID | Spec Section | Component/API | Test Idea |
| :--- | :--- | :--- | :--- |
| AC-5.1.1 | Detailed Design | `CartStore` | Add item, reload page, verify item exists. |
| AC-5.3.1 | APIs | `createPaymentIntent` | Verify clientSecret returned. |
| AC-5.4.2 | APIs | Webhook | Simulate Stripe event, check DB for order. |

## Risks, Assumptions, Open Questions

-   **Risk:** Webhook delivery delays.
-   **Mitigation:** Client can also trigger a "confirm" action, but Webhook is source of truth.
-   **Assumption:** We are using "Guest Checkout" logic where we capture email even if not logged in.

## Test Strategy Summary

-   **Unit:** Test CartStore logic (reducers).
-   **Integration:** Test Stripe Webhook handler with mocked Stripe signature.
-   **E2E:** Full checkout flow using Stripe Test Cards.

## Post-Review Follow-ups

- **Story 5.4** (Order Confirmation):
  - Add payment amount validation in webhook handler to verify amount matches expected cart total
  - Fix quantity handling in webhook to properly extract from payment intent metadata
  - Create integration tests for webhook handler to verify order creation and email sending
