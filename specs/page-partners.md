# Specification: Partners Page (`/partners`)

## 1. Overview
The **Partners** page (`/partners`) is Phase 2 Milestone 5 of the Nairat Food Services web platform. It showcases Nairat’s network of partners spanning:
1. **Qatar Retail & Digital Grocery Groups**: Trusted daily supplier to Qatar's premier hypermarket chains (Al Meera, LuLu, Carrefour, Safari, Grand Mall, Rawabi, Saudia, ABC Fresh) and supply partner to Talabat Mart for online grocery.
2. **Local Agricultural Ecosystem (Mahaseel)**: Strategic partnership with Mahaseel, connecting homegrown Qatari farms to retail shelves with seasonal local produce in alignment with Qatar's National Food Security Strategy.
3. **Global Grower & Export House Alliances**: Decades-long sourcing relationships across Jordan, Saudi Arabia, Lebanon, Syria, Iran, Egypt, South Africa, and beyond (with institutional regional aggregation protecting supplier privacy).
4. **Partner Onboarding Pathways**: Direct commercial entry points for international growers/exporters, local supermarkets/hypermarkets, and Qatari farmers.

---

## 2. Design System & Palette
- **Brand Green:** `#168849` / `#158647`
- **Forest Green:** `#063B27` / `#042A1C`
- **Fresh Accents:** `#D4F056` (Lime) & `#FDE047` (Warm Amber/Gold)
- **Backgrounds:** Alternating pure-white (`#FFFFFF`) and soft-mint (`#F4F8F5`)
- **Typography:**
  - Display: **Montserrat** (`font-display`) for headings and titles
  - Body: **Figtree** (`font-sans`) for descriptions and copy
  - Metrics: **JetBrains Mono** (`font-mono`) for numerical values
- **Colors:**
  - Headings: `#111814`
  - Eyebrows: `#168849`
  - Subheadings & Body Copy: `#6B7280`

---

## 3. Component Architecture & Page Hierarchy

### 1. Header Banner (`PageBanner`)
- **Title:** `Partners`
- **Breadcrumbs:** `Home / Partners`
- **Description:** "Cultivating enduring partnerships across Qatar’s retail leaders, local agriculture, and global grower networks."

### 2. Section 1: Qatar Retail & Online Grocery Groups (`PartnerRetail.tsx`)
- **Eyebrow:** `QATAR RETAIL & ONLINE GROCERY`
- **Headline:** `Trusted Daily Supplier to Qatar's Leading Retailers.`
- **Narrative:** Daily scheduled store-level delivery to Qatar’s primary hypermarket networks and supply partnership with Talabat Mart for online on-demand grocery.
- **Retail Partner Showcase:**
  - Logo cards: **Al Meera**, **LuLu Hypermarket**, **Carrefour**, **Safari Hypermarket**, **Grand Mall**, **Rawabi**, **Saudia**, **ABC Fresh**.
  - Featured Online Partner Card: **Talabat Mart** (Digital grocery on-demand fulfillment).
- **Service Commitments:**
  - Store-level daily morning delivery across all Qatar districts
  - Strict cold-chain temperature preservation upon dock arrival
  - Complete traceability and barcode audit trails

### 3. Section 2: Strategic Local Agriculture with Mahaseel (`PartnerLocalAgriculture.tsx`)
- **Eyebrow:** `LOCAL AGRICULTURAL PARTNERSHIP`
- **Headline:** `Empowering Qatari Farms: Strategic Partnership with Mahaseel.`
- **Narrative:**
  - In collaboration with Mahaseel (Marketing and Agricultural Services Company), Nairat connects local Qatari farms directly to market demand.
  - Prioritizing homegrown seasonal crops to enhance national self-sufficiency and freshness.
- **Visual Presentation:**
  - Left: Official Mahaseel partnership feature card with Mahaseel logo (`/partners/mahaseel.png`), Qatari national produce support metrics, and harvest calendar.
  - Right: Key benefits for local growers and retailers (market access, rapid cold-chain dispatch, fair commercial terms).

### 4. Section 3: Global Grower & Export Alliances (`PartnerGlobalGrowers.tsx`)
- **Eyebrow:** `GLOBAL SOURCING ALLIANCES`
- **Headline:** `Direct Alliances with Premier Growing Regions.`
- **Narrative:**
  - Long-standing sourcing partnerships with certified growers and export houses across the world's most fertile agricultural belts.
  - *Confidentiality Note*: In accordance with international trade best practices, individual grower commercial contracts remain confidential while regional provenance is celebrated.
- **Regional Hubs Breakdown:**
  - **The Levant**: Jordan, Lebanon, Syria (Tomatoes, cucumbers, stone fruits, apples, leafy greens)
  - **The Gulf**: Saudi Arabia (Dates, premium desert vegetables)
  - **North Africa**: Egypt (Citrus, onions, garlic, potatoes)
  - **Southern Africa**: South Africa (Citrus, table grapes, pears)
  - **Asia & Beyond**: Iran, Turkey, India (Watermelons, pomegranates, specialty items)

### 5. Section 4: Partner Collaboration & Onboarding (`PartnerOnboarding.tsx`)
- **Eyebrow:** `COLLABORATE WITH NAIRAT`
- **Headline:** `Join Our Growing Network.`
- **3 Collaboration Tracks:**
  1. **Growers & Exporters**: Consignment and direct purchasing with transparent customs clearance and Doha cold-storage.
  2. **Retailers & Food Service**: Reliable scheduled delivery programs with zero stock-outs.
  3. **Local Qatari Farms**: Fast aggregation and direct distribution through our central facilities.
- **CTA**: Integrated `CtaButton` directing to partner inquiry / contact drawer.

### 6. Global CTA & Institutional Footer (`Cta` + `Footer`)

---

## 4. Navigation & Site Integration
- Update `components/layout/Navbar.tsx`: set `href: '/partners'` with active state detection.
- Update `components/layout/Footer.tsx`: add `Partners` link to `/partners`.

---

## 5. Verification Plan
- Verify page compilation and rendering at `http://localhost:3001/partners`.
- Audit desktop (1440px) and mobile (375px) viewports with `agent-browser`.
- Verify logo responsiveness, CTA clicks, and zero console errors.
