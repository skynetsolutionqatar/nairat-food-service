import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Us Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'inquiry', title: '2. Commercial Inquiry Section', options: { collapsible: true, collapsed: true } },
    { name: 'facility', title: '3. Facility & Map Section', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Contact Nairat Food Services',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'تواصل مع نيرات للخدمات الغذائية',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'Get in touch with our commercial produce procurement and cold-chain logistics team in Doha, Qatar.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue: 'تواصل مع فريق التوريد التجاري والخدمات اللوجستية لسلسلة التبريد في الدوحة، قطر.',
    }),

    // --- 2. INQUIRY SECTION ---
    defineField({
      name: 'inquiryEyebrow',
      title: 'Inquiry Eyebrow (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'inquiryEyebrowAr',
      title: 'Inquiry Eyebrow (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'تواصل معنا',
    }),
    defineField({
      name: 'inquiryTitle',
      title: 'Inquiry Headline (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Connect with Our Commercial Procurement Team',
    }),
    defineField({
      name: 'inquiryTitleAr',
      title: 'Inquiry Headline (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'تواصل مع فريق التوريد التجاري لدينا',
    }),
    defineField({
      name: 'inquirySubtitle',
      title: 'Inquiry Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'inquiry',
      initialValue: 'Whether inquiring about wholesale contracts, direct farm partnerships, or cold-chain distribution, our specialists are ready to assist.',
    }),
    defineField({
      name: 'inquirySubtitleAr',
      title: 'Inquiry Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'inquiry',
      initialValue: 'سواء كنت تستفسر عن عقود التوريد بالجملة، أو الشراكات المباشرة مع المزارع، أو التوزيع بسلسلة التبريد، فإن خبراءنا على استعداد لمساعدتك.',
    }),

    // --- 3. FACILITY & MAP ---
    defineField({
      name: 'facilityEyebrow',
      title: 'Facility Eyebrow (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'FACILITY LOCATION',
    }),
    defineField({
      name: 'facilityEyebrowAr',
      title: 'Facility Eyebrow (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'موقع المنشأة',
    }),
    defineField({
      name: 'facilityTitle',
      title: 'Facility Headline (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Our Central Cold Storage & Distribution Facility in Doha',
    }),
    defineField({
      name: 'facilityTitleAr',
      title: 'Facility Headline (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'مستودعنا المركزي والتخزين المبرد في الدوحة',
    }),
    defineField({
      name: 'facilityOperatingHours',
      title: 'Operating Hours Notice (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Saturday – Thursday: 6:00 AM – 8:00 PM | Receiving: 24/7 Temperature Monitored',
    }),
    defineField({
      name: 'facilityOperatingHoursAr',
      title: 'Operating Hours Notice (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'السبت - الخميس: 6:00 صباحاً - 8:00 مساءً | الاستلام: مراقبة الحرارة على مدار 24/7',
    }),
  ],
  preview: {
    select: {
      title: 'bannerTitle',
      subtitle: 'bannerSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Us Page',
        subtitle: subtitle || 'Contact page section-by-section content',
      };
    },
  },
});
