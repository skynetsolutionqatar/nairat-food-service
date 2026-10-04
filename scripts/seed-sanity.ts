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

  console.log('\n==================================================');
  console.log(`Prepared total of ${operations.length} documents:`);
  console.log(`- ${productOrder} Produce Items`);
  console.log(`- ${partnerOrder} Partner Organizations`);
  console.log(`- ${serviceOrder} Commercial Services`);
  console.log(`- ${certOrder} Quality Certificates`);
  console.log(`- 1 Company Profile Document`);
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
