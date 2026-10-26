import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { CompanyDelivering } from '@/components/company/CompanyDelivering';
import { CompanyVisionMission } from '@/components/company/CompanyVisionMission';
import { CompanyCeoMessage } from '@/components/company/CompanyCeoMessage';
import { CompanyInfrastructure } from '@/components/company/CompanyInfrastructure';
import { CompanySourcing } from '@/components/company/CompanySourcing';
import { CompanyTeam } from '@/components/company/CompanyTeam';
import { CompanyQuality } from '@/components/company/CompanyQuality';
import { CompanyLookingAhead } from '@/components/company/CompanyLookingAhead';
import { Cta } from '@/components/modules/Cta';
import { getCompanyProfile, getCompanyPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'الشركة — نيرات للخدمات الغذائية قطر',
  description:
    'اكتشف نيرات للخدمات الغذائية: شريك المنتجات الطازجة الرائد في قطر منذ عام 2020. مستودع سلسلة التبريد بمساحة 5,000 م²، و20 غرفة تبريد، و40 مركبة مبردة، وسلامة غذاء معتمدة بشهادات ISO 22000 / HACCP.',
  openGraph: {
    title: 'حول نيرات للخدمات الغذائية — شريك المنتجات الطازجة لقطر',
    description:
      'من التوريد العالمي إلى التوصيل المحلي عبر سلسلة التبريد، تربط نيرات للأغذية أرقى المنتجات الطازجة في العالم بالعملاء في جميع أنحاء قطر.',
    url: 'https://nairatfoodservices.com/ar/company',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArabicCompanyPage() {
  const [company, companyContent] = await Promise.all([
    getCompanyProfile(),
    getCompanyPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={companyContent.bannerTitleAr || 'الشركة'}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'الشركة' },
        ]}
      />

      {/* 2. Delivering Freshness */}
      <CompanyDelivering content={companyContent} />

      {/* 3. Our Journey: Vision & Mission */}
      <CompanyVisionMission content={companyContent} />

      {/* 4. Leadership & CEO Message */}
      <CompanyCeoMessage content={companyContent} />

      {/* 5. Infrastructure & Operational Scale */}
      <CompanyInfrastructure company={company} content={companyContent} />

      {/* 5. Strategic Global Sourcing */}
      <CompanySourcing content={companyContent} />

      {/* 6. Our Team */}
      <CompanyTeam content={companyContent} />

      {/* 7. Quality & Food Safety */}
      <CompanyQuality content={companyContent} />

      {/* 8. Looking Ahead */}
      <CompanyLookingAhead content={companyContent} />

      {/* 9. Final CTA */}
      <Cta />
    </div>
  );
}
