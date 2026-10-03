# Specification: Client Feedback Implementation (Items A1 – A13)

## Overview
This specification details the technical remedies and content governance required to implement all 13 items from the client feedback report for the Nairat Food Services website.

## Phased Implementation Structure

### Phase 1: Independent Technical & Layout Fixes
1. **A2: Mobile Rendering & Visibility Fixes**
   - Fix initial header logo visibility on mobile load without requiring scroll (`Navbar.tsx`).
   - Eliminate blank block in "Who We Are" section by adding CSS fallback visibility and tuning `gsap.matchMedia` (`WhoWeAre.tsx`).
2. **A5: Homepage Product Carousel Active Category Filtering**
   - Refactor `Products.tsx` to dynamically filter rendered cards based on active category tab.
   - Reset scroll state smoothly upon tab transition.
3. **A8: Navigation & Link Corrections**
   - Audit all button CTAs and links across `Navbar`, `Footer`, `Hero`, `WhoWeAre`, `Strengths`, and `Services`.
   - Point dead `#` links to legitimate destinations.
   - Standardize `Careers` link to `/contact?subject=careers`.
4. **A9 & A13: Centralized Company Facts & Metric Counters**
   - Create `lib/config/company.ts` storing `establishedYear`, `productLinesCount: '1,500+'`, `teamMembersCount: '200+'`, `receivingDispatch: '24/7'`.
   - Update `QualitySourcingPhilosophy.tsx` and `CompanyInfrastructure.tsx` to use shared constants.
5. **A10: Unified Partner Logos Data**
   - Create `data/partners.ts` as single source of truth for approved partner logos.
   - Refactor `Partners.tsx` and `PartnerRetail.tsx` to consume the shared data source.
6. **A11: Contact Form Delivery & Verification**
   - Eliminate dev-mode mock success in production.
   - Provide direct WhatsApp and telephone fallbacks.
7. **A12: Domain & Metadata Centralization**
   - Set `metadataBase` in root `layout.tsx` using `siteConfig.url` (`https://nairatfoodservices.com`).
   - Clean up hardcoded references to `nairatfood.com`.

### Phase 2: Client Content & Translation Verification
1. **A1: Arabic Translation & RTL Typography Verification**
   - Review Arabic translations line-by-line with English counterparts for professional Qatar B2B accuracy.
   - Fix RTL hero headline punctuation.
   - Provide toggle control via `NEXT_PUBLIC_ENABLE_LANGUAGE_TOGGLE`.
2. **A6: Product Catalog & Item Master Integration**
   - Remove unsupported claims (*"Organic Herbs"*, *"Hass Variety"*, *"Italian Genovese"*, *"30+ countries"*).
   - Prepare data schema to receive client's official item master.
3. **A7: Sourcing Origin Single Source of Truth**
   - Create `data/sourcing.ts` with verified country list.
4. **A3: Hero Video Integration Interface**
   - Preserve existing MP4/WebM fallbacks and poster while awaiting Nairat warehouse footage.

## Verification
- Run `npx tsc --noEmit` and `npm run build`.
- E2E verification via `agent-browser` (mobile 375px viewport, desktop, English `/` and Arabic `/ar`).
