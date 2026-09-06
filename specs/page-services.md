# Specification: Phase 2, Milestone 3 — Services Page (`/services`)

## 1. Executive Summary & Page Purpose
- **Page Route:** `/services`
- **Subject:** Nairat Food Services core business offerings and operations across Qatar.
- **Audience:** Hypermarket/supermarket procurement managers, online quick-commerce operators (e.g., Talabat Mart), wholesale market traders, international growers and exporters, and retail consumers.
- **Single Job of Page:** Present Nairat Food's three key service pillars in a clear, high-impact horizontal card layout (image left, heading and detailed content right) followed by an immediate contact action.
- **Sequential Flow:**
  1. Page Header Banner (`PageBanner`) with breadcrumbs and title
  2. 3-Card Row-Wise Service Section:
     - Card 1: Retail & Wholesale Distribution
     - Card 2: For Growers & Exporters
     - Card 3: Nairat Shop
  3. Shared Global CTA Module (`Cta`)
  4. Global Footer (rendered by root layout)

---

## 2. Visual & Structural Design Tokens

### Color Palette (Consistent with Brand Tokens)
- **Deep Forest Primary:** `#063B27` (Commanding headers, badges)
- **Signature Emerald:** `#168849` / `#158647` (Brand accents, pills, active links)
- **Leaf Lime Highlight:** `#D4F056` (Micro-accents, tags)
- **Warm Sand Neutral:** `#F8FAF8` / `#F4F6F5` (Card background & surface contrast)
- **Obsidian Dark Text:** `#111814` (High-contrast primary headings)
- **Slate Text Muted:** `#47554E` / `#6B7280` (Body descriptions & copy)

### Typography Hierarchy (Manrope)
- **Banner Title H1:** `text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight`
- **Service Card H2:** `text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#111814]`
- **Body Copy:** `font-sans text-sm sm:text-base text-[#47554E] leading-relaxed`
- **Eyebrow Tag:** `font-display text-xs font-bold uppercase tracking-[0.1em] text-[#168849]`

---

## 3. Section Architecture & Content Details

### 1. Page Header Banner (`PageBanner`)
- **Title:** `Our Services`
- **Breadcrumbs:** `Home / Our Services`
- **Description:** `Connecting global growers, retail partners, and local consumers through seamless cold-chain logistics and market-fresh distribution.`

### 2. Services List Section (`ServicesList`)
3 horizontal cards stacked vertically (row-wise layout):
Each card is an enclosed card container with `lg:grid lg:grid-cols-12`, featuring:
- **Left Column (5 cols):** High-resolution photography in a rounded container with subtle hover scale.
- **Right Column (7 cols):** Eyebrow badge, primary title, descriptive copy, key capability badges, and direct action button.

#### Card 1: Retail & Wholesale Distribution
- **Image:** `/services/wholesale-distribution.avif`
- **Eyebrow:** `01 · COMMERCIAL & RETAIL DISTRIBUTION`
- **Title:** `Retail & Wholesale Distribution`
- **Content:** Daily programme supply to hypermarkets, supermarkets and online grocery platforms (Talabat Mart) across Qatar with store-level delivery, plus wholesale market trading.
- **Key Features:**
  - Daily scheduled store-level delivery
  - Hypermarkets, supermarkets & online platforms (Talabat Mart)
  - Central wholesale market trading & bulk supply
- **Action Link:** `Inquire About Distribution` -> `#contact`

#### Card 2: For Growers & Exporters
- **Image:** `/services/grower and exporter.avif`
- **Eyebrow:** `02 · GLOBAL SUPPLY PARTNERSHIP`
- **Title:** `For Growers & Exporters`
- **Content:** Consignment and direct-trading partnerships: Nairat receives, clears, stores, markets and distributes your produce in Qatar with transparent settlement.
- **Key Features:**
  - Port & customs clearance handling
  - 5,000 m² cold-chain warehouse & 20 chiller rooms
  - Transparent reporting and consignment settlement
- **Action Link:** `Partner With Us` -> `#contact`

#### Card 3: Nairat Shop
- **Image:** `/services/nairat shop.avif`
- **Eyebrow:** `03 · DIRECT CONSUMER RETAIL`
- **Title:** `Nairat Shop`
- **Content:** Our own fresh-produce retail store, open to the public, with the full range at market-fresh prices.
- **Key Features:**
  - Open to the public daily
  - Full catalog of fresh fruits, vegetables & specialty herbs
  - Unbeatable farm-direct & market-fresh pricing
- **Action Link:** `Visit Nairat Shop` -> Google Maps location (`target="_blank"`, `rel="noopener noreferrer"`)

### 3. Contact & Partnership CTA Module (`Cta`)
- Shared component from `components/modules/Cta.tsx` with parallax background, interactive drawer contact form, and direct corporate inquiry handling.

---

## 4. Technical File Structure & Animations
```
app/
  services/
    page.tsx                   # Route page component with SEO metadata
components/
  services/
    ServicesList.tsx           # 3-card row-wise service card list component with GSAP ScrollTrigger
  ui/
    PageBanner.tsx             # Shared header banner with GSAP entrance animations
```

### GSAP Animations:
- **PageBanner:** Smooth text-reveal timeline on `title` and `breadcrumbs` (`opacity: 0, y: 20` -> `opacity: 1, y: 0`, `power3.out`).
- **ServicesList:**
  - Each service card is animated with `ScrollTrigger` (`start: 'top 85%'`, `once: true`).
  - Card container slides up smoothly (`y: 32` -> `y: 0`, duration: `0.7s`).
  - Internal card elements (category badge, title, paragraph, feature bullets, action button) reveal with staggered timing (`stagger: 0.08s`, duration: `0.5s`).

## 5. Navigation Integration
- In `components/layout/Navbar.tsx`:
  - Update `Services` link to `/services`.
  - Add active state highlighting when pathname is `/services`.
- In `components/layout/Footer.tsx`:
  - Update `Services` link to `/services`.
