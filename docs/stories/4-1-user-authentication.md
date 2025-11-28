# Story 4.1: User Authentication

Status: ready-for-dev

## Story

As a Customer,
I want to sign up and log in,
so that I can manage my orders and preferences.

## Acceptance Criteria

1. User can sign up with a valid email and password.
2. User can log in with valid credentials.
3. User can log out, clearing the session.
4. Invalid login attempts display a clear error message ("Invalid login credentials").
5. Protected routes (e.g., `/account`) redirect unauthenticated users to `/login`.

## Tasks / Subtasks

- [ ] Task 1: Setup Auth Service (Server Actions) (AC: 1, 2, 3)
  - [ ] Implement `signup` server action using Supabase SSR
  - [ ] Implement `login` server action using Supabase SSR
  - [ ] Implement `logout` server action using Supabase SSR
- [ ] Task 2: Create Signup Page & Form (AC: 1)
  - [ ] Create `src/app/(auth)/signup/page.tsx`
  - [ ] Build Signup Form with Zod validation
  - [ ] Connect form to `signup` action
- [ ] Task 3: Create Login Page & Form (AC: 2, 4)
  - [ ] Create `src/app/(auth)/login/page.tsx`
  - [ ] Build Login Form with Zod validation
  - [ ] Connect form to `login` action
  - [ ] Display error messages for invalid credentials
- [ ] Task 4: Implement Middleware for Protected Routes (AC: 5)
  - [ ] Create/Update `src/middleware.ts`
  - [ ] Define protected routes (e.g., `/account`)
  - [ ] Redirect unauthenticated users to `/login`
- [ ] Task 5: E2E Tests (AC: 1-5)
  - [ ] Write Playwright test for full auth flow (Signup -> Login -> Logout)

## Dev Notes

- **Architecture:** Use Supabase Auth with Next.js Server Actions.
- **State:** Session management is handled by Supabase SSR (cookies).
- **UI:** Use `shadcn/ui` components for forms.
- **Security:** Ensure RLS policies are in place (though primarily for data access, Auth handles identity).

### Project Structure Notes

- **Auth Pages:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`
- **Server Actions:** `src/app/actions/auth.ts`
- **Middleware:** `src/middleware.ts`

### References

- [Source: docs/tech-spec-epic-4.md#Detailed Design]
- [Source: docs/architecture.md#Auth]

## Dev Agent Record

### Context Reference

- docs/stories/4-1-user-authentication.context.xml

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
