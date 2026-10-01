import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QualitySourcingPhilosophy } from '@/components/quality/QualitySourcingPhilosophy';
import { QualityFoodSafety } from '@/components/quality/QualityFoodSafety';
import { QualitySupplyChain } from '@/components/quality/QualitySupplyChain';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'الجودة والتوريد — نيرات للخدمات الغذائية قطر',
  description:
    'النضارة علم وإدارة لوجستية. فحص دقيق من الحقل إلى الوصول، مستودعات مبردة بمساحة 5,000 م²، شهادات سلامة الغذاء آيزو 22000 ونظام الهاسب (HACCP)، وتوريد عالمي على مدار 12 شهراً.',
  openGraph: {
    title: 'الجودة والتوريد — نيرات للخدمات الغذائية قطر',
    description:
      'معايير فحص مخبري مزدوجة، وسلسلة تبريد متعددة النطاقات، وشهادات اعتماد دولية في سلامة الغذاء والتوريد الزراعي.',
    url: 'https://nairatfoodservices.com/ar/quality',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicQualityPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="الجودة والتوريد"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الجودة والتوريد' },
        ]}
      />

      {/* 2. Our Sourcing Philosophy */}
      <QualitySourcingPhilosophy />

      {/* 3. Quality & Food Safety */}
      <QualityFoodSafety />

      {/* 4. Our Supply Chain */}
      <QualitySupplyChain />

      {/* 5. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
