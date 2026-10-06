import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QualitySourcingPhilosophy } from '@/components/quality/QualitySourcingPhilosophy';
import { QualityFoodSafety } from '@/components/quality/QualityFoodSafety';
import { QualityTeamInspection } from '@/components/quality/QualityTeamInspection';
import { QualitySupplyChain } from '@/components/quality/QualitySupplyChain';
import { Cta } from '@/components/modules/Cta';
import { getQualityCertificates, getQualityPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sourcing & Quality Assurance — ISO & HACCP Certified',
  description:
    'Freshness is logistics. Rigorous origin-to-arrival inspection, 5,000 m² cold-chain warehouse, 20 chiller rooms, 6 loading docks, HACCP & ISO 22000:2018 certified food safety, and 12-month seasonal global sourcing.',
  pathname: '/quality',
});

export default async function QualityPage(): Promise<React.ReactNode> {
  const [certs, qualityContent] = await Promise.all([
    getQualityCertificates(),
    getQualityPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={qualityContent.bannerTitle || 'Sourcing & Quality'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sourcing & Quality' },
        ]}
      />

      {/* 2. Our Sourcing Philosophy (Fresh Produce, Sourced Responsibly & 3 Pillars) */}
      <QualitySourcingPhilosophy content={qualityContent} />

      {/* 3. Quality & Food Safety (HACCP & ISO 22000:2018 Certificates) */}
      <QualityFoodSafety certs={certs} content={qualityContent} />

      {/* 4. Dedicated QA Team & Pre-Shipment Inspection */}
      <QualityTeamInspection content={qualityContent} />

      {/* 5. Controls at Every Step (5-Step Operational Controls) */}
      <QualitySupplyChain content={qualityContent} />

      {/* 6. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
