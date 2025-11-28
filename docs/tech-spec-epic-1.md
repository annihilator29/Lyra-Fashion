# Technical Specification: Epic 1 - Foundation & Infrastructure

**Epic ID:** 1
**Title:** Foundation & Infrastructure
**Author:** Bibek
**Status:** Draft
**Date:** 2025-11-27

---

## 1. Overview and Scope

### 1.1 Overview
This epic establishes the foundational technical infrastructure for the Lyra Fashion web application. It focuses on setting up the Next.js 15 application, configuring the Supabase backend (Database, Auth), establishing the CI/CD pipeline, and implementing the core design system using Tailwind CSS and shadcn/ui. This foundation is critical for enabling parallel development of feature epics and ensuring a scalable, maintainable codebase from day one.

### 1.2 In-Scope
- **Project Initialization:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4 setup.
- **Design System:** Configuration of global styles, typography, colors, and core UI components (shadcn/ui).
- **Backend Setup:** Supabase project initialization, core database schema (users, products), and API connectivity.
- **Authentication:** Basic Supabase Auth integration (Sign Up, Login).
- **CI/CD:** Vercel deployment pipeline configuration with automated build and test steps.
- **Repository:** Git repository setup with branching strategy and linting/formatting rules.

### 1.3 Out-of-Scope
- **Feature Implementation:** Product catalog, shopping cart, checkout, or advanced user profile features (these are in subsequent epics).
- **Complex Auth:** Social login providers (deferred to Epic 4).
- **Production Data:** Full product catalog seeding (deferred to Epic 2).
- **Advanced Monitoring:** Comprehensive observability setup (basic logging only).

### 1.4 Architecture Alignment
This epic directly implements the "Project Initialization" and "Core Technologies" sections of the Architecture document. It establishes the:
- **Frontend:** Next.js 15 App Router structure.
- **Backend:** Supabase client integration.
- **Styling:** Tailwind CSS with the "Organic Modern" theme defined in the UX Specification.
- **Deployment:** Vercel integration.

---

## 2. Detailed Design

### 2.1 Services & Modules

| Module/Service | Responsibility | Inputs | Outputs | Owner |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend App** | Next.js application hosting UI and client logic. | User interactions, URL | HTML/React Components | Frontend Dev |
| **Supabase Client** | Handles DB connection and Auth state. | Config keys, Auth tokens | Data/Session | Backend Dev |
| **Design System** | Provides reusable UI components and styles. | Props, Theme config | Rendered UI | Designer/Dev |
| **Database** | Stores core application data (Users, Products). | SQL Migrations | Persisted Data | Backend Dev |
| **CI/CD Pipeline** | Automates testing and deployment. | Git Push | Deployed App | DevOps |

### 2.2 Data Models

**Entity: Profiles (extends Auth)**
```sql
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Entity: Products (Core Schema)**
```sql
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price integer not null, -- in cents
  images text[],
  category text,
  transparency_data jsonb, -- for transparency module
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 2.3 APIs & Interfaces

**Health Check Endpoint**
- **Path:** `/api/health`
- **Method:** `GET`
- **Response:** `{ "status": "ok", "timestamp": "..." }`

**Supabase Client Interface**
- `createClient()`: Returns typed Supabase client for Server/Client components.

### 2.4 Workflows & Sequencing

**Project Setup Sequence:**
1.  Initialize Git Repo.
2.  Run `create-next-app`.
3.  Install Tailwind & shadcn/ui.
4.  Configure Supabase project & env vars.
5.  Run initial SQL migrations.
6.  Connect to Vercel.

---

## 3. Non-Functional Requirements

### 3.1 Performance
- **Lighthouse Score:** Target 90+ on Performance, Accessibility, Best Practices, SEO for the "Hello World" / Skeleton app.
- **Build Time:** CI build should complete under 3 minutes.
- **Initial Load:** First Contentful Paint (FCP) under 1.5s on 4G networks.

### 3.2 Security
- **Environment Variables:** All secrets (API keys, DB URLs) must be stored in `.env.local` and Vercel Environment Variables, never committed to Git.
- **Dependency Scanning:** `npm audit` must pass with no high/critical vulnerabilities.
- **RLS:** Row Level Security must be enabled on all created tables (profiles, products) with appropriate policies.

### 3.3 Reliability
- **Uptime:** Vercel and Supabase standard SLAs apply (99.9%).
- **Database Backups:** Enable Point-in-Time Recovery (PITR) in Supabase (if available on plan) or daily backups.

### 3.4 Observability
- **Build Logs:** Vercel build logs must be accessible.
- **Runtime Logs:** Server-side errors logged to Vercel functions logs.

---

## 4. Dependencies & Integrations

- **Next.js:** v15.x (App Router)
- **React:** v19.x (RC/Latest)
- **TypeScript:** v5.x
- **Tailwind CSS:** v4.x
- **Supabase JS:** `@supabase/ssr`, `@supabase/supabase-js`
- **shadcn/ui:** Latest
- **Vercel:** Hosting & CI/CD
- **GitHub:** Source Control

---

## 5. Acceptance Criteria & Traceability

| ID | Acceptance Criteria | Spec Section | Component | Test Idea |
| :--- | :--- | :--- | :--- | :--- |
| **AC-1.1.1** | Project initializes with Next.js 15, TypeScript, and Tailwind CSS. | 1.2, 2.4 | Frontend App | Check `package.json` versions and run `npm run dev`. |
| **AC-1.1.2** | Application runs locally on port 3000 without errors. | 1.2 | Frontend App | Manual verification of localhost:3000. |
| **AC-1.1.3** | Linting (ESLint) and formatting (Prettier) commands run successfully. | 1.2 | Dev Tools | Run `npm run lint`. |
| **AC-1.2.1** | Tailwind theme is configured with "Organic Modern" colors and fonts. | 1.2, 2.1 | Design System | Inspect CSS variables in browser dev tools. |
| **AC-1.2.2** | Basic shadcn/ui components (Button, Input) are available and styled. | 1.2, 2.1 | Design System | Render a test page with components. |
| **AC-1.3.1** | Supabase project is created and connected via env vars. | 1.2, 2.3 | Backend | Check `.env.local` and connection status. |
| **AC-1.3.2** | `profiles` and `products` tables exist in the database. | 2.2 | Database | Query Supabase dashboard or SQL editor. |
| **AC-1.3.3** | Health check API endpoint returns 200 OK. | 2.3 | API | Curl `/api/health`. |
| **AC-1.4.1** | Push to `main` triggers a Vercel build and deployment. | 1.2, 2.4 | CI/CD | Push a commit and check Vercel dashboard. |
| **AC-1.4.2** | Staging URL is accessible after deployment. | 1.2 | CI/CD | Visit the Vercel preview URL. |

---

## 6. Risks & Test Strategy

### 6.1 Risks, Assumptions, Questions
- **Risk:** Next.js 15 is relatively new; potential stability issues or breaking changes in dependencies.
  - *Mitigation:* Stick to stable releases of dependencies where possible; consult migration guides.
- **Assumption:** Developer has access to Supabase and Vercel accounts.
- **Question:** Are there specific naming conventions for the Vercel project? (Assumed `lyra-fashion`).

### 6.2 Test Strategy
- **Unit Tests:** None for this infrastructure epic (focus is on configuration).
- **Integration Tests:** Verify DB connection and API endpoints manually.
- **E2E Tests:** Basic "Smoke Test" - load the homepage and verify no console errors.
- **Manual Verification:** Visual check of design system implementation against UX specs.

---
