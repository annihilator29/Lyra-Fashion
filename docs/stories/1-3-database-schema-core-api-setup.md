# Story 1.3: Database Schema & Core API Setup

Status: review

## Story

As a Backend Dev,
I want to set up the database and core API structure,
so that we can store and retrieve application data.

## Acceptance Criteria

1. Supabase project is connected via environment variables in `.env.local`.
2. `profiles` table exists in the database with correct schema (id, email, full_name, avatar_url).
3. `products` table exists in the database with correct schema (id, name, slug, description, price, images, category, transparency_data).
4. Row Level Security (RLS) is enabled on both tables with appropriate policies.
5. A health check API endpoint (`/api/health`) returns 200 OK and a timestamp.
6. Supabase client helper (`src/lib/supabase/server.ts` or similar) is implemented for server-side usage.

## Tasks / Subtasks

- [x] Configure Supabase project connection. (AC: 1)
  - [x] Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
  - [x] Install Supabase client: `npm install @supabase/ssr @supabase/supabase-js`
- [x] Implement Supabase client utilities. (AC: 6)
  - [x] Create `src/lib/supabase/server.ts` (using `createServerClient`)
  - [x] Create `src/lib/supabase/client.ts` (using `createBrowserClient`)
- [x] Create Database Schema via Migrations. (AC: 2, 3, 4)
  - [x] Initialize Supabase CLI locally (if not already): `npx supabase init`
  - [x] Create migration file: `npx supabase migration new init_schema`
  - [x] Define `profiles` table (extends auth.users)
  - [x] Define `products` table (including JSONB `transparency_data`)
  - [x] Enable RLS and add policies (e.g., Public read for products, Auth read/update for profiles)
  - [x] Apply migration locally or push to remote (depending on dev setup)
- [x] Generate TypeScript types.
  - [x] Run `npx supabase gen types typescript --project-id <id> > src/types/database.types.ts`
- [x] Implement Health Check API. (AC: 5)
  - [x] Create `src/app/api/health/route.ts`
  - [x] Return JSON: `{ status: 'ok', timestamp: ... }`
- [x] Verify connection and schema.
  - [x] Use a script or temporary page to fetch data from `products` (should be empty but successful)

## Dev Notes

- **Architecture Patterns:**
  - Use **Supabase** for Database and Auth.
  - Use **RLS** for security.
  - Use **Server Actions** or **Route Handlers** for API logic (Health check is a Route Handler).
- **Data Models:**
  - `profiles`: id (uuid, FK to auth.users), email, full_name, avatar_url.
  - `products`: id (uuid), name, slug, description, price (int, cents), images (text[]), category, transparency_data (jsonb).

### Project Structure Notes

- `src/lib/supabase/` for client helpers.
- `src/app/api/` for API routes.
- `supabase/migrations/` for SQL.

### References

- [Source: docs/tech-spec-epic-1.md#2.2 Data Models]
- [Source: docs/tech-spec-epic-1.md#2.3 APIs & Interfaces]
- [Source: docs/epics.md#Story 1.3: Database Schema & Core API Setup]

## Dev Agent Record

### Context Reference

- docs/stories/1-3-database-schema-core-api-setup.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log References

### Completion Notes List

- Implemented complete Supabase database schema with profiles and products tables
- Configured Row Level Security (RLS) policies for both tables
- Created health check API endpoint at `/api/health` returning status and timestamp
- Established Supabase client utilities for both server and browser environments
- Generated TypeScript types for database schema
- Created comprehensive test suite for API and database functionality
- All acceptance criteria satisfied and tested

### File List

- lyra-fashion/.env.local
- lyra-fashion/supabase/config.toml
- lyra-fashion/supabase/migrations/20251128_init_schema.sql
- lyra-fashion/src/app/api/health/route.ts
- lyra-fashion/src/lib/supabase/client.ts
- lyra-fashion/src/lib/supabase/server.ts
- lyra-fashion/src/lib/utils/test-connection.ts
- lyra-fashion/src/types/database.types.ts
- lyra-fashion/src/lib/utils/__tests__/health.test.ts
- lyra-fashion/src/lib/supabase/__tests__/client.test.ts
- lyra-fashion/src/lib/utils/validation-report.md
- lyra-fashion/DATABASE_SETUP.md
