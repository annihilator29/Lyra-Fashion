# Story 4.2: User Profile Management

Status: ready-for-dev

## Story

As a Customer,
I want to update my profile details,
so that my information is current.

## Acceptance Criteria

1. User can view their profile details (Name, Email).
2. User can update their Full Name.
3. Updates are persisted to the `profiles` database table.
4. UI reflects updates immediately after saving.

## Tasks / Subtasks

- [ ] Task 1: Create Profile Service (Server Actions) (AC: 2, 3)
  - [ ] Implement `getProfile` server action
  - [ ] Implement `updateProfile` server action
  - [ ] Ensure RLS policies are respected
- [ ] Task 2: Create Profile Page (AC: 1)
  - [ ] Create `src/app/account/profile/page.tsx`
  - [ ] Fetch profile data using `getProfile`
  - [ ] Display current details (Name, Email)
- [ ] Task 3: Create Profile Form (AC: 2, 4)
  - [ ] Create Profile Form component with Zod validation
  - [ ] Connect form to `updateProfile` action
  - [ ] Handle success/error states with toast notifications
- [ ] Task 4: E2E Tests (AC: 1-4)
  - [ ] Write Playwright test for viewing and updating profile

## Dev Notes

- **Architecture:** Use Server Actions for data mutation.
- **State:** Use `useForm` for form state.
- **UI:** `shadcn/ui` Form, Input, Button.
- **Security:** RLS ensures users can only edit their own profile.

### Project Structure Notes

- **Page:** `src/app/account/profile/page.tsx`
- **Service:** `src/app/actions/profile.ts`

### References

- [Source: docs/tech-spec-epic-4.md#Detailed Design]
- [Source: docs/architecture.md#Data Architecture]

## Dev Agent Record

### Context Reference

- docs/stories/4-2-user-profile-management.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
