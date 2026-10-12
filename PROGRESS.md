# Project Progress Tracker

This document tracks the implementation progress of the Nairat Food Services website across all three scheduled phases:

- **Phase 1: Landing Page** [Completed]
- **Phase 2: Page Creation Phase** [Completed]
- **Phase 3: RTL and Sanity Phase** [Completed]

---

## Phase 1: Landing Page (Completed)

- [x] **Milestone 1: Design Analysis & Specifications**
  - [x] Analyze `nairat design.png` and compare against existing live site `nairatfoodservices.com`
  - [x] Create [specs/design.md](file:///home/sfwnmuhd/Desktop/nairat/specs/design.md) (Design Tokens, Wireframes, agent-browser testing plan)
  - [x] Create [specs/architecture.md](file:///home/sfwnmuhd/Desktop/nairat/specs/architecture.md) (Tech stack, bilingual & CMS architecture)
  - [x] Create [specs/phases.md](file:///home/sfwnmuhd/Desktop/nairat/specs/phases.md) (Detailed milestone phase plan)
- [x] **Milestone 2: Setup & Foundations**
  - [x] Initialize Next.js project with TypeScript, Tailwind CSS, Lenis, and GSAP
  - [x] Configure Tailwind theme configuration with brand design tokens
  - [x] Configure global layouts, typography base, and navigation scaffolding
- [x] **Milestone 3: Core UI Development**
  - [x] Implement Navbar & Hero sections
  - [x] Implement Partner logos carousel
  - [x] Implement "Who We Are" overview + three vertical metric cards
  - [x] Implement "Our Strengths" 5-cell grid with image triggers
  - [x] Implement "What We Do" service cards
- [x] **Milestone 4: Advanced Interactive Features**
  - [x] Implement "Our Products" carousel with category tabs filtering
  - [x] Implement "Global Sourcing" Interactive SVG World Map
  - [x] Implement Certificates popup preview modals
  - [x] Implement Quality supply-chain process timeline & Footer
- [x] **Milestone 5: E2E Verification & Figma Alignment Polish**
  - [x] Audit UI against Web Interface Guidelines checklist
  - [x] Align every section pixel-for-pixel with Figma reference design (`nairat design.png`)
  - [x] Run E2E test runs using `agent-browser` (interaction, accessibility, navigation)
  - [x] Polish animations, transitions, typography scale, and responsive layout
  - [x] Redesign complete typography system to Manrope with financial-institution editorial hierarchy (`specs/typography-redesign.md`)

---

## Phase 2: Page Creation Phase

Each page will be planned and built **one by one in strict sequential order**. Content and specifications will be finalized with user approval before development begins for each page.

- [x] **Milestone 1: Page 1 — Company (`/company`)** [Completed]
  - [x] Content planning: corporate history, commitment, mission/vision, infrastructure, sourcing, quality
  - [x] Create [specs/page-company.md](file:///home/sfwnmuhd/Desktop/nairat/specs/page-company.md)
  - [x] Implement `/company` route and modular sub-components in `components/company/`
  - [x] Integrate navigation links in Navbar & Footer with active state detection
  - [x] Run E2E testing with `agent-browser` (desktop, mobile 375px, modal previews, navigation)

- [x] **Milestone 2: Page 2 — Dedicated Product Pages** [Completed]
  - [x] Content planning & specs for the 4 individual product category pages:
    - Vegetables (`/products/vegetables`)
    - Fruits (`/products/fruits`)
    - Leafy & Herbs (`/products/leafy-herbs`)
    - Specialty & Gourmet (`/products/specialty-gourmet`)
  - [x] Create `specs/page-products.md`
  - [x] Implement individual product pages with produce catalog, origin matrix, seasonal availability, and inquiry actions
  - [x] Run E2E testing with `agent-browser` (desktop 4-column grid, mobile view, category tab switching, /products redirect)

- [x] **Milestone 3: Page 3 — Services (`/services`)**
  - [x] Content planning: Retail & Wholesale Distribution, For Growers & Exporters, Nairat Shop
  - [x] Create `specs/page-services.md`
  - [x] Implement `/services` route, PageBanner, and 3 row-wise service cards with left image and right content
  - [x] Run E2E testing with `agent-browser`

- [x] **Milestone 4: Page 4 — Sourcing & Quality (`/quality`)** [Completed]
  - [x] Content planning & specs in `specs/page-quality.md` aligned with the official design mockup
  - [x] Implement `/quality` route and modular components:
    - [x] Header Banner (`PageBanner`) with organic watermark and breadcrumbs
    - [x] Our Sourcing Philosophy (`QualitySourcingPhilosophy.tsx`): 3 value pillars (Global Network, Quality First, Sustainable Sourcing) + cargo ship feature card with `30+ Countries`, `400+ Product Lines`, `Year-Round Availability` metrics
    - [x] Quality & Food Safety (`QualityFoodSafety.tsx`): Rigorous checks narrative + side-by-side HACCP & ISO 22000:2018 accreditation cards with official certificate thumbnails and interactive full-screen preview modal
    - [x] Our Supply Chain (`QualitySupplyChain.tsx`): 4-step linear stepper (`01 Source` → `02 Inspect` → `03 Cold Chain` → `04 Deliver`) with directional arrows
    - [x] Additional modular components created: Infrastructure (`QualityInfrastructure.tsx`) and People (`QualityPeople.tsx`)
    - [x] Integrated `CtaButton` for uniform hover states and navigation
  - [x] Cross-page typography & design token harmonization:
    - [x] Replaced legacy `#47554E` with `#6B7280` across `/company`, `/products`, `/services`, and `/quality`
    - [x] Standardized eyebrows (`type-eyebrow`), headlines (`type-h2`), lead narratives, and card headings (`type-h3`)
    - [x] Updated `design.md` with complete typography benchmark specifications
  - [x] Run comprehensive E2E testing with `agent-browser` (verified desktop, mobile, certificate modal interaction, 0 console errors)

- [x] **Milestone 5: Page 5 — Partners (`/partners`)** [Completed]
  - [x] Content planning & specs in `specs/page-partners.md` incorporating client content
  - [x] Implement `/partners` route and modular components:
    - [x] Header Banner (`PageBanner`) with organic watermark and breadcrumbs
    - [x] Retail & Online Grocery Groups (`PartnerRetail.tsx`): Al Meera, LuLu, Carrefour, Safari, Grand Mall, Rawabi, Saudia, ABC Fresh + Talabat Mart feature card + 3 delivery commitments
    - [x] Strategic Local Agriculture (`PartnerLocalAgriculture.tsx`): Mahaseel partnership card, Qatari farm produce highlights, and same-day harvest distribution
    - [x] Global Sourcing Alliances (`PartnerGlobalGrowers.tsx`): Regional hubs (Jordan, Saudi Arabia, Lebanon, Egypt, South Africa, Iran, Syria, Global Origins) + commercial confidentiality note
    - [x] Become a Partner Onboarding Pathways (`PartnerOnboarding.tsx`): 3 tracks (Growers/Exporters, Supermarkets, Local Farmers) with `CtaButton`
  - [x] Navigation Integration:
    - [x] Updated `Navbar.tsx` with `/partners` link and active state indicator
    - [x] Updated `Footer.tsx` with `/partners` link
  - [x] Run E2E testing with `agent-browser` (verified desktop, mobile, 0 console errors)

- [x] **Milestone 6: Page 6 — Contact Us (`/contact`)**
  - [x] Content planning: department directory, location map integration, business hours, direct communication channels
  - [x] Create `specs/page-contact.md`
  - [x] Implement `/contact` route, interactive inquiry form matching user mockup, institutional cards, location map
  - [x] Run E2E testing with browser (verified desktop, mobile, form submission, 0 console errors)

- [x] **Milestone 7: Codebase Deduplication & Performance Optimization** [Completed]
  - [x] Full codebase audit for redundant JS libraries, unoptimized image pipelines, and duplicate DOM structures
  - [x] Eliminated redundant animation library (`framer-motion`), standardizing on GSAP + native CSS keyframe transitions (-121 KB client bundle chunk)
  - [x] Built reusable, accessible modal system (`CertificateModal.tsx`) with ESC dismissal and backdrop blur
  - [x] Converted unoptimized CSS `background-image` inline styles to Next.js `<Image fill loading="lazy" sizes="..." />` in `Products.tsx`, `Strengths.tsx`, and `Services.tsx`
  - [x] Dynamic code-split WebGL 3D globe (`cobe`) in `SourcingMap.tsx` with skeleton loading fallback
  - [x] Unified 16+ repetitive section headers into shared `SectionEyebrow.tsx` component
  - [x] Purged 8 orphaned duplicate component files and 2.5 MB of dead image assets
  - [x] Optimized hero video bandwidth consumption with `preload="metadata"`
  - [x] Re-tested touch and scroll performance across all pages using `agent-browser`

---

## Phase 3: RTL and Sanity Phase

- [x] **Milestone 1: RTL & Bilingual Implementation** [Completed]
  - [x] Set up bilingual subpath localization routing: English at `/` (root) and Arabic at `/ar/`
  - [x] Integrate Google Font `Cairo` for authentic Qatar B2B Arabic typography and configured dynamic `dir="rtl"` cascading in `LocaleContext`
  - [x] Refactor CSS rules and Tailwind layouts to use logical properties (`text-start`, `start-4`, `rtl:rotate-180`, `border-s-4`, `ps-*`, `pe-*`) for seamless LTR/RTL layout mirroring
  - [x] Create comprehensive i18n dictionaries (`lib/i18n/dictionaries/en.ts`, `lib/i18n/dictionaries/ar.ts`) with executive-level Arabic translations
  - [x] Localize all core global components: Navbar (links, category dropdown, Arabic logo `/LogoAR.webp`, desktop/mobile language switcher), Footer, Hero, WhoWeAre, Strengths, Cta, ServicesList, ContactSection, and ContactMap
  - [x] Localize all dedicated page components across the site:
    - [x] Company (`CompanyDelivering`, `CompanyVisionMission`, `CompanyInfrastructure`, `CompanySourcing`, `CompanyTeam`, `CompanyQuality`, `CompanyLookingAhead`)
    - [x] Quality & Sourcing (`QualitySourcingPhilosophy`, `QualityFoodSafety`, `QualitySupplyChain`, `CertificateModal`)
    - [x] Partners (`PartnerRetail`, `PartnerLocalGrid`, `PartnerCountryGrid`)
    - [x] Services (`ServicesList` with store and consignment features)
    - [x] Contact (`ContactSection` form validation & status states, `ContactMap` facility specs)
    - [x] Products (`ProductCard`, `ProductGrid`, and category catalog pages)
  - [x] Create dedicated Arabic routes: `/ar`, `/ar/company`, `/ar/products`, `/ar/products/[category]` (all 4 categories), `/ar/services`, `/ar/quality`, `/ar/partners`, `/ar/contact`
  - [x] Add Arabic names (`nameAr`) to all produce catalog items in `data/products.ts`
  - [x] Implement directional CTA button arrow micro-interactions (`CtaButton.tsx` and `globals.css`): `ArrowUpRight` (`↗` → `➔`) in English, `ArrowUpLeft` (`↖` → `⬅`) in Arabic
  - [x] Verified full static production build (26/26 routes generated) and visual E2E verification via `agent-browser` (captured screenshots of `/ar`, `/ar/company`, `/ar/quality`, `/ar/partners`, `/ar/services`, `/ar/contact`, `/ar/products/vegetables`)
- [x] **Milestone 2: Sanity Headless CMS Integration** [Completed]
  - [x] Install and configure Sanity Studio dependencies (`next-sanity`, `@sanity/client`, `@sanity/image-url`, `sanity`, `@sanity/vision`, `@sanity/icons`)
  - [x] Set up standalone-capable embedded Sanity Studio route at `/studio` (`app/studio/[[...tool]]/page.tsx`, `app/studio/layout.tsx`) and root config (`sanity.config.ts`, `sanity/env.ts`)
  - [x] Define comprehensive bilingual content schemas in `sanity/schemaTypes/`:
    - `product` (bilingual produce lines, categories, varieties, storage temperatures, origins, image hotspots, manual ordering)
    - `partner` (commercial retail, wholesale, quick-commerce partners, logos, featured tags)
    - `service` (commercial services, taglines, detailed narratives, bilingual feature points)
    - `qualityCert` (food safety accreditations, HACCP, ISO 22000:2018, scope, certificate scans)
    - `companyProfile` (singleton company profile with official 2026 verified metrics, fleet, cold-chain capacity, contact lines)
  - [x] Implement resilient data access layer (`sanity/lib/client.ts`, `sanity/lib/image.ts`, `sanity/lib/queries.ts`, `sanity/lib/data.ts`) with Next.js Data Cache tags (`tags: ['products']`, `['partners']`, etc.) and zero-downtime automatic fallback to local datasets (`data/products.ts`, `data/partners.ts`, `lib/config/company.ts`)
  - [x] Create on-demand webhook revalidation route (`app/api/revalidate/route.ts`) supporting HMAC signature validation and cache tag invalidation
  - [x] Connect frontend server pages (`/products/[category]`, `/ar/products/[category]`, `/partners`, `/ar/partners`, `/quality`, `/ar/quality`) to data fetchers
  - [x] Create automated database migration & seeding script (`scripts/seed-sanity.ts`, `pnpm seed:sanity`) with dry-run support
  - [x] Configure Next.js image domain whitelist (`images.remotePatterns`) for `cdn.sanity.io` in `next.config.ts`
  - [x] Verified full static production build and visual E2E verification via `agent-browser` (captured screenshots of `/studio`, `/products/vegetables`, `/ar/products/vegetables`, `/partners`, and live Sanity product "Apple" in `/products/specialty-gourmet`)
  - [x] Executed full migration script (`scripts/seed-sanity.ts`): uploaded 50+ local image assets directly to Sanity Asset Pipeline and committed 53 live documents across all schemas.
- [x] **Milestone 3: Full-Site Verification** [Completed]
  - [x] Verified live Content Lake document counts via API query (34 products, 10 partners, 6 services, 2 certificates, 1 company profile).
  - [x] Verified dynamic server component rendering (`force-dynamic`) across `/products/[category]`, `/partners`, `/services`, `/quality`, and all `/ar/*` equivalents.
  - [x] Verified instant cache revalidation route (`/api/revalidate`) supporting Sanity webhook HMAC signatures and Next 16 cache invalidation (`revalidateTag(tag, 'max')`).
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`).

---

## Client Feedback Implementation & Domain Migration (Completed)

Implementation of verified 2026 client feedback (Items A1 – A13) and production cutover preparation for `nairatfoodservices.com`:

- [x] **A1: Arabic Typography & RTL Punctuation**: Fixed trailing period bidirectional flip on hero headlines and standardized Arabic typography.
- [x] **A2: Mobile Rendering & Visibility**: Repaired "Who We Are" GSAP mobile media queries and fixed initial Navbar logo rendering on mobile.
- [x] **A3: Hero Video Integration**: Retained high-performance WebM/MP4 hero background with responsive poster fallback.
- [x] **A4: Interactive Strengths Grid**: Enabled mobile touch screen visibility for strengths card descriptions while preserving desktop hover interactions.
- [x] **A5: Product Carousel Active Filtering**: Added true active category filtering with crossfade transitions and direct catalog links.
- [x] **A6: Catalog Accuracy**: Verified 34 produce lines, cleaned out unsupported claims, and added full bilingual metadata.
- [x] **A7: Sourcing Matrix**: Created `data/sourcing.ts` covering 6 global regions and 60 verified origin countries.
- [x] **A8: Navigation & Legal Pages**: Created `/privacy`, `/terms`, `/ar/privacy`, `/ar/terms` and linked all footer/nav anchors.
- [x] **A9 & A13: Centralized Facts & Metrics**: Built `lib/config/company.ts` with official 2026 stats (1,200+ lines, ~100 t/day, 5,000 m², 20 chillers, 40 vehicles, CR 144352, P.O. Box 64040).
- [x] **A10: Unified Partners**: Built `data/partners.ts` with 10 verified retail and wholesale partners.
- [x] **A11: Contact Form Delivery**: Configured multi-provider SMTP with proper error handling and contact channel fallbacks.
- [x] **A12: Domain & SEO Cutover**: Set `metadataBase` to `https://nairatfoodservices.com`, created dynamic `sitemap.ts` (32 routes) and `robots.ts`, and configured 301 legacy redirects in `next.config.ts`.
- [x] **A14: 1:1 Exact Arabic Translation Alignment**:
  - Re-translated all Arabic content 1:1 literally and semantically from English source across all files without poetic omission or embellishment, ensuring back-translation directly matches English.
  - Rewrote central i18n dictionaries (`lib/i18n/dictionaries/ar.ts` & `en.ts`) including form fields, labels, placeholders, and error messages.
  - Aligned all subpage components (`components/company/*`, `components/services/*`, `components/quality/*`, `components/partners/*`, `components/contact/*`).
  - Aligned all subpage metadata and page banners across `app/ar/*` (`/ar`, `/ar/company`, `/ar/services`, `/ar/quality`, `/ar/partners`, `/ar/contact`, `/ar/products/[category]`, `/ar/privacy`, `/ar/terms`).
  - Aligned all 34 product Arabic names in `data/products.ts` and regional sourcing keys in `data/sourcing.ts`.
  - Zero TypeScript errors (`npx tsc --noEmit`) and verified static production build (32/32 routes).
  - Validated via `agent-browser` with screenshots of `/ar`, `/ar/company`, `/ar/services`, `/ar/quality`, `/ar/partners`, `/ar/contact`, `/ar/products/vegetables`.

- [x] **Milestone 4: Section-Wise & Page-Wise Editable Sanity CMS** [Completed]
  - [x] Designed custom 3-tier desk structure (`sanity/structure.ts`) with Pages & Section Content (Singletons), Catalogs & Collections, and Company Profile & Metrics.
  - [x] Created 6 bilingual page singleton schemas in `sanity/schemaTypes/pages/`:
    - `homePage.ts` (Hero, Who We Are, Strengths)
    - `companyPage.ts` (Banner, Delivering Freshness, Vision & Mission)
    - `qualityPage.ts` (Banner, Sourcing Philosophy, QA Inspection, Supply Chain)
    - `servicesPage.ts` (Banner, Commercial Overview)
    - `partnersPage.ts` (Banner, Retail Partners, Local Agriculture / Mahaseel, Global Origins)
    - `contactPage.ts` (Banner, Commercial Inquiry, Facility & Map)
  - [x] Extended migration & seeding script (`scripts/seed-sanity.ts`) to seed all 6 page singletons directly into Sanity Content Lake with verified live English and Arabic content.
  - [x] Updated data fetchers and queries in `sanity/lib/queries.ts` and `sanity/lib/data.ts` with strict TypeScript typings and automatic static dictionary fallbacks.
  - [x] Wired all 12 page routes (`/`, `/ar`, `/company`, `/ar/company`, `/quality`, `/ar/quality`, `/services`, `/ar/services`, `/partners`, `/ar/partners`, `/contact`, `/ar/contact`) and their respective components to dynamic CMS content.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and HTTP 200 responses across all 12 routes.
  - [x] Visual validation via `agent-browser` (captured screenshots of all 6 pages in English and Arabic).

- [x] **Milestone 5: Company Page 8-Section CMS Expansion & Team Photo Upload** [Completed]
  - [x] Realigned `companyPage.ts` Sanity schema to encompass all 8 sections (1. Banner, 2. Delivering Freshness, 3. Vision & Mission, 4. Infrastructure & Operational Scale, 5. Strategic Global Sourcing, 6. Dedicated Team, 7. Quality & Food Safety, 8. Looking Ahead).
  - [x] Added `teamImage` image field (`hotspot: true`) in Sanity Studio under Dedicated Team section.
  - [x] Resolved all content mismatches across all 8 sections between Sanity and the Next.js page components.
  - [x] Updated GROQ queries (`COMPANY_PAGE_QUERY`) and data layer (`sanity/lib/data.ts`) to fetch and transform all fields and images.
  - [x] Wired all company components (`CompanyInfrastructure`, `CompanySourcing`, `CompanyTeam`, `CompanyQuality`, `CompanyLookingAhead`, `CompanyDelivering`) to consume live Sanity CMS data with graceful fallbacks.
  - [x] Successfully migrated and seeded live Sanity Content Lake with complete 8-section content and uploaded team showcase photo asset.
  - [x] Verified zero TypeScript compilation errors and end-to-end verified via `agent-browser`.

- [x] **Milestone 6: Sourcing & Quality Page Realignment, Food Safety Section & Photo Uploads** [Completed]
  - [x] Realigned `qualityPage.ts` Sanity schema to encompass all 5 sections (1. Page Banner, 2. Sourcing Philosophy Section, 3. Quality & Food Safety Section, 4. QA Inspection & Hygiene Section, 5. Controls at Every Step Section).
  - [x] Added previously missing **Quality & Food Safety** section (`foodSafetyEyebrow`, `foodSafetyTitle`, `foodSafetyNarrative`, `foodSafetyCtaText` bilingual) to Sanity schema.
  - [x] Added image upload fields with hotspot support: `sourcingCardImage` (cargo ship feature card) and `inspectionImage` (QA inspection hall photo).
  - [x] Resolved all content mismatches across all 5 sections between Sanity and the Next.js page components (fixed headline text, 5-step supply chain labels, facility badge copy, and default titles).
  - [x] Wired `QualityFoodSafety`, `QualitySourcingPhilosophy`, and `QualityTeamInspection` components to receive `content={qualityContent}` dynamically.
  - [x] Updated GROQ queries (`QUALITY_PAGE_QUERY`), `QualityPageContent` TypeScript interface, and fallback resolver in `sanity/lib/data.ts`.
  - [x] Uploaded image assets to live Sanity Content Lake and synchronized `qualityPage-singleton` document.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and end-to-end tested `/quality` and `/ar/quality` via `agent-browser`.

- [x] **Milestone 7: Sourcing & Quality Page Controls at Every Step 5-Step CMS Array** [Completed]
  - [x] Added editable `supplyChainSteps` array field to `qualityPage.ts` Sanity schema under the `supplyChain` fieldset with `number`, `title`, `titleAr`, `description`, `descriptionAr` fields, and formatted studio preview.
  - [x] Added `supplyChainSteps` projection to `QUALITY_PAGE_QUERY` in `sanity/lib/queries.ts`.
  - [x] Updated `QualityPageContent` interface, `defaultQualityPageContent`, and `getQualityPageContent()` in `sanity/lib/data.ts`.
  - [x] Wired `QualitySupplyChain.tsx` to dynamically render steps from `content?.supplyChainSteps` with indexed Lucide icon mapping and bilingual title/description fallback.
  - [x] Seeded and synchronized live Sanity Content Lake document `qualityPage-singleton` with all 5 steps (Receiving, Sorting & Grading, Packing, Cold Storage, Dispatch & Delivery) with unique `_key` IDs (`step-01` to `step-05`).
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and verified rendering on `/quality` and `/ar/quality` via `agent-browser`.

- [x] **Milestone 8: Partners Page CMS Revamp, Editable Logos & Sections Alignment** [Completed]
  - [x] Realigned `partnersPage.ts` Sanity schema to encompass all 4 sections (1. Page Banner, 2. Retail & Online Grocery Partners, 3. Strategic Local Agriculture / Mahaseel, 4. Global Sourcing Partnerships).
  - [x] Added editable `retailPartners` array to Section 2 in `partnersPage.ts` with name, nameAr, category, and image logo upload with studio preview.
  - [x] Added editable `localPartnerImage` image upload, `localBadge`, and `localBadgeAr` to Section 3 (Mahaseel Local Agriculture).
  - [x] Added editable `globalCountries` array to Section 4 in `partnersPage.ts` with name, nameAr, crops, cropsAr, and flag logo upload with studio preview.
  - [x] Reconciled all content and headline mismatches between Sanity, frontend components, and seed scripts.
  - [x] Updated GROQ queries (`PARTNERS_PAGE_QUERY`), `PartnersPageContent` TypeScript interface, and fallback resolver in `sanity/lib/data.ts`.
  - [x] Wired `PartnerRetail.tsx`, `PartnerLocalGrid.tsx`, and `PartnerCountryGrid.tsx` to consume dynamic CMS content and images.
  - [x] Seeded and synced live Sanity Content Lake with 9 retail partner logos, Mahaseel logo, and 8 global sourcing country flags.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and end-to-end verified via `agent-browser` (`/partners` and `/ar/partners`).

- [x] **Milestone 9: Contact Us Page CMS Revamp, Content Alignment & Section Controls** [Completed]
  - [x] Restructured `contactPage.ts` Sanity schema into 3 organized collapsible fieldsets:
    - **1. Page Banner** (`bannerTitle`, `bannerTitleAr`, `bannerSubtitle`, `bannerSubtitleAr`).
    - **2. Contact Details & Inquiry Form** (`inquiryEyebrow`, `inquiryTitle`, `inquirySubtitle`, address card label/text, CR number, email card label/email, call card label, landline numbers, mobile, WhatsApp, form submit button text, form success feedback message in EN & AR).
    - **3. Facility Specs & Map Section** (`facilityEyebrow`, `facilityTitle`, 4 facility summary badges for Location, Capacity, Operations, Compliance, interactive Google Maps embed iframe URL, directions URL, and floating navigation card text in EN & AR).
  - [x] Reconciled all content and headline mismatches between Sanity defaults, seed data, and frontend components.
  - [x] Updated GROQ queries (`CONTACT_PAGE_QUERY` in `sanity/lib/queries.ts`) with projections for all newly introduced contact cards, form feedback, badges, and map parameters.
  - [x] Extended `ContactPageContent` interface, `defaultContactPageContent`, and `getContactPageContent()` mapper in `sanity/lib/data.ts`.
  - [x] Wired `ContactSection.tsx` to dynamically render contact info cards (address, CR, email, multi-phone with formatted dial links, WhatsApp direct link), dynamic submit button label, and localized success feedback message.
  - [x] Wired `ContactMap.tsx` to dynamically render the 4 facility badges, editable Google Maps embed URL, external directions target URL, and floating card text with full bilingual support.
  - [x] Updated `scripts/seed-sanity.ts` and synchronized live Sanity Content Lake document `contactPage-singleton`.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and end-to-end verified `/contact` and `/ar/contact` via `agent-browser`.

- [x] **Milestone 10: Our Products Page CMS Integration & Nested Category Schema** [Completed]
  - [x] Created `productsPage.ts` Sanity schema with collapsible fieldsets:
    - **1. Page Banner** (`bannerTitle`, `bannerTitleAr`, `bannerSubtitle`, `bannerSubtitleAr`).
    - **2. Category Sections (Nested Schema)** (`categorySections` array of category objects with `slug`, `title`, `titleAr`, `subtitle`, `subtitleAr`, `description`, `descriptionAr`, `badge`, `badgeAr`, and `heroImage`).
    - **3. Dedicated Category Sections** (Fresh Vegetables, Fresh Fruits, Leafy & Herbs, Specialty & Gourmet overview fields in EN & AR).
  - [x] Updated Sanity Desk Structure (`sanity/structure.ts`):
    - Added **Our Products Page** (`productsPage-singleton`) under `Pages & Section Content`.
    - Organized **Produce Catalog by Category** under `Catalogs & Collections` with nested filtered views for Fresh Vegetables (11), Fresh Fruits (8), Leafy & Herbs (8), Specialty & Gourmet (7), and All Produce Lines (34).
  - [x] Added `PRODUCTS_PAGE_QUERY` in `sanity/lib/queries.ts`.
  - [x] Extended `sanity/lib/data.ts` with `ProductsPageContent`, `CategorySectionItem`, `defaultProductsPageContent`, `getProductsPageContent()`, and `getCategorySection(slug)`.
  - [x] Synchronized `productsPage-singleton` document directly to the live Sanity Content Lake.

- [x] **Milestone 11: Products Category Page Clean Design Restoration** [Completed]
  - [x] Restored original clean layout on `/products/[category]` and `/ar/products/[category]` per user feedback:
    - Removed redundant separate `h2` heading, subtitle, and narrative description paragraph from `ProductGrid.tsx`.
    - Removed category filter pills/tabs from the page body, maintaining navigation via the header dropdown and breadcrumbs.
    - Preserved clean 4-in-a-row responsive product card grid directly beneath the category banner.
    - PageBanner displays the Category Title with clean breadcrumb path (`Home / Our Products / [Category Name]`).
  - [x] Maintained full Sanity CMS nested schema compatibility and data synchronization.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and visual verification via `agent-browser` for both English and Arabic views.

- [x] **Milestone 12: Product Category Pages CMS Structure, Banner Photos & Headings** [Completed]
  - [x] Created `categoryPage.ts` Sanity schema for dedicated subcategory pages (Fresh Vegetables, Fresh Fruits, Leafy & Herbs, Specialty & Gourmet) with fields for Banner Heading (EN/AR), Subheading (EN/AR), Eyebrow Badge (EN/AR), and Banner Photo upload (`options: { hotspot: true }`).
  - [x] Re-structured Sanity Desk Structure (`sanity/structure.ts`) under `Pages & Section Content`:
    - Organized **Our Products** into 4 dedicated subcategory page nodes.
    - For each subcategory, provided direct access to **Page Banner & Heading** (document editor for photo and headings) and **Products** (filtered list of produce lines).
  - [x] Enhanced `PageBanner.tsx` to support optional high-resolution background photos (`image` prop) with ambient brand gradient overlay ensuring accessible, crisp white typography.
  - [x] Updated data fetching layer (`sanity/lib/queries.ts` & `sanity/lib/data.ts`) with `CATEGORY_PAGE_QUERY` to fetch custom banner photos, titles, and subheadings with automatic fallback.
  - [x] Wired `/products/[category]` and `/ar/products/[category]` to render custom banner photos, bilingual titles, and subheadings.
  - [x] Seeded and synchronized all 4 `categoryPage` documents with live image assets in the Sanity Content Lake.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and verified rendering on `/products/vegetables` and `/ar/products/vegetables` via `agent-browser`.

- [x] **Milestone 13: Privacy Policy & Terms of Service Editable CMS Integration** [Completed]
  - [x] Created `privacyPage.ts` and `termsPage.ts` Sanity schemas under `sanity/schemaTypes/pages/` with collapsible fieldsets for:
    - **1. Page Banner** (`bannerTitle`, `bannerTitleAr`).
    - **2. Page Header** (`badge`, `badgeAr`, `title`, `titleAr`, `lastUpdated`, `lastUpdatedAr`).
    - **3. Content Sections Array** (`sections` array with bilingual `title`, `titleAr`, `body`, `bodyAr`, and nested `bulletPoints` list items in EN & AR).
  - [x] Registered schemas in `sanity/schemaTypes/index.ts` and added singleton document editors to Sanity Desk Structure (`sanity/structure.ts`) under `Pages & Section Content`.
  - [x] Added `PRIVACY_PAGE_QUERY` and `TERMS_PAGE_QUERY` to `sanity/lib/queries.ts`.
  - [x] Added `getPrivacyPageContent()` and `getTermsPageContent()` in `sanity/lib/data.ts` with automatic fallback to static legal dictionaries and cache tag invalidation.
  - [x] Wired all legal routes (`/privacy`, `/ar/privacy`, `/terms`, `/ar/terms`) to dynamically render content and sections from Sanity.
  - [x] Seeded and synchronized both `privacyPage-singleton` and `termsPage-singleton` documents into live Sanity Content Lake.
  - [x] Verified zero TypeScript compilation errors (`npx tsc --noEmit`) and verified rendering via `agent-browser`.




---

## Phase 4: Home Redesign & Nairat Design System

Spec: [specs/home-redesign-design-system.md](specs/home-redesign-design-system.md)

- [x] **Milestone 1: Tokens, shared primitives and Why Choose Us (tracer bullet)**
  - [x] Design-system colour, radius and type tokens in `app/globals.css`
  - [x] `Highlight`, `SectionHeading`, `FeatureCard`, `light` button variant, `useSectionReveal`
  - [x] `Strengths.tsx` rebuilt: centred heading, four stat cards, wide photo
- [x] **Milestone 2: What We Do, Products, Sourcing, Certifications & Quality**
  - [x] `Services.tsx`: three photo cards and "All Services"
  - [x] `Products.tsx` + `CategoryRail.tsx`: two full-bleed category rails
  - [x] `SourcingMap.tsx`: country pills and flat world map (3D globe and `cobe` removed)
  - [x] `QualityTimeline.tsx`: three step cards and a forest certificate card opening the certificate viewer
- [x] **Milestone 3: `design.md` rewrite, spec reconcile, e2e verification**
  - [x] `scripts/e2e-home.sh`: 26 checks across desktop, Arabic and mobile
- [x] **Milestone 4: Design system fonts site-wide** — spec: [specs/design-system-typography.md](specs/design-system-typography.md)
  - [x] `font-display` and `.type-h*` resolve to Figtree; new `font-eyebrow` (Montserrat 700) for eyebrows and uppercase labels
  - [x] Montserrat loaded at weight 700 only
  - [x] `scripts/e2e-typography.sh`: 34 checks across eight English pages, two Arabic pages and mobile
- [ ] **Not started: design system layout, colour and components on the remaining home sections and inner pages** (out of scope; home page sections only were requested)
