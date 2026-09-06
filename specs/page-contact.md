# Specification: Contact Us Page (`/contact`)

## 1. Overview
The **Contact Us** page (`/contact`) represents **Phase 2 Milestone 6** of the Nairat Food Services web platform. It serves as the institutional and commercial gateway for retail buyers, international exporters, local farmers, and general inquiries in Qatar.

---

## 2. Design System & Palette (Aligned with Mockup)
- **Primary Brand Green:** `#158647` / `#168849`
- **Form Card Green:** `#3FAE56` / `#36A44E` (rich vibrant green from user mockup)
- **Accent Yellow:** `#F2BD1D` / `#F3C623` (golden CTA button with white circular arrow icon)
- **Neutral Backgrounds:** Pure white (`#FFFFFF`) and soft mint (`#F8FAF8`)
- **Typography:**
  - Display: **Montserrat** (`font-display`) for headings, eyebrows, card titles
  - Body: **Figtree** (`font-sans`) for descriptions, labels, and input fields
  - Numerical / Telephony: **JetBrains Mono** (`font-mono`)

---

## 3. Page Structure & Components

### 1. Header Banner (`PageBanner`)
- **Title:** `Contact Us`
- **Breadcrumbs:** `Home / Contact Us`
- **Theme:** Brand green (`#158647`) with organic watermark and Montserrat title.

### 2. Contact Section: Two-Column Split (`ContactSection.tsx`)
- **Section Eyebrow & Headline:**
  - Brand leaf icon `/icon/icon.png` + `CONTACT US`
  - H2: `Get in Touch with Us`
- **Left Column (Direct Institutional Info Cards):**
  - **Address Card:**
    - Icon: Circular green badge with `MapPin`
    - Title: `Address:`
    - Details: `Industrial Area, Street 37, Doha, Qatar`
    - Registration: `CR No. 144352`
  - **Mail ID Card:**
    - Icon: Circular green badge with `Mail`
    - Title: `Mail ID:`
    - Details: `info@nairat.net` (clickable link)
  - **Call & WhatsApp Card:**
    - Icon: Circular green badge with `PhoneCall`
    - Title: `Call:`
    - Tel: `+974 4429 0400 / 4429 0300`
    - Mobile: `+974 3104 3814`
    - WhatsApp: `+974 5032 9385`
- **Right Column (Commercial Enquiry Form):**
  - Card container: `bg-[#3FAE56]` rounded-3xl with padding
  - Input fields with white labels and clean white rounded inputs:
    - **Name:** `Enter Your Name`
    - **Email:** `Enter Your Email`
    - **Contact Number:** Prefix selector + `Enter Your Contact Number`
    - **Message:** `Enter Your Message`
  - **Submit Button:** Golden yellow pill (`#F2BD1D`) with `Submit` label and white circular button with angled arrow (`↗`). Includes validation feedback and success state.

### 3. Warehouse Location Map (`ContactMap.tsx`)
- High-resolution interactive Google Map embed centered on Nairat Food facility in Industrial Area, Street 37, Doha, Qatar.
- Facility card overlay with operating hours (24/7 Receiving & Cold Storage) and direct "Get Directions" navigation trigger.

### 4. Global Modules
- `Cta`: Global commercial inquiry and partner call-to-action
- `Footer`: Global site footer with `/contact` active link

---

## 4. Integration & Routing
- Route: `/app/contact/page.tsx`
- Navbar: Update Contact button/link to point directly to `/contact`
- Footer: Update Contact link to point directly to `/contact`
