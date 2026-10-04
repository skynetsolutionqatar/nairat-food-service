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
} from './queries';
import {
  ProductItem,
  ProductCategoryData,
  productCategoriesData,
} from '@/data/products';
import { PartnerItem, partnerLogos } from '@/data/partners';
import { CompanyProfile, companyProfile } from '@/lib/config/company';

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

        // Sanity products appear first, followed by static items that were not overridden
        const sanitySlugs = new Set(sanityProducts.map((p) => p.id));
        return [
          ...sanityProducts,
          ...staticProducts.filter((p) => !sanitySlugs.has(p.id)),
        ];
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

        const sanitySlugs = new Set(sanityServices.map((s) => s.id));
        return [
          ...sanityServices,
          ...defaultServicesData.filter((s) => !sanitySlugs.has(s.id)),
        ];
      }
    } catch {
      // Fallback
    }
  }

  return defaultServicesData;
}
