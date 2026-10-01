import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ServicesList } from '@/components/services/ServicesList';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'خدماتنا — نيرات للخدمات الغذائية قطر',
  description:
    'خدمات شاملة لتوزيع المحاصيل الزراعية الطازجة، وشراكات الأمانة مع المزارعين، ومنافذ التجزئة في قطر. توصيل يومي للهايبرماركت والسوبرماركت وطلبات مارت.',
  openGraph: {
    title: 'خدماتنا — نيرات للخدمات الغذائية قطر',
    description:
      'توزيع المحاصيل الزراعية بالجملة والتجزئة، وشراكات المزارعين والمصدرين، ومنافذ البيع المباشر في قطر.',
    url: 'https://nairatfoodservices.com/ar/services',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicServicesPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="خدماتنا"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'خدماتنا' },
        ]}
      />

      {/* 2. 3 Horizontal Service Cards */}
      <ServicesList />

      {/* 3. Global CTA Module */}
      <Cta />
    </div>
  );
}
