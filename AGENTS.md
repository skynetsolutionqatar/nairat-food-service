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
11. Tech Stack: Next.js (App Router), Tailwind CSS, TypeScript, GSAP, Lenis, Framer Motion, Lucide React, and Sanity CMS (Phase 2).

## Skills

Always load frontend-design and web-design-guidelines

## Planning

For creating specs use tracer bullet approach.

> Tracer bullets comes from the Pragmatic Programmer. When building systems, you want to write code that gets you feedback as quickly as possible. Tracer bullets are small slices of functionality that go through all layers of the system, allowing you to test and validate your approach early. This helps in identifying potential issues and ensures that the overall architecture is sound before investing significant item in development.

create specs in `/specs/`. maintain a `PROGRESS.md` file to track progress of implementation phases.

Phased Execution Rules:
- Phase 1: Build the complete interactive frontend website (in English).
- Phase 2: Implement bilingual support (Arabic/RTL) and integrate Sanity CMS.
- Phase 1 must be fully completed and verified before starting Phase 2.

## Commit / PR

- Always use conventional commits
- commit the spec before you begin
- Reconcile the spec after implementation

## Testing

Use agent-browser to test e2e.
