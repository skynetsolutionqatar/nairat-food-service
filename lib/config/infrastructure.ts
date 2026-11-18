import { companyProfile } from './company';

/**
 * One stat card in the company page "Infrastructure & Operational Scale" section.
 * Editable in Sanity (companyPage.infraMetrics); these values are the fallback.
 */
export interface InfraMetric {
  value: string;
  valueAr?: string;
  label: string;
  labelAr?: string;
}

export const DEFAULT_INFRA_METRICS: InfraMetric[] = [
  {
    value: companyProfile.productLinesCount,
    label: 'active fresh produce lines',
    labelAr: 'خطوط منتجات طازجة نشطة',
  },
  {
    value: companyProfile.originCountriesCore,
    label: 'origin countries, plus Qatari farms',
    labelAr: 'دولة منشأ، بالإضافة إلى المزارع القطرية',
  },
  {
    value: companyProfile.retailBranchesSupplied,
    label: 'retail branches supplied',
    labelAr: 'فرع تجزئة يتم توريده',
  },
  {
    value: companyProfile.dailyVolumeTonnes,
    valueAr: '~100 طن',
    label: 'of fresh produce delivered every day',
    labelAr: 'من المنتجات الطازجة تُسلَّم يومياً',
  },
  {
    value: companyProfile.warehouseArea,
    valueAr: '5,000 م²',
    label: 'new temperature-controlled warehouse',
    labelAr: 'مستودع جديد يتم التحكم في درجة حرارته',
  },
  {
    value: companyProfile.fleetVehiclesCount,
    label: 'refrigerated delivery vehicles',
    labelAr: 'مركبة توصيل مبردة',
  },
  {
    value: companyProfile.teamSize,
    label: 'people across sourcing, quality, warehousing and delivery',
    labelAr: 'شخص عبر التوريد والجودة والتخزين والتوصيل',
  },
  {
    value: companyProfile.certifications[0],
    label: 'and ISO 22000:2018 certified food safety management',
    labelAr: 'وإدارة سلامة الغذاء المعتمدة وفق معيار ISO 22000:2018',
  },
];
