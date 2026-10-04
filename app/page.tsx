import React from 'react';
import { Hero } from '@/components/modules/Hero';
import { Partners } from '@/components/modules/Partners';
import { WhoWeAre } from '@/components/modules/WhoWeAre';
import { Strengths } from '@/components/modules/Strengths';
import { Services } from '@/components/modules/Services';
import { Products } from '@/components/modules/Products';
import { SourcingMap } from '@/components/modules/SourcingMap';
import { QualityTimeline } from '@/components/modules/QualityTimeline';
import { Cta } from '@/components/modules/Cta';
import { getPartners, getCompanyProfile, getHomePageContent } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [featuredPartners, company, homeContent] = await Promise.all([
    getPartners(true),
    getCompanyProfile(),
    getHomePageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero content={homeContent} />
      <Partners partners={featuredPartners} />
      <WhoWeAre content={homeContent} />
      <Strengths company={company} content={homeContent} />
      <Services />
      <Products />
      <SourcingMap />
      <QualityTimeline />
      <Cta />
    </div>
  );
}
