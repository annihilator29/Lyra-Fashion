# Story 6.2: Production Status Tracking

Status: ready-for-dev

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

- [ ] Task 1: Create Timeline Component (AC: 1, 2, 3)
  - [ ] Create `TrackingTimeline` component using `shadcn/ui` or custom SVG
  - [ ] Define steps and icons for each status
  - [ ] Implement logic to highlight current and completed steps
- [ ] Task 2: Integrate Tracking Data (AC: 4, 5)
  - [ ] Update `OrderDetails` page to include `TrackingTimeline`
  - [ ] Map DB status to timeline steps
  - [ ] Add tooltips or descriptions for "Production" transparency
- [ ] Task 3: Mock Status Updates (for Demo) (AC: 5)
  - [ ] Create a simple admin action or DB trigger to simulate status progression (optional, for testing)
- [ ] Task 4: E2E Tests (AC: 1-3)
  - [ ] Test timeline rendering for different statuses
  - [ ] Verify correct step is active

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

### File List
