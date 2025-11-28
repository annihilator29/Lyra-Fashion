# Epic Technical Specification: Customer Identity & Engagement

Date: 2025-11-28
Author: Bibek
Epic ID: 4
Status: Draft

---

## Overview

This epic focuses on implementing the "Customer Identity & Engagement" module for Lyra Fashion. It encompasses user authentication (signup, login, password management), profile management, and wishlist functionality. The goal is to provide a secure and personalized experience that fosters customer loyalty and enables features like order history and saved preferences. This module is foundational for the "Trust-First" experience, allowing customers to build a relationship with the brand.

## Objectives and Scope

**In-Scope:**
-   **User Authentication:** Registration (Email/Password), Login, Logout, and Session Management using Supabase Auth.
-   **Profile Management:** Ability for users to view and update their personal details (Name, basic preferences).
-   **Wishlist Functionality:** Capability to save products for later, view them in a dedicated list, and remove them.
-   **Security:** Implementation of Row Level Security (RLS) to protect user data.

**Out-of-Scope:**
-   Complex Loyalty Points System (Future).
-   Advanced personalized recommendations based on behavior (Future).
-   Social features (Sharing wishlist publicly - Future).
-   Social Login providers (Google/Apple) - Deferred to post-MVP to speed up initial delivery, unless easily configurable.

## System Architecture Alignment

This implementation leverages **Supabase Auth** for identity management, integrating seamlessly with the **Next.js App Router**.
-   **Auth:** Supabase Auth handles the heavy lifting of identity, tokens, and session security.
-   **Database:** 
    -   `profiles` table extends the default Supabase `auth.users` table to store application-specific user data.
    -   `wishlists` table stores saved items, linking users to products.
-   **Middleware:** Next.js Middleware protects authenticated routes (e.g., `/account`, `/wishlist`) and manages session refreshment.
-   **UI:** Uses `shadcn/ui` forms and components (Forms, Dialogs, Dropdowns) to maintain the "Calm & Assured" design aesthetic.
-   **State Management:** Server Actions handle mutations; React Server Components fetch data. Client-side optimistic updates will be used for Wishlist interactions.

## Detailed Design

### Services and Modules

| Module | Responsibility | Owner |
| :--- | :--- | :--- |
| `AuthService` | Wrapper around Supabase Auth Client. Handles Sign Up, Sign In, Sign Out, and Session retrieval. | Backend/Auth |
| `ProfileService` | Manages user profile data. Handles fetching and updating the `profiles` table. | Backend |
| `WishlistService` | Manages wishlist operations. Handles adding, removing, and listing items in the `wishlists` table. | Backend |
| `Middleware` | Next.js Middleware to protect routes and ensure valid sessions. | DevOps/Arch |

### Data Models and Contracts

**Profiles Table (`profiles`)**
Extends `auth.users`.
```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  preferences jsonb default '{}'::jsonb, -- For future extensibility (e.g., email settings)
  updated_at timestamp with time zone
);
```

**Wishlists Table (`wishlists`)**
Links users to products.
```sql
create table wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, product_id) -- Prevent duplicate saves
);
```

### APIs and Interfaces

**Server Actions (`src/app/actions/auth.ts`)**
-   `signup(formData: FormData): Promise<{ error?: string }>`
-   `login(formData: FormData): Promise<{ error?: string }>`
-   `logout(): Promise<void>`

**Server Actions (`src/app/actions/profile.ts`)**
-   `updateProfile(data: ProfileUpdateSchema): Promise<{ error?: string }>`
-   `getProfile(): Promise<Profile | null>`

**Server Actions (`src/app/actions/wishlist.ts`)**
-   `addToWishlist(productId: string): Promise<{ error?: string }>`
-   `removeFromWishlist(productId: string): Promise<{ error?: string }>`
-   `getWishlist(): Promise<WishlistItem[]>`

### Workflows and Sequencing

**1. Login Flow**
1.  User enters credentials on `/login`.
2.  `login` Server Action is called.
3.  Action calls `supabase.auth.signInWithPassword`.
4.  On success, session cookie is set.
5.  Redirect to `/account` or previous page.

**2. Wishlist Add Flow**
1.  User clicks "Heart" icon on Product Detail Page.
2.  UI updates immediately (Optimistic UI) to show filled heart.
3.  `addToWishlist` Server Action is called.
4.  Action calls `supabase.from('wishlists').insert`.
5.  `revalidatePath` is triggered to update server state.
6.  If error, UI reverts and shows toast notification.

## Non-Functional Requirements

### Performance
-   **Login/Signup:** Actions should complete within < 1s under normal load.
-   **Profile Load:** Profile data fetch should be < 200ms.
-   **Wishlist Interaction:** "Add to Wishlist" must feel instant to the user (Optimistic UI required).

### Security
-   **Row Level Security (RLS):**
    -   `profiles`: Users can `select` and `update` ONLY their own row (`auth.uid() = id`).
    -   `wishlists`: Users can `select`, `insert`, and `delete` ONLY their own rows (`auth.uid() = user_id`).
-   **Validation:** All inputs (Login form, Profile form) must be validated using Zod schemas on both client and server.
-   **Authentication:** Secure, HTTP-only cookie-based session management provided by `@supabase/ssr`.

### Reliability/Availability
-   **Supabase Auth:** Relies on Supabase's high availability.
-   **Error Handling:** Graceful degradation. If Auth service is down, user should see a friendly "Service Unavailable" message, not a crash.

### Observability
-   **Logging:** Log critical auth failures (not user errors) to the server console.
-   **Monitoring:** Monitor Supabase project dashboard for Auth rate limits or errors.

## Dependencies and Integrations

-   **@supabase/ssr:** For Next.js Auth integration.
-   **@supabase/supabase-js:** Core client.
-   **zod:** For schema validation.
-   **react-hook-form:** For efficient form handling.
-   **lucide-react:** For UI icons (User, Heart, LogOut).
-   **sonner:** For toast notifications (Success/Error feedback).

## Acceptance Criteria (Authoritative)

**AC-4.1: User Authentication**
1.  User can sign up with a valid email and password.
2.  User can log in with valid credentials.
3.  User can log out, clearing the session.
4.  Invalid login attempts display a clear error message ("Invalid login credentials").
5.  Protected routes (e.g., `/account`) redirect unauthenticated users to `/login`.

**AC-4.2: Profile Management**
1.  User can view their profile details (Name, Email).
2.  User can update their Full Name.
3.  Updates are persisted to the `profiles` database table.
4.  UI reflects updates immediately after saving.

**AC-4.3: Wishlist Functionality**
1.  Authenticated user can add a product to their wishlist from the Product Detail Page.
2.  Authenticated user can remove a product from their wishlist.
3.  User can view a list of all wishlisted items on the `/account/wishlist` page.
4.  Wishlist items link correctly to their respective Product Detail Pages.
5.  Duplicate items cannot be added (handled by DB constraint and UI check).

## Traceability Mapping

| AC ID | Spec Section | Component/API | Test Idea |
| :--- | :--- | :--- | :--- |
| AC-4.1.1 | APIs/Auth | `signup()` | Verify new user created in `auth.users` and `profiles` trigger works (if applicable) or manual creation. |
| AC-4.1.2 | APIs/Auth | `login()` | Verify session cookie is present after login. |
| AC-4.1.5 | Middleware | `middleware.ts` | Access `/account` without session -> Expect 307 Redirect to `/login`. |
| AC-4.2.2 | APIs/Profile | `updateProfile()` | Call action with new name -> Verify DB update. |
| AC-4.3.1 | APIs/Wishlist | `addToWishlist()` | Call action -> Verify row exists in `wishlists` table. |

## Risks, Assumptions, Open Questions

-   **Assumption:** We will use Supabase's default email provider for MVP. Rate limits may apply.
-   **Assumption:** A database trigger will be used to create a `profiles` row automatically when a new user signs up in `auth.users`.
-   **Risk:** Social Login configuration (Google/Apple) requires external provider setup which might be time-consuming.
-   **Mitigation:** We will prioritize Email/Password auth first. Social login is a "nice to have" for MVP if time permits.

## Test Strategy Summary

-   **Unit Tests:** Test Zod schemas and utility functions.
-   **Integration Tests:** Test Server Actions by mocking the Supabase client (or using a test project). Verify that RLS policies correctly block unauthorized access.
-   **E2E Tests:** Use Playwright to test the critical path:
    1.  Register a new user.
    2.  Log in.
    3.  Go to a product page.
    4.  Add to wishlist.
    5.  Go to wishlist page and verify item is there.
    6.  Log out.
