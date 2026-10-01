import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { PartnerRetail } from '@/components/partners/PartnerRetail';
import { PartnerLocalGrid } from '@/components/partners/PartnerLocalGrid';
import { PartnerCountryGrid } from '@/components/partners/PartnerCountryGrid';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'شركاؤنا — نيرات للخدمات الغذائية قطر',
  description:
    'المورد المعتمد لكبرى سلاسل التجزئة في قطر (الميرة، لولو، كارفور، سفاري، جراند مارت، الروابي، مجمع السعودية) وطلبات مارت، وشريك استراتيجي لشركة محاصيل لدعم المزارع القطرية، وتحالفات زراعية عالمية.',
  openGraph: {
    title: 'شركاؤنا — نيرات للخدمات الغذائية قطر',
    description:
      'نربط المزارع العالمية والإنتاج المحلي القطري بأرقى المتاجر ومنصات التسوق الإلكتروني عبر سلاسل تبريد موثوقة.',
    url: 'https://nairatfoodservices.com/ar/partners',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicPartnersPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="شركاؤنا"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'شركاؤنا' },
        ]}
      />

      {/* 2. Retail & Online Grocery Groups Logo Grid */}
      <PartnerRetail />

      {/* 3. Strategic Local Agriculture: Mahaseel Partnership */}
      <PartnerLocalGrid />

      {/* 4. Global Sourcing Countries */}
      <PartnerCountryGrid />

      {/* 5. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
