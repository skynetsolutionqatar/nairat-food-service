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

## 3. Page Architecture & Content Structure

### 1. Header Banner (`PageBanner`)
- **Title:** `Sourcing & Quality`
- **Breadcrumbs:** `Home / Sourcing & Quality`
- Clean, focused header banner with organic brand watermark.

### 2. Full-Width 12-Column Header Grid Standard (Matching `design.md`)
Across all content sections on `/quality`, section headers span the full width of the container (`max-w-[1140px] 2xl:max-w-[1240px]`) using an asymmetric 12-column grid:
- **Left Column (`lg:col-span-7`):** Eyebrow badge (`type-eyebrow`) and primary display heading (`type-h2`).
- **Right Column (`lg:col-span-5`):** Explanatory lead paragraph (`type-lead`).

### 3. Quality Philosophy & Inspection (`QualityHeroFeature`)
- **Eyebrow:** `OUR QUALITY PHILOSOPHY`
- **Main Heading:** `Freshness is Logistics: Inspected at Origin. Verified in Qatar.`
- **Narrative:**
  - Produce is inspected at the grower/packhouse origin before loading, and re-inspected upon arrival in Doha.
  - Mandatory laboratory testing is conducted on incoming consignments in strict accordance with Qatar food safety regulations (MOPH).
- **Core Verification Badges:**
  - Origin Pre-Shipment Inspection
  - Qatar Arrival Testing (MOPH Standards)
  - Full Cold-Chain Temperature Logging

### 3. Cold-Chain Infrastructure (`QualityColdChain`)
The physical backbone maintaining the unbroken cold chain:
1. **6 Enclosed Loading-Dock Truck Doors:** Rapid pneumatic sealed bays preventing ambient heat exposure during container unloading.
2. **5,000 m² Cold-Chain Warehouse:** Purpose-built logistics center in Doha’s Industrial Area engineered for high-throughput fresh handling.
3. **20 Dedicated Multi-Zone Chiller Rooms:** Independently controlled temperature and humidity zones customized for specific produce varieties (leafy greens, stone fruits, citrus, root vegetables).
4. **Strict FIFO Inventory Rotation:** Barcode tracking and strict First-In, First-Out inventory flow ensuring optimal turnover and zero product stagnation.
5. **40 Refrigerated Fleet Vehicles:** Active temperature-controlled delivery fleet supplying supermarkets, hypermarkets, and institutional clients daily across Qatar.

### 4. Food Safety & Accreditations (`QualityCertifications`)
- **Certifications:**
  - **HACCP Certified:** Hazard Analysis Critical Control Point food-safety system.
  - **ISO 22000:2018 Certified:** Food Safety Management System accreditation.
- **Interactive Certificate Modal:**
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
