import React from 'react';
import { Hero } from '@/components/modules/Hero';
import { Partners } from '@/components/modules/Partners';
import { AboutMetrics } from '@/components/modules/AboutMetrics';
import { CoreValues } from '@/components/modules/CoreValues';
import { ServicesGrid } from '@/components/modules/ServicesGrid';
import { ClimateFeature } from '@/components/modules/ClimateFeature';
import { StoriesTestimonials } from '@/components/modules/StoriesTestimonials';
import { CommercialPrograms } from '@/components/modules/CommercialPrograms';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <Partners />
      <AboutMetrics />
      <CoreValues />
      <ServicesGrid />
      <ClimateFeature />
      <StoriesTestimonials />
      <CommercialPrograms />
    </div>
  );
}
