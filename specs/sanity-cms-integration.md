# Spec: Sanity Headless CMS Integration (Phase 3, Milestone 2)

## 1. Overview & Objectives
This specification outlines the technical design for integrating **Sanity Headless CMS** into the Nairat Food Services Next.js 16 (App Router) web application.

### Key Objectives:
1. **Embedded Sanity Studio**: Provide content editors with a web-based CMS interface at `/studio` (`app/studio/[[...tool]]/page.tsx`).
2. **Resilient Data Access Layer (Zero-Downtime Fallback)**: All data fetchers must query Sanity when configured, but automatically and seamlessly fall back to local typed datasets (`data/products.ts`, `data/partners.ts`, `data/sourcing.ts`, `lib/config/company.ts`) when Sanity credentials are not set or the API is unreachable.
3. **Bilingual Schema Modeling**: Full bilingual support (English `en` and Arabic `ar`) modeled directly into content schemas for products, partners, services, quality accreditations, and company metrics.
4. **Next.js Tag-Based ISR Caching & On-Demand Webhook**: Cache queries using Next.js Data Cache tags (`['products']`, `['partners']`, `['services']`, `['quality']`, `['company']`) and provide an on-demand revalidation endpoint at `/api/revalidate`.
5. **One-Command Content Seeding CLI**: Provide a TypeScript migration script (`scripts/seed-sanity.ts`) to instantly seed Sanity with existing catalog produce lines, partners, certificates, and company facts.

---

## 2. Tracer-Bullet Architecture

```mermaid
graph TD
    subgraph Editors & CMS
        Editor([Content Manager]) -->|Edits & Publishes| Studio[Sanity Studio at /studio]
        Studio -->|Writes| ContentLake[(Sanity Content Lake)]
        ContentLake -->|Webhook POST on publish| RevalAPI[/api/revalidate]
        RevalAPI -->|revalidateTag 'products'| NextCache[Next.js Data Cache]
    end

    subgraph Visitor Experience
        Visitor([Website Visitor]) -->|Visits /products or /ar/products| NextRouter[Next.js App Router]
        NextRouter --> DataAdapter[Resilient Data Adapter lib/sanity/data.ts]
        DataAdapter -->|Check Configuration| ConfigCheck{Sanity Configured?}
        ConfigCheck -->|YES: Cache HIT| NextCache
        ConfigCheck -->|YES: Cache MISS| SanityEdge[Sanity Global CDN]
        ConfigCheck -->|NO or API Error| LocalData[(Local Data Fallback: data/products.ts)]
        NextCache --> PageRender[Page Component with Bilingual Props]
        SanityEdge --> PageRender
        LocalData --> PageRender
    end
```

---

## 3. Schemas Specification

### 3.1 Product (`product`)
- `name`: string (English title, e.g. "Tomatoes")
- `nameAr`: string (Arabic title, e.g. "طماطم")
- `slug`: slug (auto-generated from name)
- `category`: string (list: `vegetables`, `fruits`, `leafy-herbs`, `specialty-gourmet`)
- `variety`: string (e.g. "Round, Plum & Beefsteak")
- `origin`: string (e.g. "Jordan, Turkey, Netherlands")
- `temp`: string (e.g. "+10°C to +12°C")
- `description`: text (English description)
- `descriptionAr`: text (Arabic description)
- `image`: image (hotspot: true, asset reference)
- `featured`: boolean (homepage carousel highlight)
- `order`: number (manual sort order)

### 3.2 Partner (`partner`)
- `name`: string (English, e.g. "Al Meera")
- `nameAr`: string (Arabic, e.g. "الميرة")
- `category`: string (list: `hypermarket`, `supermarket`, `quick-commerce`, `wholesale`, `agriculture`)
- `description`: string (English)
- `descriptionAr`: string (Arabic)
- `logo`: image (SVG/PNG/WebP asset)
- `featured`: boolean
- `order`: number

### 3.3 Service (`service`)
- `title`: string (English)
- `titleAr`: string (Arabic)
- `tagline`: string (English)
- `taglineAr`: string (Arabic)
- `description`: text (English)
- `descriptionAr`: text (Arabic)
- `features`: array of object ({ en: string, ar: string })
- `image`: image
- `order`: number

### 3.4 Quality Certificate (`qualityCert`)
- `title`: string (English, e.g. "HACCP Certification")
- `titleAr`: string (Arabic)
- `badge`: string (e.g. "CODEX ALIMENTARIUS")
- `issuer`: string
- `year`: string (e.g. "Active 2026")
- `description`: text (English)
- `descriptionAr`: text (Arabic)
- `thumbnail`: image
- `fullImage`: image
- `order`: number

### 3.5 Company Profile (`companyProfile` Singleton)
- Core operational facts, metrics, and institutional claims:
  - `productLinesCount` (e.g. "1,200+")
  - `dailyVolumeTonnes` (e.g. "~100 t")
  - `warehouseArea` (e.g. "5,000 m²")
  - `fleetVehiclesCount` (e.g. "40")
  - `teamSize` (e.g. "200+")
  - Contact details (phone, email, P.O. Box, address, CR number)

### 3.6 Company Page (`companyPage` Singleton)
- Comprehensive 8-section CMS coverage aligned 1:1 with `/company` and `/ar/company`:
  1. **Page Banner**: `bannerTitle`, `bannerTitleAr`, `bannerSubtitle`, `bannerSubtitleAr`
  2. **Delivering Freshness**: `deliveringEyebrow`, `deliveringTitle`, `deliveringNarrative`, `deliveringCommitmentTitle`, `deliveringCommitmentBody`, `deliveringImage`, `deliveringBadgeEst`, `deliveringBadgeLocation` (bilingual)
  3. **Vision & Mission**: `visionMissionTitle`, `visionMissionNarrative`, `visionTitle`, `visionBody`, `missionTitle`, `missionBody` (bilingual)
  4. **Infrastructure & Operational Scale**: `infraTitle`, `infraNarrative`, `infraImage`, `infraHubBadgeTitle`, `infraHubBadgeDesc` (bilingual)
  5. **Strategic Global Sourcing**: `sourcingEyebrow`, `sourcingHeadline`, `sourcingNarrative`, `sourcingCard1Badge`, `sourcingCard1Title`, `sourcingCard1Desc`, `sourcingCard2Badge`, `sourcingCard2Title`, `sourcingCard2Desc` (bilingual)
  6. **Dedicated Team**: `teamEyebrow`, `teamHeadline`, `teamNarrative` (bilingual), `teamImage` (Team photo upload option with hotspot support)
  7. **Quality & Food Safety**: `qualityEyebrow`, `qualityTitle`, `qualityNarrative`, `qualityImage`, `qualityBadgeText`, `qualityBadgeSubtext` (bilingual)
  8. **Looking Ahead**: `lookingAheadEyebrow`, `lookingAheadHeadline`, `lookingAheadNarrative`, `lookingAheadAmbitionLabel`, `lookingAheadAmbitionQuote`, `lookingAheadImage`, `lookingAheadBadgeText`, `lookingAheadBadgeSubtext` (bilingual)

### 3.7 Sourcing & Quality Page (`qualityPage` Singleton)
- Comprehensive 5-section CMS coverage aligned 1:1 with `/quality` and `/ar/quality`:
  1. **Page Banner**: `bannerTitle`, `bannerTitleAr`, `bannerSubtitle`, `bannerSubtitleAr`
  2. **Sourcing Philosophy**: `philosophyEyebrow`, `philosophyTitle`, `philosophyNarrative`, Pillars 1-3 (Titles & Descs bilingual), `sourcingCardImage` (upload with hotspot), `sourcingCardTitle`, `sourcingCardDesc`, and metrics.
  3. **Quality & Food Safety**: `foodSafetyEyebrow`, `foodSafetyTitle`, `foodSafetyNarrative`, `foodSafetyCtaText` (bilingual).
  4. **QA Inspection & Hygiene**: `inspectionEyebrow`, `inspectionTitle`, `inspectionImage` (photo upload with hotspot), Facility Badge title/desc, and inspection pillars 1-2.
  5. **Controls at Every Step (Supply Chain)**: `supplyChainEyebrow`, `supplyChainTitle`, `supplyChainSubtitle` (bilingual).

---

## 4. Implementation Steps
1. **Dependencies & Setup**:
   - Add `sanity: latest` to `package.json`.
   - Create `sanity.config.ts`.
   - Update `.env.local` with placeholders.
2. **Schema Modeling**:
   - Implement `sanity/schemas/` documents.
3. **Client & Resilient Data Fetchers**:
   - Create `lib/sanity/config.ts`, `lib/sanity/client.ts`, `lib/sanity/image.ts`, `lib/sanity/queries.ts`, and `lib/sanity/data.ts`.
4. **Embedded Studio & Revalidation API**:
   - Mount `/studio` route via `app/studio/[[...tool]]/page.tsx`.
   - Implement `/api/revalidate/route.ts` with secret verification and `revalidateTag()`.
5. **Page Data Wiring**:
   - Wire server pages (`app/products/...`, `app/partners/...`, `app/page.tsx`, etc.) to use the data adapter.
6. **Seeding Tool**:
   - Create `scripts/seed-sanity.ts`.
7. **Verification**:
   - Run type checking and static build (`npm run build`).
   - Validate with `agent-browser`.
