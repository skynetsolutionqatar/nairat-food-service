/**
 * Nairat Food Services — Comprehensive Sanity Content Lake Seeding Script
 *
 * Automatically migrates existing local produce lines, partner organizations,
 * commercial services, quality certifications, and verified company facts
 * into Sanity CMS project (chjf5z1y / production), including automatic asset uploads.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity.ts [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { productCategoriesData } from '../data/products';
import { partnerLogos } from '../data/partners';
import { companyProfile } from '../lib/config/company';
import { en } from '../lib/i18n/dictionaries/en';
import { ar } from '../lib/i18n/dictionaries/ar';

// 1. Automatically load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && values.length > 0) {
      const val = values.join('=').trim();
      if (!process.env[key.trim()] || process.env[key.trim()] === '') {
        process.env[key.trim()] = val;
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'chjf5z1y';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

const isDryRun = process.argv.includes('--dry-run') || !token;

console.log('==================================================');
console.log('   Nairat Food Services: Sanity Full Migrator     ');
console.log('==================================================');
console.log(`Target Project: ${projectId}`);
console.log(`Dataset:        ${dataset}`);
console.log(`Mode:           ${isDryRun ? 'DRY RUN (no changes written)' : 'LIVE SEED & ASSET UPLOAD'}`);

if (!token && !isDryRun) {
  console.warn('\n⚠️ Warning: No SANITY_API_WRITE_TOKEN found in environment. Running in dry-run mode.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
  token,
});

// Cache uploaded assets to avoid duplicate uploads
const uploadedAssetsCache = new Map<string, string>();

async function uploadLocalImage(relativePath?: string): Promise<string | null> {
  if (!relativePath || isDryRun || !token) return null;

  // Clean path (strip leading slash)
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  const fullPath = path.resolve(process.cwd(), 'public', cleanPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`[Asset Warning] Local file not found: ${cleanPath}`);
    return null;
  }

  if (uploadedAssetsCache.has(fullPath)) {
    return uploadedAssetsCache.get(fullPath)!;
  }

  try {
    const filename = path.basename(fullPath);
    const contentType = fullPath.endsWith('.svg')
      ? 'image/svg+xml'
      : fullPath.endsWith('.webp')
      ? 'image/webp'
      : fullPath.endsWith('.png')
      ? 'image/png'
      : 'image/jpeg';

    process.stdout.write(`  ↗ Uploading asset: ${filename}... `);
    const fileStream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload('image', fileStream, {
      filename,
      contentType,
    });

    uploadedAssetsCache.set(fullPath, asset._id);
    console.log(`done (${asset._id})`);
    return asset._id;
  } catch (err: any) {
    console.log(`failed! (${err.message})`);
    return null;
  }
}

// 6 Commercial Services Data
const servicesSeedData = [
  {
    id: 'global-sourcing-import',
    title: 'Global Sourcing & Import',
    titleAr: 'التوريد العالمي والاستيراد',
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
  },
  {
    id: 'retail-supply-management',
    title: 'Retail Supply & Category Management',
    titleAr: 'توريد التجزئة وإدارة الفئات',
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
  },
  {
    id: 'wholesale-foodservice',
    title: 'Wholesale & Foodservice',
    titleAr: 'التوريد بالجملة والخدمات الغذائية',
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
  },
  {
    id: 'quick-commerce-grocery',
    title: 'Quick-Commerce & Online Grocery',
    titleAr: 'التجارة السريعة والبقالة الإلكترونية',
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
  },
  {
    id: 'cold-storage-logistics',
    title: 'Cold Storage & Logistics for Partners',
    titleAr: 'التخزين المبرد والخدمات اللوجستية للشركاء',
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
  },
  {
    id: 'local-farm-partnerships',
    title: 'Local Farm Partnerships',
    titleAr: 'شراكات المزارع المحلية',
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
  },
];

// Quality Certificates Data
const certificatesSeedData = [
  {
    id: 'haccp',
    title: 'HACCP',
    titleAr: 'نظام تحليل المخاطر (HACCP)',
    subtitle: 'Certificate of Compliance',
    subtitleAr: 'شهادة الامتثال',
    description: 'Hazard Analysis and Critical Control Points, Codex Alimentarius.',
    descriptionAr: 'تحليل المخاطر ونقاط التحكم الحرجة، هيئة الدستور الغذائي (Codex Alimentarius).',
    imageUrl: '/certificates/c1-1-1.png',
  },
  {
    id: 'iso22000',
    title: 'ISO 22000:2018',
    titleAr: 'أيزو 22000:2018',
    subtitle: 'Certificate of Registration',
    subtitleAr: 'شهادة التسجيل والاعتماد',
    description: 'Food safety management system certified for end-to-end traceability and hygiene.',
    descriptionAr: 'نظام إدارة سلامة الغذاء العالمي المعتمد لضمان النظافة والتتبع الكامل.',
    imageUrl: '/certificates/c2-2-1.png',
  },
];

async function seed() {
  const operations: any[] = [];

  console.log('\n--- 1. Processing Produce Lines (34 items) ---');
  let productOrder = 0;
  for (const [categoryKey, categoryData] of Object.entries(productCategoriesData)) {
    for (const item of categoryData.products) {
      const assetId = await uploadLocalImage(item.imageUrl);
      operations.push({
        _id: `product-${categoryKey}-${item.id}`,
        _type: 'product',
        name: item.name,
        nameAr: item.nameAr || item.name,
        slug: { _type: 'slug', current: `${categoryKey}-${item.id}` },
        category: categoryKey,
        variety: item.variety,
        origin: item.origin,
        temp: item.temp,
        description: item.description,
        descriptionAr: item.nameAr ? `منتج طازج عالي الجودة: ${item.nameAr}` : item.description,
        image: assetId
          ? {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId },
            }
          : undefined,
        featured: productOrder < 8,
        order: productOrder++,
      });
    }
  }

  console.log('\n--- 2. Processing Partner Organizations (10 items) ---');
  let partnerOrder = 0;
  for (const p of partnerLogos) {
    const assetId = await uploadLocalImage(p.image);
    operations.push({
      _id: `partner-${p.id}`,
      _type: 'partner',
      name: p.name,
      nameAr: p.nameAr,
      category: p.category,
      description: p.description,
      descriptionAr: p.nameAr,
      logo: assetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          }
        : undefined,
      featured: p.featured ?? true,
      order: partnerOrder++,
    });
  }

  console.log('\n--- 3. Processing Commercial Services (6 items) ---');
  let serviceOrder = 0;
  for (const s of servicesSeedData) {
    const assetId = await uploadLocalImage(s.imageUrl);
    operations.push({
      _id: `service-${s.id}`,
      _type: 'service',
      title: s.title,
      titleAr: s.titleAr,
      slug: { _type: 'slug', current: s.id },
      tagline: s.tagline,
      taglineAr: s.taglineAr,
      description: s.description,
      descriptionAr: s.descriptionAr,
      features: s.features,
      image: assetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          }
        : undefined,
      order: serviceOrder++,
    });
  }

  console.log('\n--- 4. Processing Quality Certificates (2 items) ---');
  let certOrder = 0;
  for (const c of certificatesSeedData) {
    const assetId = await uploadLocalImage(c.imageUrl);
    operations.push({
      _id: `qualityCert-${c.id}`,
      _type: 'qualityCert',
      title: c.title,
      titleAr: c.titleAr,
      subtitle: c.subtitle,
      subtitleAr: c.subtitleAr,
      description: c.description,
      descriptionAr: c.descriptionAr,
      image: assetId
        ? {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          }
        : undefined,
      order: certOrder++,
    });
  }

  console.log('\n--- 5. Processing Company Profile Singleton ---');
  operations.push({
    _id: 'companyProfile-singleton',
    _type: 'companyProfile',
    name: companyProfile.name,
    legalName: companyProfile.legalName,
    establishedYear: companyProfile.establishedYear,
    productLinesCount: companyProfile.productLinesCount,
    dailyVolumeTonnes: companyProfile.dailyVolumeTonnes,
    retailBranchesSupplied: companyProfile.retailBranchesSupplied,
    warehouseArea: companyProfile.warehouseArea,
    warehouseLocation: companyProfile.warehouseLocation,
    fleetVehiclesCount: companyProfile.fleetVehiclesCount,
    teamSize: companyProfile.teamSize,
    originCountriesCore: companyProfile.originCountriesCore,
    originCountriesGlobal: companyProfile.originCountriesGlobal,
    certifications: companyProfile.certifications,
    certifiedScope: companyProfile.certifiedScope,
    phone: companyProfile.contact.phone,
    email: companyProfile.contact.email,
    address: companyProfile.contact.address,
    poBox: companyProfile.contact.poBox,
  });

  console.log('\n--- 6. Processing 6 Page Singletons ---');
  // 6.1 Home Page
  operations.push({
    _id: 'homePage-singleton',
    _type: 'homePage',
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
    whoWeAreNarrativeAr: 'نيرات فود هي واحدة من الشركات الرائدة في توريد المنتجات الطازجة في قطر، حيث تستورد الفواكه والخضروات الطازجة المتميزة من مناطق زراعية موثوقة حول العالم وتوصلها إلى تجار التجزئة وتجار الجملة وشركات الخدمات الغذائية والمنازل في جميع أنحاء قطر.',
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
  });

  // 6.2 Company Page
  const teamAssetId = await uploadLocalImage('/team/team.jpg');
  const warehouseAssetId = await uploadLocalImage('/whychooseus/warehouse.avif');
  const chillerAssetId = await uploadLocalImage('/whychooseus/chiller-warehouse.avif');
  const qualityAssetId = await uploadLocalImage('/whychooseus/temperature-controlled.avif');
  const truckAssetId = await uploadLocalImage('/whychooseus/truck.avif');

  operations.push({
    _id: 'companyPage-singleton',
    _type: 'companyPage',
    // 1. Banner
    bannerTitle: 'Company',
    bannerTitleAr: 'الشركة',
    bannerSubtitle: 'Connecting global agricultural basins with Qatar’s food retail and hospitality sectors through state-of-the-art cold-chain logistics.',
    bannerSubtitleAr: 'نربط أبرز المزارع العالمية بقطاعات التجزئة والضيافة في قطر من خلال بنية تحتية لوجستية متطورة لسلسلة التبريد.',

    // 2. Delivering Freshness
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
    ...(warehouseAssetId ? { deliveringImage: { _type: 'image', asset: { _type: 'reference', _ref: warehouseAssetId } } } : {}),
    deliveringBadgeEst: 'Est. 2020',
    deliveringBadgeEstAr: 'تأسست 2020',
    deliveringBadgeLocation: 'Street 37, Industrial Area',
    deliveringBadgeLocationAr: 'شارع 37، المنطقة الصناعية',

    // 3. Vision & Mission
    visionMissionTitle: 'Our Journey: Growing a Fresher Future for Qatar.',
    visionMissionTitleAr: 'مسيرتنا: تنمية مستقبل أكثر نضارة لقطر.',
    visionMissionNarrative: 'Since our establishment in 2020, Nairat Food has expanded its capabilities to meet the growing demand for fresh produce across Qatar.\n\nFrom global sourcing to dependable cold-chain distribution, we combine deep local market knowledge with international grower partnerships to deliver consistent, fresh produce to retail and commercial clients year-round.',
    visionMissionNarrativeAr: 'منذ تأسيسنا في عام 2020، وسّعت نيرات للأغذية قدراتها لتلبية الطلب المتزايد على المنتجات الطازجة في جميع أنحاء قطر.\n\nمن التوريد العالمي إلى التوزيع الموثوق عبر سلسلة التبريد، نجمع بين المعرفة العميقة بالسوق المحلي وشراكات المزارعين الدولية لتقديم منتجات طازجة ومتسقة لعملاء التجزئة والتجاريين على مدار العام.',
    visionTitle: 'Growing a fresher future for Qatar.',
    visionTitleAr: 'تنمية مستقبل أكثر نضارة لقطر.',
    visionBody: "To be Qatar's premier provider of fresh fruits and vegetables, offering exceptional quality, dependable service and year-round availability while creating lasting value for our customers, suppliers and communities.",
    visionBodyAr: 'أن نكون المزود الرائد للفواكه والخضروات الطازجة في قطر، ونقدم جودة استثنائية، وخدمة موثوقة، وتوافراً على مدار العام مع خلق قيمة دائمة لعملائنا، وموردينا، ومجتمعاتنا.',
    missionTitle: 'Quality, Safety & Stakeholder Value',
    missionTitleAr: 'الجودة، والسلامة وقيمة أصحاب المصلحة',
    missionBody: 'We are committed to supplying high-quality and affordable fresh produce while maintaining a strong food-safety culture across every aspect of our operations. We continuously invest in our people, processes and infrastructure to build long-term relationships.',
    missionBodyAr: 'نحن ملتزمون بتوريد منتجات طازجة عالية الجودة وبأسعار معقولة مع الحفاظ على ثقافة قوية لسلامة الغذاء عبر كل جانب من جوانب عملياتنا. نحن نستثمر باستمرار في موظفينا، وعملياتنا، وبنيتنا التحتية لبناء علاقات طويلة الأمد.',

    // 4. Infrastructure & Operational Scale
    infraTitle: 'Built Around Freshness: Infrastructure Designed for Scale',
    infraTitleAr: 'صُممت حول النضارة: بنية تحتية مصممة للنمو والتوسع',
    infraNarrative: "Our purpose-built cold-chain facility in Doha's Industrial Area forms the heart of our distribution operation. With dedicated chiller rooms, efficient loading infrastructure and refrigerated transportation, our facility is designed to move fresh produce quickly and safely from arrival to delivery.",
    infraNarrativeAr: 'تشكل منشأة سلسلة التبريد المصممة خصيصاً لدينا في المنطقة الصناعية بالدوحة قلب عمليات التوزيع لدينا. مع غرف التبريد المخصصة، وبنية تحتية فعالة للتحميل، والنقل المبرد، تم تصميم منشأتنا لنقل المنتجات الطازجة بسرعة وأمان من الوصول إلى التسليم.',
    ...(chillerAssetId ? { infraImage: { _type: 'image', asset: { _type: 'reference', _ref: chillerAssetId } } } : {}),
    infraHubBadgeTitle: 'Industrial Area Hub · Doha',
    infraHubBadgeTitleAr: 'مركز المنطقة الصناعية · الدوحة',
    infraHubBadgeDesc: 'Unbroken cold-chain infrastructure operating 24/7 across Qatar.',
    infraHubBadgeDescAr: 'بنية تحتية لسلسلة تبريد غير منقطعة تعمل على مدار الساعة طوال أيام الأسبوع في جميع أنحاء قطر.',

    // 5. Strategic Global Sourcing
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

    // 6. Dedicated Team
    teamEyebrow: 'Our Team',
    teamEyebrowAr: 'فريقنا',
    teamHeadline: 'The People Driving Our Growth',
    teamHeadlineAr: 'الأشخاص الذين يقودون نمونا',
    teamNarrative: 'At Nairat Food, we understand the goals and aspirations of each team member, as well as the needs of our growing business. With 200 employees, we are committed to helping our team reach their full potential. Our people are one of our most valuable assets, and we prioritize their well-being, development and a safe working environment to ensure the continued success of our company.',
    teamNarrativeAr: 'في نيرات للأغذية، نفهم أهداف وتطلعات كل عضو في الفريق، بالإضافة إلى احتياجات أعمالنا المتنامية. مع 200 موظف، نحن ملتزمون بمساعدة فريقنا على الوصول إلى أقصى إمكاناتهم. إن موظفينا هم أحد أثمن أصولنا، ونحن نعطي الأولوية لرفاهيتهم وتطويرهم وبيئة عمل آمنة لضمان النجاح المستمر لشركتنا.',
    ...(teamAssetId ? { teamImage: { _type: 'image', asset: { _type: 'reference', _ref: teamAssetId } } } : {}),

    // 7. Quality & Food Safety
    qualityEyebrow: 'Quality & Food Safety',
    qualityEyebrowAr: 'الجودة وسلامة الغذاء',
    qualityTitle: 'Quality You Can Trust: Rigorous Protocols from Source to Arrival',
    qualityTitleAr: 'جودة يمكنك الوثوق بها: بروتوكولات صارمة من المصدر إلى الوصول',
    qualityNarrative: 'At Nairat, food safety and quality are integrated into our daily operations. Incoming consignments are inspected and laboratory testing is carried out in line with Qatar food-safety requirements.\n\nOur produce is then handled through controlled cold-chain processes designed to maintain freshness and quality until delivery.',
    qualityNarrativeAr: 'في نيرات، تم دمج سلامة الغذاء والجودة في عملياتنا اليومية. يتم فحص الشحنات الواردة وإجراء الاختبارات المخبرية بما يتماشى مع متطلبات سلامة الغذاء في قطر.\n\nيتم بعد ذلك التعامل مع منتجاتنا من خلال عمليات سلسلة التبريد الخاضعة للرقابة والمصممة للحفاظ على النضارة والجودة حتى التسليم.',
    ...(qualityAssetId ? { qualityImage: { _type: 'image', asset: { _type: 'reference', _ref: qualityAssetId } } } : {}),
    qualityBadgeText: 'HACCP & ISO Certified',
    qualityBadgeTextAr: 'معتمد بشهادة HACCP و ISO',
    qualityBadgeSubtext: 'Qatar Verified',
    qualityBadgeSubtextAr: 'معتمد في قطر',

    // 8. Looking Ahead
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
    ...(truckAssetId ? { lookingAheadImage: { _type: 'image', asset: { _type: 'reference', _ref: truckAssetId } } } : {}),
    lookingAheadBadgeText: 'Refrigerated Delivery Network',
    lookingAheadBadgeTextAr: 'شبكة التوصيل المبرد',
    lookingAheadBadgeSubtext: 'Active 24/7',
    lookingAheadBadgeSubtextAr: 'نشط 24/7',
  });

  // 6.3 Quality Page
  operations.push({
    _id: 'qualityPage-singleton',
    _type: 'qualityPage',
    bannerTitle: 'Sourcing & Quality',
    bannerTitleAr: 'التوريد والجودة',
    bannerSubtitle: '',
    bannerSubtitleAr: '',
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
    supplyChainEyebrow: 'CONTROLS AT EVERY STEP',
    supplyChainEyebrowAr: 'ضوابط في كل مرحلة',
    supplyChainTitle: 'Controls at Every Step',
    supplyChainTitleAr: 'ضوابط رقابية صارمة في كل خطوة',
    supplyChainSubtitle: 'From arrival to the customer’s door, strict verification protocols protect product integrity and maintain an unbroken cold chain.',
    supplyChainSubtitleAr: 'من استلام الشحنات إلى باب العميل، تحمي بروتوكولات التحقق الصارمة سلامة المنتجات وتحافظ على سلسلة تبريد غير منقطعة مع التتبع الكامل.',
  });

  // 6.4 Services Page
  operations.push({
    _id: 'servicesPage-singleton',
    _type: 'servicesPage',
    bannerTitle: 'Our Services',
    bannerTitleAr: 'خدماتنا',
    bannerSubtitle: 'Comprehensive fresh-produce distribution, grower consignment partnerships, and retail store services across Qatar.',
    bannerSubtitleAr: 'توزيع شامل للمنتجات الطازجة، شراكات بيع الأمانة للمزارعين، وخدمات التجزئة في جميع أنحاء قطر.',
  });

  // 6.5 Partners Page
  operations.push({
    _id: 'partnersPage-singleton',
    _type: 'partnersPage',
    bannerTitle: 'Partners',
    bannerTitleAr: 'الشركاء',
    bannerSubtitle: '',
    bannerSubtitleAr: '',
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
    globalEyebrow: 'GLOBAL SOURCING PARTNERSHIPS',
    globalEyebrowAr: 'شراكات التوريد العالمية',
    globalTitle: 'Long-Standing Partnerships with Growers & Export Houses',
    globalTitleAr: 'شراكات طويلة الأمد مع المزارعين وبيوت التصدير',
    globalSubtitle: '',
    globalSubtitleAr: '',
  });

  // 6.6 Contact Page
  operations.push({
    _id: 'contactPage-singleton',
    _type: 'contactPage',
    bannerTitle: 'Contact Us',
    bannerTitleAr: 'اتصل بنا',
    bannerSubtitle: '',
    bannerSubtitleAr: '',
    inquiryEyebrow: 'CONTACT US',
    inquiryEyebrowAr: 'تواصل معنا',
    inquiryTitle: 'Get in Touch with Us',
    inquiryTitleAr: 'تواصل معنا',
    inquirySubtitle: '',
    inquirySubtitleAr: '',
    facilityEyebrow: 'FACILITY LOCATION',
    facilityEyebrowAr: 'موقع المنشأة',
    facilityTitle: 'Our Doha Central Warehouse & Cold Storage',
    facilityTitleAr: 'مستودعنا المركزي والتخزين المبرد في الدوحة',
    facilityOperatingHours: en.common.workingHoursVal,
    facilityOperatingHoursAr: ar.common.workingHoursVal,
  });

  console.log('\n==================================================');
  console.log(`Prepared total of ${operations.length} documents:`);
  console.log(`- ${productOrder} Produce Items`);
  console.log(`- ${partnerOrder} Partner Organizations`);
  console.log(`- ${serviceOrder} Commercial Services`);
  console.log(`- ${certOrder} Quality Certificates`);
  console.log(`- 1 Company Profile Document`);
  console.log(`- 6 Page Singleton Documents (Home, Company, Quality, Services, Partners, Contact)`);
  console.log('==================================================');

  if (isDryRun) {
    console.log('\n[Dry Run] All mutations valid. To execute, ensure SANITY_API_WRITE_TOKEN is in .env.local and run:');
    console.log('  pnpm seed:sanity\n');
    return;
  }

  console.log('\nCommitting documents to Sanity in batches of 10...');
  const BATCH_SIZE = 10;
  for (let i = 0; i < operations.length; i += BATCH_SIZE) {
    const batch = operations.slice(i, i + BATCH_SIZE);
    const transaction = client.transaction();
    for (const doc of batch) {
      transaction.createOrReplace(doc);
    }
    await transaction.commit();
    console.log(`  ✓ Committed items ${i + 1} - ${Math.min(i + BATCH_SIZE, operations.length)} of ${operations.length}`);
  }

  console.log('\n🎉 Successfully migrated all 53 documents and assets into Sanity Content Lake!\n');
}

seed().catch((err) => {
  console.error('\n❌ Seeding failed:', err);
  process.exit(1);
});
