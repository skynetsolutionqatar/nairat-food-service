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

export const metadata: Metadata = {
  title: 'نيرات للخدمات الغذائية — مستورد وموزع المنتجات الطازجة في قطر',
  description:
    'المستورد والموزع الرائد للفواكه والخضروات الطازجة وشريك لوجستيات سلسلة التبريد لقطاعات التجزئة والجملة والخدمات الغذائية في قطر.',
  openGraph: {
    title: 'نيرات للخدمات الغذائية — مستورد وموزع المنتجات الطازجة في قطر',
    description:
      'المستورد والموزع الرائد للفواكه والخضروات الطازجة وشريك لوجستيات سلسلة التبريد لقطاعات التجزئة والجملة والخدمات الغذائية في قطر.',
    url: 'https://nairatfoodservices.com/ar',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArabicHomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Partners />
      <WhoWeAre />
      <Strengths />
      <Services />
      <Products />
      <SourcingMap />
      <QualityTimeline />
      <Cta />
    </div>
  );
}
