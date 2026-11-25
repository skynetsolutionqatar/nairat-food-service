# Home "Certifications & Quality" Section in Sanity

## Problem

The home page Quality section (`components/modules/QualityTimeline.tsx`) reads only
its eyebrow and headline from Sanity. The step cards, certificate pills, certified
note and button text are hardcoded, while Sanity holds a narrative the section
never shows.

## Goal

Every piece of text the section shows has a matching field in the `homePage`
document ("8. Certifications & Quality Section"), filled with the current local
content. The local content stays as the fallback.

## Tracer bullet

1. **Data** — `data/homeQuality.ts`: local steps, certificates, note and button text.
2. **Mapping** — `lib/homeQuality.ts` maps Sanity rows with local fallback. Unit tested.
3. **Schema** — on `homePage`, fieldset `quality`:
   - `qualitySteps`: array of `{ title, titleAr, description, descriptionAr }`
   - `qualityCertificates`: array of strings (pill labels)
   - `qualityCertifiedNote` / `qualityCertifiedNoteAr`
   - `qualityCtaText` / `qualityCtaTextAr`
   - remove `qualityNarrative` / `qualityNarrativeAr` (not shown)
4. **Query / data** — `HOME_PAGE_QUERY` and `getHomePageContent` carry the new fields.
5. **Component** — `QualityTimeline.tsx` renders from content. Step numbers come
   from position; pill colours alternate by position (lime, white).
6. **Content** — seed script updated; live `homePage-singleton` patched with only
   these fields.

## Content (must match local exactly)

Steps:

1. Inspected at Origin: Selected and inspected at source for the best quality.
2. Tested on Arrival: Laboratory testing in line with Qatar food-safety requirements.
3. Protected Through Cold Chain: Temperature-controlled storage and transport preserve freshness.

Certificates: `HACCP`, `ISO 22000:2018`. Note: "Certified food safety management."
Button: "Our Quality Process" / "منهجنا في الجودة". Arabic carried over unchanged.

The `/quality` page's own fields (`qualityPage`) are out of scope.

## Verification

- `pnpm test` and type-check pass.
- Sanity query returns the content above; narrative fields are gone.
- agent-browser: `/` and `/ar` render the same text as before.

## Outcome

- `data/homeQuality.ts` also exports `homeQualitySanityFields()`, the Sanity-shaped
  values shared by the seed script and the live patch.
- Live `homePage-singleton` patched: three steps, two certificate labels, note and
  button text set; `qualityNarrative` / `qualityNarrativeAr` unset. No other fields changed.
- Verified with agent-browser: `/` and `/ar` show the same steps, pills (lime, white),
  note and button text as before.
