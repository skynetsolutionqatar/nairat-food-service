# Nairat Food Services — Architecture & Tech Stack Specification

This document details the system architecture, directory structures, libraries, and integration strategies for the **Nairat Food Services** web application.

---

## 1. Tech Stack Overview

| Technology / Library | Version (Target) | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `^16.x` (16.3.2) | Framework (App Router) utilizing React Server Components (RSC) for fast loading. |
| **TypeScript** | `^5.x` | Strict type safety for components, API routes, and CMS data schemas. |
| **Tailwind CSS** | `^3.x` / `^4.x` | Utility-first styling framework integrated with customized design tokens. |
| **GSAP** | `^3.x` | High-performance timeline animations for key signature sections (e.g., interactive map, scroll timelines). |
| **Lenis** | `^1.x` | Smooth scrolling library to enable consistent and high-quality scrolling performance across devices. |
| **Framer Motion** | `^11.x` | High-fidelity UI animations, transitions, filter tabs, and responsive drawer menus. |
| **Lucide React** | `latest` | Clean, standardized vector iconography. |
| **Sanity CMS** *(Phase 2)* | `^3.x` | Headless CMS for managing dynamic products, certificates, and metrics. |
| **next-intl** *(Phase 2)* | `latest` | Routing and translation library for English/Arabic bilingual support. |

---

## 2. Structural Design & Directory Layout

We follow a clean, modular Next.js directory structure:

```text
nairat/
├── app/                  # Next.js App Router (RSC & Client Components)
│   ├── [locale]/         # Dynamic locale directory (implemented in Phase 2)
│   │   ├── layout.tsx    # Root layout with html direction (dir="ltr"/"rtl")
│   │   └── page.tsx      # Main marketing landing page
│   ├── api/              # API routes (revalidation webhooks, contact)
│   ├── globals.css       # Tailwind imports & custom global base styles
│   └── providers.tsx     # Context providers (Lenis, Motion, GSAP matchMedia)
├── components/           # Reusable UI component modules
│   ├── ui/               # Lower-level design components (buttons, badges)
│   ├── layout/           # Shared page wrappers (navbar, footer)
│   └── modules/          # Section-specific containers (Strengths, Map, Products)
├── hooks/                # Custom React hook utilities (useRTL, useLenis)
├── lib/                  # Shared clients (sanity.client.ts, utils.ts)
├── public/               # Public assets (logos, fallback images, certificates)
├── specs/                # Project specifications (design.md, architecture.md)
└── PROGRESS.md           # Implementation phase tracker
```

---

## 3. Bilingual & RTL Strategy (Planned for Phase 2)

The website will support **English (LTR)** and **Arabic (RTL)**.

### i18n Routing
*   We will use `next-intl` (or subpath locale routing) to handle the `/[locale]` subpath.
*   Next.js middleware will auto-detect the client's language preference and redirect.

### Layout & Spacing
*   The layout container will dynamic-bind the `dir` attribute on the base `<html>` tag:
    ```tsx
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    ```
*   **Logical Tailwind Properties**: We will use standard logical CSS classes rather than direction-locked variants:
    *   `ms-*` (margin-start) instead of `ml-*`
    *   `pe-*` (padding-end) instead of `pr-*`
    *   `start-0` instead of `left-0`
    *   `border-s` instead of `border-l`
*   **RTL Font Matching**:
    *   *English*: `Plus Jakarta Sans` / `Inter`
    *   *Arabic*: `Cairo` or `IBM Plex Sans Arabic` (applied conditionally based on the active locale class on the body).

---

## 4. Sanity Headless CMS Strategy (Planned for Phase 2)

Content managers will update products, certifications, partner logos, and team story metrics through Sanity Studio.

### Schema Blueprint
1.  **Produce Item (`produce`)**:
    *   `title` (localized string)
    *   `category` (Fruits / Vegetables / Leafy & Herbs / Specialty)
    *   `origin` (localized string)
    *   `image` (Sanity Image asset)
    *   `isSeasonal` (boolean)
2.  **Certification Document (`certificate`)**:
    *   `name` (string)
    *   `issuer` (string)
    *   `pdfFile` (file asset)
    *   `thumbnail` (image asset)
3.  **Strength Metric (`strengthMetric`)**:
    *   `count` (string / e.g., "5,000 m²")
    *   `label` (localized string)
    *   `description` (localized text)
    *   `image` (image asset)

### Fetching & Revalidation
*   We will fetch CMS data using highly efficient GROQ queries via `next-sanity`.
*   Implement Next.js **Incremental Static Regeneration (ISR)** using draft mode for previews and webhook-triggered revalidation (`revalidateTag`) when sanity documents are published.
