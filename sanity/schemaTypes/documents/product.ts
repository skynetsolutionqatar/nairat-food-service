import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Produce Catalog Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name (English)',
      type: 'string',
      validation: (rule) => rule.required().error('English product name is required'),
    }),
    defineField({
      name: 'nameAr',
      title: 'Product Name (Arabic)',
      type: 'string',
      description: 'Arabic product name (e.g. تفاح). Recommended for Arabic site.',
      validation: (rule) => rule.warning('Arabic product name is recommended for Arabic localization'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" button to create the URL slug from product name',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required. Click the "Generate" button beside this field.'),
    }),
    defineField({
      name: 'category',
      title: 'Produce Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fresh Vegetables', value: 'vegetables' },
          { title: 'Fresh Fruits', value: 'fruits' },
          { title: 'Leafy & Herbs', value: 'leafy-herbs' },
          { title: 'Specialty & Gourmet', value: 'specialty-gourmet' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variety',
      title: 'Variety / Specifications',
      type: 'string',
      description: 'e.g. Round, Plum & Beefsteak or Greenhouse English',
    }),
    defineField({
      name: 'origin',
      title: 'Origin Countries',
      type: 'string',
      description: 'e.g. Jordan, Turkey, Netherlands, Local',
    }),
    defineField({
      name: 'temp',
      title: 'Storage Temperature',
      type: 'string',
      description: 'e.g. +10°C to +12°C',
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage Carousel',
      type: 'boolean',
      initialValue: false,
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
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
