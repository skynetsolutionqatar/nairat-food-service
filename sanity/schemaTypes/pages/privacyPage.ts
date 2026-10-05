import { defineField, defineType, defineArrayMember } from 'sanity';

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'header', title: '2. Page Header', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: '3. Legal Policy Sections', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // Banner
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'سياسة الخصوصية',
    }),

    // Header
    defineField({
      name: 'badge',
      title: 'Header Eyebrow / Badge (EN)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'Legal & Compliance',
    }),
    defineField({
      name: 'badgeAr',
      title: 'Header Eyebrow / Badge (AR)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'الشؤون القانونية والامتثال',
    }),
    defineField({
      name: 'title',
      title: 'Main Title (EN)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'Privacy & Data Protection Policy',
    }),
    defineField({
      name: 'titleAr',
      title: 'Main Title (AR)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'سياسة الخصوصية وحماية البيانات',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Note (EN)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'Last updated: January 2026 · Nairat Food Services W.L.L',
    }),
    defineField({
      name: 'lastUpdatedAr',
      title: 'Last Updated Note (AR)',
      type: 'string',
      fieldset: 'header',
      initialValue: 'آخر تحديث: يناير 2026 · نيرات للخدمات الغذائية ذ.م.م',
    }),

    // Content Sections Array
    defineField({
      name: 'sections',
      title: 'Policy Sections',
      description: 'Add, edit, and reorder policy sections with headings, narratives, and bullet points.',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'policySection',
          title: 'Policy Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title (EN)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'titleAr',
              title: 'Section Title (AR)',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Section Body / Description (EN)',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'bodyAr',
              title: 'Section Body / Description (AR)',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'bulletPoints',
              title: 'Bullet Points',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'bulletPoint',
                  fields: [
                    defineField({ name: 'text', title: 'Text (EN)', type: 'string' }),
                    defineField({ name: 'textAr', title: 'Text (AR)', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'text', subtitle: 'textAr' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'titleAr',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Privacy Policy Page',
        subtitle: subtitle || 'Manage privacy policy sections',
      };
    },
  },
});
