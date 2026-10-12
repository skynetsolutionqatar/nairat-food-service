# Home Section Redesign & Nairat Design System Adoption

## Sources

| What | Where |
| --- | --- |
| Home page design | `Home` artboard in the "Nairat Website Redesign" canvas — https://claude.ai/artifact/72Jjn3ntruvC1anwDvMpNB |
| Design system | "Nairat Food Services" — https://claude.ai/artifact/74DLs9diJLCY2e5ycFuzfJ |

Where the two disagree, the artboard wins on layout and on its deliberate choices (green word highlight with white text, white arrow chip on green buttons). Colours the artboard inherited from the JKH Fruits system are replaced with Nairat tokens: charcoal `#2B2B2B` → `forest`, yellow `#FCD116` → `lime`, `#F3F3F1` → `surface-alt`.

## Scope

1. Rebuild five home sections to match the artboard: Why Choose Us, What We Do, Products, Sourcing, Certifications & Quality.
2. Move the site onto the design-system tokens (colour, type, radius) through `app/globals.css` and the shared UI primitives.
3. Give every inner page banner its page accent.
4. Rewrite `design.md` from the design system.

Out of scope: restructuring Hero, Partners, Who We Are, CTA, Footer or any inner-page section. They only pick up the new tokens.

## Tracer bullet order

1. Tokens → shared primitives → **Why Choose Us** → browser check. One section through every layer before the rest.
2. What We Do, Products, Sourcing, Certifications & Quality.
3. Token sweep and page accents across the remaining pages.
4. `design.md`, spec reconcile, `PROGRESS.md`.

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

Radius: `card` 24px, `panel` 40px, `tile` 16px, pills full. Section padding 96px desktop, 64px mobile.

Type: Figtree for all headings and body (h2 700, display 800); Montserrat for eyebrows only; Cairo for Arabic.

## Shared primitives (`components/ui/`)

| Component | Behaviour |
| --- | --- |
| `CtaButton` | Pill with a 32px arrow chip, 48px min height. Variants `primary`, `light`, `lime`; legacy variant names map onto these. |
| `SectionEyebrow` | Leaf glyph + uppercase label. |
| `Highlight` | Green marker behind one or two words of a heading. One per heading. |
| `SectionHeading` | Eyebrow + h2 + optional lead + optional action; `start` or `center`. |
| `FeatureCard` | White card at 24px radius; `dark` variant on forest. |

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

## Page accents (`components/ui/PageBanner.tsx`)

| Page | Accent | Text |
| --- | --- | --- |
| Company | `forest` | white |
| Products | `citrus` | ink |
| Services | `nairat-green` | white |
| Sourcing & Quality | `sky` | white |
| Partners | `berry` | white |
| Contact | `lime` | ink |
| Privacy, Terms | `nairat-green` | white |

Banners with a photo keep the photo and its overlay.

## Bilingual / RTL

Every new label has an Arabic string. Layout uses logical properties; rail labels sit at the inline start in both directions.

## Verification

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`.
- `scripts/e2e-home.sh` with `agent-browser` against the dev server:
  - `/` at 1440px and 375px: five sections present, no horizontal scroll.
  - Four strength cards; three service cards; "All Services" → `/services`; rail labels → category pages; certificate pills open and `Escape` closes the viewer; "Our Quality Process" → `/quality`.
  - `/ar`: sections render right-to-left.
  - Inner pages show their accent banner.
