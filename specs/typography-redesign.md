# Specification: Typography & Font System Redesign

**Reference Inspiration:** [Mabeaat Mortgage](https://mabeaatmortgage.com/) (Typography hierarchy, editorial weight distribution, tight display tracking, financial-grade elegance)  
**Target Font:** **Manrope** (Google Fonts via `next/font/google`)  
**Design Persona:** Senior Design Engineer & Frontend UI Specialist  

---

## 1. Audit Findings & Current State

1. **Current Font:** Figtree loaded via `next/font/google` and redundantly via `@import url('https://fonts.googleapis.com/css2?family=Figtree...')` in `app/globals.css`.
2. **Inconsistent Weights & Heavy Defaults:**
   - Overuse of `font-extrabold` (800) and `font-black` (900) across headings, creating a noisy, generic SaaS look rather than a refined, high-end institutional feel.
   - Hero and section headings used heavy 800 weights with loose or browser-default letter spacing and inconsistent line heights.
3. **Contrast Issues:**
   - Multiple sections used `#B9B9B9` or `#000000` hardcoded strings. `#B9B9B9` on white fails WCAG AA color contrast requirements.
4. **Scattered Arbitrary Sizes:**
   - Different heading sizes across sections without centralized fluid scaling tokens (`clamp`).
   - Eyebrows varied between `text-[11px] font-extrabold` and `text-xs font-bold`.

---

## 2. Centralized Typography Tokens (`app/globals.css`)

### Font Family
- **Primary Sans / Display:** `"Manrope", sans-serif` via Next.js Font Optimization (`--font-manrope`).
- **Mono:** JetBrains Mono for metrics and numerals (`--font-mono`).

### Type Scale & Hierarchy Tokens
```css
:root {
  --font-family-sans: var(--font-manrope), "Manrope", sans-serif;
  --font-family-display: var(--font-manrope), "Manrope", sans-serif;
  
  /* Fluid Typography Scale */
  --text-display: clamp(48px, 6vw, 76px);
  --text-h1: clamp(40px, 5vw, 64px);
  --text-h2: clamp(34px, 4vw, 54px);
  --text-h3: clamp(24px, 2.5vw, 34px);
  --text-h4: 22px;
  --text-lead: 18px;
  --text-body: 16px;
  --text-sm: 14px;
  --text-xs: 12px;
  --text-eyebrow: 12px;

  /* Typography Color Hierarchy */
  --text-primary: #111814;       /* Deep obsidian green-black for primary headings */
  --text-secondary: #47554E;     /* Accessible neutral slate-green for body copy */
  --text-muted: #72807A;         /* Refined muted tone for metadata and captions */
  --text-accent: #168849;        /* Signature brand emerald */
}
```

### Typographic Classes & Rules
1. **Display / Hero:** `clamp(48px, 6vw, 76px)`, weight 500 (medium editorial), `leading-[0.98]`, `tracking-[-0.045em]`.
2. **H1:** `clamp(40px, 5vw, 64px)`, weight 500, `leading-[1.05]`, `tracking-[-0.04em]`.
3. **H2 (Section Titles):** `clamp(34px, 4vw, 54px)`, weight 500–600, `leading-[1.08]`, `tracking-[-0.035em]`.
4. **H3:** `clamp(24px, 2.5vw, 34px)`, weight 600, `leading-[1.2]`, `tracking-[-0.02em]`.
5. **H4 / Card Titles:** `20px–22px`, weight 600, `leading-[1.25]`, `tracking-[-0.015em]`.
6. **Eyebrows:** `12px`, weight 700, uppercase, `leading-[1.2]`, `tracking-[0.12em]`.
7. **Lead Paragraphs:** `18px`, weight 400, `leading-[1.6]`, `max-w-[55ch]`.
8. **Body Text:** `16px` (mobile `15px`), weight 400, `leading-[1.65]`, `max-w-[60ch]`.
9. **Navigation:** `14px`–`15px`, weight 500, `leading-[1.4]`, `tracking-[-0.01em]`.
10. **Buttons / CTAs:** `14px`–`15px`, weight 600, `leading-none`, `tracking-[-0.01em]`.

---

## 3. Implementation Plan by Component

- [x] **Audit:** Inspect all files for current typography patterns.
- [ ] **Phase A: System Foundation**
  - Update `app/layout.tsx` to load `Manrope` from `next/font/google`.
  - Update `app/globals.css` with `@theme` variables, utility classes, and remove redundant Google Fonts CDN import.
- [ ] **Phase B: Component Migration**
  - `components/layout/Navbar.tsx`: Refine nav item font size, weight, and tracking.
  - `components/ui/CtaButton.tsx` & `components/ui/button.tsx`: Refine CTA typography.
  - `components/modules/Hero.tsx`: Implement Display typography, editorial line-height, and refined lead copy.
  - `components/blocks/logos3.tsx` & `components/modules/Partners.tsx`: Standardize eyebrow token.
  - `components/modules/WhoWeAre.tsx`: Apply H2, eyebrow, lead copy, metric numerals (font-medium 600) and card text.
  - `components/modules/Strengths.tsx`: Apply H2, replace low-contrast `#B9B9B9` with `--text-secondary`, format card titles & descriptions.
  - `components/modules/Services.tsx`: Apply H2, eyebrow, card title/description scale, action link typography.
  - `components/modules/Products.tsx`: Apply H2, eyebrow, card typography, and category tabs.
  - `components/modules/SourcingMap.tsx`: Apply H2, eyebrow, country badge typography.
  - `components/modules/QualityTimeline.tsx`: Apply H2, eyebrow, timeline step typography, certificate card text.
  - `components/modules/Cta.tsx`: Apply H2, subtext, form labels, inputs, and submit button typography.
  - `components/layout/Footer.tsx`: Apply H2, footer nav links, copyright text hierarchy.
- [ ] **Phase C: Verification & Visual QA**
  - TypeScript build check (`npx tsc --noEmit`).
  - Agent-browser testing at 1440px, 1024px, 768px, 390px.
  - Reconcile spec and update `PROGRESS.md`.
