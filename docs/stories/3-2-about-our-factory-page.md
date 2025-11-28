# Story 3.2: "About Our Factory" Page

Status: ready-for-dev

## Story

As a Shopper,
I want to learn about the factory,
so that I trust the brand's ethical and quality standards.

## Acceptance Criteria

1. A static page exists at `/about`.
2. The page includes a "Hero" section with an immersive factory image.
3. The page includes a "Timeline" or "History" section.
4. The page includes a "Meet the Team" grid with photos of artisans.
5. The design matches the "Organic Modern" aesthetic (Serif headings, generous whitespace).
6. The page is fully responsive.

## Tasks / Subtasks

- [ ] Create About Page Layout. (AC: 1)
  - [ ] `src/app/about/page.tsx`.
- [ ] Implement Hero Section. (AC: 2)
  - [ ] Full-width image with overlay text.
- [ ] Implement Timeline Section. (AC: 3)
  - [ ] Vertical or horizontal timeline showing key milestones.
- [ ] Implement Team Grid. (AC: 4)
  - [ ] Grid of cards with Photo, Name, and Role.
- [ ] Add Content. (AC: 5)
  - [ ] Use placeholder text/images if real content isn't available, but structure it for storytelling.

## Dev Notes

- **Architecture:**
  - This is a static page (mostly). Use Server Components.
- **Assets:**
  - Need high-quality assets. Use Unsplash "factory" or "tailor" images as placeholders.
- **Components:**
  - Reuse `src/components/ui` primitives where possible, but this page likely needs custom "Story" components.

### References

- [Source: docs/tech-spec-epic-3.md#3.2 UI/UX Components]
- [Source: docs/epics.md#Story 3.2: "About Our Factory" Page]

## Dev Agent Record

### Context Reference

- docs/stories/3-2-about-our-factory-page.context.xml

### Agent Model Used

Antigravity (Google Deepmind)
