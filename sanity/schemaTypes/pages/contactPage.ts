import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Us Page Sections',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: '1. Page Banner', options: { collapsible: true, collapsed: false } },
    { name: 'inquiry', title: '2. Contact Details & Inquiry Form', options: { collapsible: true, collapsed: false } },
    { name: 'facility', title: '3. Facility Specs & Map Section', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // --- 1. BANNER ---
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title (EN)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'bannerTitleAr',
      title: 'Banner Title (AR)',
      type: 'string',
      fieldset: 'banner',
      initialValue: 'اتصل بنا',
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue:
        'Get in touch with our commercial produce procurement and cold-chain logistics team in Doha, Qatar.',
    }),
    defineField({
      name: 'bannerSubtitleAr',
      title: 'Banner Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'banner',
      initialValue:
        'تواصل مع فريق التوريد التجاري والخدمات اللوجستية لسلسلة التبريد في الدوحة، قطر.',
    }),

    // --- 2. INQUIRY SECTION ---
    defineField({
      name: 'inquiryEyebrow',
      title: 'Inquiry Eyebrow (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'CONTACT US',
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
      initialValue: 'Get in Touch with Us',
    }),
    defineField({
      name: 'inquiryTitleAr',
      title: 'Inquiry Headline (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'تواصل معنا',
    }),
    defineField({
      name: 'inquirySubtitle',
      title: 'Inquiry Subtitle (EN)',
      type: 'text',
      rows: 2,
      fieldset: 'inquiry',
      initialValue:
        'Whether inquiring about wholesale contracts, direct farm partnerships, or cold-chain distribution, our specialists are ready to assist.',
    }),
    defineField({
      name: 'inquirySubtitleAr',
      title: 'Inquiry Subtitle (AR)',
      type: 'text',
      rows: 2,
      fieldset: 'inquiry',
      initialValue:
        'سواء كنت تستفسر عن عقود التوريد بالجملة، أو الشراكات المباشرة مع المزارع، أو التوزيع بسلسلة التبريد، فإن خبراءنا على استعداد لمساعدتك.',
    }),

    // Contact Card 1: Address & Registration
    defineField({
      name: 'addressLabel',
      title: 'Address Card Label (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Address:',
    }),
    defineField({
      name: 'addressLabelAr',
      title: 'Address Card Label (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'العنوان:',
    }),
    defineField({
      name: 'addressText',
      title: 'Physical Address (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Industrial Area, Street 37, Doha, Qatar.',
    }),
    defineField({
      name: 'addressTextAr',
      title: 'Physical Address (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'المنطقة الصناعية، شارع 37، الدوحة، قطر.',
    }),
    defineField({
      name: 'crNumber',
      title: 'Commercial Registration (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'CR No. 144352',
    }),
    defineField({
      name: 'crNumberAr',
      title: 'Commercial Registration (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'السجل التجاري رقم 144352',
    }),

    // Contact Card 2: Email
    defineField({
      name: 'emailLabel',
      title: 'Email Card Label (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Mail ID:',
    }),
    defineField({
      name: 'emailLabelAr',
      title: 'Email Card Label (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'البريد الإلكتروني:',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Primary Inquiries Email',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'info@nairat.net',
    }),

    // Contact Card 3: Telephones & WhatsApp
    defineField({
      name: 'callLabel',
      title: 'Call Card Label (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Call:',
    }),
    defineField({
      name: 'callLabelAr',
      title: 'Call Card Label (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'اتصل:',
    }),
    defineField({
      name: 'phoneTel',
      title: 'Landline Phone Numbers',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: '+974 4429 0400 / 4429 0300',
    }),
    defineField({
      name: 'phoneMobile',
      title: 'Mobile Phone Number',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: '+974 3104 3814',
    }),
    defineField({
      name: 'phoneWhatsApp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: '+974 5032 9385',
    }),

    // Form feedback messages
    defineField({
      name: 'formSubmitText',
      title: 'Form Submit Button Text (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'formSubmitTextAr',
      title: 'Form Submit Button Text (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'إرسال',
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Form Success Message (EN)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue:
        'Thank you! Your inquiry has been received. Our team will contact you promptly.',
    }),
    defineField({
      name: 'formSuccessMessageAr',
      title: 'Form Success Message (AR)',
      type: 'string',
      fieldset: 'inquiry',
      initialValue: 'شكراً لك! تم استلام استفسارك. سيتصل بك فريقنا قريباً.',
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
      initialValue: 'Our Doha Central Warehouse & Cold Storage',
    }),
    defineField({
      name: 'facilityTitleAr',
      title: 'Facility Headline (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'مستودعنا المركزي والتخزين المبرد في الدوحة',
    }),

    // 4 Facility Summary Badges
    defineField({
      name: 'badgeLocationLabel',
      title: 'Badge 1 Label (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Location',
    }),
    defineField({
      name: 'badgeLocationLabelAr',
      title: 'Badge 1 Label (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'الموقع',
    }),
    defineField({
      name: 'badgeLocationValue',
      title: 'Badge 1 Value (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Street 37, Industrial Area',
    }),
    defineField({
      name: 'badgeLocationValueAr',
      title: 'Badge 1 Value (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'شارع 37، المنطقة الصناعية',
    }),

    defineField({
      name: 'badgeCapacityLabel',
      title: 'Badge 2 Label (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Capacity',
    }),
    defineField({
      name: 'badgeCapacityLabelAr',
      title: 'Badge 2 Label (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'السعة',
    }),
    defineField({
      name: 'badgeCapacityValue',
      title: 'Badge 2 Value (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: '5,000 m² • 20 Chillers',
    }),
    defineField({
      name: 'badgeCapacityValueAr',
      title: 'Badge 2 Value (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: '5,000 م² • 20 مبرداً',
    }),

    defineField({
      name: 'badgeOperationsLabel',
      title: 'Badge 3 Label (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Operations',
    }),
    defineField({
      name: 'badgeOperationsLabelAr',
      title: 'Badge 3 Label (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'العمليات',
    }),
    defineField({
      name: 'badgeOperationsValue',
      title: 'Badge 3 Value (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: '24/7 Receiving & Dispatch',
    }),
    defineField({
      name: 'badgeOperationsValueAr',
      title: 'Badge 3 Value (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'الاستلام والإرسال 24/7',
    }),

    defineField({
      name: 'badgeComplianceLabel',
      title: 'Badge 4 Label (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Compliance',
    }),
    defineField({
      name: 'badgeComplianceLabelAr',
      title: 'Badge 4 Label (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'الامتثال',
    }),
    defineField({
      name: 'badgeComplianceValue',
      title: 'Badge 4 Value (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'HACCP • ISO 22000',
    }),
    defineField({
      name: 'badgeComplianceValueAr',
      title: 'Badge 4 Value (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'HACCP • ISO 22000',
    }),

    // Interactive Map and Floating Directions Card
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed iframe URL',
      type: 'url',
      fieldset: 'facility',
      initialValue:
        'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57763.27363835163!2d51.3660583!3d25.1963217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d10076a23d59%3A0x3ee7f3ae5d1130be!2sNairat%20Food%20-%20Main%20Warehouse!5e0!3m2!1sen!2sqa!4v1790839233998!5m2!1sen!2sqa',
    }),
    defineField({
      name: 'directionsUrl',
      title: 'Directions Button Target URL',
      type: 'url',
      fieldset: 'facility',
      initialValue: 'https://maps.app.goo.gl/FGEeJiMmQ172UCx3A',
    }),
    defineField({
      name: 'facilityCardTitle',
      title: 'Floating Card Title (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Nairat Food Services',
    }),
    defineField({
      name: 'facilityCardTitleAr',
      title: 'Floating Card Title (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'شركة نيرات للخدمات الغذائية',
    }),
    defineField({
      name: 'facilityCardAddress',
      title: 'Floating Card Address (EN)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'Street 37, Industrial Area, Doha',
    }),
    defineField({
      name: 'facilityCardAddressAr',
      title: 'Floating Card Address (AR)',
      type: 'string',
      fieldset: 'facility',
      initialValue: 'شارع 37، المنطقة الصناعية، الدوحة',
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
