import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QualityHeroFeature } from '@/components/quality/QualityHeroFeature';
import { QualityColdChain } from '@/components/quality/QualityColdChain';
import { QualityCertifications } from '@/components/quality/QualityCertifications';
import { QualitySeasonalSourcing } from '@/components/quality/QualitySeasonalSourcing';
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

      {/* 2. Quality Philosophy & Dual Inspection (Origin + Qatar Lab Testing) */}
      <QualityHeroFeature />

      {/* 3. Unbroken Cold-Chain Logistics (6 Docks, 5000m², 20 Chillers, FIFO, 40 Reefer Trucks) */}
      <QualityColdChain />

      {/* 4. Accredited Food Safety & Certification Modal (HACCP & ISO 22000:2018) */}
      <QualityCertifications />

      {/* 5. 12-Month Seasonal Global Sourcing Strategy (365 Days of Freshness) */}
      <QualitySeasonalSourcing />

      {/* 6. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
