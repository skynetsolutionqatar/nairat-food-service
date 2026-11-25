# Company Page: Sanity Parity

## Problem

An audit of `/company` and `/ar/company` (every visible text node and image alt
compared with the live `companyPage-singleton`) found that almost all content is in
Sanity and matches, except:

1. **Hardcoded text**: Vision/Mission card labels ("Our Vision", "Our Mission"),
   the CEO card sign-off ("Nairat Food"), and the quality pills
   ("HACCP Certified", "ISO 22000:2018").
2. **Hardcoded image alt text** (EN/AR) on the five section photos and on the two
   bottom CTA images.
3. **Bottom CTA** on both company pages renders `<Cta />` without content, so it
   ignores Sanity and shows code copies of the home CTA text.
4. **Sanity edits ignored**: the Vision & Mission and Sourcing headings swap in
   hardcoded text whenever the Sanity value contains the highlighted phrase.
5. **Dead workarounds**: a CEO name swap ("Nasser Al-Kuwari") and an Arabic word
   replace on the Vision & Mission narrative. Sanity already holds correct values.
6. **Two Vision & Mission versions**: the code defaults in `data.ts` hold the
   Company Profile wording while Sanity and the site show different text.
   Decision: keep what is live; update the code defaults to match Sanity.

Out of scope: the breadcrumb "Home" label (site-wide UI dictionary).

## Changes

- **Schema (`companyPage`)**: `visionBadge(Ar)`, `missionBadge(Ar)`,
  `ceoCompanyLabel(Ar)`, `qualityCertificates[] { label, labelAr }`; `alt` / `altAr`
  sub-fields on `deliveringImage`, `infraImage`, `teamImage`, `qualityImage`,
  `lookingAheadImage` (CEO photo alt is already the CEO name).
- **Schema (`homePage`)**: `alt` / `altAr` on `ctaBackgroundImage` and `ctaFlagsImage`.
- **Shared helpers**: `lib/imageAlt.ts` (alt with local fallback) and
  `lib/splitAroundPhrase.ts` (highlighted headings from Sanity text), unit tested.
- **Components** read the new fields; headings always render the Sanity text.
- **Company pages** pass home content to `<Cta>`.
- **Content**: seed script updated; live documents patched with only the new fields.

## Verification

- `pnpm test`, type-check and lint pass.
- Text audit re-run: every visible text node on `/company` and `/ar/company` is
  found in Sanity, except the breadcrumb.
- Rendered text is unchanged from before (diff of the text dumps).

## Outcome

- Vision & Mission defaults in `data.ts` now hold the live Sanity text; the unused
  Company Profile wording was removed from the i18n dictionaries and types.
- Live documents patched (new fields only; existing values and image assets untouched):
  `companyPage-singleton` badges, CEO label, certificate pills and five image alts;
  `homePage-singleton` alt text on the two CTA images.
- The CTA alt text is English on both locales, matching what the site showed.
- Verified: rendered text and alt dumps of `/company` and `/ar/company` are identical
  before and after; the re-run audit finds every text node in Sanity except the
  breadcrumb.
- Removed `bannerSubtitle` / `bannerSubtitleAr` from `companyPage` (the banner shows
  only the title and breadcrumb): schema, preview, query, type, defaults, seed, and
  unset on the live document. Other pages' banner subtitles are untouched.
