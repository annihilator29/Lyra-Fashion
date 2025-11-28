# Story 3.3: Homepage Storytelling Elements

Status: ready-for-dev

## Story

As a Shopper,
I want to see the brand's story on the homepage,
so that I am immediately engaged.

## Acceptance Criteria

1. The homepage (`/`) displays a full-screen Hero section with video or high-res image.
2. The Hero section has a clear headline and "Shop Collection" CTA.
3. A "Value Proposition" section highlights: Factory Direct, Transparent Pricing, Premium Quality.
4. A "Featured Story" section links to the About page.
5. The layout is responsive and visually impactful.

## Tasks / Subtasks

- [ ] Implement Hero Section. (AC: 1, 2)
  - [ ] `src/components/home/hero-section.tsx`.
  - [ ] Use `next/image` (priority loading) or `<video>` tag.
- [ ] Implement Value Props Section. (AC: 3)
  - [ ] `src/components/home/value-props.tsx`.
  - [ ] 3-column grid with icons/text.
- [ ] Implement Featured Story Teaser. (AC: 4)
  - [ ] `src/components/home/story-teaser.tsx`.
  - [ ] Image + Text + "Read Our Story" link.
- [ ] Assemble Homepage. (AC: 5)
  - [ ] Update `src/app/page.tsx` to include these sections.

## Dev Notes

- **Architecture:**
  - **Hero:** Critical for LCP (Largest Contentful Paint). Optimize assets heavily.
  - **Video:** If using video, ensure it's muted, autoplay, loop, and has a poster image.
- **Design:**
  - This is the "storefront window". It needs to look expensive.

### References

- [Source: docs/tech-spec-epic-3.md#3.2 UI/UX Components]
- [Source: docs/epics.md#Story 3.3: Homepage Storytelling Elements]

## Dev Agent Record

### Context Reference

- docs/stories/3-3-homepage-storytelling-elements.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
