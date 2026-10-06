# Specification: SEO Remediation & Infrastructure Optimization

## Status: Planned
Target Architecture: Next.js App Router (16.3.2) / TypeScript / Sanity CMS  
Auditor Standard: `aaron-marketing-skills` (`technical-seo-checker` & `on-page-seo-checker` v20.1.0)

## Problem Statement
The comprehensive technical and on-page SEO audit revealed critical indexation, crawlability, and schema defects:
1. **[P0] Canonical Self-Cannibalization**: Root `app/layout.tsx` hardcoded `canonical: "/"`, which is inherited by all descendant pages. Search engines see all interior pages (`/company`, `/services`, `/quality`, `/contact`, `/partners`, `/products/*`, and `/ar/*`) as copies of the homepage.
2. **[P1] Sitemap 3xx Redirection**: `/products` and `/ar/products` redirect to `/products/vegetables` and `/ar/products/vegetables`, but are erroneously declared in `sitemap.xml`.
3. **[P1] Unprotected Admin Crawling**: `robots.ts` allows crawling of `/studio` (Sanity Studio admin interface). Lacks explicit AI bot directives.
4. **[P1] Missing Structured Data (JSON-LD)**: 0 schemas across the site. Missing `Organization`, `LocalBusiness`, `BreadcrumbList`, and `ItemList` markup.
5. **[P2] Title Template Doubling**: Root template `"%s | Nairat Food Services"` causes redundant brand suffix repetition on subpages.
6. **[P2] Policy Page H1 Duplication**: `/privacy` and `/terms` each emit two `<h1>` tags.
7. **[P2] Missing OpenGraph Preview Images**: No default OG image URL configured in root metadata.

## Architectural Design

### 1. Reusable SEO Metadata Helper (`lib/seo.ts`)
A dedicated utility that standardizes:
- Canonical URL generation based on path.
- Bidirectional `hreflang` language alternates (`en` <-> `ar`).
- OpenGraph and Twitter card configuration.
- Base site metadata and constants.

```ts
export const SITE_URL = 'https://nairatfoodservices.com';

export function getCanonicalAlternates(pathname: string) {
  // Generates canonical and language alternates for EN and AR pairs
}
```

### 2. Root Layout Cleanup (`app/layout.tsx`)
- Remove hardcoded `alternates` with `canonical: "/"` from root layout so subpages don't inherit homepage canonical.
- Add default Open Graph / Twitter images.
- Inject global `Organization` / `LocalBusiness` JSON-LD schema into the root layout.

### 3. Page Metadata Updates (EN & AR)
Update metadata exports across all pages:
- Home: `/` and `/ar`
- Company: `/company` and `/ar/company`
- Services: `/services` and `/ar/services`
- Sourcing & Quality: `/quality` and `/ar/quality`
- Partners: `/partners` and `/ar/partners`
- Contact: `/contact` and `/ar/contact`
- Products Categories: `/products/[category]` and `/ar/products/[category]`
- Legal: `/privacy`, `/ar/privacy`, `/terms`, `/ar/terms`

Remove brand repetition from titles so they fit cleanly inside the `%s | Nairat Food Services` template.

### 4. Structured Data Component (`components/seo/JsonLd.tsx`)
Render safe server-side JSON-LD scripts:
- Global `Organization` + `WholesaleStore` schema.
- Breadcrumb schema for navigation depth.
- Product Category `ItemList` schema for produce lines.

### 5. Crawlability & Indexing Updates
- `app/robots.ts`:
  - Disallow `['/api/', '/studio/']`
  - Allow `/`
  - Provide explicit bot rules for `GPTBot`, `ClaudeBot`, and `PerplexityBot`.
  - Maintain sitemap link.
- `app/sitemap.ts`:
  - Exclude `/products` and `/ar/products` (keep only canonical category paths).
  - Include all 22 active canonical routes with proper frequencies and priorities.

### 6. Semantic Headings Correction
- In `/privacy` and `/terms`, convert secondary in-page headings from `<h1>` to `<h2>`.

## Verification Plan
1. Run automated SEO verification script inspecting rendered HTML of all 22 routes.
2. Confirm:
   - Every route emits its own exact `<link rel="canonical">`.
   - Every route emits bidirectional `<link rel="alternate" hreflang="en">` and `hreflang="ar">`.
   - `sitemap.xml` returns 200 OK without any 3xx redirect URLs.
   - `robots.txt` disallows `/studio/` and `/api/`.
   - `<script type="application/ld+json">` is present on pages.
   - Every page has exactly one `<h1>`.
