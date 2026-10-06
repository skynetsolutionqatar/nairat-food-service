import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactMap } from '@/components/contact/ContactMap';
import { Cta } from '@/components/modules/Cta';
import { getCompanyProfile, getContactPageContent } from '@/sanity/lib/data';

export const revalidate = 3600;

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'اتصل بنا — المستودع الرئيسي والمكاتب بالدوحة',
  description:
    'تواصل مع نيرات للخدمات الغذائية في الدوحة، قطر. قنوات اتصال مباشرة للاستفسارات عن منتجات الجملة، وشراكات التجزئة، وشحنات المزارعين، وتوزيع المنشأة.',
  pathname: '/ar/contact',
  isArabic: true,
});

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
