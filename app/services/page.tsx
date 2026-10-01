import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ServicesList } from '@/components/services/ServicesList';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'Our Services — Nairat Food Services Qatar',
  description:
    'Comprehensive fresh-produce distribution, grower consignment partnerships, and retail store services across Qatar. Daily delivery to hypermarkets, supermarkets, and Talabat Mart.',
  openGraph: {
    title: 'Our Services — Nairat Food Services Qatar',
    description:
      'Daily retail and wholesale produce distribution, grower trade partnerships, and direct consumer retail in Qatar.',
    url: 'https://nairatfoodservices.com/services',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ServicesPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="Our Services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Services' },
        ]}

      />

      {/* 2. 3 Horizontal Service Cards (Row-wise Layout) */}
      <ServicesList />

      {/* 3. Global CTA Module */}
      <Cta />
    </div>
  );
}
