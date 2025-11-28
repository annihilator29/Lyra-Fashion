# Technical Specification: Epic 3 - Craftsmanship & Storytelling

## 1. Overview
**Epic:** 3 - Craftsmanship & Storytelling
**Goal:** Differentiate Lyra Fashion by highlighting the factory-direct quality, transparency, and production process through rich storytelling and visual content.
**Key Features:** Rich Product Details (Craftsmanship), About Factory Page, Homepage Hero & Storytelling.

## 2. Scope
### 2.1 In-Scope
- **PDP Enhancements:** "Craftsmanship Story" section on Product Detail Pages.
- **About Page:** A dedicated page telling the factory's story.
- **Homepage:** Hero section and "Why Us" storytelling blocks.
- **Data Model:** Extending `products` to support rich content (or a separate `product_stories` table/jsonb).

### 2.2 Out-of-Scope
- User-generated content (Reviews/Photos).
- Blog/Editorial platform (CMS integration is future work).
- Video streaming hosting (will use embedded or simple hosted video assets).

## 3. Detailed Design

### 3.1 Data Models (Supabase)

**Table: `products` (Update)**
- `craftsmanship_content` (jsonb) - Structure:
  ```json
  {
    "origin_story": "Hand-stitched in Milan...",
    "material_details": "100% Organic Cotton...",
    "artisan_note": "Crafted by Marco...",
    "images": ["url1", "url2"]
  }
  ```

### 3.2 UI/UX Components

**Product Detail Page (PDP):**
- **CraftsmanshipSection:** A visually distinct section below the fold.
  - Layout: Split screen (Text + Image) or Full-width banner.
  - Content: Origin, Materials, Artisan details.

**About Page (`/about`):**
- **FactoryHero:** Large immersive image of the factory floor.
- **Timeline:** Visual history of the factory.
- **TeamGrid:** Photos of key artisans/makers.

**Homepage (`/`):**
- **HeroSection:** Full-screen video/image, Headline, CTA ("Shop Collection").
- **ValueProps:** 3-column grid (Factory Direct, Transparent Pricing, Premium Quality).
- **FeaturedStory:** A teaser linking to the About page.

## 4. Non-Functional Requirements
- **Performance:** Large images must be optimized (WebP/AVIF) and lazy-loaded.
- **Accessibility:** All storytelling images must have descriptive `alt` text.
- **Responsiveness:** Storytelling layouts must stack gracefully on mobile.

## 5. Dependencies
- `framer-motion` (optional but recommended) for subtle scroll animations.
- `lucide-react` for icons.

## 6. Acceptance Criteria
- PDPs display unique craftsmanship stories for products.
- The About page effectively communicates the brand's heritage.
- The Homepage immediately establishes the "Factory Direct" value proposition.
