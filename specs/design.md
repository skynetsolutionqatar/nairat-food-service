# Nairat Food Services — Web Design Specification

This document details the visual style, structural layout, interactive elements, accessibility guidelines, and testing plan for the **Nairat Food Services** marketing and corporate website, based on the reference design `nairat design.png`.

---

## 1. Executive Summary & Subject Profile
*   **Subject**: Premium fresh produce importer, wholesaler, and distributor in Qatar.
*   **Target Audience**: B2B procurement heads (supermarkets, luxury hotels, restaurants, caterers) and high-end B2C customers looking for premium home-delivered fruits/vegetables.
*   **Single Job of Page**: Establish trust in Nairat's cold-chain logistics, premium global sourcing, and certifications, prompting users to establish a partnership (via Contact/WhatsApp).
*   **Aesthetic Risk (Restraint & Identity)**: To distinguish the site from template layouts (which tend to use raw greens and generic white), we introduce a warm sand-tinted slate for neutrals, paired with a rich, deep forest green primary and a warm golden saffron secondary accent (reminiscent of sunlight and Qatar's premium culinary culture).

---

## 2. Token System (Visual Brand Identity)

### Colors
*   `--color-brand-forest-primary`: `#063B27` (Deep, commanding forest green. Represents freshness, sustainability, and trust)
*   `--color-brand-lime-accent`: `#4AA658` (Vibrant leaf green. Used for CTAs, success states, and highlight borders)
*   `--color-brand-saffron-secondary`: `#E2B93C` (Warm golden saffron. Used sparingly for highlights, stars, or secondary details)
*   `--color-neutral-bg-base`: `#FFFFFF` (Pure white for clean background sections)
*   `--color-neutral-bg-soft`: `#F4F6F5` (Warm sand/off-white gray tint for visual variance between sections)
*   `--color-neutral-text-dark`: `#1C2321` (Slate green/off-black. Highly readable body copy color)
*   `--color-neutral-text-muted`: `#5C6662` (Medium slate gray-green for subtitles and captions)

### Typography
*   **Display Font**: `Plus Jakarta Sans` (Sans-serif. Modern, geometric, clean terminal curves for personality. Applied to Headings, hero elements, and section titles)
*   **Body Font**: `Inter` (Sans-serif. Neutral, clean delivery vehicle. Highly readable for descriptions and lists)
*   **Utility Font**: `JetBrains Mono` or `DM Mono` (Monospace. Clean, industrial. Used for numbers, metric values, and certificates code tags to give a precise, logical, cold-chain feel)

---

## 3. Structural Wireframes

### Page Flow Overview
1.  **Navbar (Sticky)**: Nairat Logo | Links: Home, About Us, Products, Services, Sourcing, Quality, Contact | CTA: Contact Us (WhatsApp)
2.  **Hero Section**: Full-screen background image of chilled food storage. White / Green text overlay. "Explore Our Products" CTA.
3.  **Partners Carousel**: Horizontal rolling strip showing retailer logos (Al Meera, LuLu, Carrefour, Safari, Grand Mall).
4.  **"Who We Are" Split Section**: Text/CTA on left, 3 vertical metric cards on right (01 Global Sourcing, 02 Year-Round Supply, 03 Built for Qatar).
5.  **"Our Strengths" Grid**: Headings + a 5-cell grid containing capacities (chiller rooms, warehouse size, refrigerated vehicles, etc.) with image covers.
6.  **"What We Do" Services Section**: 3 service cards side-by-side (Retail & Wholesale, Grower Partnerships, Nairat Shop).
7.  **"Our Products" Tabs & Carousel**: Tabs (All, Fruits, Vegetables, Leafy & Herbs, Specialty) + rounded product cards displaying country of origin.
8.  **"Global Sourcing" Map & Certificates**: Interactive world map with region selectors (Middle East, Africa, Europe, Asia, Americas, Oceania) on the left, certificate badges (HACCP, ISO 22000) on the right.
9.  **"Quality & Certifications" Process Timeline**: 3-step vertical/horizontal timeline (Inspected at Origin -> Tested on Arrival -> Protected Through Cold Chain).
10. **Global Call-to-Action**: Saffron/Green split banner over a rich fresh fruit background.
11. **Footer**: 5-column layout with company details, products categories, services, sourcing links, contact information, and legal links.

### ASCII Layout (Strengths & Sourcing Section)
```text
+-------------------------------------------------------------------------------+
|                                 OUR STRENGTHS                                 |
|                     Built for Freshness. Ready to Deliver.                    |
|                                                                               |
|  +-----------------------+ +-----------------------+ +---------------------+  |
|  | [Image: Chiller Room] | | [Image: Warehouse]    | |                     |  |
|  | 20 Dedicated          | | 5,000 m² Cold-Chain   | | Sourced at Origin   |  |
|  | Chiller Rooms         | | Warehouse             | |                     |  |
|  +-----------------------+ +-----------------------+ | Direct relationships|  |
|  +-----------------------+ +-----------------------+ | with trusted        |  |
|  | [Image: Cold-Chain]   | | [Image: Fleet]        | | growers worldwide.  |  |
|  | Cold Chain, Unbroken  | | 40 Refrigerated       | |                     |  |
|  |                       | | Vehicles              | | [Bg Image: Farmer]  |  |
|  +-----------------------+ +-----------------------+ +---------------------+  |
+-------------------------------------------------------------------------------+
|                                GLOBAL SOURCING                                |
|                         Sourced From Around the World.                        |
|                                                                               |
|  [ Stats Column ]           [ Interactive SVG Map ]      [ Certificates ]     |
|   15+ Sourcing Countries     *   *   *    *              +---------------+    |
|   5 Continents Covered       * *   *                     | HACCP         |    |
|   Year-Round Network          * *                        | CERTIFIED     |    |
|                              Region Tabs:                +---------------+    |
|                              [MidEast][Europe][Asia]     | ISO 22000     |    |
|                              [Africa][Americas][Oceania] +---------------+    |
+-------------------------------------------------------------------------------+
```

---

## 4. Key Interactive Elements & "Signature"

### 1. The Global Sourcing Interactive Map
*   **Interaction**: Selecting a continent tab (e.g., Africa) highlights relevant countries on the SVG world map with a pulsing green dot and fills their borders with an emerald color.
*   **Dynamic Data**: The stats panel updates to show specific details of what is sourced from that continent during the current season.
*   **Certificates Link**: Clicking a certificate card reveals a custom modal overlay with an interactive viewer to inspect the HACCP/ISO certificates.

### 2. Product Carousel with Live Filters
*   **Interaction**: Clicking tabs (Fruits, Vegetables, etc.) filters the cards in the carousel. The transition must be handled smoothly using CSS View Transitions or opacity transforms.
*   **Card details**: The cards show high-quality images of produce inside a circle/rounded container, with a subtle hover zoom. A badge indicates the country of origin.

---

## 5. Web Interface Guidelines Compliance (Checklist)

During implementation, we must enforce the following Vercel-derived rules:
*   [ ] **Alt Text**: All images must have descriptive `alt` tags (e.g., `alt="Nairat refrigerated transport truck"`). Decorative icons must have `aria-hidden="true"`.
*   [ ] **Keyboard Navigation**: Interactive elements (like continent buttons, product tabs, carousels) must be focusable using `focus-visible` ring styles, with support for Spacebar/Enter keypresses.
*   [ ] **Semantic Tags**: Use `<header>`, `<main>`, `<section>`, `<nav>`, `<button>` for actions, and `<a>` for navigation. No `<div onClick>` without ARIA and keyboard handling.
*   [ ] **Typography Rules**:
    *   Use curly quotes (`“` and `”`) instead of straight quotes (`"`).
    *   Use real ellipses (`…`) instead of three periods (`...`).
    *   Apply `text-wrap: balance` on headers to avoid widow words.
*   [ ] **Form Safety**: The partnership form fields must include valid `autocomplete` properties and explicit label associations (`htmlFor`).
*   [ ] **Reduced Motion**: All scrolling parallax, sliders, and map animations must respect `@media (prefers-reduced-motion: reduce)`.

---

## 6. End-to-End (E2E) Testing Strategy with `agent-browser`

We will use `agent-browser` to systematically test the visual and interactive compliance of the website once implemented.

### Setup Commands
To verify the build is running locally:
```bash
# Verify connection & diagnostic health
agent-browser doctor
```

### 1. Verifying Basic Page Navigation and Rendering
```bash
# Open local development server
agent-browser open http://localhost:3000

# Capture initial home page screenshot
agent-browser screenshot nairat_homepage.png
```

### 2. Verifying Accessibility Tree & Interactive Buttons
To ensure the buttons and links are properly identified in the accessibility tree:
```bash
# Print accessibility tree structure with interactive references
agent-browser snapshot -i
```
Verify that the WhatsApp CTA, product filters, and navigation links have proper labels and are not listed as generic elements.

### 3. Testing Interactive Sourcing Map Regions
We will programmatically click the region tabs and check for updates:
```bash
# Locate the 'Africa' region button from the snapshot (e.g. ref @e12) and click it
agent-browser click @e12

# Wait for map transition to complete
agent-browser wait --seconds 1

# Capture screenshot to verify highlight is visible on map
agent-browser screenshot region_africa_active.png
```

### 4. Testing Product Filtering
```bash
# Click the "Fruits" filter tab (e.g. ref @e24)
agent-browser click @e24

# Verify that vegetables are hidden and only fruits are rendered
agent-browser wait --text "Rambutan"
agent-browser snapshot -i
```

### 5. Running Web Vitals and Performance Audits
To inspect LCP, hydration speed, and layout stability:
```bash
# Run performance and Web Vitals analysis
agent-browser vitals http://localhost:3000
```
Check that the layout shifts (CLS) are minimal, especially during the carousel scroll and map tabs toggling.
