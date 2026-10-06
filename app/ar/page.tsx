import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/modules/Hero';
import { Partners } from '@/components/modules/Partners';
import { WhoWeAre } from '@/components/modules/WhoWeAre';
import { Strengths } from '@/components/modules/Strengths';
import { Services } from '@/components/modules/Services';
import { Products } from '@/components/modules/Products';
import { SourcingMap } from '@/components/modules/SourcingMap';
import { QualityTimeline } from '@/components/modules/QualityTimeline';
import { Cta } from '@/components/modules/Cta';

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'نيرات للخدمات الغذائية — مستورد وموزع المنتجات الطازجة في قطر',
  description:
    'المستورد والموزع الرائد للفواكه والخضروات الطازجة وشريك لوجستيات سلسلة التبريد لقطاعات التجزئة والجملة والخدمات الغذائية في قطر.',
  pathname: '/ar',
  isArabic: true,
});

import { getPartners, getCompanyProfile, getHomePageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export default async function ArabicHomePage() {
  const [featuredPartners, company, homeContent] = await Promise.all([
    getPartners(true),
    getCompanyProfile(),
    getHomePageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero content={homeContent} />
      <Partners partners={featuredPartners} content={homeContent} />
      <WhoWeAre content={homeContent} />
      <Strengths company={company} content={homeContent} />
      <Services content={homeContent} />
      <Products content={homeContent} />
      <SourcingMap content={homeContent} />
      <QualityTimeline content={homeContent} />
      <Cta content={homeContent} />
    </div>
  );
}
