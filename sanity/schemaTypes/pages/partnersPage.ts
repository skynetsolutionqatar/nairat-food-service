import { defineArrayMember, defineField, defineType } from 'sanity';

export const partnersPage = defineType({
  name: 'partnersPage',
  title: 'Partners Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'retail', title: '2. Retail & Online Grocery Partners', options: { collapsible: true, collapsed: false } },
    { name: 'local', title: '3. Strategic Local Agriculture (Mahaseel)', options: { collapsible: true, collapsed: false } },
    { name: 'global', title: '4. Global Sourcing Partnerships', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Partners',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'الشركاء',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'Connecting global orchards and local Qatari farms to premier hypermarkets and digital grocery platforms with dependable cold-chain distribution.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'ربط البساتين العالمية والمزارع القطرية المحلية بالهايبرماركت الرائدة ومنصات البقالة الرقمية بتوزيع موثوق عبر سلسلة التبريد.',
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
    defineField({
      name: 'retailPartners',
      title: 'Retail & Online Grocery Partner Logos',
      type: 'array',
      fieldset: 'retail',
      description: 'Editable list of retail & hypermarket partners displayed in the 4-column logo grid',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner Name (English)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'nameAr',
              title: 'Partner Name (Arabic)',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Partner Logo Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Hypermarket', value: 'hypermarket' },
                  { title: 'Supermarket', value: 'supermarket' },
                  { title: 'Quick Commerce', value: 'quick-commerce' },
                  { title: 'Wholesale', value: 'wholesale' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'nameAr',
              media: 'logo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `${title || 'Untitled'} ${subtitle ? `(${subtitle})` : ''}`,
                media,
              };
            },
          },
        }),
      ],
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
      initialValue:
        'Strategic local partnerships with Mahaseel, connecting Qatari farms to the market with Qatari-grown seasonal supply. We aggregate fresh produce directly from local greenhouses and farms, providing cold-chain distribution into commercial supermarkets across Qatar.',
    }),
    defineField({
      name: 'localNarrativeAr',
      title: 'Local Narrative (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'local',
      initialValue:
        'شراكات محلية استراتيجية مع محاصيل، لربط المزارع القطرية بالسوق مع إمداد موسمي مزروع في قطر. نحن نجمع المنتجات الطازجة مباشرة من البيوت المحمية والمزارع المحلية، ونوفر توزيعاً عبر سلسلة التبريد إلى السوبرماركت التجارية في جميع أنحاء قطر.',
    }),
    defineField({
      name: 'localPartnerImage',
      title: 'Local Partner Logo / Showcase Image',
      type: 'image',
      fieldset: 'local',
      options: { hotspot: true },
      description: 'Logo showcase for Mahaseel or strategic local partner',
    }),
    defineField({
      name: 'localBadge',
      title: 'Local Partner Badge (EN)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'Strategic Local Partner',
    }),
    defineField({
      name: 'localBadgeAr',
      title: 'Local Partner Badge (AR)',
      type: 'string',
      fieldset: 'local',
      initialValue: 'شريك محلي استراتيجي',
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
      initialValue: 'GLOBAL SOURCING PARTNERSHIPS',
    }),
    defineField({
      name: 'globalEyebrowAr',
      title: 'Global Eyebrow (AR)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'شراكات التوريد العالمية',
    }),
    defineField({
      name: 'globalTitle',
      title: 'Global Headline (EN)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'Long-Standing Partnerships with Growers & Export Houses',
    }),
    defineField({
      name: 'globalTitleAr',
      title: 'Global Headline (AR)',
      type: 'string',
      fieldset: 'global',
      initialValue: 'شراكات طويلة الأمد مع المزارعين وبيوت التصدير',
    }),
    defineField({
      name: 'globalSubtitle',
      title: 'Global Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'global',
      initialValue:
        'Partnering directly with certified agricultural producers across key growing regions to secure year-round availability of premium fresh produce.',
    }),
    defineField({
      name: 'globalSubtitleAr',
      title: 'Global Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'global',
      initialValue:
        'شراكات مباشرة مع منتجين زراعيين معتمدين في أبرز المناطق الزراعية لضمان توفر المنتجات الطازجة على مدار العام.',
    }),
    defineField({
      name: 'globalCountries',
      title: 'Global Sourcing Countries & Flag Logos',
      type: 'array',
      fieldset: 'global',
      description: 'Editable list of sourcing countries, flag images, and crop varieties',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Country Name (English)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'nameAr',
              title: 'Country Name (Arabic)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'flag',
              title: 'Flag / Origin Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'crops',
              title: 'Key Crops (English)',
              type: 'string',
            }),
            defineField({
              name: 'cropsAr',
              title: 'Key Crops (Arabic)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'crops',
              media: 'flag',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Country',
                subtitle: subtitle,
                media,
              };
            },
          },
        }),
      ],
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
