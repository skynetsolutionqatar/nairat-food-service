import { defineField, defineType } from 'sanity';

export const partnersPage = defineType({
  name: 'partnersPage',
  title: 'Partners Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'retail', title: '2. Retail Partners Section', options: { collapsible: true, collapsed: true } },
    { name: 'local', title: '3. Local Agriculture & Mahaseel Section', options: { collapsible: true, collapsed: true } },
    { name: 'global', title: '4. Global Origins & Sourcing Section', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Our Valued Partners',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'شركاؤنا المميزون',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'Connecting global agricultural basins and local Qatari farms to premier hypermarkets and digital grocery platforms with dependable cold-chain distribution.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'نربط كبرى المزارع العالمية والمحلية بأرقى سلاسل الهايبرماركت ومنصات التسوق الإلكتروني في قطر عبر شبكة توزيع مبردة وموثوقة.',
    }),

    // --- 2. RETAIL PARTNERS ---
    defineField({
      name: 'retailEyebrow',
      title: 'Retail Eyebrow (EN)',
      type: 'string',
      fieldset: 'retail',
      initialValue: 'OUR RETAIL PARTNERS',
    }),
    defineField({
      name: 'retailEyebrowAr',
      title: 'Retail Eyebrow (AR)',
      type: 'string',
      fieldset: 'retail',
      initialValue: 'شركاؤنا في التجزئة',
    }),
    defineField({
      name: 'retailTitle',
      title: 'Retail Headline (EN)',
      type: 'string',
      fieldset: 'retail',
      initialValue: "Trusted Daily Supplier to Qatar's Leading Retail Groups",
    }),
    defineField({
      name: 'retailTitleAr',
      title: 'Retail Headline (AR)',
      type: 'string',
      fieldset: 'retail',
      initialValue: 'المورد اليومي الموثوق به لمجموعات التجزئة الرائدة في قطر',
    }),

    // --- 3. LOCAL AGRICULTURE ---
    defineField({
      name: 'localEyebrow',
      title: 'Local Eyebrow (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'LOCAL AGRICULTURAL ALLIANCE',
    }),
    defineField({
      name: 'localEyebrowAr',
      title: 'Local Eyebrow (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'تحالف زراعي محلي',
    }),
    defineField({
      name: 'localTitle',
      title: 'Local Headline (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'Connecting Qatari Farms to the Market',
    }),
    defineField({
      name: 'localTitleAr',
      title: 'Local Headline (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'ربط المزارع القطرية بالسوق',
    }),
    defineField({
      name: 'localNarrative',
      title: 'Local Narrative (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'local',
      initialValue: 'Strategic local partnerships with Mahaseel, connecting Qatari farms to the market with Qatari-grown seasonal supply. We aggregate fresh produce directly from local greenhouses and farms, providing cold-chain distribution into commercial supermarkets across Qatar.',
    }),
    defineField({
      name: 'localNarrativeAr',
      title: 'Local Narrative (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'local',
      initialValue: 'شراكات محلية استراتيجية مع محاصيل، لربط المزارع القطرية بالسوق مع إمداد موسمي مزروع في قطر. نحن نجمع المنتجات الطازجة مباشرة من البيوت المحمية والمزارع المحلية، ونوفر توزيعاً عبر سلسلة التبريد إلى السوبرماركت التجارية في جميع أنحاء قطر.',
    }),
    defineField({
      name: 'localTag1',
      title: 'Local Feature 1 (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'Qatari-Grown Seasonal Supply',
    }),
    defineField({
      name: 'localTag1Ar',
      title: 'Local Feature 1 (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'إمداد موسمي مزروع في قطر',
    }),
    defineField({
      name: 'localTag2',
      title: 'Local Feature 2 (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'Direct Farm-to-Shelf Distribution',
    }),
    defineField({
      name: 'localTag2Ar',
      title: 'Local Feature 2 (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'توزيع مباشر من المزرعة إلى الرف',
    }),
    defineField({
      name: 'localTag3',
      title: 'Local Feature 3 (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'Supporting National Food Security',
    }),
    defineField({
      name: 'localTag3Ar',
      title: 'Local Feature 3 (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'دعم الأمن الغذائي الوطني',
    }),

    // --- 4. GLOBAL ALLIANCES ---
    defineField({
      name: 'globalEyebrow',
      title: 'Global Eyebrow (EN)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'GLOBAL SOURCING ALLIANCES',
    }),
    defineField({
      name: 'globalEyebrowAr',
      title: 'Global Eyebrow (AR)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'تحالفات التوريد العالمية',
    }),
    defineField({
      name: 'globalTitle',
      title: 'Global Headline (EN)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'From Global Orchards to Qatar’s Tables',
    }),
    defineField({
      name: 'globalTitleAr',
      title: 'Global Headline (AR)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'من البساتين العالمية إلى موائد قطر',
    }),
    defineField({
      name: 'globalSubtitle',
      title: 'Global Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'global',
      initialValue: 'Partnering directly with certified agricultural producers across key growing regions to secure year-round availability of premium fresh produce.',
    }),
    defineField({
      name: 'globalSubtitleAr',
      title: 'Global Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'global',
      initialValue: 'شراكات مباشرة مع منتجين زراعيين معتمدين في أبرز المناطق الزراعية لضمان توفر المنتجات الطازجة على مدار العام.',
    }),
  ],
  preview: {
    select: {
      title: 'bannerTitle',
      subtitle: 'bannerSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Partners Page',
        subtitle: subtitle || 'Partners page section-by-section content',
      };
    },
  },
});
