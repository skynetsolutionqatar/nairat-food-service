import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactMap } from '@/components/contact/ContactMap';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'اتصل بنا — نيرات للخدمات الغذائية قطر',
  description:
    'تواصل مع شركة نيرات للخدمات الغذائية بالدوحة، قطر. قنوات اتصال مباشرة للاستفسارات عن التوريد بالجملة، شراكات التجزئة والضيافة، وعمليات التوزيع المركزي.',
  openGraph: {
    title: 'اتصل بنا — نيرات للخدمات الغذائية قطر',
    description:
      'تواصل مع شبكة توريد وتوزيع الخضار والفواكه الطازجة في قطر. المستودع المركزي: شارع 37، المنطقة الصناعية، الدوحة.',
    url: 'https://nairatfoodservices.com/ar/contact',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicContactPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="اتصل بنا"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'اتصل بنا' },
        ]}
      />

      {/* 2. Contact Section: Two-Column Info Cards & Form */}
      <ContactSection />

      {/* 3. Warehouse Location Map */}
      <ContactMap />

      {/* 4. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
