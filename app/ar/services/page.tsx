import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ServicesList } from '@/components/services/ServicesList';
import { Cta } from '@/components/modules/Cta';
import { getServices } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'خدماتنا — نيرات للخدمات الغذائية قطر',
  description:
    'توزيع شامل للمنتجات الطازجة، وشراكات شحنات الأمانة للمزارعين، وخدمات متاجر التجزئة في جميع أنحاء قطر. توصيل يومي إلى الهايبرماركت والسوبرماركت وطلبات مارت.',
  openGraph: {
    title: 'خدماتنا — نيرات للخدمات الغذائية قطر',
    description:
      'توزيع المنتجات الطازجة يومياً بالتجزئة والجملة، وشراكات تجارة المزارعين، وتجزئة المستهلك المباشرة في قطر.',
    url: 'https://nairatfoodservices.com/ar/services',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArabicServicesPage(): Promise<React.ReactNode> {
  const services = await getServices();

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

      {/* 2. Horizontal Service Cards */}
      <ServicesList services={services} />

      {/* 3. Global CTA Module */}
      <Cta />
    </div>
  );
}
