import React from 'react';
import type { Metadata } from 'next';
import { CompanyHero } from '@/components/company/CompanyHero';
import { CompanyDelivering } from '@/components/company/CompanyDelivering';
import { CompanyVisionMission } from '@/components/company/CompanyVisionMission';
import { CompanyInfrastructure } from '@/components/company/CompanyInfrastructure';
import { CompanySourcing } from '@/components/company/CompanySourcing';
import { CompanyTeam } from '@/components/company/CompanyTeam';
import { CompanySupplyChain } from '@/components/company/CompanySupplyChain';
import { CompanyQuality } from '@/components/company/CompanyQuality';
import { CompanyLookingAhead } from '@/components/company/CompanyLookingAhead';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'Company — Nairat Food Services Qatar',
  description:
    'Discover Nairat Food Services: Qatar’s leading fresh-produce partner since 2020. 5,000 m² cold-chain warehouse, 20 chiller rooms, 40 refrigerated vehicles, and ISO 22000 / HACCP certified food safety.',
  openGraph: {
    title: 'About Nairat Food Services — Fresh Produce Partner for Qatar',
    description:
      'From global sourcing to local cold-chain delivery, Nairat Food connects the world’s finest fresh produce with customers across Qatar.',
    url: 'https://nairatfood.com/company',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function CompanyPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner (Compact Subpage Header) */}
      <CompanyHero />

      {/* 2. Delivering Freshness (Image on Left, Narrative + Commitment Box on Right) */}
      <CompanyDelivering />

      {/* 3. Our Journey: Vision & Mission (Narrative on Left, Yellow-Badged Cards on Right) */}
      <CompanyVisionMission />

      {/* 4. Infrastructure & Operational Scale (Full-Bleed Solid Green Section) */}
      <CompanyInfrastructure />

      {/* 5. Strategic Global Sourcing (Narrative on Left, Yellow-Badged Cards on Right) */}
      <CompanySourcing />

      {/* 6. Our Team (Dedicated Team Showcase & Growth to 200+) */}
      <CompanyTeam />



      {/* 7. Quality & Food Safety (Feature Card: Image on Left, Content & Certs on Right) */}
      <CompanyQuality />

      {/* 8. Looking Ahead (Feature Card: Content & Ambition on Left, Image on Right) */}
      <CompanyLookingAhead />

      {/* 9. Final CTA (Home Page Parallax Banner & Drawer Form) */}
      <Cta />
    </div>
  );
}
