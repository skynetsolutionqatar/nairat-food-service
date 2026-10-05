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
import { getCompanyProfile, getCompanyPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Company — Nairat Food Services Qatar',
  description:
    'Discover Nairat Food Services: Qatar’s leading fresh-produce partner since 2020. 5,000 m² cold-chain warehouse, 20 chiller rooms, 40 refrigerated vehicles, and ISO 22000 / HACCP certified food safety.',
  openGraph: {
    title: 'About Nairat Food Services — Fresh Produce Partner for Qatar',
    description:
      'From global sourcing to local cold-chain delivery, Nairat Food connects the world’s finest fresh produce with customers across Qatar.',
    url: 'https://nairatfoodservices.com/company',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function CompanyPage() {
  const [company, companyContent] = await Promise.all([
    getCompanyProfile(),
    getCompanyPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={companyContent.bannerTitle || 'Company'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company' },
        ]}
      />

      {/* 2. Delivering Freshness (Image on Left, Narrative + Commitment Box on Right) */}
      <CompanyDelivering content={companyContent} />

      {/* 3. Our Journey: Vision & Mission (Narrative on Left, Yellow-Badged Cards on Right) */}
      <CompanyVisionMission content={companyContent} />

      {/* 4. Infrastructure & Operational Scale (Full-Bleed Solid Green Section) */}
      <CompanyInfrastructure company={company} content={companyContent} />

      {/* 5. Strategic Global Sourcing (Narrative on Left, Yellow-Badged Cards on Right) */}
      <CompanySourcing content={companyContent} />

      {/* 6. Our Team (Dedicated Team Showcase & Growth to 200+) */}
      <CompanyTeam content={companyContent} />

      {/* 7. Quality & Food Safety (Feature Card: Image on Left, Content & Certs on Right) */}
      <CompanyQuality content={companyContent} />

      {/* 8. Looking Ahead (Feature Card: Content & Ambition on Left, Image on Right) */}
      <CompanyLookingAhead content={companyContent} />

      {/* 9. Final CTA (Home Page Parallax Banner & Drawer Form) */}
      <Cta />
    </div>
  );
}
