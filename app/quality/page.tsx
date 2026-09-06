import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QualitySourcingPhilosophy } from '@/components/quality/QualitySourcingPhilosophy';
import { QualityFoodSafety } from '@/components/quality/QualityFoodSafety';
import { QualitySupplyChain } from '@/components/quality/QualitySupplyChain';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'Sourcing & Quality — Nairat Food Services Qatar',
  description:
    'Freshness is logistics. Rigorous origin-to-arrival inspection, 5,000 m² cold-chain warehouse, 20 chiller rooms, 6 loading docks, HACCP & ISO 22000:2018 certified food safety, and 12-month seasonal global sourcing.',
  openGraph: {
    title: 'Sourcing & Quality — Nairat Food Services Qatar',
    description:
      'Freshness is logistics. Dual-tier origin and Qatar arrival laboratory testing, multi-zone cold chain, HACCP & ISO 22000:2018 certifications, and year-round seasonal produce supply.',
    url: 'https://nairatfood.com/quality',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function QualityPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="Sourcing & Quality"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sourcing & Quality' },
        ]}
      />

      {/* 2. Our Sourcing Philosophy (Fresh Produce, Sourced Responsibly & 3 Pillars) */}
      <QualitySourcingPhilosophy />

      {/* 3. Quality & Food Safety (Rigorous Checks & HACCP / ISO Certificates) */}
      <QualityFoodSafety />

      {/* 4. Our Supply Chain (From Farm to You: 01 Source -> 02 Inspect -> 03 Cold Chain -> 04 Deliver) */}
      <QualitySupplyChain />



      {/* 7. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
