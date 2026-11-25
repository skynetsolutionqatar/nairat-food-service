# Floating WhatsApp Button

## Goal

A floating WhatsApp button on every public page (English and Arabic) that opens a chat with Nairat on +974 5032 9385.

## Tracer bullet

One slice through all layers: config number → link builder (`lib/whatsapp.ts`, unit tested) → SVG icon → floating button → root layout → verified in the browser.

## Requirements

- Original WhatsApp brand mark as an inline SVG: white glyph on WhatsApp green `#25D366`.
- Fixed to the bottom inline-end corner (`end-*`), so it sits on the right in English and on the left in Arabic.
- Opens `https://wa.me/97450329385` in a new tab (`rel="noopener noreferrer"`).
- Accessible label: "Chat with us on WhatsApp" / "تواصل معنا عبر واتساب".
- Hidden on `/studio` (Sanity Studio).
- Hover/focus: slight lift and a visible focus ring; respects `prefers-reduced-motion`.

## Files

- `lib/whatsapp.ts` + `lib/whatsapp.test.ts`
- `components/ui/WhatsAppIcon.tsx`
- `components/layout/WhatsAppButton.tsx`
- `app/layout.tsx` (mount)
