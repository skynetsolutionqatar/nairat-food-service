# Spec: Redesign of Navbar and Hero (Arva Editorial Aesthetic)

## 1. Objective
Redesign the **Navbar** and **Hero** sections to match the clean, cinematic agricultural aesthetic depicted in the new reference mockup (Arva-style layout):
- High-resolution cinematic portrait background of a farmer in the agricultural crop field.
- Minimalist 3-zone floating top navbar: Left links, Center brand logo, Right actions (links, white `GET IN TOUCH` pill, language switcher).
- Centered elegant editorial headline with bold emphasis: "Fresh agricultural supply / for a **better future**".
- Dual pill CTA buttons: Light slate/frosted pill (`OUR PRODUCTS`) and deep forest green pill (`GET IN TOUCH`).

## 2. Component Specifications

### 2.1 Navbar (`components/layout/Navbar.tsx`)
- **Structure**: 3-zone layout:
  - **Left**: `Our Products`, `Sourcing & Quality`, `About Us` in crisp white text with subtle hover states.
  - **Center**: Clean Nairat brand mark / logo.
  - **Right**: `Services`, `GET IN TOUCH` white pill button, and `AR / EN` language switcher.
- **Scroll Behavior**: Transparent at top with subtle text drop shadow; transitions to frosted backdrop on scroll.

### 2.2 Hero (`components/modules/Hero.tsx`)
- **Background**: Full-bleed cinematic farmer portrait (`/hero-farmer.jpg`) with dark vignette / contrast overlay (`bg-gradient-to-t from-black/75 via-black/35 to-black/45`).
- **Heading**: Centered, 2-line editorial display title:
  - Line 1: `Fresh agricultural supply`
  - Line 2: `for a <strong className="font-extrabold text-white">thriving Qatar</strong>`
- **Dual CTAs**:
  - Button 1: Frosted light slate pill (`bg-[#8eaab9]/85 text-[#0a1e15] font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-full hover:bg-[#8eaab9]`).
  - Button 2: Deep forest green pill (`bg-[#063B27] text-white font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-full hover:bg-[#042a1b] border border-white/20`).

## 3. Verification Plan
- Verify typography hierarchy and contrast on all screen sizes.
- Verify responsive mobile menu navigation.
- Validate with `npx tsc --noEmit`.
