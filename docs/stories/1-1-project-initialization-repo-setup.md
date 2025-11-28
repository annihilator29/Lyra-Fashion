# Story 1.1: Project Initialization & Repo Setup

Status: review

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

- [x] Initialize Next.js 15 project using `create-next-app` with TypeScript, Tailwind, and App Router. (AC: 1, 3)
  - [x] Run `npx create-next-app@latest lyra-fashion --typescript --tailwind --app --src-dir`
  - [x] Ensure `package.json` reflects Next.js 15+ and React 19+ (RC/Latest)
- [x] Verify folder structure matches architecture guidelines. (AC: 3)
  - [x] Confirm existence of `src/app`, `src/components`, `src/lib`
  - [x] Create placeholder directories if not generated automatically
- [x] Configure ESLint and Prettier. (AC: 4)
  - [x] Verify `npm run lint` passes
  - [x] Add `.prettierrc` if needed for consistent formatting
- [x] Initialize Git repository and configure `.gitignore`. (AC: 5)
  - [x] `git init`
  - [x] Ensure `.env.local` and `node_modules` are ignored
- [x] Verify application runs locally on port 3000. (AC: 2)
  - [x] Run `npm run dev`
  - [x] Check `localhost:3000` in browser
- [x] Commit initial setup to `main` branch. (AC: 5)

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

- Initialized Next.js project in `lyra-fashion` directory.
- Verified dependencies: Next.js 16, React 19, Tailwind 4.
- Verified folder structure: `src/app`, `src/components`, `src/lib`, `src/components/ui`.
- Added `.prettierrc`.
- Verified linting passes.
- Committed initial setup.

### File List

- lyra-fashion/package.json
- lyra-fashion/.prettierrc
- lyra-fashion/.gitignore
- lyra-fashion/next.config.ts
- lyra-fashion/tailwind.config.ts
- lyra-fashion/src/app/layout.tsx
- lyra-fashion/src/app/page.tsx
- lyra-fashion/src/app/globals.css
- lyra-fashion/README.md
- lyra-fashion/tsconfig.json
- lyra-fashion/postcss.config.mjs
- lyra-fashion/eslint.config.mjs
