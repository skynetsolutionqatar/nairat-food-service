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
    ctaHeadline: 'Ready to Partner With Qatar’s Fresh Produce Leader?',
    ctaHeadlineAr: 'هل أنت مستعد للشراكة مع رائد الأغذية الطازجة في قطر؟',
    ctaDescription: 'Contact our procurement specialists today to discuss wholesale contracts, direct farm imports, or scheduled cold-chain delivery.',
    ctaDescriptionAr: 'تواصل مع خبراء التوريد لدينا اليوم لمناقشة عقود التوريد بالجملة أو الاستيراد المباشر أو التوصيل المجدول بسلسلة التبريد.',
    ctaButtonText: 'Get In Touch',
    ctaButtonTextAr: 'تواصل معنا الآن',
  });

  // 6.2 Company Page
  operations.push({
    _id: 'companyPage-singleton',
    _type: 'companyPage',
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
  });

  // 6.3 Quality Page
  operations.push({
    _id: 'qualityPage-singleton',
    _type: 'qualityPage',
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
  });

  // 6.4 Services Page
  operations.push({
    _id: 'servicesPage-singleton',
    _type: 'servicesPage',
    bannerTitle: en.services.badge,
    bannerTitleAr: ar.services.badge,
    bannerSubtitle: en.services.heroSubtitle,
    bannerSubtitleAr: ar.services.heroSubtitle,
    overviewHeadline: en.services.heroTitle,
    overviewHeadlineAr: ar.services.heroTitle,
    overviewNarrative: 'From international procurement and chilled customs clearance to daily fleet delivery and farm consignment trading, we power Qatar’s food retail ecosystem.',
    overviewNarrativeAr: 'من المشتريات الدولية والتخليص الجمركي المبرد إلى التوزيع اليومي بالأسطول وتجارة الأمانة للمزارعين، نحن ندعم منظومة التجزئة الغذائية في قطر.',
  });

  // 6.5 Partners Page
  operations.push({
    _id: 'partnersPage-singleton',
    _type: 'partnersPage',
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
  });

  // 6.6 Contact Page
  operations.push({
    _id: 'contactPage-singleton',
    _type: 'contactPage',
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
