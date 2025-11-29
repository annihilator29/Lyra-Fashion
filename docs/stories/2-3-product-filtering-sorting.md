# Story 2.3: Product Filtering & Sorting

Status: review

## Story

As a Shopper,
I want to filter and sort products,
so that I can easily find items that match my preferences.

## Acceptance Criteria

1. Sidebar or top bar allows filtering by Category (e.g., Dresses, Tops).
2. Users can sort products by "Price: Low to High", "Price: High to Low", and "Newest".
3. Filter and Sort state is synchronized with the URL (e.g., `?category=dresses&sort=price_asc`).
4. Changing filters updates the product grid without a full page reload (Client-side navigation or Server Action).
5. "Clear All" button resets filters.
6. Mobile users have a collapsible filter drawer.

## Tasks / Subtasks

- [x] Implement Filter UI. (AC: 1, 6) ✅ COMPLETED
  - [x] Create `src/components/shop/filter-sidebar.tsx`. ✅ CREATED
  - [x] Implement category filtering with responsive design. ✅ IMPLEMENTED
  - [x] Implement mobile drawer (Sheet component). ✅ IMPLEMENTED
- [x] Implement Sort UI. (AC: 2) ✅ COMPLETED
  - [x] Create `src/components/shop/sort-dropdown.tsx`. ✅ CREATED
  - [x] Use custom select component with all sort options. ✅ IMPLEMENTED
- [x] Implement URL State Management. (AC: 3) ✅ COMPLETED
  - [x] Use `useSearchParams` + `useRouter` to manage state. ✅ IMPLEMENTED
  - [x] Ensure back button works correctly. ✅ IMPLEMENTED
- [x] Connect to Data Fetching. (AC: 4) ✅ COMPLETED
  - [x] Update `getProducts` in `src/lib/api/products.ts` to accept filter/sort params. ✅ UPDATED
  - [x] Update `src/app/shop/page.tsx` to pass search params to `getProducts`. ✅ UPDATED
- [x] Add "Clear All" functionality. (AC: 5) ✅ COMPLETED
  - [x] "Clear All" button resets all filters. ✅ IMPLEMENTED

## Dev Notes

- **Architecture:**
  - **URL-Driven State:** This is critical for shareability and SEO.
  - **Server Components:** The page receives search params and fetches data.
  - **Client Components:** Filter/Sort UI updates the URL.
- **Libraries:**
  - `nuqs` (Next.js URL Query States) is recommended for type-safe search params.

### References

- [Source: docs/tech-spec-epic-2.md#3.3 UI/UX Components]
- [Source: docs/epics.md#Story 2.3: Product Filtering & Sorting]

## Dev Agent Record

### Context Reference

- docs/stories/2-3-product-filtering-sorting.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log

**Implementation Plan:**
1. Update API layer to support filtering and sorting parameters
2. Create filter sidebar component with category selection
3. Create sort dropdown component with multiple options
4. Integrate filtering and sorting into main shop page
5. Implement URL state management for shareable filters

**Implementation Steps Completed:**
- Updated `src/lib/api/products.ts` to accept category and sortBy parameters
- Created `src/components/shop/filter-sidebar.tsx` with responsive design
- Created `src/components/shop/sort-dropdown.tsx` with 5 sort options
- Updated `src/app/shop/page.tsx` to integrate filter and sort functionality
- Implemented mobile filter drawer for better UX
- Added "Clear All" functionality to reset filters

**Technical Features:**
- URL-driven state management for shareable filter states
- Responsive design: desktop sidebar + mobile drawer
- Client-side navigation without full page reloads
- Back button support via URL parameters
- Product count display with current filters applied

### Completion Notes

✅ Successfully implemented comprehensive filtering and sorting functionality for the Product Listing Page.

**Key Accomplishments:**
- Created reusable filter sidebar with category selection
- Built sort dropdown with 5 sorting options (Newest, Price Low-High, Price High-Low, Name A-Z, Name Z-A)
- Implemented URL state management for shareable filter states
- Added responsive mobile filter drawer
- Integrated "Clear All" functionality
- Enhanced API layer to support filtering and sorting parameters

**Technical Implementation:**
- URL-driven state using useSearchParams and useRouter
- Server Components for data fetching with client components for UI
- Responsive grid layout with collapsible sidebar on mobile
- Real-time product count updates based on applied filters
- Proper URL synchronization for sharing and browser navigation

**Files Created/Modified:**
- `src/lib/api/products.ts` - Updated to support filtering and sorting
- `src/components/shop/filter-sidebar.tsx` - New filter component
- `src/components/shop/sort-dropdown.tsx` - New sort component  
- `src/app/shop/page.tsx` - Updated to integrate filtering/sorting

**User Experience Features:**
- Mobile-friendly filter drawer
- Real-time product count updates
- Clear visual indication of active filters
- Intuitive "Clear All" functionality
- Shareable URLs for specific filter combinations

**Ready for:** Product search implementation in next story

### File List

**New Files Created:**
- `src/components/shop/filter-sidebar.tsx` - Responsive filter sidebar with mobile drawer
- `src/components/shop/sort-dropdown.tsx` - Sort dropdown with 5 options

**Modified Files:**
- `src/lib/api/products.ts` - Updated to support filtering and sorting parameters
- `src/app/shop/page.tsx` - Integrated filtering and sorting functionality

### Change Log

- **2025-11-28**: Initial implementation - Added comprehensive filtering and sorting with URL state management
