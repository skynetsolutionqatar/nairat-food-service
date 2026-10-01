import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { CompanyDelivering } from '@/components/company/CompanyDelivering';
import { CompanyVisionMission } from '@/components/company/CompanyVisionMission';
import { CompanyInfrastructure } from '@/components/company/CompanyInfrastructure';
import { CompanySourcing } from '@/components/company/CompanySourcing';
import { CompanyTeam } from '@/components/company/CompanyTeam';
import { CompanyQuality } from '@/components/company/CompanyQuality';
import { CompanyLookingAhead } from '@/components/company/CompanyLookingAhead';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'عن الشركة — نيرات للخدمات الغذائية قطر',
  description:
    'تعرف على شركة نيرات للخدمات الغذائية: الشريك الرائد في استيراد وتوزيع المحاصيل الزراعية الطازجة في دولة قطر. مستودعات مبردة بمساحة 5,000 م²، وأسطول توزيع مبرد.',
  openGraph: {
    title: 'عن شركة نيرات للخدمات الغذائية — شريك التوريد الزراعي في قطر',
    description:
      'نربط المزارع العالمية الرائدة بأسواق قطر عبر منظومة تخزين وسلاسل تبريد متكاملة.',
    url: 'https://nairatfoodservices.com/ar/company',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicCompanyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="عن الشركة"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'عن الشركة' },
        ]}
      />

      {/* 2. Delivering Freshness */}
      <CompanyDelivering />

      {/* 3. Our Journey: Vision & Mission */}
      <CompanyVisionMission />

      {/* 4. Infrastructure & Operational Scale */}
      <CompanyInfrastructure />

      {/* 5. Strategic Global Sourcing */}
      <CompanySourcing />

      {/* 6. Our Team */}
      <CompanyTeam />

      {/* 7. Quality & Food Safety */}
      <CompanyQuality />

      {/* 8. Looking Ahead */}
      <CompanyLookingAhead />

      {/* 9. Final CTA */}
      <Cta />
    </div>
  );
}
