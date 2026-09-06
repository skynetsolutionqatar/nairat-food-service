# Nairat Food Services — Homepage Design Specification & Design System

This document provides the definitive design specification, visual tokens, structural architecture, interactive component behaviors, and motion guidelines for the **Nairat Food Services** homepage ([nairatfood.com](https://nairatfood.com)), as implemented in the production Next.js application.

---

## 1. Executive Summary & Brand Positioning

*   **Subject**: Qatar's leading fresh-produce importer, cold-chain logistics operator, and distributor.
*   **Target Audience**:
    *   **Primary B2B**: Supermarket and hypermarket category managers, executive chefs, procurement heads of 5-star hotels, catering groups, and wholesale market traders.
    *   **Institutional & Trade Partners**: International agricultural growers, exporters, customs authorities, and domestic retail partners.
    *   **Direct Retail Consumers**: Consumers visiting Nairat's walk-in retail store in Qatar.
*   **Core Brand Mantra**: *"Pure Freshness from Global Fields to Qatar."*
*   **Single Job of the Homepage**: Establish immediate authority and trust in Nairat's unbroken cold-chain logistics, global agricultural sourcing footprint, and accredited food-safety standards (HACCP & ISO 22000), converting visitors into commercial clients and trade partners via direct inquiry.
*   **Aesthetic Identity**:
    *   A departure from generic wholesale sites that use flat, uninspired greens and plain white backgrounds.
    *   Combines **rich brand forest greens** (`#168849` and `#063B27`) with **crisp modern typography**, **fresh lime highlights** (`#D4F056`), **warm saffron gold accents** (`#FDE047`), and **soft off-white structural surfaces** (`#F4F6F5` / `#F8FAF8`).

---

## 2. Design System & Design Tokens

### Color Palette
The color system balances organic freshness with corporate logistics precision:

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `brand-green` | `#168849` | Primary brand signature color, active navigation states, primary buttons, icons |
| `brand-forest` | `#063B27` | Deep corporate forest green for high-contrast headers, dark cards, footer accents |
| `brand-dark` | `#042A1C` | Deepest green used for button hover states and dark card backgrounds |
| `brand-lime` | `#D4F056` | Vibrant electric lime accent used for number badges, stats, and high-energy highlights |
| `brand-saffron` | `#FDE047` | Warm golden amber accent used for category pills, rating stars, and vision tags |
| `neutral-bg-base` | `#FFFFFF` | Pure white background for high-clarity content sections |
| `neutral-bg-soft` | `#F8FAF8` / `#F4F6F5` | Muted cool-sand surfaces used for section alternates and card backgrounds |
| `neutral-text-dark`| `#111814` | Primary high-legibility dark charcoal for titles and headings |
| `neutral-text-body`| `#6B7280` | Clean neutral slate-gray for body paragraphs and lead narratives |
| `neutral-text-muted`| `#6B7280` / `#9CA3AF`| Muted gray for captions, breadcrumbs, and secondary labels |
| `neutral-border` | `rgba(0,0,0,0.08)` | Subtle border rules for cards and containers |

### Typography Hierarchy & Standards (Homepage Benchmark)
Implemented via `@next/font/google` in `app/layout.tsx` and custom fluid utility classes in `app/globals.css`:

*   **Display & Headings**: **Montserrat** (`var(--font-montserrat)`, `font-display`)
    *   Modern, geometric sans-serif with distinct terminal curves that communicate institutional confidence and scale.
    *   Applied to all section titles, hero statements, and card headings.
*   **Body & Descriptions**: **Figtree** (`var(--font-figtree)`, `font-sans`)
    *   Highly legible contemporary sans-serif engineered for optimal screen readability across all viewports.
    *   Applied to narrative paragraphs, feature lists, button labels, and navigation.
*   **Metrics & Data**: **JetBrains Mono** (`var(--font-mono)`, `font-mono`)
    *   Clean, technical monospaced font that conveys cold-chain precision, temperatures, dates, and quantitative metrics.

#### Exact Typography Implementation Standards:
Across both the homepage and subpages (`/company`, `/products`, `/services`, and `/quality`), headings, subheadings, and paragraphs follow these exact specifications:

| Role | Tailwind Classes | Color | Responsive Sizing & Leading | Usage Standard |
| :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** | `font-display type-eyebrow text-[#168849] block` | `#168849` (Brand Green) | `11.5px`, uppercase, tracking `0.14em`, weight `700` | `WHO WE ARE`, `OUR QUALITY PHILOSOPHY`, `WHY CHOOSE US` |
| **Section Headline (H2)** | `font-display type-h2 font-semibold text-[#111814] text-left leading-[1.12]` | `#111814` (Dark Charcoal) with `#168849` accent span | `clamp(30px, 3.4vw, 52px)`, leading `1.12`, tracking `-0.025em`, weight `600` | Primary section titles in 12-column grid (`lg:col-span-7`) |
| **Section Subheading / Lead Narrative** | `font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]` | `#6B7280` (Muted Slate Gray) | `text-xs sm:text-[14px] 2xl:text-[15px]`, `leading-[1.6]`, justified text alignment | Lead narrative beside headline in 12-column grid (`lg:col-span-5`) |
| **Card Title (H3)** | `font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-[#111814] tracking-[-0.015em] leading-snug` | `#111814` (Dark Charcoal) | `text-lg sm:text-xl 2xl:text-2xl`, leading `1.2`–`1.3`, weight `600` | Bento cards, service cards, quality feature cards |
| **Card Description / Body** | `font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]` | `#6B7280` (Muted Slate Gray) | `text-xs sm:text-[13px] 2xl:text-sm`, `leading-[1.55]`, weight `400` | Body copy inside cards, checkmark lists, steps |
| **Large Numbers & Metrics** | `font-display font-semibold text-3xl lg:text-4xl 2xl:text-5xl leading-none tracking-[-0.03em]` | `#111814` or `#FFFFFF` (on dark) | `text-3xl lg:text-4xl 2xl:text-5xl`, weight `600` | `01`, `02`, `03` cards, `5,000 m²`, `20` |

#### Fluid Typography Classes (`app/globals.css`):
*   `.type-display`: `clamp(44px, 5.2vw, 84px)`, weight 700, leading `1.02`, tracking `-0.035em`
*   `.type-h1`: `clamp(38px, 4.2vw, 68px)`, weight 700, leading `1.06`, tracking `-0.03em`
*   `.type-h2`: `clamp(30px, 3.4vw, 52px)`, weight 600, leading `1.12`, tracking `-0.025em`
*   `.type-h3`: `clamp(22px, 2vw, 34px)`, weight 600, leading `1.22`, tracking `-0.015em`
*   `.type-eyebrow`: `11.5px`, weight 700, tracking `0.14em`, uppercase
*   `.type-lead`: `clamp(16px, 1.15vw, 19px)`, weight 400, leading `1.62`, max-width `55ch`
*   `.type-body`: `clamp(14.5px, 1vw, 16.5px)`, weight 400, leading `1.65`, max-width `60ch`

---

## 3. Structural Homepage Architecture

The homepage (`app/page.tsx`) consists of 9 strategically sequenced sections supported by a floating glassmorphic navbar and an institutional footer:

```text
+-------------------------------------------------------------------------------+
| 0. FLOATING NAVBAR (Sticky, pill-shaped, backdrop blur, products dropdown)    |
+-------------------------------------------------------------------------------+
| 1. HERO SECTION                                                               |
|    - Fullscreen responsive HTML5 video background (/hero.mp4 & /hero.webm)    |
|    - GSAP Parallax scrub & smooth entrance sequence                           |
|    - Headline: "Pure Freshness from Global Fields to Qatar."                  |
|    - CTAs: "Explore Our Products" & "Partner With Us"                         |
+-------------------------------------------------------------------------------+
| 2. PARTNERS TICKER                                                            |
|    - Infinite horizontal logo loop of Qatar retail leaders (Al Meera, LuLu,   |
|      Carrefour, Safari, Grand Mall, Monoprix, Family Food Centre, Talabat)    |
+-------------------------------------------------------------------------------+
| 3. WHO WE ARE (Overview & Scale)                                              |
|    - Left: Narrative copy & "Fresh from the Source. Delivered Across Qatar."  |
|    - Right: 3 Metric Cards (01 Global Sourcing, 02 Year-Round Supply,         |
|      03 Built for Qatar's Standards)                                          |
+-------------------------------------------------------------------------------+
| 4. OUR STRENGTHS (Asymmetric 5-Cell Bento Grid)                               |
|    - 20 Dedicated Chiller Rooms       | 5,000 m² Cold-Chain Warehouse         |
|    - Cold Chain Unbroken              | 40 Refrigerated Fleet Vehicles        |
|    - Sourced at Origin (Tall Feature Card with Grower Photography)            |
+-------------------------------------------------------------------------------+
| 5. WHAT WE DO (Services Breakdown)                                            |
|    - 3 Horizontal Row Cards:                                                  |
|      1. Retail & Wholesale Distribution                                       |
|      2. Grower & Exporter Partnerships                                        |
|      3. Nairat Retail Shop                                                    |
+-------------------------------------------------------------------------------+
| 6. OUR PRODUCTS (Interactive Catalog Grid)                                    |
|    - Filter Tabs: All Products | Fruits | Vegetables | Leafy & Herbs | Gourmet|
|    - 4-Column Card Grid with Origin Badges and Hover Zoom                     |
|    - Detail Modal: Country of origin, seasonality matrix, packaging specs     |
+-------------------------------------------------------------------------------+
| 7. GLOBAL SOURCING (Interactive SVG World Map)                                |
|    - 15+ Countries, 5 Continents                                              |
|    - Region Tabs: Middle East, Europe, Africa, Asia, Americas, Oceania        |
|    - Interactive pulsing origin markers & seasonal harvest descriptions       |
+-------------------------------------------------------------------------------+
| 8. QUALITY & FOOD SAFETY (3-Step Timeline & Certifications)                   |
|    - 1. Inspected at Origin -> 2. Tested on Arrival -> 3. Cold Chain Delivery |
|    - Official Certificate Modal: HACCP & ISO 22000:2018 high-res viewers      |
+-------------------------------------------------------------------------------+
| 9. GLOBAL CALL-TO-ACTION (Parallax Banner & Slide-Over Drawer)                |
|    - Full-bleed fresh produce background with GSAP scroll parallax            |
|    - Interactive slide-over contact drawer form with SMTP-ready validation    |
+-------------------------------------------------------------------------------+
| 10. FOOTER                                                                    |
|     - Brand logo, "Go Fresh for Future" slogan, social links, full navigation |
+-------------------------------------------------------------------------------+
```

---

## 4. Detailed Component Breakdown

### 1. Header Navigation (`components/layout/Navbar.tsx`)
*   **Form Factor**: Centered floating pill with `max-w-[1140px] 2xl:max-w-[1240px]`, positioned `fixed top-0`.
*   **Scroll State**: Transitions from semi-transparent `bg-[#158647]/80` to high-blur `bg-[#158647]/95 shadow-lg` on scroll (> 20px).
*   **Navigation Links**:
    *   Home (`/`)
    *   Company (`/company`)
    *   Our Products (`/products` with hover dropdown for Vegetables, Fruits, Leafy & Herbs, Specialty & Gourmet)
    *   Services (`/services`)
    *   Sourcing & Quality (`/quality`)
    *   Partners (`/#partners`)
*   **Language Switcher**: Dedicated pill toggle switching between English (`EN`) and Arabic (`AR`).
*   **Mobile Experience**: Full-screen responsive accordion menu with accessible toggle button and nested product categories.

### 2. Hero Section (`components/modules/Hero.tsx`)
*   **Background**: High-definition ambient video loop (`/hero.mp4` and `/hero.webm`) with a fallback poster (`/hero-poster.webp`).
*   **Visual Treatment**: Multi-stop gradient overlay (`from-black/75 via-black/40 to-black/80`) to ensure contrast against white text.
*   **Motion**:
    *   Page load GSAP timeline revealing eyebrow, title lines, subtitle, and CTA buttons with staggered ease (`power3.out`).
    *   Compositor-promoted scroll parallax (`yPercent: 15, scale: 1.08`) scrubbed against window scroll.

### 3. Partners Loop (`components/modules/Partners.tsx`)
*   **Concept**: Seamless infinite horizontal marquee displaying prominent domestic supermarket chains and platforms:
    *   Al Meera, LuLu Hypermarket, Carrefour Qatar, Safari Mall, Grand Mall, Monoprix, Family Food Centre, and Talabat Mart.
*   **Styling**: Monochrome logos with opacity hover transitions that maintain elegance without visual clutter.

### 4. Who We Are (`components/modules/WhoWeAre.tsx`)
*   **Layout**: 12-column responsive split grid:
    *   Left Column (6 cols): Primary value proposition narrative and direct link to `/company`.
    *   Right Column (6 cols): Stack of 3 numbered metric cards with JetBrains Mono numbers (`01`, `02`, `03`) in lime badges.
*   **Content**:
    *   `01`: Global Sourcing Network across 5 continents.
    *   `02`: Year-Round Supply Assurance bridging seasonal gaps.
    *   `03`: Built for Qatar's Standards (MOPH compliance & fast customs clearance).

### 5. Our Strengths (`components/modules/Strengths.tsx`)
*   **Layout**: Asymmetric 5-cell grid combining quantitative statistics with lifestyle photography:
    1.  **20 Dedicated Chiller Rooms**: Temperature-specific microclimates.
    2.  **5,000 m² Cold-Chain Warehouse**: Purpose-built facility in Doha Industrial Area.
    3.  **Cold Chain Unbroken**: FIFO rotation and strict temperature auditing.
    4.  **40 Refrigerated Fleet**: Daily scheduled store delivery.
    5.  **Sourced at Origin**: Tall feature card emphasizing grower partnerships.
*   **Interactions**: Subtle card elevation and image scale on hover (`scale: 1.05`).

### 6. Services Overview (`components/modules/Services.tsx`)
*   **Layout**: 3 distinct cards representing the primary business units:
    1.  *Retail & Wholesale Distribution* (Hypermarkets, supermarkets, Talabat Mart).
    2.  *Grower & Exporter Partnerships* (Consignment, customs clearance, cold storage).
    3.  *Nairat Retail Shop* (Walk-in produce market open to the public).
*   **CTAs**: Integrated [`CtaButton`](file:///home/sfwnmuhd/Desktop/nairat/components/ui/CtaButton.tsx) linking directly to `/services` and external maps.

### 7. Products Catalog Showcase (`components/modules/Products.tsx`)
*   **Filtering**: Client-side category switching between:
    *   All Products
    *   Fresh Fruits
    *   Fresh Vegetables
    *   Leafy & Herbs
    *   Specialty & Gourmet
*   **Product Cards**: Circular produce photography, country-of-origin pill, seasonal availability indicator, and quick-inquiry trigger.
*   **Interactive Modal**: Detailed popup displaying product profile, origin harvest windows, and packaging specifications.

### 8. Global Sourcing Map (`components/modules/SourcingMap.tsx`)
*   **Interactive World Map**: SVG-based world vector map with clickable continent selectors:
    *   Middle East, Europe, Africa, Asia, Americas, Oceania.
*   **Dynamic Data**: Selecting a region pulses origin coordinates in `#D4F056` and updates the sourcing narrative to highlight in-season commodities.

### 9. Quality & Food Safety (`components/modules/QualityTimeline.tsx`)
*   **Process Flow**:
    1.  *Inspected at Origin*: Pre-shipment sizing, Brix sweetness, and grading.
    2.  *Tested on Arrival*: Qatar Ministry of Public Health (MOPH) laboratory clearance.
    3.  *Protected Through Cold Chain*: Continuous digital temperature logger monitoring.
*   **Accreditation Modals**: Dedicated interactive viewers for:
    *   **HACCP** (`/certificates/c1-1 1.png`)
    *   **ISO 22000:2018** (`/certificates/c2-2 1.png`)

### 10. Call-to-Action & Contact Drawer (`components/modules/Cta.tsx`)
*   **Design**: Rich fruit photography background with deep green overlay and GSAP parallax scrub.
*   **Interaction**: Clicking "Start a Partnership" opens a slide-over contact drawer.
*   **Form Capabilities**:
    *   Full name, business email, phone number, and message fields.
    *   Real-time client-side validation.
    *   Nodemailer SMTP integration for direct delivery to `info@nairatfood.com`.

---

## 5. Motion, Animation & Interaction Standards

1.  **Lenis Smooth Scrolling**:
    *   Provides inertial, continuous smooth scrolling across the entire page while respecting browser accessibility preferences.
2.  **GSAP ScrollTrigger**:
    *   All module entrances are orchestrated using `gsap.timeline` scoped via `@gsap/react`'s `useGSAP`.
    *   Scroll triggers fire once at `top 80%` to avoid distracting re-animations.
    *   Standard entrance easing: `power3.out` with duration `0.65s` and stagger `0.08s`.
3.  **Framer Motion**:
    *   Utilized for UI state transitions: product details modal, certificate image zoom viewer, and the slide-over contact drawer.
    *   Accessible backdrop dismissal and keyboard `Escape` key handling.
4.  **Button Micro-Interactions (`CtaButton`)**:
    *   Isolated arrow badge that rotates 45° and scales on hover.
    *   Active button press scales down subtly (`active:scale-95`).

---

## 6. Accessibility (a11y) & SEO Guidelines

*   **Color Contrast**: All text elements meet or exceed WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body copy and 3:1 for large display titles).
*   **Focus States**: Visible `focus-visible:ring-2 focus-visible:ring-[#168849]` rings on all interactive links, buttons, and form inputs.
*   **Semantic Structure**: Single `<h1>` tag in the hero; appropriate `<h2>` hierarchy for every section; `<article>` elements for cards; `<nav>` for menus.
*   **Image Optimization**: Next.js `Image` component with `sizes` attributes, explicit aspect ratios, and descriptive `alt` tags (`aria-hidden="true"` for decorative graphics).
*   **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by bypassing GSAP tweens and Lenis smooth scrolling for sensitive users.
