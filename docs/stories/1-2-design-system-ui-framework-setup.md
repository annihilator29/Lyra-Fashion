# Story 1.2: Design System & UI Framework Setup

Status: ready-for-dev

## Story

As a Designer/Dev,
I want to establish the core design tokens and UI components,
so that the application has a consistent look and feel matching the "Lyra Fashion" brand.

## Acceptance Criteria

1. Tailwind theme is configured with "Organic Modern" colors and fonts as per UX Specification.
2. Global styles (CSS variables) are defined in `globals.css` to support the theme.
3. Fonts (Inter for body, Playfair Display for headings) are configured and applied.
4. Basic shadcn/ui components (Button, Input, Card, Separator) are installed and styled.
5. A temporary `/design-system` route exists to visually verify the design system implementation.

## Tasks / Subtasks

- [ ] Install and initialize shadcn/ui. (AC: 4)
  - [ ] Run `npx shadcn@latest init`
  - [ ] Configure to use `src/components/ui` and `src/lib/utils.ts`
- [ ] Configure Fonts using `next/font`. (AC: 3)
  - [ ] Import `Inter` and `Playfair_Display` in `src/app/layout.tsx`
  - [ ] Define CSS variables for fonts (e.g., `--font-sans`, `--font-serif`)
- [ ] Update `tailwind.config.ts` and `globals.css` with "Organic Modern" theme. (AC: 1, 2)
  - [ ] Define colors: Primary Bg (`#F9F8F6`), Secondary Bg (`#EBE9E4`), Text (`#2C2C2C`), Accent (`#5D6D5B`), Border (`#D8D6D1`)
  - [ ] Map Tailwind colors (`background`, `foreground`, `primary`, etc.) to these variables
- [ ] Install core UI components. (AC: 4)
  - [ ] `npx shadcn@latest add button input card separator`
  - [ ] Verify border radius settings (4px or 0px per spec)
- [ ] Create verification page. (AC: 5)
  - [ ] Create `src/app/design-system/page.tsx`
  - [ ] Add examples of Typography, Buttons, Inputs, and Cards
- [ ] Verify responsiveness and accessibility (contrast).

## Dev Notes

- **UX Specification Reference:**
  - **Theme:** Organic Modern
  - **Colors:**
    - Primary Background: `#F9F8F6`
    - Secondary Background: `#EBE9E4`
    - Text: `#2C2C2C`
    - Accent: `#5D6D5B`
    - Border: `#D8D6D1`
  - **Typography:**
    - Headings: Playfair Display (`font-serif`)
    - Body: Inter (`font-sans`)
  - **Radius:** `0.25rem` (4px) or `0px`
- **Architecture:**
  - Components go in `src/components/ui`.
  - Utils in `src/lib/utils.ts`.

### Project Structure Notes

- Ensure `src/components/ui` is populated by the CLI.
- `globals.css` is typically in `src/app/globals.css`.

### References

- [Source: docs/ux-design-specification.md#3.1 Color System]
- [Source: docs/ux-design-specification.md#6.1 Component Strategy]
- [Source: docs/epics.md#Story 1.2: Design System & UI Framework Setup]

## Dev Agent Record

### Context Reference

- docs/stories/1-2-design-system-ui-framework-setup.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log References

### Completion Notes List

### File List
