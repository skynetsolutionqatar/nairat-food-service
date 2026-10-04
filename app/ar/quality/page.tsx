import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QualitySourcingPhilosophy } from '@/components/quality/QualitySourcingPhilosophy';
import { QualityFoodSafety } from '@/components/quality/QualityFoodSafety';
import { QualityTeamInspection } from '@/components/quality/QualityTeamInspection';
import { QualitySupplyChain } from '@/components/quality/QualitySupplyChain';
import { Cta } from '@/components/modules/Cta';
import { getQualityCertificates } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'التوريد والجودة — نيرات للخدمات الغذائية قطر',
  description:
    'النضارة هي لوجستيات. فحص صارم من المنشأ إلى الوصول، ومستودع سلسلة تبريد بمساحة 5,000 متر مربع، و20 غرفة تبريد، و6 أرصفة تحميل، وسلامة غذاء معتمدة بشهادات الهاسب (HACCP) والآيزو ISO 22000:2018، وتوريد عالمي موسمي على مدار 12 شهراً.',
  openGraph: {
    title: 'التوريد والجودة — نيرات للخدمات الغذائية قطر',
    description:
      'النضارة هي لوجستيات. اختبارات معملية ثنائية المستوى في المنشأ وعند الوصول إلى قطر، وسلسلة تبريد متعددة المناطق، وشهادات الهاسب (HACCP) والآيزو ISO 22000:2018، وتوريد منتجات موسمية على مدار العام.',
    url: 'https://nairatfoodservices.com/ar/quality',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArabicQualityPage(): Promise<React.ReactNode> {
  const certs = await getQualityCertificates();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="التوريد والجودة"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'التوريد والجودة' },
        ]}
      />

      {/* 2. Our Sourcing Philosophy */}
      <QualitySourcingPhilosophy />

      {/* 3. Quality & Food Safety */}
      <QualityFoodSafety certs={certs} />

      {/* 4. Dedicated QA Team & Pre-Shipment Inspection */}
      <QualityTeamInspection />

      {/* 5. Our Supply Chain (5-Step Controls) */}
      <QualitySupplyChain />

      {/* 6. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
