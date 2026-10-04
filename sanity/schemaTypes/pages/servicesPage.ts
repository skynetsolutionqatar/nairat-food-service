import { defineField, defineType } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'overview', title: '2. Commercial Overview Section', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Our Commercial Services',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'خدماتنا التجارية',
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

    // --- 2. OVERVIEW ---
    defineField({
      name: 'overviewHeadline',
      title: 'Overview Headline (EN)',
      type: 'string',
      fieldset: 'overview',
      initialValue: 'End-to-End Cold-Chain Supply & Distribution Solutions',
    }),
    defineField({
      name: 'overviewHeadlineAr',
      title: 'Overview Headline (AR)',
      type: 'string',
      fieldset: 'overview',
      initialValue: 'حلول متكاملة للتوريد والتوزيع عبر سلسلة التبريد',
    }),
    defineField({
      name: 'overviewNarrative',
      title: 'Overview Narrative (EN)',
      type: 'text',
      rows: 3,
      fieldset: 'overview',
      initialValue: 'From international procurement and chilled customs clearance to daily fleet delivery and farm consignment trading, we power Qatar’s food retail ecosystem.',
    }),
    defineField({
      name: 'overviewNarrativeAr',
      title: 'Overview Narrative (AR)',
      type: 'text',
      rows: 3,
      fieldset: 'overview',
      initialValue: 'من المشتريات الدولية والتخليص الجمركي المبرد إلى التوزيع اليومي بالأسطول وتجارة الأمانة للمزارعين، نحن ندعم منظومة التجزئة الغذائية في قطر.',
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
        subtitle: subtitle || 'Services page section-by-section content',
      };
    },
  },
});
