import { defineField, defineType } from 'sanity';

export const categoryPage = defineType({
  name: 'categoryPage',
  title: 'Category Page',
  type: 'document',
  fieldsets: [
    {
      name: 'banner',
      title: 'Banner & Headings',
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: 'category',
      title: 'Category Slug',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'Fresh Vegetables', value: 'vegetables' },
          { title: 'Fresh Fruits', value: 'fruits' },
          { title: 'Leafy & Herbs', value: 'leafy-herbs' },
          { title: 'Specialty & Gourmet', value: 'specialty-gourmet' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Banner Heading (English)',
      type: 'string',
      fieldset: 'banner',
      validation: (rule) => rule.required().error('English banner heading is required'),
    }),
    defineField({
      name: 'titleAr',
      title: 'Banner Heading (Arabic)',
      type: 'string',
      fieldset: 'banner',
    }),
    defineField({
      name: 'subtitle',
      title: 'Banner Subheading (English)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
    }),
    defineField({
      name: 'subtitleAr',
      title: 'Banner Subheading (Arabic)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
    }),
    defineField({
      name: 'badge',
      title: 'Banner Eyebrow / Badge (English)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'OUR PRODUCE',
    }),
    defineField({
      name: 'badgeAr',
      title: 'Banner Eyebrow / Badge (Arabic)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'منتجاتنا',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Photo',
      description: 'Upload high-resolution photo for this category page banner background',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'banner',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'bannerImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Category Page',
        subtitle: subtitle ? `Slug: /products/${subtitle}` : undefined,
        media,
      };
    },
  },
});
