import { defineArrayMember, defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Commercial Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleAr',
      title: 'Service Title (Arabic)',
      type: 'string',
      description: 'Arabic service title (recommended for Arabic site)',
      validation: (rule) => rule.warning('Arabic service title is recommended for Arabic localization'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Badge (English)',
      type: 'string',
      description: 'e.g. B2B & Wholesale Supply',
    }),
    defineField({
      name: 'taglineAr',
      title: 'Tagline / Badge (Arabic)',
      type: 'string',
      description: 'e.g. توريد تجاري وجملة',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Narrative (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Detailed Narrative (Arabic)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Key Operational Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'Feature (English)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ar',
              title: 'Feature (Arabic)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'en',
              subtitle: 'ar',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Service Showcase Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
