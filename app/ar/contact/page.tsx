import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactMap } from '@/components/contact/ContactMap';
import { Cta } from '@/components/modules/Cta';
import { getCompanyProfile, getContactPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'اتصل بنا — نيرات للخدمات الغذائية قطر',
  description:
    'تواصل مع نيرات للخدمات الغذائية في الدوحة، قطر. قنوات اتصال مباشرة للاستفسارات عن منتجات الجملة، وشراكات التجزئة، وشحنات المزارعين، وتوزيع المنشأة.',
  openGraph: {
    title: 'اتصل بنا — نيرات للخدمات الغذائية قطر',
    description:
      'تواصل مع شبكة توزيع المنتجات الطازجة لدينا في قطر. تقع المنشأة في شارع 37، المنطقة الصناعية، الدوحة.',
    url: 'https://nairatfoodservices.com/ar/contact',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArabicContactPage(): Promise<React.ReactNode> {
  const [company, contactContent] = await Promise.all([
    getCompanyProfile(),
    getContactPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={contactContent.bannerTitleAr || 'اتصل بنا'}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'اتصل بنا' },
        ]}
      />

      {/* 2. Contact Section: Two-Column Info Cards & Form */}
      <ContactSection company={company} content={contactContent} />

      {/* 3. Warehouse Location Map */}
      <ContactMap company={company} content={contactContent} />

      {/* 4. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
