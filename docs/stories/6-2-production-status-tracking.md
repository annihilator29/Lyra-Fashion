# Story 6.2: Production Status Tracking

Status: review

## Story

As a Customer,
I want to track the production status of my order,
so that I can see the journey of my garment.

## Acceptance Criteria

1. Order Details page displays a visual timeline of the order status.
2. Timeline includes steps: Placed, Production, Quality Check, Shipped, Delivered.
3. Current status is highlighted.
4. "Production" step provides additional context (e.g., "Your garment is being sewn").
5. Status updates are reflected in real-time (or on page refresh).

## Tasks / Subtasks

- [x] Task 1: Create Timeline Component (AC: 1, 2, 3)
  - [x] Create `TrackingTimeline` component using `shadcn/ui` or custom SVG
  - [x] Define steps and icons for each status
  - [x] Implement logic to highlight current and completed steps
- [x] Task 2: Integrate Tracking Data (AC: 4, 5)
  - [x] Update `OrderDetails` page to include `TrackingTimeline`
  - [x] Map DB status to timeline steps
  - [x] Add tooltips or descriptions for "Production" transparency
- [x] Task 3: Mock Status Updates (for Demo) (AC: 5)
  - [x] Create a simple admin action or DB trigger to simulate status progression (optional, for testing)
- [x] Task 4: E2E Tests (AC: 1-3)
  - [x] Test timeline rendering for different statuses
  - [x] Verify correct step is active

### Review Follow-ups (AI)
- [x] [AI-Review][Medium] Enhance E2E tests in `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` to explicitly assert the visual highlighting of the current timeline step (e.g., checking for specific CSS classes like `ring-4 ring-primary/20` or `font-bold`) to fully verify AC 3.
- [x] [AI-Review][Low] Expand E2E tests in `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` to include explicit checks for "Quality Check" and "Delivered" statuses to ensure full coverage of AC 2.

## Dev Notes

- **UI:** This is a key brand differentiator. Make the timeline look premium.
- **Data:** Status is stored in `orders.status`.
- **Icons:** Use Lucide icons (e.g., `Scissors` for Production, `CheckCircle` for Quality).

### Project Structure Notes

- **Component:** `src/components/account/tracking-timeline.tsx`

### References

- [Source: docs/tech-spec-epic-6.md#Detailed Design]
- [Source: docs/PRD.md#Transparency Module]

## Dev Agent Record

### Context Reference

- docs/stories/6-2-production-status-tracking.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

- Implemented `TrackingTimeline` component with visual timeline showing order status progression
- Added timeline to order details page with proper status highlighting
- Created admin demo page functionality to update order statuses for testing
- Added E2E tests to verify timeline rendering and status updates
- Enhanced E2E tests to explicitly assert visual highlighting (CSS classes `ring-4 ring-primary/20` and `font-bold`) for AC 3 verification
- Expanded E2E tests to include explicit checks for "Quality Check" and "Delivered" statuses for complete AC 2 coverage
- Resolved all review action items from senior developer review

### File List

- src/components/account/tracking-timeline.tsx
- src/app/account/orders/[id]/page.tsx
- src/app/admin/demo/page.tsx
- src/app/actions/order.ts
- tests/e2e/tracking-timeline.spec.ts

## Change Log
- **2025-11-30**: Senior Developer Review notes appended.

## Senior Developer Review (AI)
**Reviewer:** Bibek
**Date:** Sunday, November 30, 2025
**Outcome:** Changes Requested

**Summary:**
The story "Production Status Tracking" has been reviewed. All Acceptance Criteria (ACs) are implemented, and the overall code quality is good. The implementation aligns well with the Epic Technical Specification. However, there are some gaps in the E2E test coverage, specifically regarding explicit assertions for visual highlighting and full coverage of all timeline steps.

**Key Findings:**

*   **MEDIUM Severity:**
    *   **Incomplete E2E Test Assertion for Highlighting:** Task 4, subtask "Verify correct step is active" is not fully verified. The E2E test `tests/e2e/tracking-timeline.spec.ts` currently asserts only the visibility of text labels, not the visual highlighting (e.g., CSS classes) of the current timeline step. This leaves a gap in verifying AC 3.

*   **LOW Severity:**
    *   **Incomplete E2E Test Coverage for Timeline Steps:** The E2E test `tests/e2e/tracking-timeline.spec.ts` only explicitly tests "Placed", "Production", and "Shipped" steps. It lacks explicit tests for "Quality Check" and "Delivered" statuses (related to AC 2).
    *   **`createDummyOrder` `product_id: null`:** In `src/app/actions/order.ts`, the `createDummyOrder` function inserts `product_id: null` for order items. While acceptable for a demo/dummy function, in a production setting, order items typically link to valid products. This is a minor observation for demo code.

**Acceptance Criteria Coverage:**

| AC# | Description | Status | Evidence |
| :-- | :------------------------------------------------ | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Order Details page displays a visual timeline.    | IMPLEMENTED  | `lyra-fashion/src/app/account/orders/[id]/page.tsx` (imports and uses `<TrackingTimeline />`), `lyra-fashion/src/components/account/tracking-timeline.tsx` (defines component) |
| 2   | Timeline includes steps: Placed, Prod, QC, Shipped, Delivered. | IMPLEMENTED | `lyra-fashion/src/components/account/tracking-timeline.tsx` (`STEPS` array defines all steps)                                                                          |
| 3   | Current status is highlighted.                    | IMPLEMENTED  | `lyra-fashion/src/components/account/tracking-timeline.tsx` (uses `isCurrent` logic for `ring-4 ring-primary/20` and `font-bold` classes)                                 |
| 4   | "Production" step provides additional context.    | IMPLEMENTED  | `lyra-fashion/src/components/account/tracking-timeline.tsx` (`production` step has `description` rendered conditionally)                                                 |
| 5   | Status updates reflected on page refresh.         | IMPLEMENTED  | `lyra-fashion/src/app/account/orders/[id]/page.tsx` (Server component fetches data on refresh), `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` (test verifies update) |

**Task Completion Validation:**

| Task | Marked As | Verified As | Evidence |
| :-- | :-------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task 1: Create Timeline Component | COMPLETED | VERIFIED COMPLETE | `lyra-fashion/src/components/account/tracking-timeline.tsx` (component creation, step definition, highlighting logic)                                                                                                                                                                                                                                                                                                                                               |
| Task 2: Integrate Tracking Data | COMPLETED | VERIFIED COMPLETE | `lyra-fashion/src/app/account/orders/[id]/page.tsx` (integrates component), `lyra-fashion/src/components/account/tracking-timeline.tsx` (maps DB status), `lyra-fashion/src/components/account/tracking-timeline.tsx` (production description)                                                                                                                                                                                                         |
| Task 3: Mock Status Updates (for Demo) | COMPLETED | VERIFIED COMPLETE | `lyra-fashion/src/app/admin/demo/page.tsx` (admin action), `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` (uses demo page for status updates)                                                                                                                                                                                                                                                                                                        |
| Task 4: E2E Tests | COMPLETED | QUESTIONABLE | `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` (test timeline rendering for some statuses). Subtask "Verify correct step is active" is not explicitly asserted for visual highlighting.                                                                                                                                                                                                                                                                                       |

**Test Coverage and Gaps:**
-   **Gaps:**
    -   E2E test `tracking-timeline.spec.ts` lacks explicit assertions for the visual highlighting of the current timeline step (related to AC 3).
    -   E2E test `tracking-timeline.spec.ts` does not explicitly test the "Quality Check" and "Delivered" steps in the timeline, which are part of AC 2.

**Architectural Alignment:**
- The implementation aligns well with the architectural decisions outlined in `docs/architecture.md` and `docs/tech-spec-epic-6.md`, especially regarding Next.js App Router, Supabase, Server Components, Client Components for interactivity, and `shadcn/ui` for UI.

**Security Notes:**
- Authentication and authorization are correctly handled in `src/app/actions/order.ts` by checking `user` object.
- Supabase RLS is implicitly leveraged.

**Best-Practices and References:**
- **Tech Stack Identified:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe, Zustand, Resend, React Hook Form, Zod.
- **Recommendations:** Ensure consistent use of `revalidatePath` when data changes are external or happen via server actions to keep data fresh across the application.

**Action Items:**

**Code Changes Required:**
- [x] [Medium] Enhance E2E tests in `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` to explicitly assert the visual highlighting of the current timeline step (e.g., checking for specific CSS classes like `ring-4 ring-primary/20` or `font-bold`) to fully verify AC 3.
- [x] [Low] Expand E2E tests in `lyra-fashion/tests/e2e/tracking-timeline.spec.ts` to include explicit checks for "Quality Check" and "Delivered" statuses to ensure full coverage of AC 2.

**Advisory Notes:**
- Note: Consider adding a helper function or a product ID constant for `createDummyOrder` to avoid `product_id: null` in the `order_items` insert, even for demo purposes, if a dummy product can be easily created.
