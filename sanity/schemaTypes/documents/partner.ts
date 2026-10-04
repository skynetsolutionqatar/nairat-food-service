import { defineField, defineType } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partner Organization',
  type: 'document',
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
      description: 'Arabic partner name (recommended for Arabic site)',
      validation: (rule) => rule.warning('Arabic partner name is recommended for Arabic localization'),
    }),
    defineField({
      name: 'category',
      title: 'Partner Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hypermarket', value: 'hypermarket' },
          { title: 'Supermarket', value: 'supermarket' },
          { title: 'Quick Commerce', value: 'quick-commerce' },
          { title: 'Wholesale & HORECA', value: 'wholesale' },
          { title: 'Local Agriculture', value: 'agriculture' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage Partner Carousel',
      type: 'boolean',
      initialValue: true,
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
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Partner',
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
        media,
      };
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
