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
  title: 'التوريد وضمان الجودة — معتمد بشهادات ISO و HACCP',
  description:
    'النضارة هي لوجستيات. فحص صارم من المنشأ إلى الوصول، ومستودع سلسلة تبريد بمساحة 5,000 متر مربع، و20 غرفة تبريد، و6 أرصفة تحميل، وسلامة غذاء معتمدة بشهادات الهاسب (HACCP) والآيزو ISO 22000:2018، وتوريد عالمي موسمي على مدار 12 شهراً.',
  pathname: '/ar/quality',
  isArabic: true,
});

export default async function ArabicQualityPage(): Promise<React.ReactNode> {
  const [certs, qualityContent] = await Promise.all([
    getQualityCertificates(),
    getQualityPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={qualityContent.bannerTitleAr || 'التوريد والجودة'}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'التوريد والجودة' },
        ]}
      />

      {/* 2. Our Sourcing Philosophy */}
      <QualitySourcingPhilosophy content={qualityContent} />

      {/* 3. Quality & Food Safety */}
      <QualityFoodSafety certs={certs} content={qualityContent} />

      {/* 4. Dedicated QA Team & Pre-Shipment Inspection */}
      <QualityTeamInspection content={qualityContent} />

      {/* 5. Our Supply Chain (5-Step Controls) */}
      <QualitySupplyChain content={qualityContent} />

      {/* 6. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
