# Story 2.2: Product Listing Page (PLP)

Status: review

## Story

As a User,
I want to browse a list of products,
so that I can see what items are available for purchase.

## Acceptance Criteria

1. A `/shop` page exists and displays a grid of products.
2. Products are fetched from Supabase using Server Components.
3. Each product card displays: Image, Name, Price, and Category.
4. The grid is responsive (1 column mobile, 2 tablet, 3-4 desktop).
5. Loading skeletons are shown while data is fetching.
6. Basic error handling (e.g., "Failed to load products") is implemented.

## Tasks / Subtasks

- [x] Create Product Card Component. (AC: 3) ✅ COMPLETED
  - [x] `src/components/product/product-card.tsx` ✅ CREATED
  - [x] Use `next/image` for optimized images. ✅ IMPLEMENTED
  - [x] Display Name, Price (formatted), Category. ✅ IMPLEMENTED
- [x] Implement Data Fetching. (AC: 2) ✅ COMPLETED
  - [x] Create `src/lib/api/products.ts` with `getProducts()`. ✅ CREATED
  - [x] Use `supabase-js` to select `*` from `products`. ✅ IMPLEMENTED
- [x] Build PLP Page. (AC: 1, 4) ✅ COMPLETED
  - [x] `src/app/shop/page.tsx` ✅ CREATED
  - [x] Use CSS Grid for layout. ✅ IMPLEMENTED (responsive grid)
  - [x] Map over products and render `ProductCard`. ✅ IMPLEMENTED
- [x] Add Loading State. (AC: 5) ✅ COMPLETED
  - [x] Create `src/app/shop/loading.tsx` with skeleton cards. ✅ CREATED
- [x] Add Error State. (AC: 6) ✅ COMPLETED
  - [x] Create `src/app/shop/error.tsx`. ✅ CREATED

## Dev Notes

- **Architecture:**
  - Use **React Server Components (RSC)** for the page.
  - Fetch data directly in the component or via a lib helper.
  - **Styling:** Tailwind Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- **Performance:**
  - Ensure images are sized correctly (`sizes` prop in `next/image`).

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/epics.md#Story 2.2: Product Listing Page (PLP)]

## Dev Agent Record

### Context Reference

- docs/stories/2-2-product-listing-page-plp.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log

**Implementation Plan:**
1. Create Product Card Component with image, name, price, and category
2. Implement API layer for fetching products from Supabase
3. Build the main PLP page using React Server Components
4. Add loading and error states for better UX

**Implementation Steps Completed:**
- Created `src/components/product/product-card.tsx` with responsive design
- Created `src/lib/api/products.ts` with multiple query functions
- Created `src/app/shop/page.tsx` using RSC and Suspense
- Created `src/app/shop/loading.tsx` with skeleton cards
- Created `src/app/shop/error.tsx` with retry functionality

**Key Features Implemented:**
- Responsive grid layout (1 col mobile, 2 tablet, 3-4 desktop)
- Server-side data fetching with error handling
- Loading states with skeleton UI
- Product cards with optimized images using next/image
- Currency formatting and category badges
- Error recovery with retry and home navigation

### Completion Notes

✅ Successfully implemented Product Listing Page (PLP) with all acceptance criteria satisfied.

**Key Accomplishments:**
- Created reusable ProductCard component with optimized images
- Implemented comprehensive API layer with multiple query methods
- Built responsive PLP page using React Server Components
- Added loading and error states for optimal UX
- Used CSS Grid with Tailwind for responsive layout

**Technical Implementation:**
- React Server Components for server-side data fetching
- Suspense boundaries for loading state management
- Type-safe Supabase integration with proper error handling
- Responsive design using Tailwind CSS grid utilities
- next/image for optimized image loading with proper sizes

**Files Created:**
- `src/components/product/product-card.tsx` - Reusable product card component
- `src/lib/api/products.ts` - API layer with multiple query functions
- `src/app/shop/page.tsx` - Main PLP page using RSC
- `src/app/shop/loading.tsx` - Loading state with skeletons
- `src/app/shop/error.tsx` - Error handling with retry functionality

**Performance Features:**
- Optimized images with next/image component
- Server-side rendering for better SEO and initial load
- Proper image sizing with sizes prop for different breakpoints
- Lazy loading and skeleton states during data fetching

**Ready for:** Product filtering and sorting features in next story

### File List

**New Files Created:**
- `src/components/product/product-card.tsx` - Reusable product card with optimized images
- `src/lib/api/products.ts` - API layer with product queries and filters
- `src/app/shop/page.tsx` - Main PLP page using React Server Components
- `src/app/shop/loading.tsx` - Loading state with skeleton placeholders
- `src/app/shop/error.tsx` - Error handling with recovery options

### Change Log

- **2025-11-28**: Initial implementation - Created complete PLP with all required components and states
