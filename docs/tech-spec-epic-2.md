# Technical Specification: Epic 2 - Product Discovery

## 1. Overview
**Epic:** 2 - Product Discovery
**Goal:** Enable users to browse, search, and view products with a focus on transparency and quality.
**Key Features:** Product Data Model, Product Listing Page (PLP), Filtering/Sorting, Search, Product Detail Page (PDP).

## 2. Scope
### 2.1 In-Scope
- **Database:** `products` table population with seed data.
- **PLP:** Grid view of products with images, prices, and basic info.
- **Filtering:** Category, Price Range, Size, Color.
- **Sorting:** Price (Low/High), Newest.
- **Search:** Keyword search for product names and descriptions.
- **PDP:** Detailed view of a single product (images, description, price, transparency data).

### 2.2 Out-of-Scope
- Shopping Cart (Epic 5)
- User Reviews (Future)
- Admin Management (Epic 7)

## 3. Detailed Design

### 3.1 Data Models (Supabase)

**Table: `products`**
- `id` (uuid, PK)
- `name` (text)
- `slug` (text, unique)
- `description` (text)
- `price` (integer, cents)
- `sale_price` (integer, cents, nullable)
- `images` (text[], URLs)
- `category` (text)
- `attributes` (jsonb) - { color, size, material, fit }
- `transparency_data` (jsonb) - { fabric_cost, labor_cost, transport_cost, markup }
- `factory_id` (text)
- `created_at` (timestamp)

**Table: `categories` (Optional for MVP, can be hardcoded or distinct query)**
- For MVP, we will likely use distinct values from `products.category`.

### 3.2 APIs & Interfaces

**Server Actions / Data Fetching:**
- `getProducts(filter?: FilterOptions)`: Fetches products with optional filters.
- `getProductBySlug(slug: string)`: Fetches single product details.
- `searchProducts(query: string)`: Full-text search on name/description.

**URL Structure:**
- PLP: `/shop`
- PLP with Category: `/shop/[category]`
- PDP: `/shop/product/[slug]`

### 3.3 UI/UX Components
- **ProductCard:** Image, Name, Price, "Quick Add" (future).
- **FilterSidebar:** Accordion style filters.
- **SortDropdown:** Select input.
- **SearchBar:** Input with debounce.
- **ProductGallery:** Image carousel/grid on PDP.
- **TransparencyCard:** Visual breakdown of costs (PDP).

## 4. Non-Functional Requirements
- **Performance:** PLP should load in < 1.5s (LCP). Use Server Components.
- **SEO:** Proper metadata for PLP and PDP (Title, Description, OG Images).
- **Responsiveness:** Mobile-first design. Grid adapts (1 col mobile -> 4 col desktop).

## 5. Dependencies
- `lucide-react` for icons.
- `nuqs` (or similar) for URL search params state management.
- `use-debounce` for search input.

## 6. Acceptance Criteria
- Users can view all products in a grid.
- Users can filter by category, price, and attributes.
- Users can search for products.
- Users can click a product to see full details.
- Transparency data is visible on PDP.
