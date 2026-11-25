# Home "What We Do" Cards in Sanity

## Problem

The home page Services section ("What We Do") reads its eyebrow and headline from
Sanity, but its three cards are hardcoded in `components/modules/Services.tsx`.
Editors cannot change them, and Sanity has no copy of the content the site shows.

## Goal

Sanity holds the same three cards the site shows locally, and the section renders
them from Sanity. The local cards stay as the fallback when Sanity is empty or down.

## Tracer bullet

One slice through every layer:

1. **Data** — move the three cards to `data/homeServiceCards.ts` (single source for
   the component fallback and the seed script).
2. **Mapping** — `lib/homeServiceCards.ts` turns raw Sanity rows into cards and
   falls back to the local cards when nothing usable comes back. Unit tested.
3. **Schema** — `homePage.servicesCards`: array of objects with `title`, `titleAr`,
   `description`, `descriptionAr`, `image` (in the "Services Section" fieldset).
4. **Query / data** — `HOME_PAGE_QUERY` projects `servicesCards[]` with `imageUrl`;
   `getHomePageContent` returns mapped `servicesCards`.
5. **Component** — `Services.tsx` renders `content.servicesCards`.
6. **Content** — seed script writes the cards; the live `homePage-singleton` is
   patched with the same cards and uploaded images (no other fields touched).

## Content (must match local exactly)

| Title (EN) | Description (EN) | Image |
| --- | --- | --- |
| Global Sourcing & Import | Direct relationships with growers and exporters across Europe, the Middle East and Asia. | `/services/global-sourcing-import.webp` |
| Retail Supply & Category Management | Daily supply to hypermarket and supermarket chains, up to full fresh-section management. | `/services/retail-supply-management.webp` |
| Wholesale & Foodservice | Bulk supply to wholesalers, caterers, restaurants and independent grocers. | `/services/wholesale-foodservice.webp` |

Arabic text is carried over unchanged from the current component.

## Verification

- `pnpm test` passes (mapping tests).
- `pnpm build` / type-check passes.
- Sanity query returns three cards matching the table.
- agent-browser: `/` and `/ar` show the three cards with Sanity CDN images.
