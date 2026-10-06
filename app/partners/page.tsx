import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { PartnerRetail } from '@/components/partners/PartnerRetail';
import { PartnerLocalGrid } from '@/components/partners/PartnerLocalGrid';
import { PartnerCountryGrid } from '@/components/partners/PartnerCountryGrid';
import { Cta } from '@/components/modules/Cta';
import { getPartners, getPartnersPageContent } from '@/sanity/lib/data';

export const revalidate = 3600;

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Retail Partners & Global Sourcing Suppliers',
  description:
    'Trusted daily produce supplier to Qatar’s leading retail groups (Al Meera, LuLu, Carrefour, Safari, Grand Mall, Rawabi, Saudia, ABC Fresh) and Talabat Mart, strategic partner to Mahaseel for local Qatari farms, and global sourcing alliances.',
  pathname: '/partners',
});

export default async function PartnersPage(): Promise<React.ReactNode> {
  const [partners, partnersContent] = await Promise.all([
    getPartners(),
    getPartnersPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={partnersContent.bannerTitle || 'Partners'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Partners' },
        ]}
      />

      {/* 2. Retail & Online Grocery Groups Logo Grid */}
      <PartnerRetail partners={partners} content={partnersContent} />

      {/* 3. Strategic Local Agriculture: Mahaseel Partnership */}
      <PartnerLocalGrid content={partnersContent} />

      {/* 4. Global Sourcing Countries with Country Flags/Logos */}
      <PartnerCountryGrid content={partnersContent} />

      {/* 5. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
