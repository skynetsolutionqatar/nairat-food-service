# Specification: Phase 2, Milestone 1 — Company Page (`/company`)

## 1. Executive Summary & Page Purpose
- **Page Route:** `/company`
- **Subject:** Nairat Food Services corporate identity, operating scale, and cold-chain infrastructure.
- **Audience:** Institutional B2B buyers (supermarkets, hypermarkets, hotel food-and-beverage directors, government/catering procurement), suppliers, and prospective partners.
- **Single Job of Page:** Validate Nairat Food as Qatar's premier, dependable, cold-chain fresh produce partner by communicating its 2020 inception, 5,000 m² warehouse, 20 chillers, 40-vehicle fleet, global multi-region sourcing, and certified ISO 22000 / HACCP food safety standards.
- **Sequential Flow:**
  1. Hero
  2. Delivering Freshness
  3. Core Commitment
  4. Vision & Mission
  5. Our Growth
  6. Infrastructure (Built Around Freshness)
  7. Global Sourcing (From Global Sources to Qatar)
  8. Supply Chain (From Source to Shelf)
  9. Quality & Food Safety
  10. Looking Ahead
  11. Final CTA

---

## 2. Visual & Structural Design Tokens

### Color Palette (Consistent with Brand Tokens)
- **Deep Forest Primary:** `#063B27` (Commanding headers, dark hero accents)
- **Signature Emerald:** `#168849` / `#158647` (Brand accents, badges, buttons)
- **Leaf Lime Highlight:** `#4AA658` / `#D4F056` (Micro-accents, active badges)
- **Warm Sand Neutral:** `#F8FAF8` / `#F4F6F5` (Soft background section contrast)
- **Obsidian Dark Text:** `#111814` (High contrast primary readability)
- **Slate Text Muted:** `#47554E` / `#72807A` (Body descriptions and secondary subtitles)

### Typography Hierarchy (Manrope & JetBrains Mono)
- **Display / Hero H1:** `clamp(44px, 5.5vw, 68px)`, font-weight 600, `leading-[1.05]`, `tracking-[-0.04em]`
- **Section H2:** `clamp(32px, 3.5vw, 48px)`, font-weight 600, `leading-[1.12]`, `tracking-[-0.035em]`
- **Section H3 / Card Titles:** `clamp(20px, 2vw, 26px)`, font-weight 600, `leading-[1.25]`, `tracking-[-0.02em]`
- **Body Text:** `16px–17px`, font-normal to font-medium, `leading-[1.65]`, text color `#47554E`
- **Metric Numerals:** `font-mono` (JetBrains Mono), `clamp(32px, 4vw, 46px)`, font-bold, `tracking-tight`

---

## 3. Section-by-Section Content & Layout Architecture

### 1. Page Header Banner (Compact Subpage Header)
- **Title:** `Company`
- **Breadcrumbs:** `Home / Company`
- **Design Treatment:** Compact branded emerald strip (`#158647`) with organic watermark graphic on the right, providing clean visual separation under the floating navbar.

### 2. Delivering Freshness
- **Eyebrow:** `DELIVERING FRESHNESS`
- **H2:** `A comprehensive fresh-produce partner for Qatar.`
- **Body Content:**
  - *Paragraph 1:* "Nairat Food is one of Qatar's leading fresh-produce houses, specializing in the import, distribution and delivery of premium fruits and vegetables."
  - *Paragraph 2:* "Established in 2020, Nairat has grown rapidly by combining global sourcing, strong local market knowledge and dependable logistics. Today, we serve hypermarkets, supermarkets, wholesale buyers, food-service businesses and consumers across Qatar."
  - *Paragraph 3:* "From farms across the Levant, Gulf, Africa, Asia and beyond, our produce travels through an integrated supply chain designed to preserve freshness from source to customer."
- **Visual:** Split layout with high-resolution cold-chain distribution imagery (`/whychooseus/warehouse.avif`) with floating badge: *"Established 2020 · Doha, Qatar"*.

### 3. Our Core Commitment
- **Eyebrow:** `OUR CORE COMMITMENT`
- **H2:** `Freshness at every stage.`
- **Body:** "Our commitment is simple: to deliver high-quality fresh produce safely, efficiently and consistently. From selecting trusted suppliers and inspecting consignments to maintaining controlled temperatures and delivering through our refrigerated fleet, every stage of our operation is built around protecting freshness and quality."
- **Three Pillars Cards:**
  1. *Sourced with care* — Trusted grower selection and strict field auditing.
  2. *Handled with precision* — Unbroken cold-chain temperature control and expert handling.
  3. *Delivered with confidence* — Punctual daily scheduled deliveries in temperature-controlled fleet.

### 4. Vision & Mission
- **Card 1: Our Vision**
  - Eyebrow: `OUR VISION`
  - Headline: `Growing a fresher future for Qatar.`
  - Content: "To be Qatar's premier provider of fresh fruits and vegetables, offering exceptional quality, dependable service and year-round availability while creating lasting value for our customers, suppliers and communities."
- **Card 2: Our Mission**
  - Eyebrow: `OUR MISSION`
  - Content Part 1: "We are committed to supplying high-quality and affordable fresh produce while maintaining a strong food-safety culture across every aspect of our operations."
  - Content Part 2: "We continuously invest in our people, processes and infrastructure to create a safe and sustainable working environment, reduce operational risks and build long-term relationships with all our stakeholders."

### 5. Our Growth (Operational Scale)
- **Eyebrow:** `OUR GROWTH`
- **H2:** `From fresh-produce importer to an integrated supply network.`
- **Body:** "Since our establishment in 2020, Nairat Food has expanded its capabilities to meet the growing demand for fresh produce across Qatar."
- **Operational Metrics Grid (6 Metrics):**
  - `200+` — Team Members
  - `5,000 m²` — Cold-Chain Warehouse
  - `20` — Dedicated Chiller Rooms
  - `40` — Refrigerated Vehicles
  - `6` — Loading-Dock Truck Doors
  - `400+` — Product Lines
- **Caption Note:** "This infrastructure allows us to handle fresh produce efficiently while maintaining the quality and temperature required throughout the supply chain."

### 6. Built Around Freshness (Infrastructure)
- **Eyebrow:** `BUILT AROUND FRESHNESS`
- **H2:** `Infrastructure designed for scale.`
- **Lead Text:** "Our purpose-built cold-chain facility in Doha's Industrial Area forms the heart of our distribution operation. With dedicated chiller rooms, efficient loading infrastructure and refrigerated transportation, our facility is designed to move fresh produce quickly and safely from arrival to delivery."
- **4 Dedicated Infrastructure Modules (with photo cards):**
  1. *Cold-Chain Warehouse* (`warehouse.avif`): 5,000 m² of purpose-built space designed for fresh-produce handling and storage.
  2. *Dedicated Chiller Rooms* (`chiller-warehouse.avif`): 20 temperature-controlled rooms, allowing produce to be stored according to its specific requirements.
  3. *Loading Infrastructure* (`temperature-controlled.avif`): 6 loading-dock truck doors supporting efficient receiving and dispatch operations.
  4. *Refrigerated Fleet* (`truck.avif`): 40 refrigerated vehicles supporting temperature-controlled deliveries across Qatar.

### 7. From Global Sources to Qatar (Global Sourcing)
- **Eyebrow:** `FROM GLOBAL SOURCES TO QATAR`
- **H2:** `A sourcing network built for consistency.`
- **Key Proposition:** "Fresh produce is seasonal. Our supply needs to be dependable."
- **Content:**
  - "Nairat works with growers and suppliers across major producing regions around the world. Our sourcing network spans the Levant, Gulf, Africa, Asia and beyond, allowing us to plan supply according to seasonal availability and market demand."
  - "Our buying teams work closely with suppliers at origin and inspect consignments at key points in the supply chain, including the Abu Samra border."
  - "By sourcing from multiple regions, we can maintain greater consistency in product quality and availability throughout the year."
- **Visual Element:** Geographic sourcing matrix / region highlight cards (The Levant, The Gulf, Africa, Asia & Worldwide) with Abu Samra border clearance callout.

### 8. Our Team (The People Driving Our Growth)
- **Eyebrow:** `OUR TEAM`
- **H2:** `The People Driving Our Growth`
- **Narrative:** "At Nairat Food, we understand the goals and aspirations of each team member, as well as the needs of our business. Whether you're new to our team or have been with us for a while, we are dedicated to helping you reach your full potential. Currently, we have 150 employees, but we are experiencing rapid growth and will soon have 200 employees to support our expansion plans. Our team is one of our most valuable assets, and we prioritize their well-being to ensure the smooth operation of our company."
- **Visual Asset:** `/team/team.jpg` with full team showcase banner and metadata badges (*150+ Employees Today · Expanding to 200+*).

### 9. Our Supply Chain (From Source to Shelf)
- **Eyebrow:** `OUR SUPPLY CHAIN`
- **H2:** `From source to shelf.`
- **Sequential 4-Step Process:**
  - `01 — Source`: We establish relationships with trusted growers and suppliers across global producing regions.
  - `02 — Inspect`: Our teams inspect consignments at origin and upon arrival to maintain quality standards.
  - `03 — Protect`: Produce is handled through controlled cold-chain facilities and refrigerated transportation.
  - `04 — Deliver`: Our distribution network delivers fresh produce reliably to customers across Qatar.

### 9. Quality & Food Safety
- **Eyebrow:** `QUALITY & FOOD SAFETY`
- **H2:** `Quality you can trust.`
- **Body:** "At Nairat, food safety and quality are integrated into our daily operations. Incoming consignments are inspected and laboratory testing is carried out in line with Qatar food-safety requirements. Our produce is then handled through controlled cold-chain processes designed to maintain freshness and quality until delivery."
- **Certified Badges & Standards:**
  - `HACCP`: Hazard Analysis and Critical Control Points
  - `ISO 22000:2018`: Food Safety Management System
- **Interactive:** Certificate previews (`/certificates/c1-1-1.png` & `/certificates/c2-2-1.png`).

### 10. Looking Ahead
- **Eyebrow:** `LOOKING AHEAD`
- **H2:** `Building the future of fresh-produce supply.`
- **Body:**
  - "Nairat Food continues to strengthen its sourcing network, operational capabilities and infrastructure to meet the evolving needs of Qatar's food and retail sectors."
  - "Our focus remains on building stronger partnerships, expanding access to quality produce and delivering a dependable fresh-produce supply throughout the year."
- **Core Ambition Highlight:** "Our ambition is to become the trusted fresh-produce partner for businesses and consumers across Qatar."

### 11. Final CTA Section (Reusing Home Page `<Cta />` Module)
- **Shared Module:** `@/components/modules/Cta` with full-bleed parallax background (`/cta/ctaft-bac.webp`), vignette gradient, and expandable corporate partnership form.
- **Heading:** `Freshness starts at the source.`
- **Subtitle:** `From farms around the world to customers across Qatar, Nairat Food is built to deliver fresh.`
- **Actions:**
  - `Partner With Us →` (Primary Emerald Action Button)
  - `Contact Nairat →` (Secondary Outlined Action Button)

---

## 4. Technical Architecture & File Structure

```
app/
  company/
    page.tsx                   # Route page component with SEO metadata
components/
  company/
    CompanyHero.tsx            # Hero with editorial headline & anchor jump links
    CompanyDelivering.tsx      # Delivering Freshness 3-paragraph split layout
    CompanyCommitment.tsx      # Freshness at every stage + 3 pillars
    CompanyVisionMission.tsx   # Side-by-side Vision and Mission cards
    CompanyGrowth.tsx          # 6-metric operational bento with mono numbers
    CompanyInfrastructure.tsx  # 4 cold-chain facilities with asset images
    CompanySourcing.tsx        # Global sourcing network & Abu Samra callout
    CompanySupplyChain.tsx     # 01-04 Source to shelf process timeline
    CompanyQuality.tsx         # Food safety testing + HACCP/ISO 22000
    CompanyLookingAhead.tsx    # Forward outlook & strategic partnerships
  modules/
    Cta.tsx                    # Shared full-bleed CTA module matching home page design
```

### Navigation Updates
- Update `components/layout/Navbar.tsx` and `components/layout/Footer.tsx`:
  - Ensure links point properly: `Company` -> `/company` (active indicator when on `/company`).
  - Home link points to `/` (or `/#home`).

---

## 5. Verification & E2E Testing Plan
- **Routing & Rendering:** Verify `/company` loads cleanly without console errors or hydration mismatches.
- **Navigation Flow:** Test clicking `Company` from Navbar on home page navigates to `/company`; clicking `Home` navigates back.
- **Scroll & Interactions:** Test GSAP reveal animations, anchor navigation links, and responsive layouts across desktop (1440px), tablet (768px), and mobile (375px).
- **Web Interface Guidelines & Accessibility:** Check semantic tags (`h1`, `h2`, `section`), ARIA attributes, button contrast ratios, and touch targets.
