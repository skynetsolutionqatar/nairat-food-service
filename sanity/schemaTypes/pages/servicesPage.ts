import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Our Services',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'خدماتنا',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'Comprehensive fresh-produce distribution, grower consignment partnerships, and retail store services across Qatar.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'توزيع شامل للمنتجات الطازجة، شراكات بيع الأمانة للمزارعين، وخدمات التجزئة في جميع أنحاء قطر.',
    }),
  ],
  preview: {
    select: {
      title: 'bannerTitle',
      subtitle: 'bannerSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Services Page',
        subtitle: subtitle || 'Services page section content',
      };
    },
  },
});
