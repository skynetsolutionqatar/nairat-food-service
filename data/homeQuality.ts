import { en } from '../lib/i18n/dictionaries/en';
import { ar } from '../lib/i18n/dictionaries/ar';

export interface HomeQualityStep {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

export const homeQualitySteps: HomeQualityStep[] = [
  {
    title: 'Inspected at Origin',
    titleAr: 'تم الفحص في بلد المنشأ',
    description: 'Selected and inspected at source for the best quality.',
    descriptionAr: 'تم الاختيار والفحص في المصدر لضمان أفضل جودة.',
  },
  {
    title: 'Tested on Arrival',
    titleAr: 'تم الاختبار عند الوصول',
    description: 'Laboratory testing in line with Qatar food-safety requirements.',
    descriptionAr: 'اختبارات مخبرية تتماشى مع متطلبات سلامة الغذاء في قطر.',
  },
  {
    title: 'Protected Through Cold Chain',
    titleAr: 'محمية عبر سلسلة التبريد',
    description: 'Temperature-controlled storage and transport preserve freshness.',
    descriptionAr: 'تخزين ونقل يتم التحكم في درجة حرارته للحفاظ على النضارة.',
  },
];

export const homeQualityCertificates: string[] = ['HACCP', 'ISO 22000:2018'];

export const homeQualityText = {
  certifiedNote: 'Certified food safety management.',
  certifiedNoteAr: 'إدارة معتمدة لسلامة الغذاء.',
  ctaText: en.common.qualityProcess,
  ctaTextAr: ar.common.qualityProcess,
};

/** The quality fields in the shape the Sanity `homePage` document stores them. */
export function homeQualitySanityFields() {
  return {
    qualitySteps: homeQualitySteps.map((step, index) => ({
      _key: `step-${index + 1}`,
      _type: 'homeQualityStep',
      ...step,
    })),
    qualityCertificates: homeQualityCertificates,
    qualityCertifiedNote: homeQualityText.certifiedNote,
    qualityCertifiedNoteAr: homeQualityText.certifiedNoteAr,
    qualityCtaText: homeQualityText.ctaText,
    qualityCtaTextAr: homeQualityText.ctaTextAr,
  };
}
