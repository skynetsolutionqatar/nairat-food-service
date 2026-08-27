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

export default function Home() {
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
