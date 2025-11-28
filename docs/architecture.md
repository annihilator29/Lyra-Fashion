# Architecture

## Executive Summary

Lyra Fashion is a premium, factory-direct e-commerce platform built on a modern, scalable stack designed for performance, SEO, and rapid development. The architecture leverages **Next.js 15** for a high-performance frontend, **Supabase** for a unified backend (Database, Auth, Storage), and **Stripe** for secure payments. This "Modern Full-Stack" approach minimizes operational overhead while delivering the "Calm & Assured" user experience defined in the UX specification.

## Project Initialization

**First implementation story must execute:**

```bash
npx create-next-app@latest lyra-fashion --typescript --tailwind --app --src-dir
```

This establishes the base architecture with these decisions:
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint
- **Structure**: `/src` directory pattern

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| **Framework** | Next.js App Router | 15.x | All | Best for SEO, performance, and React Server Components. |
| **Database** | Supabase (PostgreSQL) | Latest | F-1 to F-11 | All-in-one backend (DB, Auth, Storage) speeds up dev. |
| **Auth** | Supabase Auth | Latest | F-4, F-5 | Built-in, secure, supports social login. |
| **Payments** | Stripe | 2024-06+ | F-6, F-7 | Premium on-site checkout UX, lower international fees. |
| **State** | Zustand | 5.x | F-6, F-5 | Lightweight cart management with easy persistence. |
| **Email** | Resend | Latest | F-7, F-11 | Developer-friendly, React Email support for branded emails. |
| **Storage** | Supabase Storage | Latest | F-2, F-10 | Integrated with DB/Auth, perfect for product/factory media. |
| **Search** | PostgreSQL FTS | 16.x | F-3 | Cost-effective, zero-latency search for <100k products. |

## Project Structure

```
lyra-fashion/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (shop)/          # Public shop routes (layout.tsx)
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── products/    # Product listing
│   │   │   └── cart/        # Shopping cart
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── login/       # Login page
│   │   │   └── signup/      # Signup page
│   │   ├── api/             # API Routes (Webhooks, etc.)
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React Components
│   │   ├── ui/              # shadcn/ui primitives (Button, etc.)
│   │   ├── shop/            # Shop-specific (ProductCard, Cart)
│   │   └── transparency/    # Novel transparency modules
│   ├── lib/                 # Utilities
│   │   ├── supabase/        # Supabase clients (server/client)
│   │   ├── stripe/          # Stripe helpers
│   │   ├── utils.ts         # CN helper, formatters
│   │   └── store.ts         # Zustand store
│   ├── types/               # TypeScript definitions
│   │   └── database.types.ts # Supabase generated types
│   └── emails/              # React Email templates
├── public/                  # Static assets
├── supabase/                # Supabase config (migrations)
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
└── package.json             # Dependencies
```

## Epic to Architecture Mapping

| Epic | Architectural Components |
| ---- | ------------------------ |
| **Product Discovery** | Next.js Server Components, Supabase DB, Postgres FTS |
| **Product Detail** | Next.js Dynamic Routes, Supabase Storage (Images), TransparencyModule |
| **User Accounts** | Supabase Auth, Middleware Protection, Profile Table |
| **Shopping Cart** | Zustand (Client State), LocalStorage Persistence |
| **Checkout** | Stripe Elements, Stripe Webhooks, Server Actions |
| **Order Management** | Supabase DB (Orders Table), Resend (Emails) |
| **Factory Story** | Supabase Storage (Media), Rich Text Content |

## Technology Stack Details

### Core Technologies
- **Next.js 15**: Leveraging Server Components for data fetching and Server Actions for mutations.
- **Supabase**: Using the JS Client (`@supabase/ssr`) for seamless auth and data access.
- **Tailwind CSS**: Utility-first styling with `shadcn/ui` component library.
- **TypeScript**: Strict mode enabled for type safety.

### Integration Points
- **Stripe**: Connected via `stripe-node` on server and `@stripe/stripe-js` on client. Webhooks handled at `/api/webhooks/stripe`.
- **Resend**: Integrated via API key for transactional emails.
- **Supabase**: Connected via environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## Novel Pattern Designs

### **Transparency & Origin Module**

**Pattern Name**: `TransparencyModule`
**Purpose**: To visualize the "Factory-Direct" value proposition (Price Breakdown) and connect users to the maker.

**Components**:
1.  `PriceBreakdown`: Interactive bar chart component.
2.  `FactoryCard`: "Meet the Maker" profile snippet.
3.  `OriginMap`: Visual location indicator.

**Implementation Guide**:
- **Data Source**: Stored as `jsonb` in the `products` table column `transparency_data`.
- **Fetching**: Fetched alongside main product data in the Server Component.
- **Interaction**: Client component (`"use client"`) receives data props.
- **Performance**: Must load instantly (no separate fetch).

## Implementation Patterns

### Naming Conventions
- **Files**: `kebab-case.tsx` (e.g., `product-card.tsx`)
- **Components**: `PascalCase` (e.g., `ProductCard`)
- **Functions**: `camelCase` (e.g., `formatPrice`)
- **Database**: `snake_case` (e.g., `product_variants`)
- **Routes**: `kebab-case` (e.g., `/products/silk-dress`)

### Code Organization
- **UI Components**: Place in `src/components/ui` (generic) vs `src/components/feature` (specific).
- **Server Actions**: Place in `src/app/actions.ts` or co-located with features.
- **Types**: Generate database types using Supabase CLI.

### Error Handling
- **User Errors**: Display using `sonner` toast notifications.
- **System Errors**: Log to console (dev) or monitoring service (prod).
- **Boundaries**: Wrap major page sections in React Error Boundaries.

### Logging Strategy
- Use `console.error` for server-side errors.
- Structured logging for payment webhooks (critical for debugging).

## Data Architecture

**Key Tables (Simplified):**
- `profiles` (extends Auth users)
- `products` (catalog core)
- `product_variants` (sizes/colors)
- `orders` (transaction record)
- `order_items` (line items)
- `factory_stories` (content)

**Schema Note**: `products` table includes `transparency_data` (JSONB) for the novel UX pattern.

## Security Architecture
- **RLS (Row Level Security)**: Enabled on ALL Supabase tables.
- **Auth**: Supabase Auth handles session management.
- **Payments**: No card data touches our server (Stripe Elements).
- **Environment**: Secrets stored in `.env.local` (never committed).

## Performance Considerations
- **Images**: Use `next/image` with Supabase Storage loader.
- **Caching**: Aggressive caching on public product pages (ISR or standard fetch cache).
- **Bundles**: Dynamic imports for heavy components (e.g., Maps).

## Development Environment

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase CLI (optional but recommended)
- Stripe CLI (for webhook testing)

### Setup Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Stripe webhook listener
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Architecture Decision Records (ADRs)

1.  **ADR-001: Supabase as Backend** - Chosen for speed and integrated features (Auth/Storage) over separate AWS services.
2.  **ADR-002: Next.js App Router** - Chosen for Server Components performance and SEO benefits.
3.  **ADR-003: Stripe for Payments** - Chosen for superior UX control compared to PayPal redirect.
4.  **ADR-004: Zustand for State** - Chosen for simplicity and ease of persistence for the shopping cart.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-27_
_For: Bibek_
