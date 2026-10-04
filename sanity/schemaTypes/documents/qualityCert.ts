import { defineField, defineType } from 'sanity';

export const qualityCert = defineType({
  name: 'qualityCert',
  title: 'Quality & Food Safety Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Certificate Standard Title (English)',
      type: 'string',
      description: 'e.g. HACCP or ISO 22000:2018',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Certificate Standard Title (Arabic)',
      type: 'string',
      description: 'e.g. نظام تحليل المخاطر (HACCP) أو أيزو 22000:2018',
    }),
    defineField({
      name: 'subtitle',
      title: 'Credential Subtitle (English)',
      type: 'string',
      description: 'e.g. Certificate of Compliance',
    }),
    defineField({
      name: 'subtitleAr',
      title: 'Credential Subtitle (Arabic)',
      type: 'string',
      description: 'e.g. شهادة الامتثال',
    }),
    defineField({
      name: 'description',
      title: 'Accreditation Scope / Narrative (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Accreditation Scope / Narrative (Arabic)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Certificate Document Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
