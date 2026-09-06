# Specification: Sourcing & Quality Page (`/quality`)

## 1. Overview
The **Sourcing & Quality** page is Phase 2 Milestone 4 of the Nairat Food Services web platform. It establishes Nairat’s operational authority in fresh produce distribution in Qatar around the core principle: **"Freshness is Logistics."**

The page details how Nairat guarantees uncompromising freshness and safety:
1. Rigorous **dual inspection** (at origin and on arrival).
2. **Laboratory testing** compliant with Qatar Ministry of Public Health food-safety requirements.
3. Cold-chain infrastructure: **6 loading-dock truck doors**, **5,000 m² cold-chain warehouse**, **20 dedicated chiller rooms** with tailored temperature zones, strict **FIFO (First-In, First-Out)** rotation, and **40 refrigerated vehicles**.
4. Official food safety certifications: **HACCP** and **ISO 22000:2018** with interactive full-resolution certificate previews.
5. **365-day seasonal sourcing**: buyers systematically planning harvest windows across global origins to deliver consistent quality twelve months a year.

---

## 2. Design System & Palette
- **Brand Green:** `#168849` / `#158647`
- **Deep Forest Green:** `#063B27` / `#042A1C`
- **Fresh Accents:** `#D4F056` (Lime) & `#FDE047` (Warm Amber/Gold)
- **Backgrounds:** `#FFFFFF`, `#F8FAF8`, `#F4F6F5`
- **Typography:** Display (`Figtree`), Body (`Montserrat`), Data/Metrics (`JetBrains Mono`)
- **Motion:** Scoped GSAP timelines with ScrollTrigger, staggered reveals, and responsive transitions.

---

## 3. Page Architecture & Content Structure (Matching Design Mockup)

The page layout consists of 5 modular sections plus the PageBanner and CTA module:

### 1. Header Banner (`PageBanner`)
- **Title:** `Sourcing & Quality`
- **Breadcrumbs:** `Home / Sourcing & Quality`

### 2. Section 1: Our Sourcing Philosophy (`QualitySourcingPhilosophy.tsx`)
- **Eyebrow:** `OUR SOURCING PHILOSOPHY`
- **Heading:** `Fresh Produce, Sourced Responsibly.`
- **Narrative:** Strategic grower partnerships and local expertise bringing the best fresh produce to Qatar.
- **3 Value Pillars:**
  1. `Global Network`: Trusted partners across 30+ countries
  2. `Quality First`: Strict inspection at every stage
  3. `Sustainable Sourcing`: Supporting responsible farming practices
- **Feature Card (Right):**
  - Container cargo ship imagery at international port
  - Title: `Sourcing from Around the World`
  - Body: Consistent supply and year-round availability
  - CTA Button: `Our Sourcing Regions ->`
  - 3 Highlight Metrics: `30+ Countries`, `400+ Product Lines`, `Year-Round Availability`

### 3. Section 2: Quality & Food Safety (`QualityFoodSafety.tsx`)
- **Eyebrow:** `QUALITY & FOOD SAFETY`
- **Heading:** `Rigorous Checks. Superior Quality.`
- **Narrative:** Strict quality control measures from origin to delivery.
- **CTA Button:** `Our Quality Process ->`
- **Two Certificate Feature Cards:**
  1. `HACCP`: Food Safety Management System with official certificate thumbnail & modal view.
  2. `ISO 22000:2018`: Food Safety Management System with official certificate thumbnail & modal view.
- Interactive modal with high-resolution certificate preview, backdrop dismiss, and ESC key support.

### 4. Section 3: Our Supply Chain (`QualitySupplyChain.tsx`)
- **Eyebrow:** `OUR SUPPLY CHAIN`
- **Heading:** `From Farm to You`
- **Narrative:** Transparency, control, and reliability ensuring fresh produce reaches customers in perfect condition.
- **4-Step Linear Flow with Connecting Arrows:**
  - `01 Source`: We partner with trusted growers and suppliers worldwide.
  - `02 Inspect`: Every consignment is inspected and tested for quality and safety.
  - `03 Cold Chain`: Temperature-controlled storage and transport maintain freshness.
  - `04 Deliver`: Fresh produce reaches our customers across Qatar.

### 5. Section 4: Our Infrastructure (`QualityInfrastructure.tsx`)
- **Left Column:** Warehouse photo with 3 floating stats: `5,000 m² Cold-Chain`, `20 Chiller Rooms`, `40 Fleet Trucks`.
- **Middle Column:** Eyebrow `OUR INFRASTRUCTURE`, heading `Built for Freshness and Efficiency`, description, and `Our Facilities ->` CTA.
- **Right Column:** 2x2 grid of rounded white stat cards:
  - `5,000 m²` Warehouse Space
  - `20` Chiller Rooms
  - `6` Loading Dock Doors
  - `40` Refrigerated Vehicles

### 6. Section 5: Our People (`QualityPeople.tsx`)
- **Left Column:** Eyebrow `OUR PEOPLE`, heading `The People Behind Our Freshness`, description, and `Join Our Team ->` CTA.
- **Middle Column:** Quality assurance team sorting and inspecting produce at packing tables.
- **Right Column:** Soft mint card with `200+ Team Members`, description, and organic leaf watermark.

### 7. Global Sourcing & Partner CTA (`Cta`)
- Global parallax CTA banner with drawer contact modal.
  - High-resolution preview of `/certificates/c1-1 1.png` and `/certificates/c2-2 1.png`.
  - Zoom and download capabilities.
  - Key audit criteria: biological, chemical, and physical risk management, annual independent auditing, and Qatar regulatory compliance.

### 5. 12-Month Seasonal Sourcing Strategy (`QualitySeasonalSourcing`)
- **Headline:** `365 Days of Freshness: Seasonal Sourcing Across Global Harvests`
- **Strategy:** Our buyers plan supply seasonally across complementary global origins (Europe, Mediterranean, East Africa, South Asia, South America) so customers enjoy consistent quality and uninterrupted availability twelve months a year.
- **Visual Matrix:**
  - Spring / Summer / Autumn / Winter sourcing corridors.
  - Origin transition dynamics (e.g. shifting citrus and stone fruit between northern and southern hemispheres).

### 6. Shared CTA Module (`Cta`)
- Global parallax CTA with interactive contact drawer for retail, food-service, and grower partnership inquiries.

---

## 4. Technical File Structure
```
app/
  quality/
    page.tsx                              # Route page with SEO metadata
components/
  quality/
    QualityHeroFeature.tsx                # Dual inspection & Qatar lab testing
    QualityColdChain.tsx                  # 6 docks, 5000m², 20 chillers, FIFO, 40 vehicles
    QualityCertifications.tsx             # HACCP & ISO 22000:2018 with interactive certificate modal
    QualitySeasonalSourcing.tsx           # 12-month global seasonal sourcing strategy
```

---

## 5. Navigation & SEO Integration
- Update `components/layout/Navbar.tsx`:
  - Change `Sourcing & Quality` link from `/#quality` to `/quality`.
  - Add active state highlighting when pathname is `/quality`.
- Update `components/layout/Footer.tsx`:
  - Add `Sourcing & Quality` link pointing to `/quality`.
- Page metadata:
  - Title: `Sourcing & Quality — Nairat Food Services Qatar`
  - Description: `Freshness is logistics. 5,000 m² cold warehouse, 20 chiller rooms, 6 loading docks, HACCP & ISO 22000:2018 certified food safety, and 12-month seasonal global sourcing.`

---

## 6. Verification Plan
- Type checking: `npx tsc --noEmit`.
- Browser verification: check navigation, layout, certificate modal opening/closing, animations, mobile responsiveness, and 0 console errors.
