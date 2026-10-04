import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { PartnerRetail } from '@/components/partners/PartnerRetail';
import { PartnerLocalGrid } from '@/components/partners/PartnerLocalGrid';
import { PartnerCountryGrid } from '@/components/partners/PartnerCountryGrid';
import { Cta } from '@/components/modules/Cta';
import { getPartners, getPartnersPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'الشركاء — نيرات للخدمات الغذائية قطر',
  description:
    'مورد يومي موثوق للمنتجات الطازجة لمجموعات التجزئة الرائدة في قطر (الميرة، لولو، كارفور، سفاري، جراند مول، الروابي، السعودية، إيه بي سي فريش) وطلبات مارت، وشريك استراتيجي لمحاصيل للمزارع القطرية المحلية، وتحالفات توريد عالمية.',
  openGraph: {
    title: 'الشركاء — نيرات للخدمات الغذائية قطر',
    description:
      'ربط البساتين العالمية والمزارع القطرية المحلية بالهايبرماركت الرائدة ومنصات البقالة الرقمية بتوزيع موثوق عبر سلسلة التبريد.',
    url: 'https://nairatfoodservices.com/ar/partners',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArabicPartnersPage(): Promise<React.ReactNode> {
  const [partners, partnersContent] = await Promise.all([
    getPartners(),
    getPartnersPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={partnersContent.bannerTitleAr || 'الشركاء'}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الشركاء' },
        ]}
      />

      {/* 2. Retail & Online Grocery Groups Logo Grid */}
      <PartnerRetail partners={partners} content={partnersContent} />

      {/* 3. Strategic Local Agriculture: Mahaseel Partnership */}
      <PartnerLocalGrid content={partnersContent} />

      {/* 4. Global Sourcing Countries */}
      <PartnerCountryGrid content={partnersContent} />

      {/* 5. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
