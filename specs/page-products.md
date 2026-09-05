# Specification: Phase 2, Milestone 2 — Dedicated Product Pages

## 1. Executive Summary & Page Purpose
- **Target Routes:**
  - `/products/vegetables` — Fresh Vegetables
  - `/products/fruits` — Fresh Fruits
  - `/products/leafy-herbs` — Leafy Greens & Culinary Herbs
  - `/products/specialty-gourmet` — Specialty & Gourmet Produce
- **Redirect Route:** `/products` $\rightarrow$ redirects cleanly to `/products/vegetables` (default category).
- **Target Audience:** Commercial wholesale purchasers, supermarket and hypermarket procurement managers, executive chefs, HORECA managers, and institutional catering directors across Qatar.
- **Single Job of the Pages:** Display Nairat Food's specialized commercial produce lines categorized with commercial packaging details, origin, seasonal handling, and direct B2B inquiry actions.

---

## 2. Page Structure & Layout
Each category page follows this clean, minimal architecture:
1. **Navbar:** Global floating header (`components/layout/Navbar.tsx`) with dropdown for product categories.
2. **Page Banner (Hero):** Universal hero banner (`components/ui/PageBanner.tsx`) matching `/company` style (title and breadcrumbs `Home / Our Products / <Category>`).
3. **4-in-a-Row Product Grid (`ProductGrid`):**
   - Clean 4-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`).
   - Individual Produce Card (`ProductCard`):
     - High-resolution produce image (`next/image`) filling the card with subtle hover zoom.
     - Product name positioned inside the image over a subtle dark gradient for high legibility.
     - No external filters, badges, tags, or buttons.
4. **Call to Action (`Cta`):** Corporate CTA banner with world sourcing visual and contact trigger.
5. **Footer (`Footer`):** Global corporate footer.

---

## 3. Produce Catalog Data Model

### Category 1: Vegetables (`/products/vegetables`)
1. **Tomatoes** — Fresh greenhouse & open-field harvest (Levant, Turkey, Spain)
2. **Cucumbers** — Crisp greenhouse varieties, graded for uniformity
3. **Capsicum (Green / Red / Yellow)** — Blocky bell peppers, vibrant color grading
4. **Eggplant** — Glossy classic & Italian elongated varieties
5. **Marrow / Zucchini** — Light green marrow & dark green Italian zucchini
6. **Cauliflower** — Tight, snow-white heads with protective wrapper leaves
7. **Cabbage** — Dense green, white, and red cabbage cultivars
8. **Potatoes** — Washing-grade table potatoes (Spunta, Mondial, Russet)
9. **Onions** — Red, yellow, and white storage & fresh pungent onions
10. **Chilli** — Fiery green & red finger chillies, bird's eye cultivars
11. **Okra** — Tender, fiber-free young green pods
12. **Beans** — Crisp green string beans, French beans, and flat runner beans

### Category 2: Fruits (`/products/fruits`)
1. **Watermelon** — Seedless & seeded sugar baby / crimson sweet cultivars
2. **Sweet Melon** — Fragrant Galia, Honeydew, and Cantaloupe melons
3. **Citrus Selection** — Navel & Valencia oranges, Eureka lemons, Persian limes, Mandarins, and Ruby Red grapefruits
4. **Stone Fruit** — Peaches, Nectarines, Black & Amber plums, Golden apricots, Sweet dark cherries
5. **Table Grapes** — Seedless white (Thompson/Sugraone), Red Globe, Crimson, and Autumn Royal
6. **Mangoes** — Premium seasonal Alfonso, Sindhri, Tommy Atkins, and Kent cultivars
7. **Strawberries & Berries** — Sweet Camarosa strawberries, Blueberries, Raspberries, Blackberries
8. **Pomegranate** — Ruby red arils, sweet Wonderful & Hicaz varieties
9. **Hass Avocado** — Pre-ripened & firm green-skin / dark pebbled Hass avocados

### Category 3: Leafy & Herbs (`/products/leafy-herbs`)
1. **Lettuce (Romaine & Iceberg)** — Crisp iceberg heads & crisp-hearted green Romaine
2. **Broccoli** — Dense green crowns, rich in nutrients and cold-stored
3. **Radish** — Bunching red table radishes with fresh greens & white daikon
4. **Beetroot** — Firm globe table beets with deep crimson flesh
5. **Fresh Culinary Herbs** — Aromatic fresh mint, coriander (cilantro), flat-leaf parsley, and sweet Genovese basil

### Category 4: Specialty & Gourmet (`/products/specialty-gourmet`)
1. **Baby Leaves & Microgreens** — Wild arugula, baby spinach, mizuna, red chard, and micro cilantro
2. **Exotic Mushrooms** — King Oyster, Shiitake, Shimeji, Portobello, and Enoki
3. **Passion Fruit** — Purple & golden aromatic passiflora with vibrant pulp
4. **Lychee** — Sweet, translucent summer lychees with fresh fragrant floral notes
5. **Dragon Fruit (Pitaya)** — Vibrant magenta & white-fleshed antioxidant-rich pitaya
6. **Seasonal Specialties** — Rare heirloom cultivars, kumquats, physalis, edible flowers, and white asparagus

---

## 4. Technical Architecture
- **Data File:** `data/products.ts`
  - Defines strongly typed interfaces `ProductItem`, `ProductCategoryData`.
  - Exports complete dataset for all 4 categories.
- **Components:**
  - `components/products/ProductCard.tsx` — Individual product tile.
  - `components/products/ProductGrid.tsx` — 4-column responsive grid container.
  - `components/products/CategoryTabs.tsx` — Horizontal category switcher.
- **Pages:**
  - `app/products/[category]/page.tsx` — Dynamic route using `generateStaticParams()` for optimal performance and SEO meta tags per category.
  - `app/products/page.tsx` — Redirects `/products` to `/products/vegetables`.

---

## 5. Verification Plan
1. **Build & Type Check:** `npx tsc --noEmit`
2. **E2E Browser Verification (`agent-browser`):**
   - Navigate to `/products/vegetables` and confirm 4-in-a-row grid layout on desktop ($1280\text{px}$).
   - Switch tabs to Fruits, Leafy & Herbs, Specialty & Gourmet.
   - Verify mobile responsive grid layout ($390\text{px}$).
   - Verify Navbar dropdown navigation directly opens the chosen category page.
