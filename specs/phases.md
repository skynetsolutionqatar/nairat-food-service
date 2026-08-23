# Project Execution & Phase Plan

The development of the Nairat Food Services website is split into two distinct phases. This ensures a fast, reliable launch of the core interactive site followed by localization and CMS features.

---

## Phase 1: Complete English Interactive Website

The focus of this phase is delivering the complete high-fidelity marketing landing page in English. All interactive modules and visual styling must match the design mockup exactly.

### Milestone 1: Setup & Foundations
*   Initialize Next.js with TypeScript, Tailwind CSS, Lenis, and GSAP.
*   Configure Tailwind config with the exact color palette, typography tokens, and containers.
*   Establish layout components (Header, Footer, layout wrapping).

### Milestone 2: Core Components & Layout Sections
*   Build the Hero section with transparent overlay header.
*   Implement the infinite-scroll / sliding Partners Carousel.
*   Create the "Who We Are" and "Our Strengths" split and grid modules.
*   Implement "What We Do" service cards.

### Milestone 3: Interactive Visual Features
*   **Products Carousel**: Build category filter tabs with slide transitions.
*   **Global Sourcing Interactive Map**: Program an SVG world map where clicking continent buttons highlights countries and displays custom stats.
*   **Certificates Modal**: Implement interactive viewer popups for certificates.
*   **Process Timeline**: Create scroll-linked or animated timeline.

### Milestone 4: E2E Verification & Polish
*   Apply the Web Interface Guidelines accessibility checklist.
*   Perform E2E testing using `agent-browser` for responsiveness, keyboard navigation, and transitions.
*   Optimize Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

---

## Phase 2: Bilingual (Arabic) & Sanity CMS Integration

Once the interactive client layout is fully validated, we will layer in localization and content management.

### Milestone 1: Bilingual Routing & RTL
*   Integrate `next-intl` (or subpath internationalization).
*   Add dynamic HTML `dir="rtl"` attribute bindings based on routing.
*   Refactor margins/paddings to use logical properties (`ms-*`, `pe-*`, `start-*`).
*   Inject Arabic translations and Cairo display font for Arabic users.

### Milestone 2: Headless CMS Integration
*   Configure Sanity Studio and deploy schemas (Produce, Certificates, Partners, Metrics).
*   Replace local static mock data in components with dynamic GROQ query hooks.
*   Set up incremental static regeneration (ISR) with cache revalidation webhooks.

### Milestone 3: Validation
*   Test bidirectional layout flows using `agent-browser`.
*   Validate revalidation webhooks upon CMS publishing.
