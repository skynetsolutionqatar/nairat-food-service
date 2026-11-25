# Home Bottom CTA Section in Sanity

## Problem

The home page bottom CTA (`components/modules/Cta.tsx`) reads its two headline lines,
two subtext lines and button text from Sanity, and they already match. But:

- Sanity also holds `ctaHeadline` / `ctaDescription` (EN/AR) that the section never shows.
- The background photo and the country-flags image are hardcoded.

## Goal

Every piece of content the section shows has a matching field in the `homePage`
document ("9. Bottom CTA Section"), filled with the current local content.
Local content stays as the fallback.

## Tracer bullet

1. **Schema** — on `homePage`, fieldset `cta`:
   - add `ctaBackgroundImage` and `ctaFlagsImage` (image, hotspot)
   - remove `ctaHeadline`, `ctaHeadlineAr`, `ctaDescription`, `ctaDescriptionAr`
2. **Query / data** — `HOME_PAGE_QUERY` projects `ctaBackgroundImageUrl` and
   `ctaFlagsImageUrl`; `getHomePageContent` falls back to the local paths; the
   unused fields are removed from the type, defaults and mapping.
3. **Component** — `Cta.tsx` uses the two image URLs.
4. **Content** — seed script uploads both images; live `homePage-singleton` is
   patched with only these fields.

## Content (must match local exactly)

| Field | Value |
| --- | --- |
| Background image | `/cta/ctaft-bac.webp` |
| Flags image | `/cta/ctacontry.webp` |
| Line 1 / 2, subtexts, button | unchanged (already match) |

## Verification

- `pnpm test` and type-check pass.
- Sanity query returns both image URLs; headline/description fields are gone.
- agent-browser: `/` and `/ar` render the same text with `cdn.sanity.io` images.
