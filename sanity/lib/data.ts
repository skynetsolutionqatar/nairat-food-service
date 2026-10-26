import { client } from './client';
import { urlForImage } from './image';
import { isSanityConfigured } from '../env';
import {
  PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PARTNERS_QUERY,
  FEATURED_PARTNERS_QUERY,
  SERVICES_QUERY,
  QUALITY_CERTS_QUERY,
  COMPANY_PROFILE_QUERY,
  HOME_PAGE_QUERY,
  COMPANY_PAGE_QUERY,
  QUALITY_PAGE_QUERY,
  SERVICES_PAGE_QUERY,
  PARTNERS_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  PRODUCTS_PAGE_QUERY,
  CATEGORY_PAGE_QUERY,
  PRIVACY_PAGE_QUERY,
  TERMS_PAGE_QUERY,
} from './queries';
import {
  ProductItem,
  ProductCategoryData,
  productCategoriesData,
} from '@/data/products';
import { PartnerItem, partnerLogos } from '@/data/partners';
import { CompanyProfile, companyProfile } from '@/lib/config/company';
import { en } from '@/lib/i18n/dictionaries/en';
import { ar } from '@/lib/i18n/dictionaries/ar';

export interface ServiceData {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  features: { en: string; ar: string }[];
  imageUrl: string;
  order: number;
}

export interface CertData {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  description: string;
  descriptionAr?: string;
  imageSrc: string;
  order: number;
}

/**
 * Fetch all products or products filtered by category with fail-safe fallback
 */
export async function getProducts(category?: string): Promise<ProductItem[]> {
  const staticProducts = category && productCategoriesData[category]
    ? productCategoriesData[category].products
    : Object.values(productCategoriesData).flatMap((cat) => cat.products);

  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any[]>(
        category ? PRODUCTS_BY_CATEGORY_QUERY : PRODUCTS_QUERY,
        category ? { category } : {},
        {
          next: {
            tags: ['products'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );

      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanityProducts: ProductItem[] = data.map((doc: any): ProductItem => ({
          id: doc.slug || doc._id,
          name: doc.name,
          nameAr: doc.nameAr || doc.name,
          variety: doc.variety || '',
          origin: doc.origin || '',
          temp: doc.temp || '',
          description: doc.description || '',
          imageUrl: urlForImage(doc.image) || '/products/vegetables/tomatoes.jpg',
        }));

        // Multi-tier deduplication: match by normalized English name AND stripped slug/ID
        const sanityNames = new Set(
          sanityProducts.map((p) => p.name.toLowerCase().trim())
        );
        const sanitySlugs = new Set(
          sanityProducts.flatMap((p) => [
            p.id.toLowerCase().trim(),
            p.id.replace(/^[a-z-]+-/, '').toLowerCase().trim(),
          ])
        );

        const remainingStatic = staticProducts.filter(
          (p) =>
            !sanityNames.has(p.name.toLowerCase().trim()) &&
            !sanitySlugs.has(p.id.toLowerCase().trim())
        );

        return [...sanityProducts, ...remainingStatic];
      }
    } catch (err) {
      console.warn('[Sanity] Could not fetch products, falling back to local dataset:', err);
    }
  }

  return staticProducts;
}

/**
 * Fetch full category structure
 */
export async function getProductCategories(): Promise<Record<string, ProductCategoryData>> {
  const result: Record<string, ProductCategoryData> = { ...productCategoriesData };

  if (isSanityConfigured()) {
    try {
      const allProducts = await getProducts();
      if (allProducts && allProducts.length > 0) {
        // Group by categories
        for (const catKey of Object.keys(result)) {
          // If we have products from Sanity matching category, update the category product list
          const matching = await getProducts(catKey);
          if (matching.length > 0) {
            result[catKey] = {
              ...result[catKey],
              products: matching,
            };
          }
        }
      }
    } catch {
      // Keep static fallbacks
    }
  }

  return result;
}

/**
 * Fetch featured products for homepage carousel
 */
export async function getFeaturedProducts(): Promise<ProductItem[]> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any[]>(
        FEATURED_PRODUCTS_QUERY,
        {},
        { next: { tags: ['products'] } }
      );

      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((doc: any): ProductItem => ({
          id: doc.slug || doc._id,
          name: doc.name,
          nameAr: doc.nameAr || doc.name,
          variety: doc.variety || '',
          origin: doc.origin || '',
          temp: doc.temp || '',
          description: doc.description || '',
          imageUrl: urlForImage(doc.image) || '/products/vegetables/tomatoes.jpg',
        }));
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: take first 8 products across all categories
  return Object.values(productCategoriesData)
    .flatMap((cat) => cat.products)
    .slice(0, 8);
}

/**
 * Fetch partners with fail-safe fallback
 */
export async function getPartners(featuredOnly = false): Promise<PartnerItem[]> {
  const staticList = featuredOnly
    ? partnerLogos.filter((p) => p.featured !== false)
    : partnerLogos;

  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any[]>(
        featuredOnly ? FEATURED_PARTNERS_QUERY : PARTNERS_QUERY,
        {},
        {
          next: {
            tags: ['partners'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );

      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanityPartners: PartnerItem[] = data.map((doc: any): PartnerItem => ({
          id: doc._id,
          name: doc.name,
          nameAr: doc.nameAr || doc.name,
          description: doc.description || doc.name,
          category: doc.category || 'hypermarket',
          image: urlForImage(doc.logo) || '/partners/almeera-logo-b.svg',
          featured: doc.featured ?? true,
        }));

        // Sanity partners appear first, followed by static partners that were not overridden
        const sanityNames = new Set(
          sanityPartners.map((p) => p.name.toLowerCase().trim())
        );

        return [
          ...sanityPartners,
          ...staticList.filter((p) => !sanityNames.has(p.name.toLowerCase().trim())),
        ];
      }
    } catch (err) {
      console.warn('[Sanity] Could not fetch partners, falling back to local dataset:', err);
    }
  }

  return staticList;
}

/**
 * Fetch company profile with fallback
 */
export async function getCompanyProfile(): Promise<CompanyProfile> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        COMPANY_PROFILE_QUERY,
        {},
        { next: { tags: ['company'] } }
      );

      if (data && data.name) {
        return {
          ...companyProfile,
          name: data.name || companyProfile.name,
          legalName: data.legalName || companyProfile.legalName,
          productLinesCount: data.productLinesCount || companyProfile.productLinesCount,
          dailyVolumeTonnes: data.dailyVolumeTonnes || companyProfile.dailyVolumeTonnes,
          retailBranchesSupplied: data.retailBranchesSupplied || companyProfile.retailBranchesSupplied,
          warehouseArea: data.warehouseArea || companyProfile.warehouseArea,
          warehouseLocation: data.warehouseLocation || companyProfile.warehouseLocation,
          fleetVehiclesCount: data.fleetVehiclesCount || companyProfile.fleetVehiclesCount,
          teamSize: data.teamSize || companyProfile.teamSize,
          certifications: data.certifications || companyProfile.certifications,
          certifiedScope: data.certifiedScope || companyProfile.certifiedScope,
          contact: {
            ...companyProfile.contact,
            phone: data.phone || companyProfile.contact.phone,
            email: data.email || companyProfile.contact.email,
            address: data.address || companyProfile.contact.address,
            poBox: data.poBox || companyProfile.contact.poBox,
          },
        };
      }
    } catch {
      // Fallback
    }
  }

  return companyProfile;
}

/**
 * Fetch quality certificates
 */
export async function getQualityCertificates(): Promise<CertData[]> {
  const defaultCerts: CertData[] = [
    {
      id: 'haccp',
      title: 'HACCP',
      titleAr: 'نظام تحليل المخاطر (HACCP)',
      subtitle: 'Certificate of Compliance',
      subtitleAr: 'شهادة الامتثال',
      description: 'Hazard Analysis and Critical Control Points, Codex Alimentarius.',
      descriptionAr: 'تحليل المخاطر ونقاط التحكم الحرجة، هيئة الدستور الغذائي (Codex Alimentarius).',
      imageSrc: '/certificates/c1-1-1.png',
      order: 1,
    },
    {
      id: 'iso22000',
      title: 'ISO 22000:2018',
      titleAr: 'أيزو 22000:2018',
      subtitle: 'Certificate of Registration',
      subtitleAr: 'شهادة التسجيل والاعتماد',
      description: 'Food safety management system certified for end-to-end traceability and hygiene.',
      descriptionAr: 'نظام إدارة سلامة الغذاء العالمي المعتمد لضمان النظافة والتتبع الكامل.',
      imageSrc: '/certificates/c2-2-1.png',
      order: 2,
    },
  ];

  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any[]>(
        QUALITY_CERTS_QUERY,
        {},
        { next: { tags: ['quality'] } }
      );

      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((doc: any, index: number): CertData => ({
          id: doc._id,
          title: doc.title,
          titleAr: doc.titleAr,
          subtitle: doc.subtitle || '',
          subtitleAr: doc.subtitleAr || '',
          description: doc.description || '',
          descriptionAr: doc.descriptionAr || '',
          imageSrc: urlForImage(doc.image) || defaultCerts[index % 2].imageSrc,
          order: doc.order ?? index,
        }));
      }
    } catch {
      // Fallback
    }
  }

  return defaultCerts;
}

const defaultServicesData: ServiceData[] = [
  {
    id: 'global-sourcing-import',
    title: 'Global Sourcing & Import',
    titleAr: 'التوريد العالمي والاستيراد',
    slug: 'global-sourcing-import',
    tagline: 'Global Procurement & Import',
    taglineAr: 'المشتريات والاستيراد العالمي',
    description:
      'Direct relationship with growers and exporters across Europe, the Middle East and Asia. More than 1,200 active lines, selected for quality, shelf life and value, and consolidated through our own import operation.',
    descriptionAr:
      'علاقات مباشرة مع المزارعين والمصدرين عبر أوروبا والشرق الأوسط وآسيا. أكثر من 1,200 صنف نشط، مختارة للجودة وفترة الصلاحية والقيمة، ومجمعة عبر عمليات الاستيراد الخاصة بنا.',
    imageUrl: '/services/global-sourcing-import.webp',
    features: [
      {
        en: 'Direct grower relationships across Europe, Middle East & Asia',
        ar: 'علاقات مباشرة مع المزارعين عبر أوروبا والشرق الأوسط وآسيا',
      },
      {
        en: 'Over 1,200 active lines selected for quality, freshness & shelf life',
        ar: 'أكثر من 1,200 صنف نشط تم اختيارها للجودة والنضارة وفترة الصلاحية',
      },
      {
        en: 'Consolidated port & airport customs clearance and rapid cold intake',
        ar: 'تخليص جمركي موحد في الموانئ والمطارات مع استلام مبرد فوري',
      },
    ],
    order: 1,
  },
  {
    id: 'retail-supply-management',
    title: 'Retail Supply & Category Management',
    titleAr: 'توريد التجزئة وإدارة الفئات',
    slug: 'retail-supply-management',
    tagline: 'Retail & Category Management',
    taglineAr: 'التجزئة وإدارة الأقسام',
    description:
      'Daily supply to hypermarket and supermarket chains, from basic replenishment to full category management of the fresh section, including range planning, pricing and in-store availability.',
    descriptionAr:
      'إمداد يومي لسلاسل الهايبرماركت والسوبرماركت، من تجديد المخزون الأساسي إلى الإدارة الكاملة لفئة المنتجات الطازجة، بما في ذلك تخطيط التشكيلة والتسعير والتوافر على الرفوف.',
    imageUrl: '/services/retail-supply-management.webp',
    features: [
      {
        en: 'Daily scheduled store-level delivery to hypermarket & supermarket chains',
        ar: 'توصيل يومي مجدول على مستوى المتاجر لسلاسل الهايبرماركت والسوبرماركت',
      },
      {
        en: 'End-to-end fresh section category management and seasonal range planning',
        ar: 'إدارة متكاملة لقسم المنتجات الطازجة وتخطيط التشكيلة الموسمية',
      },
      {
        en: 'Competitive price architecture and maximum on-shelf fresh availability',
        ar: 'هيكلية تسعير تنافسية وضمان أعلى مستويات التوافر والنضارة على الرفوف',
      },
    ],
    order: 2,
  },
  {
    id: 'wholesale-foodservice',
    title: 'Wholesale & Foodservice',
    titleAr: 'التوريد بالجملة والخدمات الغذائية',
    slug: 'wholesale-foodservice',
    tagline: 'Wholesale & Commercial Foodservice',
    taglineAr: 'الجملة والتموين المؤسسي',
    description:
      'Bulk supply to wholesalers, caterers, restaurants and independent grocers, with the same sorting, packing and cold-chain standards as our retail programme.',
    descriptionAr:
      'توريد كميات كبيرة لتجار الجملة، ومتعهدي الحفلات، والمطاعم، ومتاجر البقالة المستقلة، بنفس معايير الفرز والتعبئة وسلسلة التبريد المطبقة في برنامجنا للتجزئة.',
    imageUrl: '/services/wholesale-foodservice.webp',
    features: [
      {
        en: 'High-volume bulk supply for central kitchens, catering operators & restaurants',
        ar: 'إمداد بكميات كبيرة للمطابخ المركزية وشركات التموين والمطاعم',
      },
      {
        en: 'Culinary-grade sorting, temperature-controlled packing & consistent spec grading',
        ar: 'فرز وتصنيف دقيق وتعبئة مبردة تلبي أعلى معايير الطهي الاحترافي',
      },
      {
        en: 'Central wholesale market trading with predictable daily volume allocations',
        ar: 'تجارة في سوق الجملة المركزي مع تخصيص كميات يومية موثوقة',
      },
    ],
    order: 3,
  },
  {
    id: 'quick-commerce-grocery',
    title: 'Quick-Commerce & Online Grocery',
    titleAr: 'التجارة السريعة والبقالة الإلكترونية',
    slug: 'quick-commerce-grocery',
    tagline: 'Quick-Commerce & Digital Grocery',
    taglineAr: 'التجارة السريعة والرقمية',
    description:
      'Cross-dock supply to dark-store and online grocery networks, packed to order and delivered to their operating rhythm, with weekly price lists and short lead times.',
    descriptionAr:
      'إمداد مباشر ومتقاطع لشبكات المتاجر المظلمة وتطبيقات البقالة الرقمية، معبأ حسب الطلب ومسلّم وفق إيقاع تشغيلها، مع قوائم أسعار أسبوعية وأوقات استجابة سريعة.',
    imageUrl: '/services/quick-commerce-grocery.webp',
    features: [
      {
        en: 'Agile cross-dock fulfillment engineered for micro-fulfillment & dark stores',
        ar: 'عمليات إمداد عبر التوصيل المباشر (Cross-dock) مهيأة للمتاجر المظلمة',
      },
      {
        en: 'Pack-to-order produce calibrated to online grocery consumer app SKUs',
        ar: 'تعبئة حسب الطلب مطابقة لتطبيقات توصيل البقالة والمواصفات الاستهلاكية',
      },
      {
        en: 'Dynamic weekly price schedules, rapid fulfillment cycles & off-peak dispatch',
        ar: 'قوائم تسعير أسبوعية ديناميكية، ودورات توريد سريعة وشحنات ليلية',
      },
    ],
    order: 4,
  },
  {
    id: 'cold-storage-logistics',
    title: 'Cold Storage & Logistics for Partners',
    titleAr: 'التخزين المبرد والخدمات اللوجستية للشركاء',
    slug: 'cold-storage-logistics',
    tagline: 'Cold Chain & Logistics',
    taglineAr: 'اللوجستيات والتخزين المبرد',
    description:
      'Temperature-controlled cold rooms with pallet racking, forklift handling, order picking and refrigerated delivery, available to retail and e-commerce partners who need a central warehouse in Doha.',
    descriptionAr:
      'غرف تبريد يتم التحكم بدرجات حرارتها مع رفوف للطبليات، ومناولة بالرافعات الشوكية، وانتقاء الطلبات، وتوصيل مبرد، متاحة لشركاء التجزئة والتجارة الإلكترونية المحتاجين لمستودع مركزي في الدوحة.',
    imageUrl: '/services/cold-storage-logistics.webp',
    features: [
      {
        en: '5,000 m² modern cold facility in Industrial Area with multi-zone chillers',
        ar: 'منشأة تبريد حديثة بمساحة 5,000 م² بالمنطقة الصناعية مع غرف متعددة الحرارة',
      },
      {
        en: 'Pallet racking, reach truck forklifts, and precision order picking',
        ar: 'رفوف طبليات، ورافعات شوكية متطورة، وانتقاء دقيق للشحنات والطلبات',
      },
      {
        en: '40+ refrigerated fleet vehicles operating daily across all Qatar zones',
        ar: 'أسطول يضم أكثر من 40 شاحنة مبردة تعمل يومياً في جميع أنحاء قطر',
      },
    ],
    order: 5,
  },
  {
    id: 'local-farm-partnerships',
    title: 'Local Farm Partnerships',
    titleAr: 'شراكات المزارع المحلية',
    slug: 'local-farm-partnerships',
    tagline: 'Local Farms & Food Security',
    taglineAr: 'الإنتاج المحلي والأمن الغذائي',
    description:
      "Through our agreement with Mahaseel, Qatar's agricultural marketing company, we bring Qatari-grown vegetables to market alongside imports, supporting local farmers and national food security.",
    descriptionAr:
      'من خلال اتفاقيتنا مع شركة "محاصيل"، شركة التسويق الزراعي القطرية، نطرح الخضروات المزروعة محلياً في الأسواق جنباً إلى جنب مع الواردات، دعماً للمزارعين المحليين والأمن الغذائي الوطني.',
    imageUrl: '/services/local-farm-partnerships.webp',
    features: [
      {
        en: 'Official strategic partnership with Mahaseel (Qatar Agricultural Marketing Co.)',
        ar: 'شراكة استراتيجية رسمية مع شركة "محاصيل" (شركة التسويق الزراعي القطرية)',
      },
      {
        en: 'Direct market distribution channels for Qatari greenhouse & field harvests',
        ar: 'قنوات تسويق وتوزيع مباشرة لإنتاج البيوت المحمية والمزارع القطرية',
      },
      {
        en: "Firm commitment to supporting local growers and advancing Qatar's food security",
        ar: 'التزام راسخ بدعم المزارعين المحليين وتعزيز منظومة الأمن الغذائي لدولة قطر',
      },
    ],
    order: 6,
  },
];

/**
 * Fetch commercial services with fail-safe fallback
 */
export async function getServices(): Promise<ServiceData[]> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any[]>(
        SERVICES_QUERY,
        {},
        {
          next: {
            tags: ['services'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );

      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sanityServices: ServiceData[] = data.map((doc: any, index: number): ServiceData => ({
          id: doc.slug || doc._id,
          title: doc.title,
          titleAr: doc.titleAr || doc.title,
          slug: doc.slug || doc._id,
          tagline: doc.tagline || '',
          taglineAr: doc.taglineAr || doc.tagline || '',
          description: doc.description || '',
          descriptionAr: doc.descriptionAr || doc.description || '',
          features: Array.isArray(doc.features) ? doc.features : [],
          imageUrl: urlForImage(doc.image) || defaultServicesData[index % defaultServicesData.length].imageUrl,
          order: doc.order ?? index,
        }));

        const sanitySlugs = new Set(
          sanityServices.flatMap((s) => [
            s.id.toLowerCase().trim(),
            s.slug.toLowerCase().trim(),
          ])
        );
        const sanityTitles = new Set(
          sanityServices.map((s) => s.title.toLowerCase().trim())
        );
        return [
          ...sanityServices,
          ...defaultServicesData.filter(
            (s) =>
              !sanitySlugs.has(s.id.toLowerCase().trim()) &&
              !sanityTitles.has(s.title.toLowerCase().trim())
          ),
        ];
      }
    } catch {
      // Fallback
    }
  }

  return defaultServicesData;
}

// ==========================================
// 6 Page Singletons Data Fetchers & Contracts
// ==========================================

export interface HomePageContent {
  heroTitleLine1: string;
  heroTitleLine1Ar: string;
  heroTitleLine2: string;
  heroTitleLine2Ar: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  heroCtaPrimary: string;
  heroCtaPrimaryAr: string;
  heroCtaSecondary: string;
  heroCtaSecondaryAr: string;
  partnersHeading: string;
  partnersHeadingAr: string;
  whoWeAreEyebrow: string;
  whoWeAreEyebrowAr: string;
  whoWeAreTitle: string;
  whoWeAreTitleAr: string;
  whoWeAreNarrative: string;
  whoWeAreNarrativeAr: string;
  whoWeArePillar1Title: string;
  whoWeArePillar1TitleAr: string;
  whoWeArePillar1Desc: string;
  whoWeArePillar1DescAr: string;
  whoWeArePillar2Title: string;
  whoWeArePillar2TitleAr: string;
  whoWeArePillar2Desc: string;
  whoWeArePillar2DescAr: string;
  whoWeArePillar3Title: string;
  whoWeArePillar3TitleAr: string;
  whoWeArePillar3Desc: string;
  whoWeArePillar3DescAr: string;
  strengthsEyebrow: string;
  strengthsEyebrowAr: string;
  strengthsTitle: string;
  strengthsTitleAr: string;
  strengthsOriginDesc: string;
  strengthsOriginDescAr: string;
  strengthsChillerDesc: string;
  strengthsChillerDescAr: string;
  strengthsWarehouseDesc: string;
  strengthsWarehouseDescAr: string;
  strengthsColdChainDesc: string;
  strengthsColdChainDescAr: string;
  strengthsFleetDesc: string;
  strengthsFleetDescAr: string;
  servicesEyebrow: string;
  servicesEyebrowAr: string;
  servicesTitle: string;
  servicesTitleAr: string;
  servicesNarrative: string;
  servicesNarrativeAr: string;
  servicesCtaText: string;
  servicesCtaTextAr: string;
  productsEyebrow: string;
  productsEyebrowAr: string;
  productsTitle: string;
  productsTitleAr: string;
  sourcingMapEyebrow: string;
  sourcingMapEyebrowAr: string;
  sourcingMapTitle: string;
  sourcingMapTitleAr: string;
  qualityEyebrow: string;
  qualityEyebrowAr: string;
  qualityTitle: string;
  qualityTitleAr: string;
  qualityNarrative: string;
  qualityNarrativeAr: string;
  ctaLine1: string;
  ctaLine1Ar: string;
  ctaLine2: string;
  ctaLine2Ar: string;
  ctaSubtext1: string;
  ctaSubtext1Ar: string;
  ctaSubtext2: string;
  ctaSubtext2Ar: string;
  ctaHeadline: string;
  ctaHeadlineAr: string;
  ctaDescription: string;
  ctaDescriptionAr: string;
  ctaButtonText: string;
  ctaButtonTextAr: string;
}

export const defaultHomePageContent: HomePageContent = {
  heroTitleLine1: en.hero.titleLine1,
  heroTitleLine1Ar: ar.hero.titleLine1,
  heroTitleLine2: en.hero.titleLine2,
  heroTitleLine2Ar: ar.hero.titleLine2,
  heroSubtitle: en.hero.subtitle,
  heroSubtitleAr: ar.hero.subtitle,
  heroCtaPrimary: en.hero.ctaPrimary,
  heroCtaPrimaryAr: ar.hero.ctaPrimary,
  heroCtaSecondary: en.hero.ctaSecondary,
  heroCtaSecondaryAr: ar.hero.ctaSecondary,
  partnersHeading: 'TRUSTED BY QATAR’S LEADING PARTNERS',
  partnersHeadingAr: 'شريك موثوق لكبرى المتاجر والشركات في قطر',
  whoWeAreEyebrow: 'WHO WE ARE',
  whoWeAreEyebrowAr: 'من نحن',
  whoWeAreTitle: 'Fresh Produce. Strong Supply. Trusted Across Qatar.',
  whoWeAreTitleAr: 'منتجات طازجة. إمداد قوي. موثوق في جميع أنحاء قطر.',
  whoWeAreNarrative: 'Nairat Food is one of Qatar’s leading fresh-produce suppliers, sourcing premium fresh fruits and vegetables from trusted growing regions worldwide and delivering them to retailers, wholesalers, food-service businesses and homes across Qatar.',
  whoWeAreNarrativeAr: 'نيرات الغذائية هي واحدة من الشركات الرائدة في توريد المنتجات الطازجة في قطر، حيث تستورد الفواكه والخضروات الطازجة المتميزة من مناطق زراعية موثوقة حول العالم وتوصلها إلى تجار التجزئة وتجار الجملة وشركات الخدمات الغذائية والمنازل في جميع أنحاء قطر.',
  whoWeArePillar1Title: 'Global Sourcing',
  whoWeArePillar1TitleAr: 'التوريد العالمي',
  whoWeArePillar1Desc: 'Reliable sourcing from multiple growing regions across the world.',
  whoWeArePillar1DescAr: 'توريد موثوق من مناطق زراعية متعددة حول العالم.',
  whoWeArePillar2Title: 'Year-Round Supply',
  whoWeArePillar2TitleAr: 'إمداد طوال العام',
  whoWeArePillar2Desc: 'Seasonal sourcing helps maintain consistent availability throughout the year.',
  whoWeArePillar2DescAr: 'يساعد التوريد الموسمي في الحفاظ على توفر ثابت طوال العام.',
  whoWeArePillar3Title: 'Built for Qatar',
  whoWeArePillar3TitleAr: 'صُممت لقطر',
  whoWeArePillar3Desc: 'Trusted distribution, cold-chain logistics and daily delivery across Qatar.',
  whoWeArePillar3DescAr: 'توزيع موثوق، وخدمات لوجستية لسلسلة التبريد، وتوصيل يومي في جميع أنحاء قطر.',
  strengthsEyebrow: 'WHY CHOOSE US',
  strengthsEyebrowAr: 'لماذا تختار نيرات',
  strengthsTitle: 'Built for Freshness. Ready to Deliver.',
  strengthsTitleAr: 'صُممت من أجل النضارة. جاهزون للتوصيل.',
  strengthsOriginDesc: 'Direct partnerships with certified international growers.',
  strengthsOriginDescAr: 'شراكات مباشرة مع مزارعين دوليين معتمدين.',
  strengthsChillerDesc: 'Temperature zones configured for every variety.',
  strengthsChillerDescAr: 'نطاقات حرارة مضبوطة لكل صنف.',
  strengthsWarehouseDesc: 'Quality control from intake to dispatch.',
  strengthsWarehouseDescAr: 'مراقبة الجودة من الاستلام حتى الإرسال.',
  strengthsColdChainDesc: 'Rigorous FIFO rotation and continuous climate monitoring keeping fresh produce in optimal condition across all transit stages.',
  strengthsColdChainDescAr: 'تدوير صارم بنظام ما يدخل أولاً يخرج أولاً (FIFO) ومراقبة مستمرة للمناخ للحفاظ على المنتجات الطازجة في حالة مثالية عبر جميع مراحل النقل.',
  strengthsFleetDesc: 'A temperature-controlled fleet on precise schedules.',
  strengthsFleetDescAr: 'أسطول مضبوط الحرارة وفق جداول دقيقة.',
  servicesEyebrow: 'WHAT WE DO',
  servicesEyebrowAr: 'ما نقوم به',
  servicesTitle: 'Fresh Produce Supply at Every Scale.',
  servicesTitleAr: 'إمداد المنتجات الطازجة على كل المستويات.',
  servicesNarrative: 'From sourcing and distribution to retail, we connect premium fresh produce with businesses and consumers across Qatar.',
  servicesNarrativeAr: 'من التوريد والتوزيع إلى التجزئة، نربط المنتجات الطازجة المتميزة بالشركات والمستهلكين في جميع أنحاء قطر.',
  servicesCtaText: 'Learn More',
  servicesCtaTextAr: 'اعرف المزيد',
  productsEyebrow: 'OUR PRODUCTS',
  productsEyebrowAr: 'منتجاتنا',
  productsTitle: 'Freshness, Sourced From Around the World.',
  productsTitleAr: 'نضارة، تم توريدها من جميع أنحاء العالم.',
  sourcingMapEyebrow: 'SOURCING COUNTRIES',
  sourcingMapEyebrowAr: 'بلدان التوريد',
  sourcingMapTitle: 'Connecting Global Harvests With Qatar.',
  sourcingMapTitleAr: 'نربط المحاصيل العالمية بقطر.',
  qualityEyebrow: 'CERTIFICATIONS & QUALITY',
  qualityEyebrowAr: 'الشهادات والجودة',
  qualityTitle: 'Quality You Can Trust.',
  qualityTitleAr: 'جودة يمكنك الوثوق بها.',
  qualityNarrative: 'Quality and food safety are built into every stage of our supply chain – from inspection at origin to laboratory testing on arrival and temperature-controlled delivery.',
  qualityNarrativeAr: 'تم بناء الجودة وسلامة الغذاء في كل مرحلة من مراحل سلسلة التوريد لدينا – بدءاً من الفحص في بلد المنشأ إلى الاختبارات المخبرية عند الوصول والتسليم الذي يتم التحكم في درجة حرارته.',
  ctaLine1: 'Fresh Fruits & Vegetables from',
  ctaLine1Ar: 'فواكه وخضروات طازجة من',
  ctaLine2: 'Around the World',
  ctaLine2Ar: 'جميع أنحاء العالم',
  ctaSubtext1: 'Sourced Around the World.',
  ctaSubtext1Ar: 'تم التوريد من جميع أنحاء العالم.',
  ctaSubtext2: 'Delivered Across Qatar.',
  ctaSubtext2Ar: 'تُسلَّم عبر أرجاء قطر.',
  ctaHeadline: 'Ready to Partner With Qatar’s Fresh Produce Leader?',
  ctaHeadlineAr: 'هل أنت مستعد للشراكة مع رائد الأغذية الطازجة في قطر؟',
  ctaDescription: 'Contact our procurement specialists today to discuss wholesale contracts, direct farm imports, or scheduled cold-chain delivery.',
  ctaDescriptionAr: 'تواصل مع خبراء التوريد لدينا اليوم لمناقشة عقود التوريد بالجملة أو الاستيراد المباشر أو التوصيل المجدول بسلسلة التبريد.',
  ctaButtonText: 'Contact Us',
  ctaButtonTextAr: 'اتصل بنا',
};

export async function getHomePageContent(): Promise<HomePageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        HOME_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['homePage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          heroTitleLine1: data.heroTitleLine1 || defaultHomePageContent.heroTitleLine1,
          heroTitleLine1Ar: data.heroTitleLine1Ar || defaultHomePageContent.heroTitleLine1Ar,
          heroTitleLine2: data.heroTitleLine2 || defaultHomePageContent.heroTitleLine2,
          heroTitleLine2Ar: data.heroTitleLine2Ar || defaultHomePageContent.heroTitleLine2Ar,
          heroSubtitle: data.heroSubtitle || defaultHomePageContent.heroSubtitle,
          heroSubtitleAr: data.heroSubtitleAr || defaultHomePageContent.heroSubtitleAr,
          heroCtaPrimary: data.heroCtaPrimary || defaultHomePageContent.heroCtaPrimary,
          heroCtaPrimaryAr: data.heroCtaPrimaryAr || defaultHomePageContent.heroCtaPrimaryAr,
          heroCtaSecondary: data.heroCtaSecondary || defaultHomePageContent.heroCtaSecondary,
          heroCtaSecondaryAr: data.heroCtaSecondaryAr || defaultHomePageContent.heroCtaSecondaryAr,
          partnersHeading: data.partnersHeading || defaultHomePageContent.partnersHeading,
          partnersHeadingAr: data.partnersHeadingAr || defaultHomePageContent.partnersHeadingAr,
          whoWeAreEyebrow: data.whoWeAreEyebrow || defaultHomePageContent.whoWeAreEyebrow,
          whoWeAreEyebrowAr: data.whoWeAreEyebrowAr || defaultHomePageContent.whoWeAreEyebrowAr,
          whoWeAreTitle: data.whoWeAreTitle || defaultHomePageContent.whoWeAreTitle,
          whoWeAreTitleAr: data.whoWeAreTitleAr || defaultHomePageContent.whoWeAreTitleAr,
          whoWeAreNarrative: data.whoWeAreNarrative || defaultHomePageContent.whoWeAreNarrative,
          whoWeAreNarrativeAr: data.whoWeAreNarrativeAr || defaultHomePageContent.whoWeAreNarrativeAr,
          whoWeArePillar1Title: data.whoWeArePillar1Title || defaultHomePageContent.whoWeArePillar1Title,
          whoWeArePillar1TitleAr: data.whoWeArePillar1TitleAr || defaultHomePageContent.whoWeArePillar1TitleAr,
          whoWeArePillar1Desc: data.whoWeArePillar1Desc || defaultHomePageContent.whoWeArePillar1Desc,
          whoWeArePillar1DescAr: data.whoWeArePillar1DescAr || defaultHomePageContent.whoWeArePillar1DescAr,
          whoWeArePillar2Title: data.whoWeArePillar2Title || defaultHomePageContent.whoWeArePillar2Title,
          whoWeArePillar2TitleAr: data.whoWeArePillar2TitleAr || defaultHomePageContent.whoWeArePillar2TitleAr,
          whoWeArePillar2Desc: data.whoWeArePillar2Desc || defaultHomePageContent.whoWeArePillar2Desc,
          whoWeArePillar2DescAr: data.whoWeArePillar2DescAr || defaultHomePageContent.whoWeArePillar2DescAr,
          whoWeArePillar3Title: data.whoWeArePillar3Title || defaultHomePageContent.whoWeArePillar3Title,
          whoWeArePillar3TitleAr: data.whoWeArePillar3TitleAr || defaultHomePageContent.whoWeArePillar3TitleAr,
          whoWeArePillar3Desc: data.whoWeArePillar3Desc || defaultHomePageContent.whoWeArePillar3Desc,
          whoWeArePillar3DescAr: data.whoWeArePillar3DescAr || defaultHomePageContent.whoWeArePillar3DescAr,
          strengthsEyebrow: data.strengthsEyebrow || defaultHomePageContent.strengthsEyebrow,
          strengthsEyebrowAr: data.strengthsEyebrowAr || defaultHomePageContent.strengthsEyebrowAr,
          strengthsTitle: data.strengthsTitle || defaultHomePageContent.strengthsTitle,
          strengthsTitleAr: data.strengthsTitleAr || defaultHomePageContent.strengthsTitleAr,
          strengthsOriginDesc: data.strengthsOriginDesc || defaultHomePageContent.strengthsOriginDesc,
          strengthsOriginDescAr: data.strengthsOriginDescAr || defaultHomePageContent.strengthsOriginDescAr,
          strengthsChillerDesc: data.strengthsChillerDesc || defaultHomePageContent.strengthsChillerDesc,
          strengthsChillerDescAr: data.strengthsChillerDescAr || defaultHomePageContent.strengthsChillerDescAr,
          strengthsWarehouseDesc: data.strengthsWarehouseDesc || defaultHomePageContent.strengthsWarehouseDesc,
          strengthsWarehouseDescAr: data.strengthsWarehouseDescAr || defaultHomePageContent.strengthsWarehouseDescAr,
          strengthsColdChainDesc: data.strengthsColdChainDesc || defaultHomePageContent.strengthsColdChainDesc,
          strengthsColdChainDescAr: data.strengthsColdChainDescAr || defaultHomePageContent.strengthsColdChainDescAr,
          strengthsFleetDesc: data.strengthsFleetDesc || defaultHomePageContent.strengthsFleetDesc,
          strengthsFleetDescAr: data.strengthsFleetDescAr || defaultHomePageContent.strengthsFleetDescAr,
          servicesEyebrow: data.servicesEyebrow || defaultHomePageContent.servicesEyebrow,
          servicesEyebrowAr: data.servicesEyebrowAr || defaultHomePageContent.servicesEyebrowAr,
          servicesTitle: data.servicesTitle || defaultHomePageContent.servicesTitle,
          servicesTitleAr: data.servicesTitleAr || defaultHomePageContent.servicesTitleAr,
          servicesNarrative: data.servicesNarrative || defaultHomePageContent.servicesNarrative,
          servicesNarrativeAr: data.servicesNarrativeAr || defaultHomePageContent.servicesNarrativeAr,
          servicesCtaText: data.servicesCtaText || defaultHomePageContent.servicesCtaText,
          servicesCtaTextAr: data.servicesCtaTextAr || defaultHomePageContent.servicesCtaTextAr,
          productsEyebrow: data.productsEyebrow || defaultHomePageContent.productsEyebrow,
          productsEyebrowAr: data.productsEyebrowAr || defaultHomePageContent.productsEyebrowAr,
          productsTitle: data.productsTitle || defaultHomePageContent.productsTitle,
          productsTitleAr: data.productsTitleAr || defaultHomePageContent.productsTitleAr,
          sourcingMapEyebrow: data.sourcingMapEyebrow || defaultHomePageContent.sourcingMapEyebrow,
          sourcingMapEyebrowAr: data.sourcingMapEyebrowAr || defaultHomePageContent.sourcingMapEyebrowAr,
          sourcingMapTitle: data.sourcingMapTitle || defaultHomePageContent.sourcingMapTitle,
          sourcingMapTitleAr: data.sourcingMapTitleAr || defaultHomePageContent.sourcingMapTitleAr,
          qualityEyebrow: data.qualityEyebrow || defaultHomePageContent.qualityEyebrow,
          qualityEyebrowAr: data.qualityEyebrowAr || defaultHomePageContent.qualityEyebrowAr,
          qualityTitle: data.qualityTitle || defaultHomePageContent.qualityTitle,
          qualityTitleAr: data.qualityTitleAr || defaultHomePageContent.qualityTitleAr,
          qualityNarrative: data.qualityNarrative || defaultHomePageContent.qualityNarrative,
          qualityNarrativeAr: data.qualityNarrativeAr || defaultHomePageContent.qualityNarrativeAr,
          ctaLine1: data.ctaLine1 || defaultHomePageContent.ctaLine1,
          ctaLine1Ar: data.ctaLine1Ar || defaultHomePageContent.ctaLine1Ar,
          ctaLine2: data.ctaLine2 || defaultHomePageContent.ctaLine2,
          ctaLine2Ar: data.ctaLine2Ar || defaultHomePageContent.ctaLine2Ar,
          ctaSubtext1: data.ctaSubtext1 || defaultHomePageContent.ctaSubtext1,
          ctaSubtext1Ar: data.ctaSubtext1Ar || defaultHomePageContent.ctaSubtext1Ar,
          ctaSubtext2: data.ctaSubtext2 || defaultHomePageContent.ctaSubtext2,
          ctaSubtext2Ar: data.ctaSubtext2Ar || defaultHomePageContent.ctaSubtext2Ar,
          ctaHeadline: data.ctaHeadline || defaultHomePageContent.ctaHeadline,
          ctaHeadlineAr: data.ctaHeadlineAr || defaultHomePageContent.ctaHeadlineAr,
          ctaDescription: data.ctaDescription || defaultHomePageContent.ctaDescription,
          ctaDescriptionAr: data.ctaDescriptionAr || defaultHomePageContent.ctaDescriptionAr,
          ctaButtonText: data.ctaButtonText || defaultHomePageContent.ctaButtonText,
          ctaButtonTextAr: data.ctaButtonTextAr || defaultHomePageContent.ctaButtonTextAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultHomePageContent;
}

export interface CompanyPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;

  deliveringEyebrow: string;
  deliveringEyebrowAr: string;
  deliveringTitle: string;
  deliveringTitleAr: string;
  deliveringNarrative: string;
  deliveringNarrativeAr: string;
  deliveringCommitmentTitle: string;
  deliveringCommitmentTitleAr: string;
  deliveringCommitmentBody: string;
  deliveringCommitmentBodyAr: string;
  deliveringImageUrl?: string;
  deliveringBadgeEst?: string;
  deliveringBadgeEstAr?: string;
  deliveringBadgeLocation?: string;
  deliveringBadgeLocationAr?: string;

  visionMissionTitle: string;
  visionMissionTitleAr: string;
  visionMissionNarrative: string;
  visionMissionNarrativeAr: string;
  visionTitle: string;
  visionTitleAr: string;
  visionBody: string;
  visionBodyAr: string;
  missionTitle: string;
  missionTitleAr: string;
  missionBody: string;
  missionBodyAr: string;

  infraTitle: string;
  infraTitleAr: string;
  infraNarrative: string;
  infraNarrativeAr: string;
  infraImageUrl?: string;
  infraHubBadgeTitle: string;
  infraHubBadgeTitleAr: string;
  infraHubBadgeDesc: string;
  infraHubBadgeDescAr: string;

  sourcingEyebrow: string;
  sourcingEyebrowAr: string;
  sourcingHeadline: string;
  sourcingHeadlineAr: string;
  sourcingNarrative: string;
  sourcingNarrativeAr: string;
  sourcingCard1Badge: string;
  sourcingCard1BadgeAr: string;
  sourcingCard1Title: string;
  sourcingCard1TitleAr: string;
  sourcingCard1Desc: string;
  sourcingCard1DescAr: string;
  sourcingCard2Badge: string;
  sourcingCard2BadgeAr: string;
  sourcingCard2Title: string;
  sourcingCard2TitleAr: string;
  sourcingCard2Desc: string;
  sourcingCard2DescAr: string;

  teamEyebrow: string;
  teamEyebrowAr: string;
  teamHeadline: string;
  teamHeadlineAr: string;
  teamNarrative: string;
  teamNarrativeAr: string;
  teamImageUrl?: string;

  qualityEyebrow: string;
  qualityEyebrowAr: string;
  qualityTitle: string;
  qualityTitleAr: string;
  qualityNarrative: string;
  qualityNarrativeAr: string;
  qualityImageUrl?: string;
  qualityBadgeText: string;
  qualityBadgeTextAr: string;
  qualityBadgeSubtext: string;
  qualityBadgeSubtextAr: string;

  lookingAheadEyebrow: string;
  lookingAheadEyebrowAr: string;
  lookingAheadHeadline: string;
  lookingAheadHeadlineAr: string;
  lookingAheadNarrative: string;
  lookingAheadNarrativeAr: string;
  lookingAheadAmbitionLabel: string;
  lookingAheadAmbitionLabelAr: string;
  lookingAheadAmbitionQuote: string;
  lookingAheadAmbitionQuoteAr: string;
  lookingAheadImageUrl?: string;
  lookingAheadBadgeText: string;
  lookingAheadBadgeTextAr: string;
  lookingAheadBadgeSubtext: string;
  lookingAheadBadgeSubtextAr: string;
}

export const defaultCompanyPageContent: CompanyPageContent = {
  bannerTitle: 'Company',
  bannerTitleAr: 'الشركة',
  bannerSubtitle: 'Connecting global agricultural basins with Qatar’s food retail and hospitality sectors through state-of-the-art cold-chain logistics.',
  bannerSubtitleAr: 'نربط أبرز المزارع العالمية بقطاعات التجزئة والضيافة في قطر من خلال بنية تحتية لوجستية متطورة لسلسلة التبريد.',

  deliveringEyebrow: 'Delivering Freshness',
  deliveringEyebrowAr: 'توصيل النضارة',
  deliveringTitle: 'A comprehensive fresh-produce partner for Qatar.',
  deliveringTitleAr: 'شريك شامل للمنتجات الطازجة لقطر.',
  deliveringNarrative: "Nairat Food is one of Qatar's leading fresh-produce houses, specializing in the import, distribution and delivery of premium fruits and vegetables.\n\nEstablished in 2020, Nairat has grown rapidly by combining global sourcing, strong local market knowledge and dependable logistics. Today, we serve hypermarkets, supermarkets, wholesale buyers, food-service businesses and consumers across Qatar.\n\nFrom farms across the Levant, Gulf, Africa, Asia and beyond, our produce travels through an integrated supply chain designed to preserve freshness from source to customer.",
  deliveringNarrativeAr: 'تعد نيرات للأغذية إحدى الشركات الرائدة في مجال المنتجات الطازجة في قطر، وهي متخصصة في استيراد وتوزيع وتسليم الفواكه والخضروات الفاخرة.\n\nتأسست نيرات في عام 2020، ونمت بسرعة من خلال الجمع بين التوريد العالمي، والمعرفة القوية بالسوق المحلي، والخدمات اللوجستية الموثوقة. اليوم، نحن نخدم الهايبرماركت، والسوبرماركت، ومشتري الجملة، وشركات الخدمات الغذائية، والمستهلكين في جميع أنحاء قطر.\n\nمن المزارع عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، تنتقل منتجاتنا عبر سلسلة توريد متكاملة مصممة للحفاظ على النضارة من المصدر إلى العميل.',
  deliveringCommitmentTitle: 'Our Core Commitment',
  deliveringCommitmentTitleAr: 'التزامنا الأساسي',
  deliveringCommitmentBody: 'To deliver high-quality fresh produce safely, efficiently and consistently. Sourced with care. Handled with precision. Delivered with confidence.',
  deliveringCommitmentBodyAr: 'تقديم منتجات طازجة عالية الجودة بأمان، وكفاءة، وبشكل متسق. تم التوريد بعناية. تم التعامل بدقة. تم التسليم بكل ثقة.',
  deliveringImageUrl: '/whychooseus/warehouse.avif',
  deliveringBadgeEst: 'Est. 2020',
  deliveringBadgeEstAr: 'تأسست 2020',
  deliveringBadgeLocation: 'Street 37, Industrial Area',
  deliveringBadgeLocationAr: 'شارع 37، المنطقة الصناعية',

  visionMissionTitle: 'Our Journey: Growing a Fresher Future for Qatar.',
  visionMissionTitleAr: 'مسيرتنا: تنمية مستقبل أكثر نضارة لقطر.',
  visionMissionNarrative: 'Since our establishment in 2020, Nairat Food has expanded its capabilities to meet the growing demand for fresh produce across Qatar.\n\nFrom global sourcing to dependable cold-chain distribution, we combine deep local market knowledge with international grower partnerships to deliver consistent, fresh produce to retail and commercial clients year-round.',
  visionMissionNarrativeAr: 'منذ تأسيسنا في عام 2020، وسّعت نيرات للأغذية قدراتها لتلبية الطلب المتزايد على المنتجات الطازجة في جميع أنحاء قطر.\n\nمن التوريد العالمي إلى التوزيع الموثوق عبر سلسلة التبريد، نجمع بين المعرفة العميقة بالسوق المحلي وشراكات المزارعين الدولية لتقديم منتجات طازجة ومتسقة لعملاء التجزئة والجملة على مدار العام.',
  visionTitle: en.company.visionTitle,
  visionTitleAr: ar.company.visionTitle,
  visionBody: en.company.visionDesc,
  visionBodyAr: ar.company.visionDesc,
  missionTitle: en.company.missionTitle,
  missionTitleAr: ar.company.missionTitle,
  missionBody: en.company.missionDesc,
  missionBodyAr: ar.company.missionDesc,

  infraTitle: 'Built Around Freshness: Infrastructure Designed for Scale',
  infraTitleAr: 'صُممت حول النضارة: بنية تحتية مصممة للنمو والتوسع',
  infraNarrative: "Our purpose-built cold-chain facility in Doha's Industrial Area forms the heart of our distribution operation. With dedicated chiller rooms, efficient loading infrastructure and refrigerated transportation, our facility is designed to move fresh produce quickly and safely from arrival to delivery.",
  infraNarrativeAr: 'تشكل منشأة سلسلة التبريد المصممة خصيصاً لدينا في المنطقة الصناعية بالدوحة قلب عمليات التوزيع لدينا. مع غرف التبريد المخصصة، وبنية تحتية فعالة للتحميل، والنقل المبرد، تم تصميم منشأتنا لنقل المنتجات الطازجة بسرعة وأمان من الوصول إلى التسليم.',
  infraImageUrl: '/whychooseus/chiller-warehouse.avif',
  infraHubBadgeTitle: 'Industrial Area Hub · Doha',
  infraHubBadgeTitleAr: 'مركز المنطقة الصناعية · الدوحة',
  infraHubBadgeDesc: 'Unbroken cold-chain infrastructure operating 24/7 across Qatar.',
  infraHubBadgeDescAr: 'بنية تحتية لسلسلة تبريد غير منقطعة تعمل على مدار الساعة طوال أيام الأسبوع في جميع أنحاء قطر.',

  sourcingEyebrow: 'Strategic Sourcing',
  sourcingEyebrowAr: 'التوريد الاستراتيجي',
  sourcingHeadline: 'Strategic Sourcing: From Global Orchards to Qatar.',
  sourcingHeadlineAr: 'التوريد الاستراتيجي: من البساتين العالمية إلى قطر.',
  sourcingNarrative: "Fresh produce is seasonal. Our supply needs to be dependable. Nairat works directly with growers and suppliers across major producing regions around the world.\n\nOur sourcing network spans the Levant, Gulf, Africa, Asia and beyond, allowing us to plan supply according to seasonal availability and market demand.\n\nBy sourcing from multiple regions simultaneously, we maintain greater consistency in product quality, variety, and availability throughout the entire year.",
  sourcingNarrativeAr: 'المنتجات الطازجة موسمية. وإمدادنا يحتاج إلى أن يكون موثوقاً. تعمل نيرات مباشرة مع المزارعين والموردين عبر مناطق الإنتاج الرئيسية حول العالم.\n\nتمتد شبكة التوريد لدينا عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، مما يسمح لنا بتخطيط الإمداد وفقاً للتوافر الموسمي والطلب في السوق.\n\nمن خلال التوريد من مناطق متعددة في وقت واحد، نحافظ على اتساق أكبر في جودة المنتج وتنوعه وتوافره طوال العام بأكمله.',
  sourcingCard1Badge: 'Diversified Sourcing',
  sourcingCard1BadgeAr: 'توريد متنوع',
  sourcingCard1Title: 'The Levant, Gulf, Africa & Asia',
  sourcingCard1TitleAr: 'بلاد الشام، والخليج، وإفريقيا وآسيا',
  sourcingCard1Desc: 'Direct relationships with verified growers across Jordan, Lebanon, Syria, Saudi Arabia, Egypt, South Africa, Turkey, and India ensure uninterrupted arrivals of citrus, stone fruits, leafy greens, root vegetables, and exotic culinary lines.',
  sourcingCard1DescAr: 'علاقات مباشرة مع مزارعين موثوقين عبر الأردن، ولبنان، وسوريا، والمملكة العربية السعودية، ومصر، وجنوب إفريقيا، وتركيا، والهند تضمن وصولاً دون انقطاع للحمضيات، والفواكه ذات النواة الحجرية، والخضروات الورقية، والخضروات الجذرية، وخطوط الطهي الغريبة.',
  sourcingCard2Badge: 'Abu Samra Border & QA',
  sourcingCard2BadgeAr: 'حدود أبو سمرة وضمان الجودة',
  sourcingCard2Title: 'Border Quarantine & Origin Inspection',
  sourcingCard2TitleAr: 'الحجر الصحي على الحدود والفحص في المنشأ',
  sourcingCard2Desc: 'Our procurement teams inspect consignments at origin and maintain active quality verification at key entry points, including overland QA inspection at the Abu Samra land border, before cargo enters our temperature-controlled warehouse in Doha.',
  sourcingCard2DescAr: 'تقوم فرق المشتريات لدينا بفحص الشحنات في بلد المنشأ والحفاظ على التحقق الفعال من الجودة في نقاط الدخول الرئيسية، بما في ذلك فحص ضمان الجودة البري عند حدود أبو سمرة البرية، قبل دخول الشحنة إلى مستودعنا الذي يتم التحكم في درجة حرارته في الدوحة.',

  teamEyebrow: 'Our Team',
  teamEyebrowAr: 'فريقنا',
  teamHeadline: 'The People Driving Our Growth',
  teamHeadlineAr: 'الأشخاص الذين يقودون نمونا',
  teamNarrative: 'At Nairat Food, we understand the goals and aspirations of each team member, as well as the needs of our growing business. With 200 employees, we are committed to helping our team reach their full potential. Our people are one of our most valuable assets, and we prioritize their well-being, development and a safe working environment to ensure the continued success of our company.',
  teamNarrativeAr: 'في نيرات للأغذية، نفهم أهداف وتطلعات كل عضو في الفريق، بالإضافة إلى احتياجات أعمالنا المتنامية. مع 200 موظف، نحن ملتزمون بمساعدة فريقنا على الوصول إلى أقصى إمكاناتهم. إن موظفينا هم أحد أثمن أصولنا، ونحن نعطي الأولوية لرفاهيتهم وتطويرهم وبيئة عمل آمنة لضمان النجاح المستمر لشركتنا.',
  teamImageUrl: '/team/team.jpg',

  qualityEyebrow: 'Quality & Food Safety',
  qualityEyebrowAr: 'الجودة وسلامة الغذاء',
  qualityTitle: 'Quality You Can Trust: Rigorous Protocols from Source to Arrival',
  qualityTitleAr: 'جودة يمكنك الوثوق بها: بروتوكولات صارمة من المصدر إلى الوصول',
  qualityNarrative: 'At Nairat, food safety and quality are integrated into our daily operations. Incoming consignments are inspected and laboratory testing is carried out in line with Qatar food-safety requirements.\n\nOur produce is then handled through controlled cold-chain processes designed to maintain freshness and quality until delivery.',
  qualityNarrativeAr: 'في نيرات، تم دمج سلامة الغذاء والجودة في عملياتنا اليومية. يتم فحص الشحنات الواردة وإجراء الاختبارات المخبرية بما يتماشى مع متطلبات سلامة الغذاء في قطر.\n\nيتم بعد ذلك التعامل مع منتجاتنا من خلال عمليات سلسلة التبريد الخاضعة للرقابة والمصممة للحفاظ على النضارة والجودة حتى التسليم.',
  qualityImageUrl: '/whychooseus/temperature-controlled.avif',
  qualityBadgeText: 'HACCP & ISO Certified',
  qualityBadgeTextAr: 'معتمد بشهادة HACCP و ISO',
  qualityBadgeSubtext: 'Qatar Verified',
  qualityBadgeSubtextAr: 'معتمد في قطر',

  lookingAheadEyebrow: 'Looking Ahead',
  lookingAheadEyebrowAr: 'التطلع إلى الأمام',
  lookingAheadHeadline: 'Building the Future of Fresh-Produce Supply',
  lookingAheadHeadlineAr: 'بناء مستقبل إمداد المنتجات الطازجة',
  lookingAheadNarrative: "Nairat Food continues to strengthen its sourcing network, operational capabilities and infrastructure to meet the evolving needs of Qatar's food and retail sectors.\n\nOur focus remains on building stronger partnerships, expanding access to quality produce and delivering a dependable fresh-produce supply throughout the year.",
  lookingAheadNarrativeAr: 'تواصل نيرات للأغذية تعزيز شبكة التوريد الخاصة بها، وقدراتها التشغيلية، وبنيتها التحتية لتلبية الاحتياجات المتطورة لقطاعي الأغذية والتجزئة في قطر.\n\nيظل تركيزنا منصباً على بناء شراكات أقوى، وتوسيع نطاق الوصول إلى منتجات عالية الجودة، وتقديم إمداد موثوق من المنتجات الطازجة طوال العام.',
  lookingAheadAmbitionLabel: 'Our Strategic Ambition',
  lookingAheadAmbitionLabelAr: 'طموحنا الاستراتيجي',
  lookingAheadAmbitionQuote: '“To become the trusted fresh-produce partner for businesses and consumers across Qatar.”',
  lookingAheadAmbitionQuoteAr: '«أن نصبح شريك المنتجات الطازجة الموثوق به للشركات والمستهلكين في جميع أنحاء قطر.»',
  lookingAheadImageUrl: '/whychooseus/truck.avif',
  lookingAheadBadgeText: 'Refrigerated Delivery Network',
  lookingAheadBadgeTextAr: 'شبكة التوصيل المبرد',
  lookingAheadBadgeSubtext: 'Active 24/7',
  lookingAheadBadgeSubtextAr: 'نشط 24/7',
};

export async function getCompanyPageContent(): Promise<CompanyPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        COMPANY_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['companyPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultCompanyPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultCompanyPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle ?? defaultCompanyPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr ?? defaultCompanyPageContent.bannerSubtitleAr,

          deliveringEyebrow: data.deliveringEyebrow || defaultCompanyPageContent.deliveringEyebrow,
          deliveringEyebrowAr: data.deliveringEyebrowAr || defaultCompanyPageContent.deliveringEyebrowAr,
          deliveringTitle: data.deliveringTitle || defaultCompanyPageContent.deliveringTitle,
          deliveringTitleAr: data.deliveringTitleAr || defaultCompanyPageContent.deliveringTitleAr,
          deliveringNarrative: data.deliveringNarrative || defaultCompanyPageContent.deliveringNarrative,
          deliveringNarrativeAr: data.deliveringNarrativeAr || defaultCompanyPageContent.deliveringNarrativeAr,
          deliveringCommitmentTitle: data.deliveringCommitmentTitle || defaultCompanyPageContent.deliveringCommitmentTitle,
          deliveringCommitmentTitleAr: data.deliveringCommitmentTitleAr || defaultCompanyPageContent.deliveringCommitmentTitleAr,
          deliveringCommitmentBody: data.deliveringCommitmentBody || defaultCompanyPageContent.deliveringCommitmentBody,
          deliveringCommitmentBodyAr: data.deliveringCommitmentBodyAr || defaultCompanyPageContent.deliveringCommitmentBodyAr,
          deliveringImageUrl: (data.deliveringImage ? urlForImage(data.deliveringImage) : null) || defaultCompanyPageContent.deliveringImageUrl,
          deliveringBadgeEst: data.deliveringBadgeEst || defaultCompanyPageContent.deliveringBadgeEst,
          deliveringBadgeEstAr: data.deliveringBadgeEstAr || defaultCompanyPageContent.deliveringBadgeEstAr,
          deliveringBadgeLocation: data.deliveringBadgeLocation || defaultCompanyPageContent.deliveringBadgeLocation,
          deliveringBadgeLocationAr: data.deliveringBadgeLocationAr || defaultCompanyPageContent.deliveringBadgeLocationAr,

          visionMissionTitle: data.visionMissionTitle || defaultCompanyPageContent.visionMissionTitle,
          visionMissionTitleAr: data.visionMissionTitleAr || defaultCompanyPageContent.visionMissionTitleAr,
          visionMissionNarrative: data.visionMissionNarrative || defaultCompanyPageContent.visionMissionNarrative,
          visionMissionNarrativeAr: data.visionMissionNarrativeAr || defaultCompanyPageContent.visionMissionNarrativeAr,
          visionTitle: data.visionTitle || defaultCompanyPageContent.visionTitle,
          visionTitleAr: data.visionTitleAr || defaultCompanyPageContent.visionTitleAr,
          visionBody: data.visionBody || defaultCompanyPageContent.visionBody,
          visionBodyAr: data.visionBodyAr || defaultCompanyPageContent.visionBodyAr,
          missionTitle: data.missionTitle || defaultCompanyPageContent.missionTitle,
          missionTitleAr: data.missionTitleAr || defaultCompanyPageContent.missionTitleAr,
          missionBody: data.missionBody || defaultCompanyPageContent.missionBody,
          missionBodyAr: data.missionBodyAr || defaultCompanyPageContent.missionBodyAr,

          infraTitle: data.infraTitle || defaultCompanyPageContent.infraTitle,
          infraTitleAr: data.infraTitleAr || defaultCompanyPageContent.infraTitleAr,
          infraNarrative: data.infraNarrative || defaultCompanyPageContent.infraNarrative,
          infraNarrativeAr: data.infraNarrativeAr || defaultCompanyPageContent.infraNarrativeAr,
          infraImageUrl: (data.infraImage ? urlForImage(data.infraImage) : null) || defaultCompanyPageContent.infraImageUrl,
          infraHubBadgeTitle: data.infraHubBadgeTitle || defaultCompanyPageContent.infraHubBadgeTitle,
          infraHubBadgeTitleAr: data.infraHubBadgeTitleAr || defaultCompanyPageContent.infraHubBadgeTitleAr,
          infraHubBadgeDesc: data.infraHubBadgeDesc || defaultCompanyPageContent.infraHubBadgeDesc,
          infraHubBadgeDescAr: data.infraHubBadgeDescAr || defaultCompanyPageContent.infraHubBadgeDescAr,

          sourcingEyebrow: data.sourcingEyebrow || defaultCompanyPageContent.sourcingEyebrow,
          sourcingEyebrowAr: data.sourcingEyebrowAr || defaultCompanyPageContent.sourcingEyebrowAr,
          sourcingHeadline: data.sourcingHeadline || defaultCompanyPageContent.sourcingHeadline,
          sourcingHeadlineAr: data.sourcingHeadlineAr || defaultCompanyPageContent.sourcingHeadlineAr,
          sourcingNarrative: data.sourcingNarrative || defaultCompanyPageContent.sourcingNarrative,
          sourcingNarrativeAr: data.sourcingNarrativeAr || defaultCompanyPageContent.sourcingNarrativeAr,
          sourcingCard1Badge: data.sourcingCard1Badge || defaultCompanyPageContent.sourcingCard1Badge,
          sourcingCard1BadgeAr: data.sourcingCard1BadgeAr || defaultCompanyPageContent.sourcingCard1BadgeAr,
          sourcingCard1Title: data.sourcingCard1Title || defaultCompanyPageContent.sourcingCard1Title,
          sourcingCard1TitleAr: data.sourcingCard1TitleAr || defaultCompanyPageContent.sourcingCard1TitleAr,
          sourcingCard1Desc: data.sourcingCard1Desc || defaultCompanyPageContent.sourcingCard1Desc,
          sourcingCard1DescAr: data.sourcingCard1DescAr || defaultCompanyPageContent.sourcingCard1DescAr,
          sourcingCard2Badge: data.sourcingCard2Badge || defaultCompanyPageContent.sourcingCard2Badge,
          sourcingCard2BadgeAr: data.sourcingCard2BadgeAr || defaultCompanyPageContent.sourcingCard2BadgeAr,
          sourcingCard2Title: data.sourcingCard2Title || defaultCompanyPageContent.sourcingCard2Title,
          sourcingCard2TitleAr: data.sourcingCard2TitleAr || defaultCompanyPageContent.sourcingCard2TitleAr,
          sourcingCard2Desc: data.sourcingCard2Desc || defaultCompanyPageContent.sourcingCard2Desc,
          sourcingCard2DescAr: data.sourcingCard2DescAr || defaultCompanyPageContent.sourcingCard2DescAr,

          teamEyebrow: data.teamEyebrow || defaultCompanyPageContent.teamEyebrow,
          teamEyebrowAr: data.teamEyebrowAr || defaultCompanyPageContent.teamEyebrowAr,
          teamHeadline: data.teamHeadline || defaultCompanyPageContent.teamHeadline,
          teamHeadlineAr: data.teamHeadlineAr || defaultCompanyPageContent.teamHeadlineAr,
          teamNarrative: data.teamNarrative || defaultCompanyPageContent.teamNarrative,
          teamNarrativeAr: data.teamNarrativeAr || defaultCompanyPageContent.teamNarrativeAr,
          teamImageUrl: (data.teamImage ? urlForImage(data.teamImage) : null) || defaultCompanyPageContent.teamImageUrl,

          qualityEyebrow: data.qualityEyebrow || defaultCompanyPageContent.qualityEyebrow,
          qualityEyebrowAr: data.qualityEyebrowAr || defaultCompanyPageContent.qualityEyebrowAr,
          qualityTitle: data.qualityTitle || defaultCompanyPageContent.qualityTitle,
          qualityTitleAr: data.qualityTitleAr || defaultCompanyPageContent.qualityTitleAr,
          qualityNarrative: data.qualityNarrative || defaultCompanyPageContent.qualityNarrative,
          qualityNarrativeAr: data.qualityNarrativeAr || defaultCompanyPageContent.qualityNarrativeAr,
          qualityImageUrl: (data.qualityImage ? urlForImage(data.qualityImage) : null) || defaultCompanyPageContent.qualityImageUrl,
          qualityBadgeText: data.qualityBadgeText || defaultCompanyPageContent.qualityBadgeText,
          qualityBadgeTextAr: data.qualityBadgeTextAr || defaultCompanyPageContent.qualityBadgeTextAr,
          qualityBadgeSubtext: data.qualityBadgeSubtext || defaultCompanyPageContent.qualityBadgeSubtext,
          qualityBadgeSubtextAr: data.qualityBadgeSubtextAr || defaultCompanyPageContent.qualityBadgeSubtextAr,

          lookingAheadEyebrow: data.lookingAheadEyebrow || defaultCompanyPageContent.lookingAheadEyebrow,
          lookingAheadEyebrowAr: data.lookingAheadEyebrowAr || defaultCompanyPageContent.lookingAheadEyebrowAr,
          lookingAheadHeadline: data.lookingAheadHeadline || defaultCompanyPageContent.lookingAheadHeadline,
          lookingAheadHeadlineAr: data.lookingAheadHeadlineAr || defaultCompanyPageContent.lookingAheadHeadlineAr,
          lookingAheadNarrative: data.lookingAheadNarrative || defaultCompanyPageContent.lookingAheadNarrative,
          lookingAheadNarrativeAr: data.lookingAheadNarrativeAr || defaultCompanyPageContent.lookingAheadNarrativeAr,
          lookingAheadAmbitionLabel: data.lookingAheadAmbitionLabel || defaultCompanyPageContent.lookingAheadAmbitionLabel,
          lookingAheadAmbitionLabelAr: data.lookingAheadAmbitionLabelAr || defaultCompanyPageContent.lookingAheadAmbitionLabelAr,
          lookingAheadAmbitionQuote: data.lookingAheadAmbitionQuote || defaultCompanyPageContent.lookingAheadAmbitionQuote,
          lookingAheadAmbitionQuoteAr: data.lookingAheadAmbitionQuoteAr || defaultCompanyPageContent.lookingAheadAmbitionQuoteAr,
          lookingAheadImageUrl: (data.lookingAheadImage ? urlForImage(data.lookingAheadImage) : null) || defaultCompanyPageContent.lookingAheadImageUrl,
          lookingAheadBadgeText: data.lookingAheadBadgeText || defaultCompanyPageContent.lookingAheadBadgeText,
          lookingAheadBadgeTextAr: data.lookingAheadBadgeTextAr || defaultCompanyPageContent.lookingAheadBadgeTextAr,
          lookingAheadBadgeSubtext: data.lookingAheadBadgeSubtext || defaultCompanyPageContent.lookingAheadBadgeSubtext,
          lookingAheadBadgeSubtextAr: data.lookingAheadBadgeSubtextAr || defaultCompanyPageContent.lookingAheadBadgeSubtextAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultCompanyPageContent;
}

export interface QualityPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
  philosophyEyebrow: string;
  philosophyEyebrowAr: string;
  philosophyTitle: string;
  philosophyTitleAr: string;
  philosophyNarrative: string;
  philosophyNarrativeAr: string;
  philosophyPillar1Title: string;
  philosophyPillar1TitleAr: string;
  philosophyPillar1Desc: string;
  philosophyPillar1DescAr: string;
  philosophyPillar2Title: string;
  philosophyPillar2TitleAr: string;
  philosophyPillar2Desc: string;
  philosophyPillar2DescAr: string;
  philosophyPillar3Title: string;
  philosophyPillar3TitleAr: string;
  philosophyPillar3Desc: string;
  philosophyPillar3DescAr: string;
  sourcingCardImageUrl?: string;
  sourcingCardTitle?: string;
  sourcingCardTitleAr?: string;
  sourcingCardDesc?: string;
  sourcingCardDescAr?: string;
  foodSafetyEyebrow: string;
  foodSafetyEyebrowAr: string;
  foodSafetyTitle: string;
  foodSafetyTitleAr: string;
  foodSafetyNarrative: string;
  foodSafetyNarrativeAr: string;
  foodSafetyCtaText: string;
  foodSafetyCtaTextAr: string;
  inspectionEyebrow: string;
  inspectionEyebrowAr: string;
  inspectionTitle: string;
  inspectionTitleAr: string;
  inspectionImageUrl?: string;
  inspectionBadgeTitle: string;
  inspectionBadgeTitleAr: string;
  inspectionBadgeDesc: string;
  inspectionBadgeDescAr: string;
  inspectionPillar1Title: string;
  inspectionPillar1TitleAr: string;
  inspectionPillar1Desc: string;
  inspectionPillar1DescAr: string;
  inspectionPillar2Title: string;
  inspectionPillar2TitleAr: string;
  inspectionPillar2Desc: string;
  inspectionPillar2DescAr: string;
  supplyChainEyebrow: string;
  supplyChainEyebrowAr: string;
  supplyChainTitle: string;
  supplyChainTitleAr: string;
  supplyChainSubtitle: string;
  supplyChainSubtitleAr: string;
  supplyChainSteps?: Array<{
    _key?: string;
    number?: string;
    title: string;
    titleAr?: string;
    description?: string;
    descriptionAr?: string;
  }>;
}

export const defaultQualityPageContent: QualityPageContent = {
  bannerTitle: 'Sourcing & Quality',
  bannerTitleAr: 'التوريد والجودة',
  bannerSubtitle: 'Rigorous food safety, direct farm partnerships, and an unbroken cold chain delivering peak freshness across Qatar.',
  bannerSubtitleAr: 'معايير سلامة غذاء صارمة، شراكات زراعية مباشرة، وسلسلة تبريد متكاملة تضمن أعلى درجات النضارة في جميع أنحاء قطر.',
  philosophyEyebrow: 'OUR SOURCING PHILOSOPHY',
  philosophyEyebrowAr: 'فلسفة التوريد لدينا',
  philosophyTitle: 'Fresh Produce, Sourced Responsibly.',
  philosophyTitleAr: 'منتجات طازجة، تم توريدها بمسؤولية.',
  philosophyNarrative: 'We work with trusted growers and suppliers across the world, combining strong global partnerships with local expertise to bring the best fresh produce to Qatar.',
  philosophyNarrativeAr: 'نحن نعمل مع مزارعين وموردين موثوقين في جميع أنحاء العالم، ونجمع بين الشراكات العالمية القوية والخبرة المحلية لجلب أفضل المنتجات الطازجة إلى قطر.',
  philosophyPillar1Title: 'Global Network',
  philosophyPillar1TitleAr: 'شبكة عالمية',
  philosophyPillar1Desc: 'Trusted partners across 60 countries',
  philosophyPillar1DescAr: 'شركاء موثوقون عبر 60 دولة',
  philosophyPillar2Title: 'Quality First',
  philosophyPillar2TitleAr: 'الجودة أولاً',
  philosophyPillar2Desc: 'Strict inspection at every stage',
  philosophyPillar2DescAr: 'فحص صارم في كل مرحلة',
  philosophyPillar3Title: 'Sustainable Sourcing',
  philosophyPillar3TitleAr: 'توريد مستدام',
  philosophyPillar3Desc: 'Supporting responsible farming practices',
  philosophyPillar3DescAr: 'دعم ممارسات الزراعة المسؤولة',
  sourcingCardImageUrl: '/quality/cargo-ship.jpg',
  sourcingCardTitle: 'Sourcing from Around the World',
  sourcingCardTitleAr: 'التوريد من جميع أنحاء العالم',
  sourcingCardDesc: 'We source fresh produce from leading growing regions across the Levant, Gulf, Africa, Asia and beyond, ensuring consistent supply and year-round availability.',
  sourcingCardDescAr: 'نحن نورد منتجات طازجة من مناطق الزراعة الرائدة عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، مما يضمن إمداداً متسقاً وتوافراً على مدار العام.',
  foodSafetyEyebrow: 'QUALITY & FOOD SAFETY',
  foodSafetyEyebrowAr: 'الجودة وسلامة الغذاء',
  foodSafetyTitle: 'Food Safety First in Every Process.',
  foodSafetyTitleAr: 'سلامة الغذاء أولاً في كل خطوة وعملية.',
  foodSafetyNarrative: 'Food safety comes first in every process at Nairat. Our facility runs a HACCP-based food safety management system certified to ISO 22000:2018, and our procedures are designed to comply with all Qatari laws and regulations governing food safety. Control measures apply at every stage, from receiving and sorting to packing, storage and distribution, so that produce reaches our customers safe, fresh and traceable.',
  foodSafetyNarrativeAr: 'تأتي سلامة الغذاء في مقدمة أولوياتنا في كل عملية داخل نيرات. تعمل منشأتنا بنظام إدارة سلامة الغذاء القائم على تحليل المخاطر ونقاط التحكم الحرجة (HACCP) والمعتمد وفق معيار ISO 22000:2018، كما أن إجراءاتنا مصممة للامتثال لكافة القوانين واللوائح القطرية المنظمة لسلامة الأغذية. تُطبَّق تدابير الرقابة والتحكم في كل مرحلة، من الاستلام والفرز إلى التعبئة والتخزين والتوزيع، لضمان وصول المنتجات لعملائنا آمنة، طازجة وقابلة للتتبع بالكامل.',
  foodSafetyCtaText: 'Our Quality Process',
  foodSafetyCtaTextAr: 'عملية الجودة لدينا',
  inspectionEyebrow: 'INSPECTION & HYGIENE',
  inspectionEyebrowAr: 'الفحص والرقابة الصحية',
  inspectionTitle: 'A Dedicated QA Team. Inspected Before It Ships.',
  inspectionTitleAr: 'فريق رقابة متخصص. فحص دقيق قبل كل شحنة.',
  inspectionImageUrl: '/quality/qa-team-inspection.webp',
  inspectionBadgeTitle: 'QA Inspection Hall · Industrial Area, Doha',
  inspectionBadgeTitleAr: 'صالة فحص الجودة · المنطقة الصناعية، الدوحة',
  inspectionBadgeDesc: 'Continuous lot sampling, digital refractometry, and core temperature checks on arrival.',
  inspectionBadgeDescAr: 'فحص مخبري مستمر ومراقبة درجات الحرارة لجميع الشحنات الواردة لضمان التتبع والأمان.',
  inspectionPillar1Title: 'A Dedicated Food Safety & Hygiene Team',
  inspectionPillar1TitleAr: 'فريق متخصص لسلامة الغذاء والنظافة الصحية',
  inspectionPillar1Desc: 'Our food safety and hygiene department sets the policies, trains every employee and audits the floor. Training runs continuously, from basic food safety and housekeeping to ISO 22000:2018 management training for supervisors.',
  inspectionPillar1DescAr: 'يضع قسم سلامة الغذاء والنظافة الصحية لدينا السياسات الصارمة، ويدرب كل موظف ويدقق العمليات على أرض الواقع باستمرار. تمتد برامج التدريب بشكل دوري، من أساسيات سلامة الغذاء وحسن الإدارة إلى تدريب المشرفين على إدارة معايير ISO 22000:2018.',
  inspectionPillar2Title: 'Inspected Before It Ships',
  inspectionPillar2TitleAr: 'فحص دقيق قبل كل شحنة وتوزيع',
  inspectionPillar2Desc: 'Every incoming lot is checked against our specifications for temperature, ripeness, size and defects. Goods that fail are rejected or downgraded before they reach the packing line, and every delivery leaves with its lot reference for full traceability.',
  inspectionPillar2DescAr: 'يتم فحص كل دفعة واردة ومطابقتها لمواصفاتنا المحددة لدرجة الحرارة، ومستوى النضج، والحجم، وخلوها من العيوب. تُرفض المنتجات غير المطابقة أو تُخفض درجتها قبل وصولها لخط التعبئة، وتغادر كل شحنة برقم الدفعة المرجعي لضمان التتبع الكامل.',
  supplyChainEyebrow: 'CONTROLS AT EVERY STEP',
  supplyChainEyebrowAr: 'ضوابط في كل مرحلة',
  supplyChainTitle: 'Controls at Every Step',
  supplyChainTitleAr: 'ضوابط رقابية صارمة في كل خطوة',
  supplyChainSubtitle: 'From arrival to the customer’s door, strict verification protocols protect product integrity and maintain an unbroken cold chain.',
  supplyChainSubtitleAr: 'من استلام الشحنات إلى باب العميل، تحمي بروتوكولات التحقق الصارمة سلامة المنتجات وتحافظ على سلسلة تبريد غير منقطعة مع التتبع الكامل.',
  supplyChainSteps: [
    {
      _key: 'step-01',
      number: '01',
      title: 'Receiving',
      titleAr: 'الاستلام والفحص',
      description: 'Temperature and quality checks on arrival, with rejection of non-conforming goods.',
      descriptionAr: 'فحوصات لدرجة الحرارة والجودة عند الوصول، مع رفض قاطع للبضائع غير المطابقة.',
    },
    {
      _key: 'step-02',
      number: '02',
      title: 'Sorting & Grading',
      titleAr: 'الفرز والتصنيف',
      description: 'Every lot inspected and graded in the hygiene-controlled hall.',
      descriptionAr: 'فحص وتصنيف كل دفعة بعناية داخل صالة مجهزة ومضبوطة النظافة الصحية.',
    },
    {
      _key: 'step-03',
      number: '03',
      title: 'Packing',
      titleAr: 'التعبئة والتغليف',
      description: 'Packed to customer specification with full lot traceability.',
      descriptionAr: 'تعبئة مخصصة وفق مواصفات العميل مع ترميز التتبع الكامل للدفعات.',
    },
    {
      _key: 'step-04',
      number: '04',
      title: 'Cold Storage',
      titleAr: 'التخزين المبرد',
      description: 'Held at the right temperature, monitored around the clock.',
      descriptionAr: 'حفظ بدرجات حرارة مثالية دقيقة ومراقبة محوسبة على مدار الساعة.',
    },
    {
      _key: 'step-05',
      number: '05',
      title: 'Dispatch & Delivery',
      titleAr: 'الشحن والتوصيل',
      description: 'Refrigerated vehicles keep the cold chain unbroken to the customer’s door.',
      descriptionAr: 'مركبات مبردة تحافظ على سلسلة التبريد دون انقطاع حتى باب العميل.',
    },
  ],
};

export async function getQualityPageContent(): Promise<QualityPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        QUALITY_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['qualityPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultQualityPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultQualityPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle || defaultQualityPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultQualityPageContent.bannerSubtitleAr,
          philosophyEyebrow: data.philosophyEyebrow || defaultQualityPageContent.philosophyEyebrow,
          philosophyEyebrowAr: data.philosophyEyebrowAr || defaultQualityPageContent.philosophyEyebrowAr,
          philosophyTitle: data.philosophyTitle || defaultQualityPageContent.philosophyTitle,
          philosophyTitleAr: data.philosophyTitleAr || defaultQualityPageContent.philosophyTitleAr,
          philosophyNarrative: data.philosophyNarrative || defaultQualityPageContent.philosophyNarrative,
          philosophyNarrativeAr: data.philosophyNarrativeAr || defaultQualityPageContent.philosophyNarrativeAr,
          philosophyPillar1Title: data.philosophyPillar1Title || defaultQualityPageContent.philosophyPillar1Title,
          philosophyPillar1TitleAr: data.philosophyPillar1TitleAr || defaultQualityPageContent.philosophyPillar1TitleAr,
          philosophyPillar1Desc: data.philosophyPillar1Desc || defaultQualityPageContent.philosophyPillar1Desc,
          philosophyPillar1DescAr: data.philosophyPillar1DescAr || defaultQualityPageContent.philosophyPillar1DescAr,
          philosophyPillar2Title: data.philosophyPillar2Title || defaultQualityPageContent.philosophyPillar2Title,
          philosophyPillar2TitleAr: data.philosophyPillar2TitleAr || defaultQualityPageContent.philosophyPillar2TitleAr,
          philosophyPillar2Desc: data.philosophyPillar2Desc || defaultQualityPageContent.philosophyPillar2Desc,
          philosophyPillar2DescAr: data.philosophyPillar2DescAr || defaultQualityPageContent.philosophyPillar2DescAr,
          philosophyPillar3Title: data.philosophyPillar3Title || defaultQualityPageContent.philosophyPillar3Title,
          philosophyPillar3TitleAr: data.philosophyPillar3TitleAr || defaultQualityPageContent.philosophyPillar3TitleAr,
          philosophyPillar3Desc: data.philosophyPillar3Desc || defaultQualityPageContent.philosophyPillar3Desc,
          philosophyPillar3DescAr: data.philosophyPillar3DescAr || defaultQualityPageContent.philosophyPillar3DescAr,
          sourcingCardImageUrl: data.sourcingCardImage ? urlForImage(data.sourcingCardImage) : defaultQualityPageContent.sourcingCardImageUrl,
          sourcingCardTitle: data.sourcingCardTitle || defaultQualityPageContent.sourcingCardTitle,
          sourcingCardTitleAr: data.sourcingCardTitleAr || defaultQualityPageContent.sourcingCardTitleAr,
          sourcingCardDesc: data.sourcingCardDesc || defaultQualityPageContent.sourcingCardDesc,
          sourcingCardDescAr: data.sourcingCardDescAr || defaultQualityPageContent.sourcingCardDescAr,
          foodSafetyEyebrow: data.foodSafetyEyebrow || defaultQualityPageContent.foodSafetyEyebrow,
          foodSafetyEyebrowAr: data.foodSafetyEyebrowAr || defaultQualityPageContent.foodSafetyEyebrowAr,
          foodSafetyTitle: data.foodSafetyTitle || defaultQualityPageContent.foodSafetyTitle,
          foodSafetyTitleAr: data.foodSafetyTitleAr || defaultQualityPageContent.foodSafetyTitleAr,
          foodSafetyNarrative: data.foodSafetyNarrative || defaultQualityPageContent.foodSafetyNarrative,
          foodSafetyNarrativeAr: data.foodSafetyNarrativeAr || defaultQualityPageContent.foodSafetyNarrativeAr,
          foodSafetyCtaText: data.foodSafetyCtaText || defaultQualityPageContent.foodSafetyCtaText,
          foodSafetyCtaTextAr: data.foodSafetyCtaTextAr || defaultQualityPageContent.foodSafetyCtaTextAr,
          inspectionEyebrow: data.inspectionEyebrow || defaultQualityPageContent.inspectionEyebrow,
          inspectionEyebrowAr: data.inspectionEyebrowAr || defaultQualityPageContent.inspectionEyebrowAr,
          inspectionTitle: data.inspectionTitle || defaultQualityPageContent.inspectionTitle,
          inspectionTitleAr: data.inspectionTitleAr || defaultQualityPageContent.inspectionTitleAr,
          inspectionImageUrl: data.inspectionImage ? urlForImage(data.inspectionImage) : defaultQualityPageContent.inspectionImageUrl,
          inspectionBadgeTitle: data.inspectionBadgeTitle || defaultQualityPageContent.inspectionBadgeTitle,
          inspectionBadgeTitleAr: data.inspectionBadgeTitleAr || defaultQualityPageContent.inspectionBadgeTitleAr,
          inspectionBadgeDesc: data.inspectionBadgeDesc || defaultQualityPageContent.inspectionBadgeDesc,
          inspectionBadgeDescAr: data.inspectionBadgeDescAr || defaultQualityPageContent.inspectionBadgeDescAr,
          inspectionPillar1Title: data.inspectionPillar1Title || defaultQualityPageContent.inspectionPillar1Title,
          inspectionPillar1TitleAr: data.inspectionPillar1TitleAr || defaultQualityPageContent.inspectionPillar1TitleAr,
          inspectionPillar1Desc: data.inspectionPillar1Desc || defaultQualityPageContent.inspectionPillar1Desc,
          inspectionPillar1DescAr: data.inspectionPillar1DescAr || defaultQualityPageContent.inspectionPillar1DescAr,
          inspectionPillar2Title: data.inspectionPillar2Title || defaultQualityPageContent.inspectionPillar2Title,
          inspectionPillar2TitleAr: data.inspectionPillar2TitleAr || defaultQualityPageContent.inspectionPillar2TitleAr,
          inspectionPillar2Desc: data.inspectionPillar2Desc || defaultQualityPageContent.inspectionPillar2Desc,
          inspectionPillar2DescAr: data.inspectionPillar2DescAr || defaultQualityPageContent.inspectionPillar2DescAr,
          supplyChainEyebrow: data.supplyChainEyebrow || defaultQualityPageContent.supplyChainEyebrow,
          supplyChainEyebrowAr: data.supplyChainEyebrowAr || defaultQualityPageContent.supplyChainEyebrowAr,
          supplyChainTitle: data.supplyChainTitle || defaultQualityPageContent.supplyChainTitle,
          supplyChainTitleAr: data.supplyChainTitleAr || defaultQualityPageContent.supplyChainTitleAr,
          supplyChainSubtitle: data.supplyChainSubtitle || defaultQualityPageContent.supplyChainSubtitle,
          supplyChainSubtitleAr: data.supplyChainSubtitleAr || defaultQualityPageContent.supplyChainSubtitleAr,
          supplyChainSteps: data.supplyChainSteps && data.supplyChainSteps.length > 0
            ? data.supplyChainSteps
            : defaultQualityPageContent.supplyChainSteps,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultQualityPageContent;
}

export interface ServicesPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
}

export const defaultServicesPageContent: ServicesPageContent = {
  bannerTitle: en.services.badge,
  bannerTitleAr: ar.services.badge,
  bannerSubtitle: en.services.heroSubtitle,
  bannerSubtitleAr: ar.services.heroSubtitle,
};

export async function getServicesPageContent(): Promise<ServicesPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        SERVICES_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['servicesPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultServicesPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultServicesPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle || defaultServicesPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultServicesPageContent.bannerSubtitleAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultServicesPageContent;
}

export interface RetailPartnerItem {
  _key?: string;
  id?: string;
  name: string;
  nameAr?: string;
  image: string;
  category?: string;
}

export interface SourcingCountryItem {
  _key?: string;
  name: string;
  nameAr: string;
  flag: string;
  crops?: string;
  cropsAr?: string;
}

export interface PartnersPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
  retailEyebrow: string;
  retailEyebrowAr: string;
  retailTitle: string;
  retailTitleAr: string;
  retailPartners?: RetailPartnerItem[];
  localEyebrow: string;
  localEyebrowAr: string;
  localTitle: string;
  localTitleAr: string;
  localNarrative: string;
  localNarrativeAr: string;
  localPartnerImageUrl?: string;
  localBadge?: string;
  localBadgeAr?: string;
  localTag1: string;
  localTag1Ar: string;
  localTag2: string;
  localTag2Ar: string;
  localTag3: string;
  localTag3Ar: string;
  globalEyebrow: string;
  globalEyebrowAr: string;
  globalTitle: string;
  globalTitleAr: string;
  globalSubtitle: string;
  globalSubtitleAr: string;
  globalCountries?: SourcingCountryItem[];
}

export const defaultRetailPartners: RetailPartnerItem[] = [
  {
    _key: 'retail-almeera',
    id: 'almeera',
    name: 'Al Meera',
    nameAr: 'الميرة',
    image: '/partners/almeera-logo-b.svg',
    category: 'hypermarket',
  },
  {
    _key: 'retail-lulu',
    id: 'lulu',
    name: 'LuLu Hypermarket',
    nameAr: 'لولو هايبرماركت',
    image: '/partners/lulu-logo.png',
    category: 'hypermarket',
  },
  {
    _key: 'retail-carrefour',
    id: 'carrefour',
    name: 'Carrefour Qatar',
    nameAr: 'كارفور قطر',
    image: '/partners/careefour.svg',
    category: 'hypermarket',
  },
  {
    _key: 'retail-safari',
    id: 'safari',
    name: 'Safari Hypermarket',
    nameAr: 'سفاري هايبرماركت',
    image: '/partners/safari-hypermarket-logo.png',
    category: 'hypermarket',
  },
  {
    _key: 'retail-grand',
    id: 'grand',
    name: 'Grand Mall',
    nameAr: 'جراند مول',
    image: '/partners/grand-logo.webp',
    category: 'hypermarket',
  },
  {
    _key: 'retail-rawabi',
    id: 'rawabi',
    name: 'Rawabi Hypermarket',
    nameAr: 'روابي هايبرماركت',
    image: '/partners/rawabi-hypermarket.svg',
    category: 'hypermarket',
  },
  {
    _key: 'retail-saudia',
    id: 'saudia',
    name: 'Saudia Hypermarket',
    nameAr: 'السعودية هايبرماركت',
    image: '/partners/saudia.png',
    category: 'hypermarket',
  },
  {
    _key: 'retail-abcfresh',
    id: 'abcfresh',
    name: 'ABC Fresh',
    nameAr: 'إيه بي سي فريش',
    image: '/partners/abc.webp',
    category: 'wholesale',
  },
  {
    _key: 'retail-talabat',
    id: 'talabat',
    name: 'Talabat Mart',
    nameAr: 'طلبات مارت',
    image: '/partners/talabat-mart.svg',
    category: 'quick-commerce',
  },
];

export const defaultCountryPartners: SourcingCountryItem[] = [
  {
    _key: 'country-jordan',
    name: 'Jordan',
    nameAr: 'الأردن',
    flag: '/flags/jordan.svg',
    crops: 'Tomatoes, cucumbers, bell peppers, stone fruits',
    cropsAr: 'طماطم، خيار، فلفل حلو، فواكه ذات نواة حجرية',
  },
  {
    _key: 'country-saudi-arabia',
    name: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    flag: '/flags/saudi-arabia.svg',
    crops: 'Premium dates, seasonal open-field crops, hydroponics',
    cropsAr: 'تمور فاخرة، محاصيل حقلية موسمية، زراعة مائية',
  },
  {
    _key: 'country-lebanon',
    name: 'Lebanon',
    nameAr: 'لبنان',
    flag: '/flags/lebanon.svg',
    crops: 'Mountain apples, cherries, peaches, fresh herbs',
    cropsAr: 'تفاح جبلي، كرز، دراق، أعشاب طازجة',
  },
  {
    _key: 'country-egypt',
    name: 'Egypt',
    nameAr: 'مصر',
    flag: '/flags/egypt.svg',
    crops: 'Valencia citrus, yellow onions, potatoes, garlic',
    cropsAr: 'حمضيات فالنسيا، بصل أصفر، بطاطس، ثوم',
  },
  {
    _key: 'country-south-africa',
    name: 'South Africa',
    nameAr: 'جنوب إفريقيا',
    flag: '/flags/south-africa.svg',
    crops: 'Table grapes, navel citrus, lemons, stone fruits, pears',
    cropsAr: 'عنب مائدة، برتقال أبو سرة، ليمون، فواكه ذات نواة، كمثرى',
  },
  {
    _key: 'country-iran',
    name: 'Iran',
    nameAr: 'إيران',
    flag: '/flags/iran.svg',
    crops: 'Sweet watermelons, pomegranates, melons, pistachios',
    cropsAr: 'بطيخ أحمر حلو، رمان، شمام، فستق',
  },
  {
    _key: 'country-syria',
    name: 'Syria',
    nameAr: 'سوريا',
    flag: '/flags/syria.svg',
    crops: 'Citrus, stone fruits, pomegranates, seasonal root crops',
    cropsAr: 'حمضيات، فواكه ذات نواة، رمان، محاصيل جذرية موسمية',
  },
  {
    _key: 'country-global-origins',
    name: 'Global Origins',
    nameAr: 'أصول عالمية',
    flag: '/cta/ctacontry.webp',
    crops: 'Specialty culinary lines from India, Turkey, and Europe',
    cropsAr: 'أصناف طهي متخصصة من الهند وتركيا وأوروبا',
  },
];

export const defaultPartnersPageContent: PartnersPageContent = {
  bannerTitle: 'Partners',
  bannerTitleAr: 'الشركاء',
  bannerSubtitle: 'Connecting global orchards and local Qatari farms to premier hypermarkets and digital grocery platforms with dependable cold-chain distribution.',
  bannerSubtitleAr: 'ربط البساتين العالمية والمزارع القطرية المحلية بالهايبرماركت الرائدة ومنصات البقالة الرقمية بتوزيع موثوق عبر سلسلة التبريد.',
  retailEyebrow: 'OUR RETAIL PARTNERS',
  retailEyebrowAr: 'شركاؤنا في التجزئة',
  retailTitle: "Trusted Daily Supplier to Qatar's Leading Retail Groups",
  retailTitleAr: 'المورد اليومي الموثوق به لمجموعات التجزئة الرائدة في قطر',
  retailPartners: defaultRetailPartners,
  localEyebrow: 'LOCAL AGRICULTURAL ALLIANCE',
  localEyebrowAr: 'تحالف زراعي محلي',
  localTitle: 'Connecting Qatari Farms to the Market',
  localTitleAr: 'ربط المزارع القطرية بالسوق',
  localNarrative: 'Strategic local partnerships with Mahaseel, connecting Qatari farms to the market with Qatari-grown seasonal supply. We aggregate fresh produce directly from local greenhouses and farms, providing cold-chain distribution into commercial supermarkets across Qatar.',
  localNarrativeAr: 'شراكات محلية استراتيجية مع محاصيل، لربط المزارع القطرية بالسوق مع إمداد موسمي مزروع في قطر. نحن نجمع المنتجات الطازجة مباشرة من البيوت المحمية والمزارع المحلية، ونوفر توزيعاً عبر سلسلة التبريد إلى السوبرماركت التجارية في جميع أنحاء قطر.',
  localPartnerImageUrl: '/partners/mahaseel.png',
  localBadge: 'Strategic Local Partner',
  localBadgeAr: 'شريك محلي استراتيجي',
  localTag1: 'Qatari-Grown Seasonal Supply',
  localTag1Ar: 'إمداد موسمي مزروع في قطر',
  localTag2: 'Direct Farm-to-Shelf Distribution',
  localTag2Ar: 'توزيع مباشر من المزرعة إلى الرف',
  localTag3: 'Supporting National Food Security',
  localTag3Ar: 'دعم الأمن الغذائي الوطني',
  globalEyebrow: 'GLOBAL SOURCING PARTNERSHIPS',
  globalEyebrowAr: 'شراكات التوريد العالمية',
  globalTitle: 'Long-Standing Partnerships with Growers & Export Houses',
  globalTitleAr: 'شراكات طويلة الأمد مع المزارعين وبيوت التصدير',
  globalSubtitle: 'Partnering directly with certified agricultural producers across key growing regions to secure year-round availability of premium fresh produce.',
  globalSubtitleAr: 'شراكات مباشرة مع منتجين زراعيين معتمدين في أبرز المناطق الزراعية لضمان توفر المنتجات الطازجة على مدار العام.',
  globalCountries: defaultCountryPartners,
};

export async function getPartnersPageContent(): Promise<PartnersPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        PARTNERS_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['partnersPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultPartnersPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultPartnersPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle || defaultPartnersPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultPartnersPageContent.bannerSubtitleAr,
          retailEyebrow: data.retailEyebrow || defaultPartnersPageContent.retailEyebrow,
          retailEyebrowAr: data.retailEyebrowAr || defaultPartnersPageContent.retailEyebrowAr,
          retailTitle: data.retailTitle || defaultPartnersPageContent.retailTitle,
          retailTitleAr: data.retailTitleAr || defaultPartnersPageContent.retailTitleAr,
          retailPartners: data.retailPartners && data.retailPartners.length > 0
            ? data.retailPartners.map((item: any) => ({
                _key: item._key,
                id: item._key || item.name?.toLowerCase().replace(/\s+/g, '-'),
                name: item.name,
                nameAr: item.nameAr || item.name,
                image: item.logo ? urlForImage(item.logo) : '/partners/almeera-logo-b.svg',
                category: item.category || 'hypermarket',
              }))
            : defaultPartnersPageContent.retailPartners,
          localEyebrow: data.localEyebrow || defaultPartnersPageContent.localEyebrow,
          localEyebrowAr: data.localEyebrowAr || defaultPartnersPageContent.localEyebrowAr,
          localTitle: data.localTitle || defaultPartnersPageContent.localTitle,
          localTitleAr: data.localTitleAr || defaultPartnersPageContent.localTitleAr,
          localNarrative: data.localNarrative || defaultPartnersPageContent.localNarrative,
          localNarrativeAr: data.localNarrativeAr || defaultPartnersPageContent.localNarrativeAr,
          localPartnerImageUrl: data.localPartnerImage
            ? urlForImage(data.localPartnerImage)
            : defaultPartnersPageContent.localPartnerImageUrl,
          localBadge: data.localBadge || defaultPartnersPageContent.localBadge,
          localBadgeAr: data.localBadgeAr || defaultPartnersPageContent.localBadgeAr,
          localTag1: data.localTag1 || defaultPartnersPageContent.localTag1,
          localTag1Ar: data.localTag1Ar || defaultPartnersPageContent.localTag1Ar,
          localTag2: data.localTag2 || defaultPartnersPageContent.localTag2,
          localTag2Ar: data.localTag2Ar || defaultPartnersPageContent.localTag2Ar,
          localTag3: data.localTag3 || defaultPartnersPageContent.localTag3,
          localTag3Ar: data.localTag3Ar || defaultPartnersPageContent.localTag3Ar,
          globalEyebrow: data.globalEyebrow || defaultPartnersPageContent.globalEyebrow,
          globalEyebrowAr: data.globalEyebrowAr || defaultPartnersPageContent.globalEyebrowAr,
          globalTitle: data.globalTitle || defaultPartnersPageContent.globalTitle,
          globalTitleAr: data.globalTitleAr || defaultPartnersPageContent.globalTitleAr,
          globalSubtitle: data.globalSubtitle || defaultPartnersPageContent.globalSubtitle,
          globalSubtitleAr: data.globalSubtitleAr || defaultPartnersPageContent.globalSubtitleAr,
          globalCountries: data.globalCountries && data.globalCountries.length > 0
            ? data.globalCountries.map((item: any) => ({
                _key: item._key,
                name: item.name,
                nameAr: item.nameAr || item.name,
                flag: item.flag ? urlForImage(item.flag) : '/flags/jordan.svg',
                crops: item.crops || '',
                cropsAr: item.cropsAr || '',
              }))
            : defaultPartnersPageContent.globalCountries,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultPartnersPageContent;
}

export interface ContactPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
  inquiryEyebrow: string;
  inquiryEyebrowAr: string;
  inquiryTitle: string;
  inquiryTitleAr: string;
  inquirySubtitle: string;
  inquirySubtitleAr: string;
  addressLabel: string;
  addressLabelAr: string;
  addressText: string;
  addressTextAr: string;
  crNumber: string;
  crNumberAr: string;
  emailLabel: string;
  emailLabelAr: string;
  emailAddress: string;
  callLabel: string;
  callLabelAr: string;
  phoneTel: string;
  phoneMobile: string;
  phoneWhatsApp: string;
  formSubmitText: string;
  formSubmitTextAr: string;
  formSuccessMessage: string;
  formSuccessMessageAr: string;
  facilityEyebrow: string;
  facilityEyebrowAr: string;
  facilityTitle: string;
  facilityTitleAr: string;
  badgeLocationLabel: string;
  badgeLocationLabelAr: string;
  badgeLocationValue: string;
  badgeLocationValueAr: string;
  badgeCapacityLabel: string;
  badgeCapacityLabelAr: string;
  badgeCapacityValue: string;
  badgeCapacityValueAr: string;
  badgeOperationsLabel: string;
  badgeOperationsLabelAr: string;
  badgeOperationsValue: string;
  badgeOperationsValueAr: string;
  badgeComplianceLabel: string;
  badgeComplianceLabelAr: string;
  badgeComplianceValue: string;
  badgeComplianceValueAr: string;
  googleMapsEmbedUrl: string;
  directionsUrl: string;
  facilityCardTitle: string;
  facilityCardTitleAr: string;
  facilityCardAddress: string;
  facilityCardAddressAr: string;
  facilityOperatingHours?: string;
  facilityOperatingHoursAr?: string;
}

export const defaultContactPageContent: ContactPageContent = {
  bannerTitle: en.contact.badge,
  bannerTitleAr: ar.contact.badge,
  bannerSubtitle:
    'Get in touch with our commercial produce procurement and cold-chain logistics team in Doha, Qatar.',
  bannerSubtitleAr:
    'تواصل مع فريق التوريد التجاري والخدمات اللوجستية لسلسلة التبريد في الدوحة، قطر.',
  inquiryEyebrow: en.contact.badge,
  inquiryEyebrowAr: ar.contact.badge,
  inquiryTitle: en.contact.heroTitle,
  inquiryTitleAr: ar.contact.heroTitle,
  inquirySubtitle:
    'Whether inquiring about wholesale contracts, direct farm partnerships, or cold-chain distribution, our specialists are ready to assist.',
  inquirySubtitleAr:
    'سواء كنت تستفسر عن عقود التوريد بالجملة، أو الشراكات المباشرة مع المزارع، أو التوزيع بسلسلة التبريد، فإن خبراءنا على استعداد لمساعدتك.',
  addressLabel: 'Address:',
  addressLabelAr: 'العنوان:',
  addressText: 'Industrial Area, Street 37, Doha, Qatar.',
  addressTextAr: 'المنطقة الصناعية، شارع 37، الدوحة، قطر.',
  crNumber: 'CR No. 144352',
  crNumberAr: 'السجل التجاري رقم 144352',
  emailLabel: 'Mail ID:',
  emailLabelAr: 'البريد الإلكتروني:',
  emailAddress: 'info@nairat.net',
  callLabel: 'Call:',
  callLabelAr: 'اتصل:',
  phoneTel: '+974 4429 0400 / 4429 0300',
  phoneMobile: '+974 3104 3814',
  phoneWhatsApp: '+974 5032 9385',
  formSubmitText: 'Submit',
  formSubmitTextAr: 'إرسال',
  formSuccessMessage:
    'Thank you! Your inquiry has been received. Our team will contact you promptly.',
  formSuccessMessageAr:
    'شكراً لك! تم استلام استفسارك. سيتصل بك فريقنا قريباً.',
  facilityEyebrow: 'FACILITY LOCATION',
  facilityEyebrowAr: 'موقع المنشأة',
  facilityTitle: 'Our Doha Central Warehouse & Cold Storage',
  facilityTitleAr: 'مستودعنا المركزي والتخزين المبرد في الدوحة',
  badgeLocationLabel: 'Location',
  badgeLocationLabelAr: 'الموقع',
  badgeLocationValue: 'Street 37, Industrial Area',
  badgeLocationValueAr: 'شارع 37، المنطقة الصناعية',
  badgeCapacityLabel: 'Capacity',
  badgeCapacityLabelAr: 'السعة',
  badgeCapacityValue: '5,000 m² • 20 Chillers',
  badgeCapacityValueAr: '5,000 م² • 20 مبرداً',
  badgeOperationsLabel: 'Operations',
  badgeOperationsLabelAr: 'العمليات',
  badgeOperationsValue: '24/7 Receiving & Dispatch',
  badgeOperationsValueAr: 'الاستلام والإرسال 24/7',
  badgeComplianceLabel: 'Compliance',
  badgeComplianceLabelAr: 'الامتثال',
  badgeComplianceValue: 'HACCP • ISO 22000',
  badgeComplianceValueAr: 'HACCP • ISO 22000',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57763.27363835163!2d51.3660583!3d25.1963217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d10076a23d59%3A0x3ee7f3ae5d1130be!2sNairat%20Food%20-%20Main%20Warehouse!5e0!3m2!1sen!2sqa!4v1790839233998!5m2!1sen!2sqa',
  directionsUrl: 'https://maps.app.goo.gl/FGEeJiMmQ172UCx3A',
  facilityCardTitle: 'Nairat Food Services',
  facilityCardTitleAr: 'شركة نيرات للخدمات الغذائية',
  facilityCardAddress: 'Street 37, Industrial Area, Doha',
  facilityCardAddressAr: 'شارع 37، المنطقة الصناعية، الدوحة',
  facilityOperatingHours: en.common.workingHoursVal,
  facilityOperatingHoursAr: ar.common.workingHoursVal,
};

export async function getContactPageContent(): Promise<ContactPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        CONTACT_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['contactPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultContactPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultContactPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle || defaultContactPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultContactPageContent.bannerSubtitleAr,
          inquiryEyebrow: data.inquiryEyebrow || defaultContactPageContent.inquiryEyebrow,
          inquiryEyebrowAr: data.inquiryEyebrowAr || defaultContactPageContent.inquiryEyebrowAr,
          inquiryTitle: data.inquiryTitle || defaultContactPageContent.inquiryTitle,
          inquiryTitleAr: data.inquiryTitleAr || defaultContactPageContent.inquiryTitleAr,
          inquirySubtitle: data.inquirySubtitle || defaultContactPageContent.inquirySubtitle,
          inquirySubtitleAr: data.inquirySubtitleAr || defaultContactPageContent.inquirySubtitleAr,
          addressLabel: data.addressLabel || defaultContactPageContent.addressLabel,
          addressLabelAr: data.addressLabelAr || defaultContactPageContent.addressLabelAr,
          addressText: data.addressText || defaultContactPageContent.addressText,
          addressTextAr: data.addressTextAr || defaultContactPageContent.addressTextAr,
          crNumber: data.crNumber || defaultContactPageContent.crNumber,
          crNumberAr: data.crNumberAr || defaultContactPageContent.crNumberAr,
          emailLabel: data.emailLabel || defaultContactPageContent.emailLabel,
          emailLabelAr: data.emailLabelAr || defaultContactPageContent.emailLabelAr,
          emailAddress: data.emailAddress || defaultContactPageContent.emailAddress,
          callLabel: data.callLabel || defaultContactPageContent.callLabel,
          callLabelAr: data.callLabelAr || defaultContactPageContent.callLabelAr,
          phoneTel: data.phoneTel || defaultContactPageContent.phoneTel,
          phoneMobile: data.phoneMobile || defaultContactPageContent.phoneMobile,
          phoneWhatsApp: data.phoneWhatsApp || defaultContactPageContent.phoneWhatsApp,
          formSubmitText: data.formSubmitText || defaultContactPageContent.formSubmitText,
          formSubmitTextAr: data.formSubmitTextAr || defaultContactPageContent.formSubmitTextAr,
          formSuccessMessage: data.formSuccessMessage || defaultContactPageContent.formSuccessMessage,
          formSuccessMessageAr: data.formSuccessMessageAr || defaultContactPageContent.formSuccessMessageAr,
          facilityEyebrow: data.facilityEyebrow || defaultContactPageContent.facilityEyebrow,
          facilityEyebrowAr: data.facilityEyebrowAr || defaultContactPageContent.facilityEyebrowAr,
          facilityTitle: data.facilityTitle || defaultContactPageContent.facilityTitle,
          facilityTitleAr: data.facilityTitleAr || defaultContactPageContent.facilityTitleAr,
          badgeLocationLabel: data.badgeLocationLabel || defaultContactPageContent.badgeLocationLabel,
          badgeLocationLabelAr: data.badgeLocationLabelAr || defaultContactPageContent.badgeLocationLabelAr,
          badgeLocationValue: data.badgeLocationValue || defaultContactPageContent.badgeLocationValue,
          badgeLocationValueAr: data.badgeLocationValueAr || defaultContactPageContent.badgeLocationValueAr,
          badgeCapacityLabel: data.badgeCapacityLabel || defaultContactPageContent.badgeCapacityLabel,
          badgeCapacityLabelAr: data.badgeCapacityLabelAr || defaultContactPageContent.badgeCapacityLabelAr,
          badgeCapacityValue: data.badgeCapacityValue || defaultContactPageContent.badgeCapacityValue,
          badgeCapacityValueAr: data.badgeCapacityValueAr || defaultContactPageContent.badgeCapacityValueAr,
          badgeOperationsLabel: data.badgeOperationsLabel || defaultContactPageContent.badgeOperationsLabel,
          badgeOperationsLabelAr: data.badgeOperationsLabelAr || defaultContactPageContent.badgeOperationsLabelAr,
          badgeOperationsValue: data.badgeOperationsValue || defaultContactPageContent.badgeOperationsValue,
          badgeOperationsValueAr: data.badgeOperationsValueAr || defaultContactPageContent.badgeOperationsValueAr,
          badgeComplianceLabel: data.badgeComplianceLabel || defaultContactPageContent.badgeComplianceLabel,
          badgeComplianceLabelAr: data.badgeComplianceLabelAr || defaultContactPageContent.badgeComplianceLabelAr,
          badgeComplianceValue: data.badgeComplianceValue || defaultContactPageContent.badgeComplianceValue,
          badgeComplianceValueAr: data.badgeComplianceValueAr || defaultContactPageContent.badgeComplianceValueAr,
          googleMapsEmbedUrl: data.googleMapsEmbedUrl || defaultContactPageContent.googleMapsEmbedUrl,
          directionsUrl: data.directionsUrl || defaultContactPageContent.directionsUrl,
          facilityCardTitle: data.facilityCardTitle || defaultContactPageContent.facilityCardTitle,
          facilityCardTitleAr: data.facilityCardTitleAr || defaultContactPageContent.facilityCardTitleAr,
          facilityCardAddress: data.facilityCardAddress || defaultContactPageContent.facilityCardAddress,
          facilityCardAddressAr: data.facilityCardAddressAr || defaultContactPageContent.facilityCardAddressAr,
          facilityOperatingHours: data.facilityOperatingHours || defaultContactPageContent.facilityOperatingHours,
          facilityOperatingHoursAr: data.facilityOperatingHoursAr || defaultContactPageContent.facilityOperatingHoursAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultContactPageContent;
}

export interface CategorySectionItem {
  _key?: string;
  slug: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  badge?: string;
  badgeAr?: string;
  heroImageUrl?: string;
}

export interface ProductsPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
  categorySections: CategorySectionItem[];
  vegTitle: string;
  vegTitleAr: string;
  vegSubtitle: string;
  vegSubtitleAr: string;
  vegDescription: string;
  vegDescriptionAr: string;
  fruitsTitle: string;
  fruitsTitleAr: string;
  fruitsSubtitle: string;
  fruitsSubtitleAr: string;
  fruitsDescription: string;
  fruitsDescriptionAr: string;
  leafyTitle: string;
  leafyTitleAr: string;
  leafySubtitle: string;
  leafySubtitleAr: string;
  leafyDescription: string;
  leafyDescriptionAr: string;
  specialtyTitle: string;
  specialtyTitleAr: string;
  specialtySubtitle: string;
  specialtySubtitleAr: string;
  specialtyDescription: string;
  specialtyDescriptionAr: string;
}

export const defaultProductsPageContent: ProductsPageContent = {
  bannerTitle: 'Our Products',
  bannerTitleAr: 'منتجاتنا',
  bannerSubtitle:
    'Explore our high-yield produce lines sourced globally and delivered daily across Qatar.',
  bannerSubtitleAr:
    'استكشف خطوط منتجاتنا عالية الجودة الموردة عالمياً والموزعة يومياً في قطر.',
  categorySections: [
    {
      _key: 'cat-vegetables',
      slug: 'vegetables',
      title: 'Fresh Vegetables',
      titleAr: 'خضروات طازجة',
      subtitle:
        'High-yield, daily farm arrivals for retail and culinary supply across Qatar.',
      subtitleAr:
        'وصول يومي من المزارع بإنتاجية عالية لتوريد التجزئة والطهي في جميع أنحاء قطر.',
      description:
        'Sourced from certified growers across the Levant, Turkey, Europe, and India, our fresh vegetable lines undergo rigorous origin inspection and temperature-controlled logistics to guarantee peak freshness.',
      descriptionAr:
        'يتم توريد خطوط الخضروات الطازجة لدينا من مزارعين معتمدين في بلاد الشام وتركيا وأوروبا والهند، وتخضع لفحص دقيق في بلد المنشأ ولوجستيات منضبطة الحرارة لضمان أقصى درجات النضارة.',
      badge: 'FARM FRESH',
      badgeAr: 'طازج من المزرعة',
    },
    {
      _key: 'cat-fruits',
      slug: 'fruits',
      title: 'Fresh Fruits',
      titleAr: 'فواكه طازجة',
      subtitle:
        'Sun-ripened orchard and citrus lines sourced directly from verified international growers.',
      subtitleAr:
        'محاصيل بساتين وحمضيات ناضجة تحت الشمس يتم توريدها مباشرة من مزارعين دوليين معتمدين.',
      description:
        'From Mediterranean citrus and seasonal stone fruits to year-round tropical melons and table grapes, Nairat delivers fruit with consistent brix levels, calibrated sizing, and intact cold-chain assurance.',
      descriptionAr:
        'من الحمضيات المتوسطية وفواكه النواة الحجرية الموسمية إلى البطيخ الاستوائي وعنب المائدة على مدار العام، تقدم نيرات فواكه بمستويات حلاوة متسقة وأحجام مدروسة مع ضمان سلامة سلسلة التبريد.',
      badge: 'ORCHARD SELECT',
      badgeAr: 'مختارات البساتين',
    },
    {
      _key: 'cat-leafy-herbs',
      slug: 'leafy-herbs',
      title: 'Leafy & Herbs',
      titleAr: 'ورقيات وأعشاب',
      subtitle:
        'Crisp greenhouse lettuces, field greens, and aromatic culinary herbs delivered daily.',
      subtitleAr:
        'خس بيوت محمية مقرمش، وخضروات حقلية، وأعشاب طهي عطرية تُسلَّم يومياً.',
      description:
        "Harvested at dawn and pre-cooled within hours, our leafy and fresh herb programs supply Qatar's leading hotel dining rooms and retail chains with vibrant, unblemished produce.",
      descriptionAr:
        'تُحصد عند الفجر ويتم تبريدها مسبقاً خلال ساعات، حيث تغذي برامجنا للورقيات والأعشاب الطازجة مطاعم الفنادق الرائدة وسلاسل التجزئة في قطر بمنتجات نضرة وخالية من العيوب.',
      badge: 'GREENHOUSE HARVEST',
      badgeAr: 'حصاد البيوت المحمية',
    },
    {
      _key: 'cat-specialty-gourmet',
      slug: 'specialty-gourmet',
      title: 'Specialty & Gourmet',
      titleAr: 'أصناف خاصة وفاخرة',
      subtitle:
        'Air-freighted exotics, baby leaves, and niche varieties for fine dining and premium retail.',
      subtitleAr:
        'أصناف استوائية مشحونة جواً، وأوراق صغيرة، وأصناف مميزة للمطاعم الراقية ومحلات التجزئة الفاخرة.',
      description:
        "Direct air-cargo links with specialty growers in Europe, South America, and Southeast Asia ensure Qatar's culinary leaders have access to the world's most sought-after seasonal produce.",
      descriptionAr:
        'تضمن خطوط الشحن الجوي المباشرة مع مزارعين متخصصين في أوروبا وأمريكا الجنوبية وجنوب شرق آسيا وصول قادة الطهي في قطر إلى أرقى المنتجات الموسمية المرغوبة عالمياً.',
      badge: 'AIR FREIGHT EXOTICS',
      badgeAr: 'أصناف استوائية جوية',
    },
  ],
  vegTitle: 'Fresh Vegetables',
  vegTitleAr: 'خضروات طازجة',
  vegSubtitle:
    'High-yield, daily farm arrivals for retail and culinary supply across Qatar.',
  vegSubtitleAr:
    'وصول يومي من المزارع بإنتاجية عالية لتوريد التجزئة والطهي في جميع أنحاء قطر.',
  vegDescription:
    'Sourced from certified growers across the Levant, Turkey, Europe, and India, our fresh vegetable lines undergo rigorous origin inspection and temperature-controlled logistics to guarantee peak freshness.',
  vegDescriptionAr:
    'يتم توريد خطوط الخضروات الطازجة لدينا من مزارعين معتمدين في بلاد الشام وتركيا وأوروبا والهند، وتخضع لفحص دقيق في بلد المنشأ ولوجستيات منضبطة الحرارة لضمان أقصى درجات النضارة.',
  fruitsTitle: 'Fresh Fruits',
  fruitsTitleAr: 'فواكه طازجة',
  fruitsSubtitle:
    'Sun-ripened orchard and citrus lines sourced directly from verified international growers.',
  fruitsSubtitleAr:
    'محاصيل بساتين وحمضيات ناضجة تحت الشمس يتم توريدها مباشرة من مزارعين دوليين معتمدين.',
  fruitsDescription:
    'From Mediterranean citrus and seasonal stone fruits to year-round tropical melons and table grapes, Nairat delivers fruit with consistent brix levels, calibrated sizing, and intact cold-chain assurance.',
  fruitsDescriptionAr:
    'من الحمضيات المتوسطية وفواكه النواة الحجرية الموسمية إلى البطيخ الاستوائي وعنب المائدة على مدار العام، تقدم نيرات فواكه بمستويات حلاوة متسقة وأحجام مدروسة مع ضمان سلامة سلسلة التبريد.',
  leafyTitle: 'Leafy & Herbs',
  leafyTitleAr: 'ورقيات وأعشاب',
  leafySubtitle:
    'Crisp greenhouse lettuces, field greens, and aromatic culinary herbs delivered daily.',
  leafySubtitleAr:
    'خس بيوت محمية مقرمش، وخضروات حقلية، وأعشاب طهي عطرية تُسلَّم يومياً.',
  leafyDescription:
    "Harvested at dawn and pre-cooled within hours, our leafy and fresh herb programs supply Qatar's leading hotel dining rooms and retail chains with vibrant, unblemished produce.",
  leafyDescriptionAr:
    'تُحصد عند الفجر ويتم تبريدها مسبقاً خلال ساعات، حيث تغذي برامجنا للورقيات والأعشاب الطازجة مطاعم الفنادق الرائدة وسلاسل التجزئة في قطر بمنتجات نضرة وخالية من العيوب.',
  specialtyTitle: 'Specialty & Gourmet',
  specialtyTitleAr: 'أصناف خاصة وفاخرة',
  specialtySubtitle:
    'Air-freighted exotics, baby leaves, and niche varieties for fine dining and premium retail.',
  specialtySubtitleAr:
    'أصناف استوائية مشحونة جواً، وأوراق صغيرة، وأصناف مميزة للمطاعم الراقية ومحلات التجزئة الفاخرة.',
  specialtyDescription:
    "Direct air-cargo links with specialty growers in Europe, South America, and Southeast Asia ensure Qatar's culinary leaders have access to the world's most sought-after seasonal produce.",
  specialtyDescriptionAr:
    'تضمن خطوط الشحن الجوي المباشرة مع مزارعين متخصصين في أوروبا وأمريكا الجنوبية وجنوب شرق آسيا وصول قادة الطهي في قطر إلى أرقى المنتجات الموسمية المرغوبة عالمياً.',
};

export async function getProductsPageContent(): Promise<ProductsPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        PRODUCTS_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['productsPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawCategories = Array.isArray(data.categorySections) ? data.categorySections : [];
        const categorySections: CategorySectionItem[] = rawCategories.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any): CategorySectionItem => ({
            _key: item._key || item.slug,
            slug: item.slug,
            title: item.title || '',
            titleAr: item.titleAr || item.title || '',
            subtitle: item.subtitle || '',
            subtitleAr: item.subtitleAr || '',
            description: item.description || '',
            descriptionAr: item.descriptionAr || '',
            badge: item.badge || 'OUR PRODUCE',
            badgeAr: item.badgeAr || 'منتجاتنا',
            heroImageUrl: item.heroImage ? urlForImage(item.heroImage) : undefined,
          })
        );

        return {
          bannerTitle: data.bannerTitle || defaultProductsPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultProductsPageContent.bannerTitleAr,
          bannerSubtitle: data.bannerSubtitle || defaultProductsPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultProductsPageContent.bannerSubtitleAr,
          categorySections:
            categorySections.length > 0
              ? categorySections
              : defaultProductsPageContent.categorySections,
          vegTitle: data.vegTitle || defaultProductsPageContent.vegTitle,
          vegTitleAr: data.vegTitleAr || defaultProductsPageContent.vegTitleAr,
          vegSubtitle: data.vegSubtitle || defaultProductsPageContent.vegSubtitle,
          vegSubtitleAr: data.vegSubtitleAr || defaultProductsPageContent.vegSubtitleAr,
          vegDescription: data.vegDescription || defaultProductsPageContent.vegDescription,
          vegDescriptionAr: data.vegDescriptionAr || defaultProductsPageContent.vegDescriptionAr,
          fruitsTitle: data.fruitsTitle || defaultProductsPageContent.fruitsTitle,
          fruitsTitleAr: data.fruitsTitleAr || defaultProductsPageContent.fruitsTitleAr,
          fruitsSubtitle: data.fruitsSubtitle || defaultProductsPageContent.fruitsSubtitle,
          fruitsSubtitleAr: data.fruitsSubtitleAr || defaultProductsPageContent.fruitsSubtitleAr,
          fruitsDescription: data.fruitsDescription || defaultProductsPageContent.fruitsDescription,
          fruitsDescriptionAr: data.fruitsDescriptionAr || defaultProductsPageContent.fruitsDescriptionAr,
          leafyTitle: data.leafyTitle || defaultProductsPageContent.leafyTitle,
          leafyTitleAr: data.leafyTitleAr || defaultProductsPageContent.leafyTitleAr,
          leafySubtitle: data.leafySubtitle || defaultProductsPageContent.leafySubtitle,
          leafySubtitleAr: data.leafySubtitleAr || defaultProductsPageContent.leafySubtitleAr,
          leafyDescription: data.leafyDescription || defaultProductsPageContent.leafyDescription,
          leafyDescriptionAr: data.leafyDescriptionAr || defaultProductsPageContent.leafyDescriptionAr,
          specialtyTitle: data.specialtyTitle || defaultProductsPageContent.specialtyTitle,
          specialtyTitleAr: data.specialtyTitleAr || defaultProductsPageContent.specialtyTitleAr,
          specialtySubtitle: data.specialtySubtitle || defaultProductsPageContent.specialtySubtitle,
          specialtySubtitleAr: data.specialtySubtitleAr || defaultProductsPageContent.specialtySubtitleAr,
          specialtyDescription: data.specialtyDescription || defaultProductsPageContent.specialtyDescription,
          specialtyDescriptionAr: data.specialtyDescriptionAr || defaultProductsPageContent.specialtyDescriptionAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultProductsPageContent;
}

export async function getCategorySection(categorySlug: string): Promise<CategorySectionItem> {
  if (isSanityConfigured()) {
    try {
      // 1. Check for dedicated categoryPage document
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const catDoc = await client.fetch<any>(
        CATEGORY_PAGE_QUERY,
        { id: `categoryPage-${categorySlug}`, slug: categorySlug },
        {
          next: {
            tags: ['categoryPage', 'productsPage', `category-${categorySlug}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (catDoc && (catDoc.title || catDoc.bannerImage)) {
        return {
          _key: catDoc._id || `cat-${categorySlug}`,
          slug: catDoc.category || categorySlug,
          title: catDoc.title || '',
          titleAr: catDoc.titleAr || catDoc.title || '',
          subtitle: catDoc.subtitle || '',
          subtitleAr: catDoc.subtitleAr || '',
          description: catDoc.subtitle || '',
          descriptionAr: catDoc.subtitleAr || '',
          badge: catDoc.badge || 'OUR PRODUCE',
          badgeAr: catDoc.badgeAr || 'منتجاتنا',
          heroImageUrl: catDoc.bannerImage ? urlForImage(catDoc.bannerImage) : undefined,
        };
      }
    } catch {
      // fallback to productsPage
    }
  }

  const pageContent = await getProductsPageContent();
  const found = pageContent.categorySections.find((cat) => cat.slug === categorySlug);
  if (found) {
    return found;
  }

  // Fallback to static mapping by slug
  if (categorySlug === 'vegetables') {
    return {
      slug: 'vegetables',
      title: pageContent.vegTitle,
      titleAr: pageContent.vegTitleAr,
      subtitle: pageContent.vegSubtitle,
      subtitleAr: pageContent.vegSubtitleAr,
      description: pageContent.vegDescription,
      descriptionAr: pageContent.vegDescriptionAr,
    };
  }
  if (categorySlug === 'fruits') {
    return {
      slug: 'fruits',
      title: pageContent.fruitsTitle,
      titleAr: pageContent.fruitsTitleAr,
      subtitle: pageContent.fruitsSubtitle,
      subtitleAr: pageContent.fruitsSubtitleAr,
      description: pageContent.fruitsDescription,
      descriptionAr: pageContent.fruitsDescriptionAr,
    };
  }
  if (categorySlug === 'leafy-herbs') {
    return {
      slug: 'leafy-herbs',
      title: pageContent.leafyTitle,
      titleAr: pageContent.leafyTitleAr,
      subtitle: pageContent.leafySubtitle,
      subtitleAr: pageContent.leafySubtitleAr,
      description: pageContent.leafyDescription,
      descriptionAr: pageContent.leafyDescriptionAr,
    };
  }
  if (categorySlug === 'specialty-gourmet') {
    return {
      slug: 'specialty-gourmet',
      title: pageContent.specialtyTitle,
      titleAr: pageContent.specialtyTitleAr,
      subtitle: pageContent.specialtySubtitle,
      subtitleAr: pageContent.specialtySubtitleAr,
      description: pageContent.specialtyDescription,
      descriptionAr: pageContent.specialtyDescriptionAr,
    };
  }

  return defaultProductsPageContent.categorySections[0];
}

export interface LegalBulletPoint {
  _key?: string;
  text: string;
  textAr?: string;
}

export interface LegalSectionItem {
  _key?: string;
  title: string;
  titleAr?: string;
  body: string;
  bodyAr?: string;
  bulletPoints?: LegalBulletPoint[];
}

export interface LegalPageContent {
  bannerTitle: string;
  bannerTitleAr: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  lastUpdated: string;
  lastUpdatedAr: string;
  sections: LegalSectionItem[];
}

export const defaultPrivacyPageContent: LegalPageContent = {
  bannerTitle: 'Privacy Policy',
  bannerTitleAr: 'سياسة الخصوصية',
  badge: 'Legal & Compliance',
  badgeAr: 'الشؤون القانونية والامتثال',
  title: 'Privacy & Data Protection Policy',
  titleAr: 'سياسة الخصوصية وحماية البيانات',
  lastUpdated: 'Last updated: January 2026 · Nairat Food Services W.L.L',
  lastUpdatedAr: 'آخر تحديث: يناير 2026 · نيرات للخدمات الغذائية ذ.م.م',
  sections: [
    {
      _key: 'sec-1',
      title: '1. Commitment to Privacy',
      titleAr: '1. الالتزام بالخصوصية',
      body: 'Nairat Food Services W.L.L ("Nairat", "we", "our", or "us") is committed to protecting the privacy of our commercial clients, retail customers, growers, and website visitors. This Privacy Policy outlines how we collect, handle, and safeguard information submitted through our website (nairatfoodservices.com) and commercial channels in the State of Qatar.',
      bodyAr: 'تلتزم شركة نيرات للخدمات الغذائية ذ.م.م ("نيرات"، أو "نحن"، أو "خاصتنا") بحماية خصوصية عملائنا التجاريين، وعملاء التجزئة، والمزارعين، وزوار الموقع الإلكتروني. تحدد سياسة الخصوصية هذه كيفية جمعنا للمعلومات المقدمة من خلال موقعنا الإلكتروني (nairatfoodservices.com) وقنواتنا التجارية في دولة قطر والتعامل معها وحمايتها.',
    },
    {
      _key: 'sec-2',
      title: '2. Information We Collect',
      titleAr: '2. المعلومات التي نجمعها',
      body: 'We collect information solely for legitimate business operations, including:',
      bodyAr: 'نحن نجمع المعلومات فقط للعمليات التجارية المشروعة، بما في ذلك:',
      bulletPoints: [
        {
          _key: 'b1',
          text: 'Contact information: Name, company name, business email, phone number, and delivery location.',
          textAr: 'معلومات الاتصال: الاسم، واسم الشركة، والبريد الإلكتروني للعمل، ورقم الهاتف، وموقع التسليم.',
        },
        {
          _key: 'b2',
          text: 'Commercial procurement inquiries, requests for quotation (RFQs), and trade correspondence.',
          textAr: 'استفسارات المشتريات التجارية، وطلبات عروض الأسعار (RFQs)، والمراسلات التجارية.',
        },
        {
          _key: 'b3',
          text: 'Grower and exporter consignment specifications, documentation, and certifications.',
          textAr: 'مواصفات شحنات المزارعين والمصدرين، والوثائق، والشهادات.',
        },
        {
          _key: 'b4',
          text: 'Employment applications, resumes, and candidate profile submissions.',
          textAr: 'طلبات التوظيف، والسير الذاتية، وملفات تعريف المرشحين المقدمة.',
        },
      ],
    },
    {
      _key: 'sec-3',
      title: '3. Purpose of Processing',
      titleAr: '3. الغرض من المعالجة',
      body: 'Information provided to Nairat is used exclusively to:',
      bodyAr: 'تُستخدم المعلومات المقدمة إلى نيرات حصرياً من أجل:',
      bulletPoints: [
        {
          _key: 'b1',
          text: 'Fulfill commercial distribution agreements and schedule fresh produce deliveries.',
          textAr: 'تنفيذ اتفاقيات التوزيع التجاري وجدولة تسليم المنتجات الطازجة.',
        },
        {
          _key: 'b2',
          text: 'Respond to business inquiries, service requests, and partnership proposals.',
          textAr: 'الرد على استفسارات العمل، وطلبات الخدمة، ومقترحات الشراكة.',
        },
        {
          _key: 'b3',
          text: 'Comply with Qatar Ministry of Public Health, food safety, and trade regulations.',
          textAr: 'الامتثال للوائح وزارة الصحة العامة القطرية، وسلامة الغذاء، والتجارة.',
        },
        {
          _key: 'b4',
          text: 'Enhance website performance, communication security, and user experience.',
          textAr: 'تحسين أداء الموقع الإلكتروني، وأمن الاتصالات، وتجربة المستخدم.',
        },
      ],
    },
    {
      _key: 'sec-4',
      title: '4. Data Security & Retention',
      titleAr: '4. أمن البيانات والاحتفاظ بها',
      body: 'We implement industry-standard administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, or loss of information. We do not sell, rent, or lease personal or commercial data to third parties.',
      bodyAr: 'نحن نطبق ضمانات إدارية وفنية ومادية متوافقة مع معايير الصناعة لمنع الوصول غير المصرح به إلى المعلومات أو الكشف عنها أو فقدانها. نحن لا نبيع أو نؤجر البيانات الشخصية أو التجارية لأطراف ثالثة.',
    },
    {
      _key: 'sec-5',
      title: '5. Contact Information',
      titleAr: '5. معلومات الاتصال',
      body: 'For questions regarding this policy or to request data updates, please contact our compliance department:',
      bodyAr: 'للأسئلة المتعلقة بهذه السياسة أو لطلب تحديثات البيانات، يرجى الاتصال بقسم الامتثال لدينا:',
    },
  ],
};

export const defaultTermsPageContent: LegalPageContent = {
  bannerTitle: 'Terms of Service',
  bannerTitleAr: 'شروط الخدمة',
  badge: 'Commercial Terms',
  badgeAr: 'الشروط التجارية',
  title: 'Terms & Conditions of Supply',
  titleAr: 'شروط وأحكام التوريد',
  lastUpdated: 'Last updated: January 2026 · Nairat Food Services W.L.L',
  lastUpdatedAr: 'آخر تحديث: يناير 2026 · نيرات للخدمات الغذائية ذ.م.م',
  sections: [
    {
      _key: 'sec-1',
      title: '1. Scope of Agreement',
      titleAr: '1. نطاق الاتفاقية',
      body: 'These Terms and Conditions govern the distribution, wholesale trading, consignment services, and website use provided by Nairat Food Services W.L.L ("Nairat") within the State of Qatar. By engaging our services or accessing our site, clients and partners agree to these terms.',
      bodyAr: 'تحكم هذه الشروط والأحكام التوزيع، والتجارة بالجملة، وخدمات الأمانة، واستخدام الموقع الإلكتروني المقدم من شركة نيرات للخدمات الغذائية ذ.م.م ("نيرات") داخل دولة قطر. من خلال التعامل مع خدماتنا أو الوصول إلى موقعنا، يوافق العملاء والشركاء على هذه الشروط.',
    },
    {
      _key: 'sec-2',
      title: '2. Cold-Chain Quality & Inspection',
      titleAr: '2. جودة سلسلة التبريد والفحص',
      body: 'All fresh fruits, vegetables, and culinary herbs supplied by Nairat are received, sorted, stored, and dispatched through our HACCP and ISO 22000:2018 certified facility in Doha Industrial Area. Buyers are required to inspect shipments upon delivery and verify temperature readings with our delivery drivers before sign-off.',
      bodyAr: 'يتم استلام جميع الفواكه الطازجة، والخضروات، وأعشاب الطهي الموردة من نيرات، وفرزها، وتخزينها، وإرسالها من خلال منشأتنا المعتمدة بشهادتي HACCP و ISO 22000:2018 في المنطقة الصناعية بالدوحة. يُطلب من المشترين فحص الشحنات عند التسليم والتحقق من قراءات درجة الحرارة مع سائقي التوصيل لدينا قبل التوقيع على الاستلام.',
    },
    {
      _key: 'sec-3',
      title: '3. Orders, Scheduling & Deliveries',
      titleAr: '3. الطلبيات، والجدولة والتسليم',
      body: 'Commercial orders are fulfilled in accordance with agreed delivery schedules. Nairat operates an active refrigerated fleet of 40 vehicles ensuring store-level delivery across Qatar hypermarkets, supermarkets, and foodservice operators. Force majeure circumstances affecting international shipping or border crossings will be communicated promptly.',
      bodyAr: 'يتم تلبية الطلبيات التجارية وفقاً لجداول التسليم المتفق عليها. تشغل نيرات أسطولاً مبرداً نشطاً مكوناً من 40 مركبة مما يضمن التسليم على مستوى المتاجر عبر الهايبرماركت، والسوبرماركت، ومشغلي الخدمات الغذائية في قطر. سيتم إبلاغ الظروف القاهرة التي تؤثر على الشحن الدولي أو المعابر الحدودية على الفور.',
    },
    {
      _key: 'sec-4',
      title: '4. Grower & Consignment Partnerships',
      titleAr: '4. شراكات المزارعين وتوريد الأمانة',
      body: 'Consignment agreements with international growers and local farms adhere to transparent audit trails, formal weight and grading inspections upon receipt, and agreed commercial settlement cycles.',
      bodyAr: 'تلتزم اتفاقيات الأمانة مع المزارعين الدوليين والمزارع المحلية بسجلات تدقيق شفافة، وعمليات فحص رسمية للوزن والتصنيف عند الاستلام، ودورات تسوية تجارية متفق عليها.',
    },
    {
      _key: 'sec-5',
      title: '5. Corporate Enquiries & Legal Notices',
      titleAr: '5. استفسارات الشركات والإشعارات القانونية',
      body: 'All official notices or inquiries regarding these terms should be addressed in writing to:',
      bodyAr: 'يجب توجيه جميع الإشعارات أو الاستفسارات الرسمية المتعلقة بهذه الشروط كتابياً إلى:',
    },
  ],
};

export async function getPrivacyPageContent(): Promise<LegalPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        PRIVACY_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['privacyPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultPrivacyPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultPrivacyPageContent.bannerTitleAr,
          badge: data.badge || defaultPrivacyPageContent.badge,
          badgeAr: data.badgeAr || defaultPrivacyPageContent.badgeAr,
          title: data.title || defaultPrivacyPageContent.title,
          titleAr: data.titleAr || defaultPrivacyPageContent.titleAr,
          lastUpdated: data.lastUpdated || defaultPrivacyPageContent.lastUpdated,
          lastUpdatedAr: data.lastUpdatedAr || defaultPrivacyPageContent.lastUpdatedAr,
          sections: Array.isArray(data.sections) && data.sections.length > 0
            ? data.sections
            : defaultPrivacyPageContent.sections,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultPrivacyPageContent;
}

export async function getTermsPageContent(): Promise<LegalPageContent> {
  if (isSanityConfigured()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await client.fetch<any>(
        TERMS_PAGE_QUERY,
        {},
        {
          next: {
            tags: ['termsPage'],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 60,
          },
        }
      );
      if (data) {
        return {
          bannerTitle: data.bannerTitle || defaultTermsPageContent.bannerTitle,
          bannerTitleAr: data.bannerTitleAr || defaultTermsPageContent.bannerTitleAr,
          badge: data.badge || defaultTermsPageContent.badge,
          badgeAr: data.badgeAr || defaultTermsPageContent.badgeAr,
          title: data.title || defaultTermsPageContent.title,
          titleAr: data.titleAr || defaultTermsPageContent.titleAr,
          lastUpdated: data.lastUpdated || defaultTermsPageContent.lastUpdated,
          lastUpdatedAr: data.lastUpdatedAr || defaultTermsPageContent.lastUpdatedAr,
          sections: Array.isArray(data.sections) && data.sections.length > 0
            ? data.sections
            : defaultTermsPageContent.sections,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultTermsPageContent;
}


