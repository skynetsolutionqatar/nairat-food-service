import type { LocalizedText } from '../lib/imageAlt';

/** Local alt text for page photos; Sanity `alt` / `altAr` sub-fields override these. */
export const companyImageAlts = {
  delivering: {
    en: 'Nairat Food Cold-Chain Distribution Facility in Doha',
    ar: 'مرافق التوزيع وسلاسل التبريد لشركة نيرات للأغذية بالدوحة',
  },
  infra: {
    en: 'Nairat Food Cold Storage Chiller Warehouse Facility',
    ar: 'منشأة مستودع التخزين المبرد لشركة نيرات للأغذية',
  },
  team: {
    en: 'Nairat Food Services Dedicated Team Members',
    ar: 'أعضاء فريق نيرات للخدمات الغذائية المتفانون',
  },
  quality: {
    en: 'Nairat Food QA Laboratory Inspection & Temperature Control',
    ar: 'فحص الجودة والتحكم بدرجات الحرارة لشركة نيرات للأغذية',
  },
  lookingAhead: {
    en: 'Nairat Food Modern Refrigerated Logistics Fleet',
    ar: 'أسطول نيرات للأغذية اللوجستي المبرد الحديث',
  },
} satisfies Record<string, LocalizedText>;

/** The bottom CTA alt text is English on both locales today; kept as-is to match the site. */
export const ctaImageAlts = {
  background: { en: 'Fresh Fruits & Vegetables Background', ar: 'Fresh Fruits & Vegetables Background' },
  flags: { en: 'Sourced Around the World country flags', ar: 'Sourced Around the World country flags' },
} satisfies Record<string, LocalizedText>;

export const companyCertificates = [
  { label: 'HACCP Certified', labelAr: 'معتمد بشهادة HACCP' },
  { label: 'ISO 22000:2018', labelAr: 'ISO 22000:2018' },
];
