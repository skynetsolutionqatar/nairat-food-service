export interface LocalizedText {
  en: string;
  ar: string;
}

interface SanityImageAlt {
  alt?: string | null;
  altAr?: string | null;
}

/** Alt text from a Sanity image's `alt` / `altAr` sub-fields, with a local fallback. */
export function resolveImageAlt(image: SanityImageAlt | null | undefined, fallback: LocalizedText): LocalizedText {
  return {
    en: image?.alt?.trim() || fallback.en,
    ar: image?.altAr?.trim() || fallback.ar,
  };
}

/** The `alt` / `altAr` sub-fields Sanity stores for a localized alt text. */
export function toSanityAlt(text: LocalizedText) {
  return { alt: text.en, altAr: text.ar };
}
