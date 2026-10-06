# Specification: CDN & Asset Performance Optimization

## Status: Planned
Target Architecture: Next.js App Router (16.3.2) / Netlify Edge CDN / Sanity CDN  
Standard: Core Web Vitals & Web Performance Guidelines (LCP, TTFB, Edge Caching)

## Problem Statement
Live inspection on `https://nairatfoodservices.netlify.app/` revealed:
1. **Uncached Heavy Video**: `/hero.mp4` (7.04 MB) and `/hero.webm` (7.17 MB) served with `Cache-Control: public, max-age=0, must-revalidate`, causing repeated downloads and high network contention.
2. **High TTFB on Netlify (700ms - 1300ms)**: Pages had `revalidate = 60`, which triggered stale ISR serverless lambda executions on Netlify (`fwd=stale; fwd=bypass`) on subsequent visits instead of serving instant static HTML from edge cache.
3. **Missing Static Asset Caching Headers**: Public assets lacked 1-year immutable caching (`max-age=31536000, immutable`) in both Next.js and Netlify headers configuration.

## Architectural Changes

### 1. Static Asset Caching in `next.config.ts`
Add custom `headers()` rule targeting all media and font extensions (`mp4`, `webm`, `webp`, `png`, `jpg`, `svg`, `ico`, `woff`, `woff2`) with:
`Cache-Control: public, max-age=31536000, immutable`

### 2. Edge Header Configuration in `netlify.toml`
Create `netlify.toml` specifying `[[headers]]` directives so Netlify Edge CDN directly serves media files and `_next/static` bundles with 1-year immutable headers at the edge without serverless function roundtrips.

### 3. Extended ISR Revalidation
Update `revalidate = 60` to `revalidate = 3600` (1 hour) across all 18 routes to enable true Edge CDN hit rates and reduce TTFB from ~1000ms down to sub-100ms.

### 4. Hero Video Source Ordering
Prioritize modern `<source src="/hero.webm" type="video/webm" />` before MP4 for supported browsers and maintain poster prioritization.

## Verification Plan
1. Test local build and headers via curl on local server.
2. Verify TypeScript compilation (`npx tsc --noEmit`).
3. Validate header directives in `netlify.toml` and `next.config.ts`.
