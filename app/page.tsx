import React from 'react';
import { Hero } from '@/components/modules/Hero';
import { Partners } from '@/components/modules/Partners';
import { WhoWeAre } from '@/components/modules/WhoWeAre';
import { Strengths } from '@/components/modules/Strengths';
import { Services } from '@/components/modules/Services';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Partners />
      <WhoWeAre />
      <Strengths />
      <Services />
    </div>
  );
}
