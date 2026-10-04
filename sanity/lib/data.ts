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
  whoWeAreEyebrow: 'About Nairat Food Services',
  whoWeAreEyebrowAr: 'عن نيرات للخدمات الغذائية',
  whoWeAreTitle: "Connecting Farms to Qatar's Tables",
  whoWeAreTitleAr: 'نربط المزارع بمائدة قطر',
  whoWeAreNarrative: 'Nairat Food is a premier fresh produce company in Qatar, specializing in importing, distributing, and delivering high-quality fruit and vegetables to supermarkets, wholesale markets, and foodservice providers across the country.',
  whoWeAreNarrativeAr: 'نيرات فود هي شركة رائدة في قطاع الأغذية الطازجة في دولة قطر، متخصصة في استيراد وتوزيع وتوريد أرقى أصناف الفواكه والخضروات لسلاسل السوبرماركت وأسواق الجملة ومؤسسات الخدمات الغذائية في جميع أنحاء الدولة.',
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
  strengthsEyebrow: 'Why Choose Nairat',
  strengthsEyebrowAr: 'لماذا تختار نيرات',
  strengthsTitle: 'Infrastructure Built for Freshness',
  strengthsTitleAr: 'بنية تحتية صُممت للحفاظ على النضارة',
  strengthsOriginDesc: 'Direct partnerships with certified international growers guaranteeing premium farm-fresh produce delivered directly to Qatar.',
  strengthsOriginDescAr: 'شراكات مباشرة مع مزارعين دوليين معتمدين تضمن توصيل منتجات طازجة من المزرعة مباشرة إلى قطر.',
  strengthsChillerDesc: 'Custom temperature zones configured specifically to maintain peak freshness for every variety of fruits and vegetables.',
  strengthsChillerDescAr: 'نطاقات درجات حرارة مخصصة تم ضبطها خصيصاً للحفاظ على ذروة النضارة لكل نوع من الفواكه والخضروات.',
  strengthsWarehouseDesc: 'Spacious, state-of-the-art cold storage facility ensuring uninterrupted quality control from intake to dispatch.',
  strengthsWarehouseDescAr: 'منشأة تخزين مبرد فسيحة وحديثة تضمن مراقبة جودة متواصلة من الاستلام حتى الإرسال.',
  strengthsColdChainDesc: 'Rigorous FIFO rotation and continuous climate monitoring keeping fresh produce in optimal condition across all transit stages.',
  strengthsColdChainDescAr: 'تدوير صارم بنظام ما يدخل أولاً يخرج أولاً (FIFO) ومراقبة مستمرة للمناخ للحفاظ على المنتجات الطازجة في حالة مثالية عبر جميع مراحل النقل.',
  strengthsFleetDesc: 'Modern temperature-controlled distribution fleet delivering fresh produce across Qatar on precise schedules.',
  strengthsFleetDescAr: 'أسطول توزيع حديث مضبوط الحرارة يوصل المنتجات الطازجة في جميع أنحاء قطر وفق جداول زمنية دقيقة.',
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
  sourcingMapTitle: 'Sourced From Around the World',
  sourcingMapTitleAr: 'تم التوريد من جميع أنحاء العالم',
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
  sourcingEyebrow: string;
  sourcingEyebrowAr: string;
  sourcingHeadline: string;
  sourcingHeadlineAr: string;
  sourcingNarrative: string;
  sourcingNarrativeAr: string;
  teamEyebrow: string;
  teamEyebrowAr: string;
  teamHeadline: string;
  teamHeadlineAr: string;
  teamNarrative: string;
  teamNarrativeAr: string;
  lookingAheadHeadline: string;
  lookingAheadHeadlineAr: string;
  lookingAheadNarrative: string;
  lookingAheadNarrativeAr: string;
}

export const defaultCompanyPageContent: CompanyPageContent = {
  bannerTitle: en.company.badge,
  bannerTitleAr: ar.company.badge,
  bannerSubtitle: en.company.heroSubtitle,
  bannerSubtitleAr: ar.company.heroSubtitle,
  deliveringEyebrow: 'Delivering Freshness',
  deliveringEyebrowAr: 'توصيل النضارة',
  deliveringTitle: 'A comprehensive fresh-produce partner for Qatar.',
  deliveringTitleAr: 'شريك شامل للمنتجات الطازجة لقطر.',
  deliveringNarrative: "Nairat Food is one of Qatar's leading fresh-produce houses, specializing in the import, distribution and delivery of premium fruits and vegetables. Established in 2020, Nairat has grown rapidly by combining global sourcing, strong local market knowledge and dependable logistics. Today, we serve hypermarkets, supermarkets, wholesale buyers, food-service businesses and consumers across Qatar.",
  deliveringNarrativeAr: 'تعد نيرات للأغذية إحدى الشركات الرائدة في مجال المنتجات الطازجة في قطر، وهي متخصصة في استيراد وتوزيع وتسليم الفواكه والخضروات الفاخرة. تأسست نيرات في عام 2020، ونمت بسرعة من خلال الجمع بين التوريد العالمي، والمعرفة القوية بالسوق المحلي، والخدمات اللوجستية الموثوقة.',
  deliveringCommitmentTitle: 'Our Core Commitment',
  deliveringCommitmentTitleAr: 'التزامنا الأساسي',
  deliveringCommitmentBody: 'We are committed to supplying high-quality and affordable fresh produce while maintaining a strong food-safety culture across every step of our operations.',
  deliveringCommitmentBodyAr: 'نحن ملتزمون بتوريد منتجات طازجة عالية الجودة وبأسعار معقولة مع الحفاظ على ثقافة قوية لسلامة الغذاء عبر كل خطوة من خطوات عملياتنا.',
  visionMissionTitle: 'Our Journey: Growing a Fresher Future for Qatar.',
  visionMissionTitleAr: 'مسيرتنا: تنمية مستقبل أكثر نضارة لقطر.',
  visionMissionNarrative: 'Since our establishment in 2020, Nairat Food has expanded its capabilities to meet the growing demand for fresh produce across Qatar. From global sourcing to dependable cold-chain distribution, we combine deep local market knowledge with international grower partnerships to deliver consistent, fresh produce to retail and commercial clients year-round.',
  visionMissionNarrativeAr: 'منذ تأسيسنا في عام 2020، وسّعت نيرات للأغذية قدراتها لتلبية الطلب المتزايد على المنتجات الطازجة في جميع أنحاء قطر. من التوريد العالمي إلى التوزيع الموثوق عبر سلسلة التبريد، نجمع بين المعرفة العميقة بالسوق المحلي وشراكات المزارعين الدولية.',
  visionTitle: en.company.visionTitle,
  visionTitleAr: ar.company.visionTitle,
  visionBody: en.company.visionDesc,
  visionBodyAr: ar.company.visionDesc,
  missionTitle: en.company.missionTitle,
  missionTitleAr: ar.company.missionTitle,
  missionBody: en.company.missionDesc,
  missionBodyAr: ar.company.missionDesc,
  sourcingEyebrow: 'Global Sourcing',
  sourcingEyebrowAr: 'التوريد العالمي',
  sourcingHeadline: 'Strategic Sourcing: From Global Orchards to Qatar.',
  sourcingHeadlineAr: 'التوريد الاستراتيجي: من البساتين العالمية إلى قطر.',
  sourcingNarrative: 'Our global sourcing network is the foundation of our business. We partner directly with certified growers, agricultural cooperatives and international exporters across more than 60 countries.',
  sourcingNarrativeAr: 'شبكة التوريد العالمية الخاصة بنا هي أساس أعمالنا. نحن نتشارك مباشرة مع مزارعين معتمدين وتعاونيات زراعية ومصدرين دوليين عبر أكثر من 60 دولة.',
  teamEyebrow: 'Our Team',
  teamEyebrowAr: 'فريقنا',
  teamHeadline: 'The People Driving Our Growth',
  teamHeadlineAr: 'الأشخاص الذين يقودون نمونا',
  teamNarrative: 'At Nairat Food, we understand the goals and aspirations of each team member, as well as the needs of our growing business. With 200 employees, we are committed to helping our team reach their full potential. Our people are one of our most valuable assets, and we prioritize their well-being, development and a safe working environment to ensure the continued success of our company.',
  teamNarrativeAr: 'في نيرات للأغذية، نفهم أهداف وتطلعات كل عضو في الفريق، بالإضافة إلى احتياجات أعمالنا المتنامية. مع 200 موظف، نحن ملتزمون بمساعدة فريقنا على الوصول إلى أقصى إمكاناتهم. إن موظفينا هم أحد أثمن أصولنا، ونحن نعطي الأولوية لرفاهيتهم وتطويرهم وبيئة عمل آمنة لضمان النجاح المستمر لشركتنا.',
  lookingAheadHeadline: 'Looking Ahead: Building Long-Term Value in Fresh Produce.',
  lookingAheadHeadlineAr: 'نظرة مستقبلية: بناء قيمة طويلة الأجل في قطاع المنتجات الطازجة.',
  lookingAheadNarrative: 'As Qatar continues to grow, so does the demand for higher standards in fresh food supply. Nairat is committed to continuous improvement across every part of our operations — expanding our cold chain, deepening grower relationships, and adopting modern technologies that make fresh food supply smarter, faster, and more sustainable.',
  lookingAheadNarrativeAr: 'مع استمرار نمو دولة قطر، يتزايد الطلب على معايير أعلى في إمدادات الأغذية الطازجة. تلتزم نيرات بالتحسين المستمر عبر كل جانب من جوانب عملياتنا - توسيع سلسلة التبريد، وتعميق العلاقات مع المزارعين، واعتماد تقنيات حديثة تجعل إمداد الغذاء الطازج أكثر ذكاءً وسرعة واستدامة.',
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
          bannerSubtitle: data.bannerSubtitle || defaultCompanyPageContent.bannerSubtitle,
          bannerSubtitleAr: data.bannerSubtitleAr || defaultCompanyPageContent.bannerSubtitleAr,
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
          sourcingEyebrow: data.sourcingEyebrow || defaultCompanyPageContent.sourcingEyebrow,
          sourcingEyebrowAr: data.sourcingEyebrowAr || defaultCompanyPageContent.sourcingEyebrowAr,
          sourcingHeadline: data.sourcingHeadline || defaultCompanyPageContent.sourcingHeadline,
          sourcingHeadlineAr: data.sourcingHeadlineAr || defaultCompanyPageContent.sourcingHeadlineAr,
          sourcingNarrative: data.sourcingNarrative || defaultCompanyPageContent.sourcingNarrative,
          sourcingNarrativeAr: data.sourcingNarrativeAr || defaultCompanyPageContent.sourcingNarrativeAr,
          teamEyebrow: data.teamEyebrow || defaultCompanyPageContent.teamEyebrow,
          teamEyebrowAr: data.teamEyebrowAr || defaultCompanyPageContent.teamEyebrowAr,
          teamHeadline: data.teamHeadline || defaultCompanyPageContent.teamHeadline,
          teamHeadlineAr: data.teamHeadlineAr || defaultCompanyPageContent.teamHeadlineAr,
          teamNarrative: data.teamNarrative || defaultCompanyPageContent.teamNarrative,
          teamNarrativeAr: data.teamNarrativeAr || defaultCompanyPageContent.teamNarrativeAr,
          lookingAheadHeadline: data.lookingAheadHeadline || defaultCompanyPageContent.lookingAheadHeadline,
          lookingAheadHeadlineAr: data.lookingAheadHeadlineAr || defaultCompanyPageContent.lookingAheadHeadlineAr,
          lookingAheadNarrative: data.lookingAheadNarrative || defaultCompanyPageContent.lookingAheadNarrative,
          lookingAheadNarrativeAr: data.lookingAheadNarrativeAr || defaultCompanyPageContent.lookingAheadNarrativeAr,
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
  inspectionEyebrow: string;
  inspectionEyebrowAr: string;
  inspectionTitle: string;
  inspectionTitleAr: string;
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
}

export const defaultQualityPageContent: QualityPageContent = {
  bannerTitle: en.quality.badge,
  bannerTitleAr: ar.quality.badge,
  bannerSubtitle: en.quality.heroSubtitle,
  bannerSubtitleAr: ar.quality.heroSubtitle,
  philosophyEyebrow: 'Our Sourcing Philosophy',
  philosophyEyebrowAr: 'فلسفتنا في التوريد',
  philosophyTitle: 'Every Product Begins at the Source',
  philosophyTitleAr: 'تبدأ رحلة كل منتج من المصدر',
  philosophyNarrative: 'We believe exceptional quality can only be achieved by working directly with growers who share our commitment to excellence. Through long-term grower partnerships, on-site quality assessments, and a fully traceable cold chain, we ensure every carton meets our exacting standards before it arrives in Qatar.',
  philosophyNarrativeAr: 'نؤمن بأن الجودة الاستثنائية لا تتحقق إلا من خلال العمل المباشر مع المزارعين الذين يشاركوننا التزامنا بالتميز. ومن خلال الشراكات طويلة الأمد، وتقييمات الجودة في الميدان، وسلسلة التبريد الموثوقة القابلة للتتبع، نضمن مطابقة كل شحنة لأعلى المعايير.',
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
  inspectionEyebrow: 'INSPECTION & HYGIENE',
  inspectionEyebrowAr: 'الفحص والرقابة الصحية',
  inspectionTitle: 'A Dedicated QA Team. Inspected Before It Ships.',
  inspectionTitleAr: 'فريق رقابة متخصص. فحص دقيق قبل كل شحنة.',
  inspectionPillar1Title: 'A Dedicated Food Safety & Hygiene Team',
  inspectionPillar1TitleAr: 'فريق متخصص لسلامة الغذاء والنظافة الصحية',
  inspectionPillar1Desc: 'Our food safety and hygiene department sets the policies, trains every employee and audits the floor. Training runs continuously, from basic food safety and housekeeping to ISO 22000:2018 management training for supervisors.',
  inspectionPillar1DescAr: 'يضع قسم سلامة الغذاء والنظافة الصحية لدينا السياسات الصارمة، ويدرب كل موظف ويدقق العمليات على أرض الواقع باستمرار. تمتد برامج التدريب بشكل دوري، من أساسيات سلامة الغذاء وحسن الإدارة إلى تدريب المشرفين على إدارة معايير ISO 22000:2018.',
  inspectionPillar2Title: 'Inspected Before It Ships',
  inspectionPillar2TitleAr: 'فحص دقيق قبل كل شحنة وتوزيع',
  inspectionPillar2Desc: 'Quality checks do not stop at the receiving dock. Before any order leaves our facility for delivery to supermarkets, wholesale clients, or foodservice partners, our QA team inspects outgoing pallets for freshness, correct labeling, and temperature compliance.',
  inspectionPillar2DescAr: 'لا تتوقف فحوصات الجودة عند رصيف الاستلام فقط؛ فقبل خروج أي طلبية من مستودعاتنا للتوزيع، يقوم فريق فحص الجودة بفحص المنصات والتأكد من النضارة والمطابقة والتغليف السليم ودرجة الحرارة.',
  supplyChainEyebrow: 'SUPPLY CHAIN JOURNEY',
  supplyChainEyebrowAr: 'مسار سلسلة التوريد',
  supplyChainTitle: 'From Harvest to Shelf: The Quality Journey',
  supplyChainTitleAr: 'من الحصاد إلى الرف: رحلة الجودة المتكاملة',
  supplyChainSubtitle: 'Four disciplined phases ensuring farm-fresh taste, food safety, and dependable availability.',
  supplyChainSubtitleAr: 'أربع مراحل تشغيلية منضبطة تضمن الحفاظ على طزاجة المحصول، وسلامة الغذاء، واستدامة الإمداد.',
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
          inspectionEyebrow: data.inspectionEyebrow || defaultQualityPageContent.inspectionEyebrow,
          inspectionEyebrowAr: data.inspectionEyebrowAr || defaultQualityPageContent.inspectionEyebrowAr,
          inspectionTitle: data.inspectionTitle || defaultQualityPageContent.inspectionTitle,
          inspectionTitleAr: data.inspectionTitleAr || defaultQualityPageContent.inspectionTitleAr,
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
  overviewHeadline: string;
  overviewHeadlineAr: string;
  overviewNarrative: string;
  overviewNarrativeAr: string;
}

export const defaultServicesPageContent: ServicesPageContent = {
  bannerTitle: en.services.badge,
  bannerTitleAr: ar.services.badge,
  bannerSubtitle: en.services.heroSubtitle,
  bannerSubtitleAr: ar.services.heroSubtitle,
  overviewHeadline: en.services.heroTitle,
  overviewHeadlineAr: ar.services.heroTitle,
  overviewNarrative: 'From international procurement and chilled customs clearance to daily fleet delivery and farm consignment trading, we power Qatar’s food retail ecosystem.',
  overviewNarrativeAr: 'من المشتريات الدولية والتخليص الجمركي المبرد إلى التوزيع اليومي بالأسطول وتجارة الأمانة للمزارعين، نحن ندعم منظومة التجزئة الغذائية في قطر.',
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
          overviewHeadline: data.overviewHeadline || defaultServicesPageContent.overviewHeadline,
          overviewHeadlineAr: data.overviewHeadlineAr || defaultServicesPageContent.overviewHeadlineAr,
          overviewNarrative: data.overviewNarrative || defaultServicesPageContent.overviewNarrative,
          overviewNarrativeAr: data.overviewNarrativeAr || defaultServicesPageContent.overviewNarrativeAr,
        };
      }
    } catch {
      // Fallback
    }
  }
  return defaultServicesPageContent;
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
  localEyebrow: string;
  localEyebrowAr: string;
  localTitle: string;
  localTitleAr: string;
  localNarrative: string;
  localNarrativeAr: string;
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
}

export const defaultPartnersPageContent: PartnersPageContent = {
  bannerTitle: en.partners.badge,
  bannerTitleAr: ar.partners.badge,
  bannerSubtitle: en.partners.heroSubtitle,
  bannerSubtitleAr: ar.partners.heroSubtitle,
  retailEyebrow: 'OUR RETAIL PARTNERS',
  retailEyebrowAr: 'شركاؤنا في التجزئة',
  retailTitle: "Trusted Daily Supplier to Qatar's Leading Retail Groups",
  retailTitleAr: 'المورد اليومي الموثوق به لمجموعات التجزئة الرائدة في قطر',
  localEyebrow: 'LOCAL AGRICULTURAL ALLIANCE',
  localEyebrowAr: 'تحالف زراعي محلي',
  localTitle: 'Connecting Qatari Farms to the Market',
  localTitleAr: 'ربط المزارع القطرية بالسوق',
  localNarrative: 'Strategic local partnerships with Mahaseel, connecting Qatari farms to the market with Qatari-grown seasonal supply. We aggregate fresh produce directly from local greenhouses and farms, providing cold-chain distribution into commercial supermarkets across Qatar.',
  localNarrativeAr: 'شراكات محلية استراتيجية مع محاصيل، لربط المزارع القطرية بالسوق مع إمداد موسمي مزروع في قطر. نحن نجمع المنتجات الطازجة مباشرة من البيوت المحمية والمزارع المحلية، ونوفر توزيعاً عبر سلسلة التبريد إلى السوبرماركت التجارية في جميع أنحاء قطر.',
  localTag1: 'Qatari-Grown Seasonal Supply',
  localTag1Ar: 'إمداد موسمي مزروع في قطر',
  localTag2: 'Direct Farm-to-Shelf Distribution',
  localTag2Ar: 'توزيع مباشر من المزرعة إلى الرف',
  localTag3: 'Supporting National Food Security',
  localTag3Ar: 'دعم الأمن الغذائي الوطني',
  globalEyebrow: 'GLOBAL SOURCING ALLIANCES',
  globalEyebrowAr: 'تحالفات التوريد العالمية',
  globalTitle: 'From Global Orchards to Qatar’s Tables',
  globalTitleAr: 'من البساتين العالمية إلى موائد قطر',
  globalSubtitle: 'Partnering directly with certified agricultural producers across key growing regions to secure year-round availability of premium fresh produce.',
  globalSubtitleAr: 'شراكات مباشرة مع منتجين زراعيين معتمدين في أبرز المناطق الزراعية لضمان توفر المنتجات الطازجة على مدار العام.',
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
          localEyebrow: data.localEyebrow || defaultPartnersPageContent.localEyebrow,
          localEyebrowAr: data.localEyebrowAr || defaultPartnersPageContent.localEyebrowAr,
          localTitle: data.localTitle || defaultPartnersPageContent.localTitle,
          localTitleAr: data.localTitleAr || defaultPartnersPageContent.localTitleAr,
          localNarrative: data.localNarrative || defaultPartnersPageContent.localNarrative,
          localNarrativeAr: data.localNarrativeAr || defaultPartnersPageContent.localNarrativeAr,
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
  facilityEyebrow: string;
  facilityEyebrowAr: string;
  facilityTitle: string;
  facilityTitleAr: string;
  facilityOperatingHours: string;
  facilityOperatingHoursAr: string;
}

export const defaultContactPageContent: ContactPageContent = {
  bannerTitle: en.contact.badge,
  bannerTitleAr: ar.contact.badge,
  bannerSubtitle: en.contact.heroSubtitle,
  bannerSubtitleAr: ar.contact.heroSubtitle,
  inquiryEyebrow: en.contact.badge,
  inquiryEyebrowAr: ar.contact.badge,
  inquiryTitle: en.contact.heroTitle,
  inquiryTitleAr: ar.contact.heroTitle,
  inquirySubtitle: en.contact.heroSubtitle,
  inquirySubtitleAr: ar.contact.heroSubtitle,
  facilityEyebrow: 'FACILITY LOCATION',
  facilityEyebrowAr: 'موقع المنشأة',
  facilityTitle: 'Our Central Cold Storage & Distribution Facility in Doha',
  facilityTitleAr: 'مستودعنا المركزي والتخزين المبرد في الدوحة',
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
          facilityEyebrow: data.facilityEyebrow || defaultContactPageContent.facilityEyebrow,
          facilityEyebrowAr: data.facilityEyebrowAr || defaultContactPageContent.facilityEyebrowAr,
          facilityTitle: data.facilityTitle || defaultContactPageContent.facilityTitle,
          facilityTitleAr: data.facilityTitleAr || defaultContactPageContent.facilityTitleAr,
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

