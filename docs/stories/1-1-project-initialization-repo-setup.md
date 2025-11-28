# Story 1.1: Project Initialization & Repo Setup

Status: ready-for-dev

## Story

As a Developer,
I want to set up the project repository and development environment,
so that the team can start collaborating on a stable codebase.

## Acceptance Criteria

1. Project initializes with Next.js 15, TypeScript, and Tailwind CSS.
2. Application runs locally on port 3000 without errors.
3. Folder structure follows the `/src` directory pattern as defined in Architecture.
4. Linting (ESLint) and formatting (Prettier) commands run successfully.
5. Git repository is initialized with a proper `.gitignore`.

## Tasks / Subtasks

- [ ] Initialize Next.js 15 project using `create-next-app` with TypeScript, Tailwind, and App Router. (AC: 1, 3)
  - [ ] Run `npx create-next-app@latest lyra-fashion --typescript --tailwind --app --src-dir`
  - [ ] Ensure `package.json` reflects Next.js 15+ and React 19+ (RC/Latest)
- [ ] Verify folder structure matches architecture guidelines. (AC: 3)
  - [ ] Confirm existence of `src/app`, `src/components`, `src/lib`
  - [ ] Create placeholder directories if not generated automatically
- [ ] Configure ESLint and Prettier. (AC: 4)
  - [ ] Verify `npm run lint` passes
  - [ ] Add `.prettierrc` if needed for consistent formatting
- [ ] Initialize Git repository and configure `.gitignore`. (AC: 5)
  - [ ] `git init`
  - [ ] Ensure `.env.local` and `node_modules` are ignored
- [ ] Verify application runs locally on port 3000. (AC: 2)
  - [ ] Run `npm run dev`
  - [ ] Check `localhost:3000` in browser
- [ ] Commit initial setup to `main` branch. (AC: 5)

## Dev Notes

- **Architecture Patterns:**
  - Use the **App Router** (`src/app`).
  - Use **Tailwind CSS v4** (or latest stable) for styling.
  - Follow the **`/src` directory** convention.
- **Source Tree Components:**
  - `package.json`: Dependencies
  - `next.config.ts`: Next.js configuration
  - `tailwind.config.ts`: Tailwind configuration
  - `src/app/layout.tsx`: Root layout
  - `src/app/page.tsx`: Home page
- **Testing Standards:**
  - Basic "Smoke Test": Application loads without console errors.

### Project Structure Notes

- Alignment with unified project structure:
  - `src/app/` for routes
  - `src/components/ui/` for shadcn/ui (to be added in next story, but folder can exist)
  - `src/lib/` for utilities

### References

- [Source: docs/tech-spec-epic-1.md#1.2 In-Scope]
- [Source: docs/epics.md#Story 1.1: Project Initialization & Repo Setup]
- [Source: docs/architecture.md#Project Initialization]

## Dev Agent Record

### Context Reference

- docs/stories/1-1-project-initialization-repo-setup.context.xml

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log References

### Completion Notes List

### File List
