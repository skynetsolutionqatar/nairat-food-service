# Scroll Enter Animation — Home Page

Give the home page sections the enter-on-scroll animation used by the reference site, https://jkhfruits.com/.

## What the reference does

Measured in the browser on the reference home page:

- Library: AOS, initialised once with `AOS.init({ duration: 1200, once: true })`. No per-element delay, offset or easing overrides, so every element uses AOS defaults: easing `ease`, trigger when the element's top is 120px inside the viewport.
- Each element animates on its own as it scrolls in. There is no stagger; elements on the same row arrive together because they cross the trigger line together.
- Every animation fades from opacity 0. The movement depends on where the element sits:

| Placement | AOS name | Movement |
| :--- | :--- | :--- |
| Centred section heading | `fade-up` | Rises 100px |
| Two-column block, left column | `fade-right` | Slides in 100px from the left |
| Two-column block, right column | `fade-left` | Slides in 100px from the right |
| Row of three | `fade-right`, `fade-up`, `fade-left` | Outer items slide in from their side, the middle rises |
| Small chips (country names) | `zoom-in` | Scales up from 0.6 |
| Call-to-action card | `zoom-in-down` | Scales up from 0.6 while dropping 100px |

The hero carousel, ribbon and counters use separate effects and are out of scope.

## Implementation

GSAP ScrollTrigger (already the project's animation stack); AOS is not added.

`lib/useSectionReveal.ts` takes a plan of `selector → motion` instead of a list of selectors:

| Motion | Movement |
| :--- | :--- |
| `up` | Rises 100px |
| `from-start` / `from-end` | Slides 100px from the inline start / end, mirrored under `dir="rtl"` |
| `spread` | Per visual row: first item `from-start`, last `from-end`, the rest `up`; a lone item rises |
| `zoom` | Scales from 0.6 |
| `zoom-down` | Scales from 0.6 while dropping 100px |

Each element gets its own trigger at `top bottom-=120`, plays once over 1.2s and clears its inline styles afterwards. As before, the animation is skipped on phones (768px and below) and under `prefers-reduced-motion`.

### Section plans

| Section | Plan |
| :--- | :--- |
| Who We Are | Heading block `from-start`, paragraph `from-end`, stats `spread`, button `from-end`, cards `spread`. The count-up keeps its own trigger. |
| Why Choose Us | Heading `up`, cards and photo `spread` |
| What We Do | Heading `up`, cards `spread` |
| Our Products | Heading `up`, rail tiles `spread` |
| Sourcing | Heading `from-start`, country pills `zoom`, map `from-end` |
| Certifications & Quality | Heading `up`, cards `spread` |
| CTA | Content block `zoom-down` |

Hero, partners strip, footer and inner pages keep their current animation.

## Tracer bullet

The hook and Sourcing first (it exercises `from-start`, `zoom` and `from-end` in one section), verified in the browser, then the remaining sections.

## Verification

- `scripts/e2e-home.sh` gains checks that, on desktop, a section's items start hidden before it scrolls in, are fully visible with no leftover inline transform afterwards, and that the page never scrolls horizontally while items are offset.
- Existing home checks still pass on desktop, Arabic and mobile.
