# Implementation

Guidelines for writing good code for developer:

1. Choose clean code over clever code.
2. Write object oriented code as much as possible.
3. Keep function size small, ideally 10 lines.
4. Try and keep files between 100 and 300 lines.
5. Don't keep too many files in a folder or module. Try and keep it under 15.
6. Avoid abbrevations.
7. Use standard API as much as possible.
8. Reuse. Write as little code as possible.
9. Use frontend-design, web-design-guidelines for uI
10. Always write tests, and make sure they work.
11. Tech Stack: Next.js (App Router), Tailwind CSS, TypeScript, GSAP, Lenis, Framer Motion, Lucide React, and Sanity CMS (Phase 3).

## Skills

Always load frontend-design and web-design-guidelines

## Planning

For creating specs use tracer bullet approach.

> Tracer bullets comes from the Pragmatic Programmer. When building systems, you want to write code that gets you feedback as quickly as possible. Tracer bullets are small slices of functionality that go through all layers of the system, allowing you to test and validate your approach early. This helps in identifying potential issues and ensures that the overall architecture is sound before investing significant item in development.

create specs in `/specs/`. maintain a `PROGRESS.md` file to track progress of implementation phases.

Phased Execution Rules:
- Phase 1: Landing Page (in English) [Completed].
- Phase 2: Page Creation Phase (in English) — build separate pages one by one in sequential order:
  1. Company
  2. Our Products
  3. Services
  4. Sourcing & Quality
  5. Partners
  6. Contact Us
  (Each page planned with content and specs, then developed and verified individually before moving to the next).
- Phase 3: RTL and Sanity Phase — implement bilingual support (Arabic/RTL) and integrate Sanity CMS across all pages.
- Each phase must be fully completed and verified before starting the next phase.

## Commit / PR

- Always use conventional commits
- commit the spec before you begin
- Reconcile the spec after implementation

## Testing

Use agent-browser to test e2e.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
