# Design System Typography — Site-Wide

Apply the fonts of the Nairat Food Services design system (https://claude.ai/artifact/74DLs9diJLCY2e5ycFuzfJ) to every page. Layout, colour, spacing and components stay as they are: this is a font change only.

**Status**: implemented and verified.

## Problem

Five home sections follow the design system (Figtree headings, Montserrat eyebrows). The hero, Who We Are, CTA, footer and every inner page still set headings in Montserrat, so the typeface changes as a visitor scrolls or navigates.

## Font roles

| Role | Face | Token | Used for |
| :--- | :--- | :--- | :--- |
| Primary | Figtree | `--font-sans`, `--font-display` | Headings, body, buttons, navigation, figures |
| Secondary | Montserrat 700 | `--font-eyebrow` | Eyebrows and small uppercase labels |
| Arabic | Cairo | `--font-arabic` | Replaces both under `dir="rtl"` |

JetBrains Mono (phone numbers, step numbers) is not part of this change.

## Changes

1. `app/globals.css`
   - `--font-display` resolves to Figtree; new `--font-eyebrow` resolves to Montserrat.
   - `.type-display`, `.type-h1`–`.type-h4` read `--font-display` and take the design system weights (800 for display and h1, 700 for h2–h4) and h2 tracking (-0.02em). Sizes and line heights are unchanged.
   - `.type-eyebrow` reads `--font-eyebrow`; `.font-eyebrow` and `.type-eyebrow` join the Arabic cascade.
2. Small uppercase labels that used `font-display` (`SectionEyebrow`, company badges, the Looking Ahead label) move to `font-eyebrow`.
3. `app/layout.tsx` loads Montserrat at weight 700 only, the one weight the secondary role uses.

No component markup, size or colour changes beyond the class swap in step 2.

## Tracer bullet

Tokens in `globals.css` first, verified on the home hero and `/company` (one page per layer: token → class → rendered heading), then the label swap and font loading.

## Verification

`scripts/e2e-typography.sh` (agent-browser), against a running dev server:

- Every `h1`, `h2`, `h3` on `/`, `/company`, `/products/fruits`, `/services`, `/quality`, `/partners`, `/contact`, `/privacy` computes to Figtree.
- Every `.type-eyebrow` on those pages computes to Montserrat.
- On `/ar` and `/ar/company`, headings and eyebrows compute to Cairo.
- No horizontal scroll at 1440px and 375px on `/` and `/company`.
- `scripts/e2e-home.sh` still passes.

Result: 34 of 34 typography checks and all home checks pass. `/products/fruits` and `/privacy` have no `.type-eyebrow`, so only their headings are exercised.
