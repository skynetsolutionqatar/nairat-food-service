# Nairat Food Services — Design System & Homepage Specification

The visual language of the Nairat Food Services website ([nairatfoodservices.com](https://nairatfoodservices.com/)), as implemented in the Next.js application.

**Sources of truth**

| What | Where |
| :--- | :--- |
| Design system (tokens, components, page variations) | "Nairat Food Services" — https://claude.ai/artifact/74DLs9diJLCY2e5ycFuzfJ |
| Page designs (Home and inner pages) | "Nairat Website Redesign" canvas — https://claude.ai/artifact/72Jjn3ntruvC1anwDvMpNB |

**Adoption status**: the design system is applied to five home page sections — Why Choose Us, What We Do, Products, Sourcing, Certifications & Quality. The design system fonts are applied to every page. The hero, partners strip, Who We Are, CTA, footer and all inner pages still use the previous layout and hardcoded colours. Section 6 lists what the design system specifies for them.

---

## 1. Brand & Content Fundamentals

*   **Subject**: Qatar's dependable fresh-produce importer, cold-chain operator and distributor.
*   **Audience**: supermarket and hypermarket category managers, chefs and procurement heads, wholesale traders, growers and exporters, and shoppers at the Nairat retail store.
*   **Single job of the homepage**: establish trust in Nairat's cold chain, sourcing reach and accredited food safety, and turn visitors into trade enquiries.
*   **Voice**: short, confident three-beat headlines — "Fresh Produce. Strong Supply. Trusted Across Qatar." — "Built for Freshness. Ready to Deliver."
*   **Casing**: Title Case headlines and buttons, UPPERCASE eyebrows, sentence case body.
*   **Proof in numbers**: 1,200+ lines, 5,000 m² cold-chain warehouse, 20 chiller rooms, 40 refrigerated vehicles, ~100 t a day, HACCP and ISO 22000.
*   **Bilingual**: English first with an Arabic toggle in the nav; every label has an Arabic string.

---

## 2. Design Tokens

Defined in the `@theme` block of `app/globals.css`, so each colour is a Tailwind utility (`bg-forest`, `text-ink-muted`, `ring-line`).

### Colour

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `nairat-green` | `#168849` | The logo's block green. Buttons, nav pill, rail label, big fills. White text passes at 4.5:1 — keep labels 14px/600 or larger. |
| `nairat-green-deep` | `#13753F` | Text-safe green for accent words and links; button hover. |
| `green-50` | `#EAF5EE` | Soft wash behind number badges and tags. |
| `lime` | `#D4F056` | Accent pills and chips. Ink text only. |
| `leaf` | `#C9E3B0` | The logo's pale leaf. Quiet tints and photo placeholders. |
| `forest` | `#0A2618` | Dark surface: certificate card, vegetables rail label. |
| `on-forest-muted` | `#C9D6CE` | Secondary text on forest. |
| `ink` | `#111814` | Headlines and body. |
| `ink-muted` | `#5C6660` | Paragraphs, captions, stat labels. |
| `surface-alt` | `#F4F6F5` | Alternating section bands. |
| `line` | `#E3E8E5` | Hairline borders and dividers. |
| `citrus` / `sky` / `berry` | `#E8772E` / `#1F6E8C` / `#8E2A4E` | Page accents (see section 6). Not yet used. |

### Type

Fonts are loaded with `next/font/google` in `app/layout.tsx`. Figtree is the primary face (`font-sans`, `font-display`); Montserrat 700 is the secondary face (`font-eyebrow`), for eyebrows and small uppercase labels only.

| Role | Face | Spec |
| :--- | :--- | :--- |
| Section heading (`.type-section`) | Figtree 700 | `clamp(34px, 4vw, 52px)`, leading 1.08, tracking -0.02em |
| Card title | Figtree 700 | 17–20px, leading 1.3–1.35 |
| Figure | Figtree 700/800 | 40px, leading 1, tracking -0.02em |
| Lead | Figtree 400 | 16px, leading 1.7, `ink-muted` |
| Body | Figtree 400 | 14px, leading 1.6, `ink-muted` |
| Eyebrow (`.type-eyebrow`) | Montserrat 700 | 11.5px, tracking 0.14em, uppercase, `nairat-green` |
| Button | Figtree 600 | 14px, leading 20px |
| Arabic | Cairo | Replaces every face under `dir="rtl"`; headings at leading 1.4 |

Classes `.type-display`, `.type-h1`–`.type-h4` set Figtree at the design system weights (800 for display and h1, 700 for h2–h4) and keep their fluid sizes for the sections and pages not yet migrated. `scripts/e2e-typography.sh` checks the fonts on every page.

### Shape & rhythm

| Token | Value | Usage |
| :--- | :--- | :--- |
| `rounded-tile` | 16px | Image tiles inside cards |
| `rounded-card` | 24px | Feature cards |
| `rounded-panel` | 40px | Section photos, framed panels |
| `rounded-full` | pill | Buttons, country pills, certificate pills |
| `.section-pad` | 96px desktop / 64px phones | Vertical section padding |
| Container | `max-w-[1200px]`, 16px / 24px gutters | Redesigned sections |

Hairline borders (`ring-line`) carry the cards; shadows are almost absent.

---

## 3. Components

| Component | File | Notes |
| :--- | :--- | :--- |
| Button | `components/ui/CtaButton.tsx` | Pill with a round arrow chip. `primary` (green, white chip) once per section; `light` (white, hairline, green chip) for secondary actions. Two or three words, Title Case. |
| Eyebrow | `components/ui/SectionEyebrow.tsx` | Leaf glyph + uppercase label, always above a heading. |
| Highlight / Accent | `components/ui/Highlight.tsx` | `Highlight`: green marker with white text behind one or two words, once per heading. `Accent`: green text for a second emphasis. `MarkedText` applies either to a phrase inside CMS-supplied copy. |
| SectionHeading | `components/ui/SectionHeading.tsx` | Eyebrow → heading → optional lead, `start` or `center`, optional action at the inline end. |
| FeatureCard | `components/ui/FeatureCard.tsx` | White card at `rounded-card`; `dark` variant on forest. |
| CategoryRail | `components/products/CategoryRail.tsx` | Vertical category label, then full-height photo tiles with the name over a dark fade. |

---

## 4. Homepage Structure (`app/page.tsx`)

```text
+-------------------------------------------------------------------------------+
| 0. FLOATING NAVBAR  (green pill, products dropdown, language toggle)          |
+-------------------------------------------------------------------------------+
| 1. HERO             Full-bleed video, headline, copy + "Partner With Us"      |
+-------------------------------------------------------------------------------+
| 2. PARTNERS         Logo loop of Qatar retail partners                        |
+-------------------------------------------------------------------------------+
| 3. WHO WE ARE       Narrative, animated statistics, three numbered cards      |
+-------------------------------------------------------------------------------+
| 4. WHY CHOOSE US    surface-alt · centred heading · 4 stat cards · wide photo |
+-------------------------------------------------------------------------------+
| 5. WHAT WE DO       white · heading + "All Services" · 3 photo cards          |
+-------------------------------------------------------------------------------+
| 6. OUR PRODUCTS     white · centred heading · 2 full-bleed category rails     |
+-------------------------------------------------------------------------------+
| 7. SOURCING         white · heading + country pills | dotted world map        |
+-------------------------------------------------------------------------------+
| 8. CERTIFICATIONS   surface-alt · heading + button · 3 step cards + cert card |
+-------------------------------------------------------------------------------+
| 9. CTA              Produce photo, headline, "Contact Us"                     |
+-------------------------------------------------------------------------------+
| 10. FOOTER          Logo, "Go fresh for future", links, legal                 |
+-------------------------------------------------------------------------------+
```

---

## 5. Section Breakdown

### 0–3, 9–10. Navbar, Hero, Partners, Who We Are, CTA, Footer
Unchanged by the redesign. `components/layout/Navbar.tsx`, `components/modules/Hero.tsx`, `Partners.tsx`, `WhoWeAre.tsx`, `Cta.tsx`, `components/layout/Footer.tsx`.

### 4. Why Choose Us (`components/modules/Strengths.tsx`, `data/strengths.ts`)
*   `surface-alt` band, centred heading: "Built for **Freshness.** Ready to Deliver." with the highlight on "Freshness.".
*   Four centred white cards: line icon in `nairat-green`, figure, title with one highlighted word, one line of copy.
    *   `20` Dedicated Chiller Rooms · `5,000 m²` Cold-Chain Warehouse · `40` Refrigerated Vehicles · `Origin` Sourced at Origin.
    *   Figures come from the company profile; descriptions from the home page CMS fields.
*   One wide photo at `rounded-panel`, 420px (260px on phones).

### 5. What We Do (`components/modules/Services.tsx`)
*   Heading at the start ("Fresh Produce Supply at *Every Scale.*"), "All Services" `light` button at the end.
*   Three hairline cards, each a link to `/services`: 190px photo at `rounded-tile`, title, description — Global Sourcing & Import, Retail Supply & Category Management, Wholesale & Foodservice.

### 6. Our Products (`components/modules/Products.tsx`, `data/homeProductRails.ts`)
*   Centred heading: "Freshness, Sourced From **Around the World.**".
*   Two full-bleed `CategoryRail`s. The 64px label links to the category page.
    *   Fresh Fruits (`nairat-green`): Watermelon, Citrus Selection, Table Grapes, Mangoes.
    *   Vegetables (`forest`): Tomatoes, Capsicum, Cauliflower, Potatoes.
*   Tiles are 360px tall; on phones the label becomes a bar and tiles go two-up at 200px.

### 7. Sourcing (`components/modules/SourcingMap.tsx`)
*   Heading with the accent on the closing words, nine hairline country pills and a filled green "AND BEYOND".
*   Dotted world map (`public/sourcing/world-map.png`) at the inline end.

### 8. Certifications & Quality (`components/modules/QualityTimeline.tsx`)
*   `surface-alt` band. Heading "Quality You Can **Trust.**", "Our Quality Process" primary button → `/quality`.
*   Three white cards numbered 1–3 (a real sequence): Inspected at Origin → Tested on Arrival → Protected Through Cold Chain.
*   One forest card with `HACCP` (lime) and `ISO 22000:2018` (white) pills. Each pill is a button that opens the certificate viewer (`components/ui/CertificateModal.tsx`).

---

## 6. Page Variations (specified, not yet built)

The design system gives each inner page one accent for its hero and one detail; buttons stay `nairat-green` everywhere.

| Page | Hero accent | Twist |
| :--- | :--- | :--- |
| Company | `forest` | Milestone timeline; stat card grid led by a forest card |
| Products | `citrus` (ink text) | Category tabs as pills |
| Services | `nairat-green` | Six numbered panels, two-up |
| Sourcing & Quality | `sky` | Connected four-step line; certificate cards |
| Partners | `berry` | Partner logo wall; forest panel for the Mahaseel alliance |
| Contact | `lime` (ink text) | Form card beside a forest details panel |

---

## 7. Motion, Animation & Interaction Standards

1.  **Lenis Smooth Scrolling**:
    *   Provides inertial, continuous smooth scrolling across the entire page while respecting browser accessibility preferences.
2.  **GSAP ScrollTrigger**:
    *   All module entrances are orchestrated using `gsap.timeline` scoped via `@gsap/react`'s `useGSAP`.
    *   Scroll triggers fire once at `top 80%` to avoid distracting re-animations.
    *   Standard entrance easing: `power3.out` with duration `0.65s` and stagger `0.08s`.
3.  **Framer Motion**:
    *   Utilized for UI state transitions: product details modal, certificate image zoom viewer, and the slide-over contact drawer.
    *   Accessible backdrop dismissal and keyboard `Escape` key handling.
4.  **Section reveal (`lib/useSectionReveal.ts`)**:
    *   The redesigned home sections share one hook: each selector group staggers in once at `top 88%`; skipped on phones and under reduced motion.
5.  **Button Micro-Interactions (`CtaButton`)**:
    *   Isolated arrow badge that rotates 45° and scales on hover.
    *   Active button press scales down subtly (`active:scale-95`).

---

## 8. Accessibility (a11y) & SEO Guidelines

*   **Color Contrast**: All text elements meet or exceed WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body copy and 3:1 for large display titles).
*   **Focus States**: Visible `focus-visible:ring-2 focus-visible:ring-[#168849]` rings on all interactive links, buttons, and form inputs.
*   **Semantic Structure**: Single `<h1>` tag in the hero; appropriate `<h2>` hierarchy for every section; `<article>` elements for cards; `<nav>` for menus.
*   **Image Optimization**: Next.js `Image` component with `sizes` attributes, explicit aspect ratios, and descriptive `alt` tags (`aria-hidden="true"` for decorative graphics).
*   **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by bypassing GSAP tweens and Lenis smooth scrolling for sensitive users.
