import { defineField, defineType, defineArrayMember } from 'sanity';

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Our Products Page & Category Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    {
      name: 'categories',
      title: '2. Category Sections (Nested Schema)',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'veg',
      title: '3. Fresh Vegetables Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'fruit',
      title: '4. Fresh Fruits Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'leafy',
      title: '5. Leafy & Herbs Section',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'specialty',
      title: '6. Specialty & Gourmet Section',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Our Products',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'منتجاتنا',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue:
        'Explore our high-yield produce lines sourced globally and delivered daily across Qatar.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue:
        'استكشف خطوط منتجاتنا عالية الجودة الموردة عالمياً والموزعة يومياً في قطر.',
    }),

    // --- 2. NESTED CATEGORY SECTIONS ARRAY ---
    defineField({
      name: 'categorySections',
      title: 'Nested Category Sections',
      description:
        'Manage and order category descriptions, subtitles, badges, and cover images for each product line.',
      type: 'array',
      fieldset: 'categories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'categoryItem',
          title: 'Category Section',
          fields: [
            defineField({
              name: 'slug',
              title: 'Category Slug',
              type: 'string',
              options: {
                list: [
                  { title: 'Fresh Vegetables', value: 'vegetables' },
                  { title: 'Fresh Fruits', value: 'fruits' },
                  { title: 'Leafy & Herbs', value: 'leafy-herbs' },
                  { title: 'Specialty & Gourmet', value: 'specialty-gourmet' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Category Title (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'titleAr',
              title: 'Category Title (AR)',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Category Subtitle (EN)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'subtitleAr',
              title: 'Category Subtitle (AR)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'description',
              title: 'Category Description (EN)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'descriptionAr',
              title: 'Category Description (AR)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'badge',
              title: 'Category Eyebrow / Badge (EN)',
              type: 'string',
              initialValue: 'OUR PRODUCE',
            }),
            defineField({
              name: 'badgeAr',
              title: 'Category Eyebrow / Badge (AR)',
              type: 'string',
              initialValue: 'منتجاتنا',
            }),
            defineField({
              name: 'heroImage',
              title: 'Category Banner Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'slug',
              media: 'heroImage',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Untitled Category',
                subtitle: subtitle ? `Slug: /products/${subtitle}` : '',
                media,
              };
            },
          },
        }),
      ],
    }),

    // --- 3. CATEGORY: FRESH VEGETABLES ---
    defineField({
      name: 'vegTitle',
      title: 'Vegetables Title (EN)',
      type: 'string',
      fieldset: 'veg',
      initialValue: 'Fresh Vegetables',
    }),
    defineField({
      name: 'vegTitleAr',
      title: 'Vegetables Title (AR)',
      type: 'string',
      fieldset: 'veg',
      initialValue: 'خضروات طازجة',
    }),
    defineField({
      name: 'vegSubtitle',
      title: 'Vegetables Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'veg',
      initialValue:
        'High-yield, daily farm arrivals for retail and culinary supply across Qatar.',
    }),
    defineField({
      name: 'vegSubtitleAr',
      title: 'Vegetables Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'veg',
      initialValue:
        'وصول يومي من المزارع بإنتاجية عالية لتوريد التجزئة والطهي في جميع أنحاء قطر.',
    }),
    defineField({
      name: 'vegDescription',
      title: 'Vegetables Description (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'veg',
      initialValue:
        'Sourced from certified growers across the Levant, Turkey, Europe, and India, our fresh vegetable lines undergo rigorous origin inspection and temperature-controlled logistics to guarantee peak freshness.',
    }),
    defineField({
      name: 'vegDescriptionAr',
      title: 'Vegetables Description (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'veg',
      initialValue:
        'يتم توريد خطوط الخضروات الطازجة لدينا من مزارعين معتمدين في بلاد الشام وتركيا وأوروبا والهند، وتخضع لفحص دقيق في بلد المنشأ ولوجستيات منضبطة الحرارة لضمان أقصى درجات النضارة.',
    }),

    // --- 4. CATEGORY: FRESH FRUITS ---
    defineField({
      name: 'fruitsTitle',
      title: 'Fruits Title (EN)',
      type: 'string',
      fieldset: 'fruit',
      initialValue: 'Fresh Fruits',
    }),
    defineField({
      name: 'fruitsTitleAr',
      title: 'Fruits Title (AR)',
      type: 'string',
      fieldset: 'fruit',
      initialValue: 'فواكه طازجة',
    }),
    defineField({
      name: 'fruitsSubtitle',
      title: 'Fruits Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'fruit',
      initialValue:
        'Sun-ripened orchard and citrus lines sourced directly from verified international growers.',
    }),
    defineField({
      name: 'fruitsSubtitleAr',
      title: 'Fruits Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'fruit',
      initialValue:
        'محاصيل بساتين وحمضيات ناضجة تحت الشمس يتم توريدها مباشرة من مزارعين دوليين معتمدين.',
    }),
    defineField({
      name: 'fruitsDescription',
      title: 'Fruits Description (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'fruit',
      initialValue:
        'From Mediterranean citrus and seasonal stone fruits to year-round tropical melons and table grapes, Nairat delivers fruit with consistent brix levels, calibrated sizing, and intact cold-chain assurance.',
    }),
    defineField({
      name: 'fruitsDescriptionAr',
      title: 'Fruits Description (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'fruit',
      initialValue:
        'من الحمضيات المتوسطية وفواكه النواة الحجرية الموسمية إلى البطيخ الاستوائي وعنب المائدة على مدار العام، تقدم نيرات فواكه بمستويات حلاوة متسقة وأحجام مدروسة مع ضمان سلامة سلسلة التبريد.',
    }),

    // --- 5. CATEGORY: LEAFY & HERBS ---
    defineField({
      name: 'leafyTitle',
      title: 'Leafy & Herbs Title (EN)',
      type: 'string',
      fieldset: 'leafy',
      initialValue: 'Leafy & Herbs',
    }),
    defineField({
      name: 'leafyTitleAr',
      title: 'Leafy & Herbs Title (AR)',
      type: 'string',
      fieldset: 'leafy',
      initialValue: 'ورقيات وأعشاب',
    }),
    defineField({
      name: 'leafySubtitle',
      title: 'Leafy & Herbs Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'leafy',
      initialValue:
        'Crisp greenhouse lettuces, field greens, and aromatic culinary herbs delivered daily.',
    }),
    defineField({
      name: 'leafySubtitleAr',
      title: 'Leafy & Herbs Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'leafy',
      initialValue:
        'خس بيوت محمية مقرمش، وخضروات حقلية، وأعشاب طهي عطرية تُسلَّم يومياً.',
    }),
    defineField({
      name: 'leafyDescription',
      title: 'Leafy & Herbs Description (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'leafy',
      initialValue:
        "Harvested at dawn and pre-cooled within hours, our leafy and fresh herb programs supply Qatar's leading hotel dining rooms and retail chains with vibrant, unblemished produce.",
    }),
    defineField({
      name: 'leafyDescriptionAr',
      title: 'Leafy & Herbs Description (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'leafy',
      initialValue:
        'تُحصد عند الفجر ويتم تبريدها مسبقاً خلال ساعات، حيث تغذي برامجنا للورقيات والأعشاب الطازجة مطاعم الفنادق الرائدة وسلاسل التجزئة في قطر بمنتجات نضرة وخالية من العيوب.',
    }),

    // --- 6. CATEGORY: SPECIALTY & GOURMET ---
    defineField({
      name: 'specialtyTitle',
      title: 'Specialty Title (EN)',
      type: 'string',
      fieldset: 'specialty',
      initialValue: 'Specialty & Gourmet',
    }),
    defineField({
      name: 'specialtyTitleAr',
      title: 'Specialty Title (AR)',
      type: 'string',
      fieldset: 'specialty',
      initialValue: 'أصناف خاصة وفاخرة',
    }),
    defineField({
      name: 'specialtySubtitle',
      title: 'Specialty Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'specialty',
      initialValue:
        'Air-freighted exotics, baby leaves, and niche varieties for fine dining and premium retail.',
    }),
    defineField({
      name: 'specialtySubtitleAr',
      title: 'Specialty Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'specialty',
      initialValue:
        'أصناف استوائية مشحونة جواً، وأوراق صغيرة، وأصناف مميزة للمطاعم الراقية ومحلات التجزئة الفاخرة.',
    }),
    defineField({
      name: 'specialtyDescription',
      title: 'Specialty Description (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'specialty',
      initialValue:
        "Direct air-cargo links with specialty growers in Europe, South America, and Southeast Asia ensure Qatar's culinary leaders have access to the world's most sought-after seasonal produce.",
    }),
    defineField({
      name: 'specialtyDescriptionAr',
      title: 'Specialty Description (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'specialty',
      initialValue:
        'تضمن خطوط الشحن الجوي المباشرة مع مزارعين متخصصين في أوروبا وأمريكا الجنوبية وجنوب شرق آسيا وصول قادة الطهي في قطر إلى أرقى المنتجات الموسمية المرغوبة عالمياً.',
    }),
  ],
  preview: {
    select: {
      title: 'bannerTitle',
      subtitle: 'bannerSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Our Products Page',
        subtitle: subtitle || 'Manage category sections & produce catalog content',
      };
    },
  },
});
