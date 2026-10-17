# Home Section Redesign & Nairat Design System Adoption

## Sources

| What | Where |
| --- | --- |
| Home page design | `Home` artboard in the "Nairat Website Redesign" canvas — https://claude.ai/artifact/72Jjn3ntruvC1anwDvMpNB |
| Design system | "Nairat Food Services" — https://claude.ai/artifact/74DLs9diJLCY2e5ycFuzfJ |

Where the two disagree, the artboard wins on layout and on its deliberate choices (green word highlight with white text, white arrow chip on green buttons). Colours the artboard inherited from the JKH Fruits system are replaced with Nairat tokens: charcoal `#2B2B2B` → `forest`, yellow `#FCD116` → `lime`, `#F3F3F1` → `surface-alt`.

## Scope

Home page only.

1. Rebuild five home sections to match the artboard: Why Choose Us, What We Do, Products, Sourcing, Certifications & Quality.
2. Add the design-system tokens to `app/globals.css` and the shared primitives the five sections need.
3. Rewrite `design.md` from the design system.

Out of scope: Hero, Partners, Who We Are, CTA, Footer, Navbar and every inner page. Their styling does not change. Page accents for inner-page banners are documented in `design.md` but not built.

## Tracer bullet order

1. Tokens → shared primitives → **Why Choose Us** → browser check. One section through every layer before the rest.
2. What We Do, Products, Sourcing, Certifications & Quality.
3. `design.md`, spec reconcile, `PROGRESS.md`.

## Tokens (`app/globals.css` `@theme`)

| Token | Value | Use |
| --- | --- | --- |
| `nairat-green` | `#168849` | Buttons, nav pill, rail label, big fills. White text ≥14px/600. |
| `nairat-green-deep` | `#13753F` | Green text and accent words, hover fill. |
| `green-50` | `#EAF5EE` | Number badge wash. |
| `lime` | `#D4F056` | Accent pills and chips. Ink text only. |
| `leaf` | `#C9E3B0` | Quiet tints, photo placeholders. |
| `forest` | `#0A2618` | Dark surface: lead cards, certificate card, vegetables rail label. |
| `on-forest-muted` | `#C9D6CE` | Secondary text on forest. |
| `ink` | `#111814` | Headlines and body. |
| `ink-muted` | `#5C6660` | Paragraphs, captions. |
| `surface-alt` | `#F4F6F5` | Alternating bands. |
| `line` | `#E3E8E5` | Hairlines. |
| `citrus` / `sky` / `berry` | `#E8772E` / `#1F6E8C` / `#8E2A4E` | Page accents. |

Radius: `card` 24px, `panel` 40px, `tile` 16px, pills full. Section padding 96px desktop, 64px mobile (`.section-pad`).

Type: redesigned sections use Figtree (`.type-section`, 700) with Montserrat eyebrows; Cairo for Arabic. The existing `.type-h*` Montserrat classes are untouched because other pages use them.

## Shared primitives

| Component | Behaviour |
| --- | --- |
| `components/ui/CtaButton` | Existing button, plus a `light` variant (white, hairline, green chip). |
| `components/ui/Highlight` | `Highlight`, `Accent` and `MarkedText` (marks a phrase inside CMS-supplied copy). |
| `components/ui/SectionHeading` | Eyebrow + heading + optional lead + optional action; `start` or `center`. |
| `components/ui/FeatureCard` | White card at 24px radius; `dark` variant on forest. |
| `lib/useSectionReveal` | One scroll-in stagger shared by the five sections. |

## Sections

### Why Choose Us (`components/modules/Strengths.tsx`) — `surface-alt`

- Centred header: eyebrow, "Built for [Freshness.] Ready to Deliver.", lead.
- Four centred white cards: line icon, figure, title with one highlighted word, one line of copy.
  - `20` Dedicated Chiller Rooms · `5,000 m²` Cold-Chain Warehouse · `40` Refrigerated Vehicles · `Origin` Sourced at Origin.
- One wide photo, 40px radius, 420px tall (260px on phones).

### What We Do (`components/modules/Services.tsx`) — white

- Header left ("Fresh Produce Supply at *Every Scale.*"), "All Services" light button right.
- Three hairline cards: 190px photo at 16px radius, title, description. Global Sourcing & Import · Retail Supply & Category Management · Wholesale & Foodservice. Each card links to `/services`.

### Products (`components/modules/Products.tsx`) — white, rails full-bleed

- Centred header: "Freshness, Sourced From [Around the World.]".
- Two rails (`components/products/CategoryRail.tsx`): a 64px vertical label linking to the category page, then four 360px photo tiles with the product name over a bottom fade.
  - Fresh Fruits (label on `nairat-green`): Watermelon, Citrus Selection, Table Grapes, Mangoes.
  - Vegetables (label on `forest`): Tomatoes, Capsicum, Cauliflower, Potatoes.
- Phones: tiles wrap two-up at 200px.

### Sourcing (`components/modules/SourcingMap.tsx`) — white

- Text left: eyebrow, "Connecting Global Harvests With *Qatar.*", hairline country pills, filled green "AND BEYOND".
- Flat world map right (`public/sourcing/world-map.*`), replacing the 3D globe.

### Certifications & Quality (`components/modules/QualityTimeline.tsx`) — `surface-alt`

- Header left ("Quality You Can [Trust.]"), "Our Quality Process" primary button right → `/quality`.
- Four cards: three white cards with a large green numeral (the steps are a real sequence: Inspected at Origin → Tested on Arrival → Protected Through Cold Chain); one forest card with `HACCP` and `ISO 22000:2018` pills that open the certificate viewer.

## Bilingual / RTL

Every new label has an Arabic string. Layout uses logical properties; rail labels sit at the inline start in both directions.

## Verification

- `pnpm exec tsc --noEmit` and `pnpm build` pass. `pnpm lint` reports only problems that predate this work, none in the changed files.
- `bash scripts/e2e-home.sh` (uses `agent-browser` against the dev server), 26 checks:
  - `/` at 1440px, `/ar`, and `/` at 375px: card counts for all five sections, no horizontal scroll.
  - HACCP pill opens the certificate viewer and `Escape` closes it; "All Services" → `/services`; Fresh Fruits rail → `/products/fruits`; "Our Quality Process" → `/quality`.
  - `/company` and `/contact` banners keep their original colour.

## Reconciliation notes

- Scope was narrowed to the home page after the first pass; the site-wide token sweep and banner accents were reverted.
- The 3D globe (`cobe`) was removed in favour of the artboard's flat map.
- Home copy defaults in `sanity/lib/data.ts` and `scripts/seed-sanity.ts` now carry the design's shorter strength descriptions and the sourcing heading "Connecting Global Harvests With Qatar." The live Sanity document still holds the earlier copy and overrides these until it is edited in Studio.
