/**
 * Nairat Food Services — Official Company Profile Configuration (2026)
 * Source of truth for corporate statistics, accreditations, and institutional claims.
 */

export interface CompanyProfile {
  name: string;
  legalName: string;
  establishedYear: string;
  foundedLocation: string;
  productLinesCount: string;
  dailyVolumeTonnes: string;
  retailBranchesSupplied: string;
  warehouseArea: string;
  warehouseLocation: string;
  fleetVehiclesCount: string;
  teamSize: string;
  originCountriesCore: string;
  originCountriesGlobal: string;
  sourcingRegionsCount: string;
  certifications: string[];
  certifiedScope: string;
  contact: {
    address: string;
    poBox: string;
    phone: string;
    email: string;
    website: string;
  };
  channels: string[];
  values: {
    safetyFirst: { en: string; ar: string };
    freshEveryDay: { en: string; ar: string };
    reliableAtScale: { en: string; ar: string };
    truePartnership: { en: string; ar: string };
  };
  vision: { en: string; ar: string };
  mission: { en: string; ar: string };
}

export const companyProfile: CompanyProfile = {
  name: 'Nairat Food Services',
  legalName: 'Nairat Food Services W.L.L',
  establishedYear: '2020',
  foundedLocation: 'Doha, Qatar',
  productLinesCount: '1,200+',
  dailyVolumeTonnes: '~100 t',
  retailBranchesSupplied: '100+',
  warehouseArea: '5,000 m²',
  warehouseLocation: 'Street 37, Industrial Area, Doha, Qatar',
  fleetVehiclesCount: '40',
  teamSize: '200+',
  originCountriesCore: '15+',
  originCountriesGlobal: '60',
  sourcingRegionsCount: '6',
  certifications: ['HACCP', 'ISO 22000:2018'],
  certifiedScope:
    'Receiving, storage, sorting, packing and dispatch of fresh fruits and vegetables; receiving, storage and dispatch of dry fruits and nuts.',
  contact: {
    address: 'Street 37, Industrial Area, Doha, Qatar',
    poBox: 'P.O. Box 64040, Doha, Qatar',
    phone: '+974 4429 0400',
    email: 'info@nairat.net',
    website: 'https://nairatfoodservices.com',
  },
  channels: [
    'Hypermarkets and supermarkets',
    'Wholesale and foodservice',
    'Quick-commerce and online grocery',
    'Cold storage and logistics for partners',
  ],
  values: {
    safetyFirst: {
      en: 'Food safety and workplace safety are non-negotiable. Certified systems, trained people and checks that happen every day.',
      ar: 'سلامة الغذاء وبيئة العمل أولوية مطلقة لا مساومة فيها، عبر أنظمة معتمدة وكوادر مدربة وفحوصات مخبرية يومية.',
    },
    freshEveryDay: {
      en: 'Short lead times and an unbroken cold chain from the moment a shipment lands to the moment it reaches the shelf.',
      ar: 'أوقات استجابة سريعة وسلسلة تبريد محكمة غير منقطعة من لحظة وصول الشحنة وحتى رفوف العرض.',
    },
    reliableAtScale: {
      en: 'Volumes and planning that keep more than 100 branches stocked, with availability mapped across origins and seasons.',
      ar: 'أحجام توريد وتخطيط دقيق يضمن استمرار إمداد أكثر من 100 فرع مع مراعاة تنوع المصادر والمواسم الزراعية.',
    },
    truePartnership: {
      en: 'We work as an extension of our customers’ fresh teams, from forecasting and pricing to full category management.',
      ar: 'نعمل كامتداد متكامل لفرق المنتجات الطازجة لدى عملائنا، بدءاً من التنبؤ بالطلب والتسعير ووصولاً لإدارة كامل الأصناف.',
    },
  },
  vision: {
    en: 'To be Qatar’s premier supplier of fresh fruits and vegetables: the partner retailers rely on for range, quality and availability in every season.',
    ar: 'أن نكون المورد الأول والموثوق للفواكه والخضروات الطازجة في دولة قطر، والشريك الذي تعتمد عليه كبرى المتاجر للجودة والوفرة في كل موسم.',
  },
  mission: {
    en: 'To supply high-quality, affordable fresh produce with food safety built into every step, to keep our people safe and growing, and to be a long-term, trusted partner to our customers, suppliers and community.',
    ar: 'توريد محاصيل زراعية طازجة فائقة الجودة وبأسعار منافسة مع ترسيخ سلامة الغذاء في كل مرحلة، وتطوير كوادرنا، وبناء شراكات موثوقة ومستدامة مع عملائنا وموردينا ومجتمعنا.',
  },
};
