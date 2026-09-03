# Project Execution & Phase Plan

The development of the Nairat Food Services website is structured into three distinct phases:

1. **Phase 1: Landing Page** (Completed)
2. **Phase 2: Page Creation Phase** (Separate pages for Company, Our Products, Services, Sourcing & Quality, Partners, Contact Us)
3. **Phase 3: RTL and Sanity Phase** (Bilingual Arabic/RTL Support & Sanity Headless CMS)

---

## Phase 1: Landing Page (Completed)

The focus of this phase was delivering the complete high-fidelity marketing landing page in English. All interactive modules, responsive layouts, and visual styling match the design mockup.

### Milestone 1: Setup & Foundations
*   Initialized Next.js with TypeScript, Tailwind CSS, Lenis, and GSAP.
*   Configured Tailwind theme configuration with brand design tokens and Manrope editorial typography.
*   Established layout foundations (Header, Footer, layout wrapping, smooth scroll).

### Milestone 2: Core Modules & Interactive Features
*   Built Hero section with full visual assets and responsive metrics.
*   Implemented sliding Partners Carousel with logos.
*   Created "Who We Are" and "Our Strengths" 5-cell grid modules.
*   Implemented "What We Do" service cards with interactive details.
*   Built Products Carousel with category filter tabs.
*   Created Global Sourcing interactive SVG World Map.
*   Built Quality timeline and Certificate modal lightbox popups.
*   Created interactive full-bleed CTA section with expandable corporate inquiry form.

### Milestone 3: Polish & Verification
*   Applied Web Interface Guidelines accessibility checklist.
*   Conducted E2E testing using `agent-browser` for responsiveness, keyboard navigation, and transitions.

---

## Phase 2: Page Creation Phase

In this phase, we build separate dedicated pages for the website in English. Each page is planned, developed, and verified **one by one in strict sequential order**. Content and structure will be planned before code implementation.

### Sequential Order of Pages:

1. **Page 1: Company (`/company`)**
   - **Content Planning**: Detailed corporate history, leadership team, mission & vision statements, company values, warehouse & cold-storage infrastructure.
   - **Spec**: Create `specs/page-company.md`.
   - **Development**: Dedicated Next.js page route, interactive timeline/milestones, facility showcase.
   - **Verification**: Route testing, responsive layouts, `agent-browser` validation.

2. **Page 2: Our Products (`/products`)**
   - **Content Planning**: Comprehensive produce catalog, origin country matrix, seasonal availability calendar, grading and packaging specifications.
   - **Spec**: Create `specs/page-products.md`.
   - **Development**: Dedicated Next.js page route, category and origin filtering, product search, wholesale inquiry actions.
   - **Verification**: Search/filter interaction, image optimization, responsive grid.

3. **Page 3: Services (`/services`)**
   - **Content Planning**: Wholesale produce supply, institutional & HORECA catering supply, temperature-controlled cold-chain logistics, customized repacking.
   - **Spec**: Create `specs/page-services.md`.
   - **Development**: Dedicated Next.js page route, service breakdown modules, cold-chain SLA diagrams, sector-specific solutions.
   - **Verification**: Interactive feature checks, accessibility, performance.

4. **Page 4: Sourcing & Quality (`/quality`)**
   - **Content Planning**: Farm-level auditing protocols, food safety certifications (ISO, HACCP), laboratory testing workflows, cold chain temperature controls, traceability.
   - **Spec**: Create `specs/page-quality.md`.
   - **Development**: Dedicated Next.js page route, certificate preview and download modal, interactive compliance checkpoints.
   - **Verification**: Lightbox modals, mobile responsiveness.

5. **Page 5: Partners (`/partners`)**
   - **Content Planning**: Client portfolio (supermarkets, luxury hotels, government entities), partnership tiers, supplier onboarding guidelines.
   - **Spec**: Create `specs/page-partners.md`.
   - **Development**: Dedicated Next.js page route, partner showcase, supplier application form.
   - **Verification**: Form validation, responsive layouts, full site navigation consistency.

6. **Page 6: Contact Us (`/contact`)**
   - **Content Planning**: Multi-department contact directory (Procurement, Operations, Careers, General), headquarters & cold-storage facility address with interactive Google Maps integration, direct contact channels (Phone, WhatsApp, Email), comprehensive corporate inquiry form.
   - **Spec**: Create `specs/page-contact.md`.
   - **Development**: Dedicated Next.js page route, interactive inquiry form with validation, office location card, direct call/WhatsApp action triggers.
   - **Verification**: Form validation and error states, accessibility, mobile responsiveness.

### Standard Workflow per Page:
1. **Content Planning & Architecture**: Align on copy, structure, data models, and visual assets with user.
2. **Tracer-Bullet Spec**: Draft and commit the dedicated spec in `/specs/`.
3. **Component & Route Development**: Build the page using Next.js App Router, reusing core design system tokens.
4. **Navigation Integration**: Update Header and Footer navigation links to route between landing anchors and dedicated pages.
5. **Testing & Verification**: Validate using `agent-browser` (interactions, a11y, performance) before proceeding to the next page.

---

## Phase 3: RTL and Sanity Phase

Once all 6 English standalone pages are built, verified, and approved, we implement bilingual support and headless CMS integration across the entire multi-page site.

### Milestone 1: RTL & Bilingual Implementation
*   Integrate subpath internationalization (English `/` and Arabic `/ar/`).
*   Add dynamic HTML `dir="rtl"` attribute bindings and Arabic typography (Cairo font).
*   Ensure all dedicated pages mirror seamlessly with CSS logical properties (`ms-*`, `pe-*`, `start-*`).
*   Inject accurate Arabic translations across all 6 dedicated pages and landing page (7 total pages).

### Milestone 2: Sanity Headless CMS Integration
*   Configure Sanity Studio and deploy schemas (Company, Products, Services, Quality, Partners, Contact/Inquiries).
*   Replace static page content with dynamic GROQ query hooks.
*   Set up incremental static regeneration (ISR) with cache revalidation webhooks.

### Milestone 3: Full-Site Verification
*   Test bidirectional layout flows across all routes using `agent-browser`.
*   Validate instant content updates upon CMS publishing.
