# Story 5.3: Payment Integration (Stripe)

Status: ready-for-dev

## Story

As a Customer,
I want to pay securely using my credit card,
so that I can complete the transaction.

## Acceptance Criteria

1. User can enter credit card details using Stripe Elements.
2. Payment is processed securely via Stripe Payment Intents.
3. Server validates the transaction amount before processing.
4. User sees a loading state during payment processing.
5. Successful payment redirects to the success page.
6. Failed payment shows a clear error message.

## Tasks / Subtasks

- [ ] Task 1: Setup Stripe Backend (AC: 2, 3)
  - [ ] Install `stripe` SDK
  - [ ] Create `src/lib/stripe/server.ts`
  - [ ] Implement `createPaymentIntent` server action (calculate amount from cart items on server)
- [ ] Task 2: Setup Stripe Frontend (AC: 1)
  - [ ] Install `@stripe/stripe-js` and `@stripe/react-stripe-js`
  - [ ] Create `StripeProvider` component
  - [ ] Create `PaymentForm` component with `PaymentElement`
- [ ] Task 3: Integrate Payment Flow (AC: 4, 5, 6)
  - [ ] Connect `PaymentForm` to `createPaymentIntent`
  - [ ] Handle `stripe.confirmPayment`
  - [ ] Implement loading and error states
- [ ] Task 4: E2E Tests (AC: 1-6)
  - [ ] Test successful payment flow (using Stripe test card)
  - [ ] Test failed payment flow (using Stripe decline card)

## Dev Notes

- **Architecture:** Use Stripe Elements for PCI compliance.
- **Security:** NEVER calculate price on the client. Always recalculate on the server based on product IDs.
- **Env Vars:** Ensure `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set.

### Project Structure Notes

- **Server Action:** `src/app/actions/checkout.ts`
- **Components:** `src/components/checkout/payment-form.tsx`

### References

- [Source: docs/tech-spec-epic-5.md#Detailed Design]
- [Source: docs/architecture.md#Payments]

## Dev Agent Record

### Context Reference

- docs/stories/5-3-payment-integration-stripe.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
