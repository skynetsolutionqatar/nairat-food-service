import React from 'react';
import { Hero } from '@/components/modules/Hero';
import { Partners } from '@/components/modules/Partners';
import { AboutMetrics } from '@/components/modules/AboutMetrics';
import { Strengths } from '@/components/modules/Strengths';
import { Services } from '@/components/modules/Services';
import { Products } from '@/components/modules/Products';
import { SourcingMap } from '@/components/modules/SourcingMap';
import { QualityTimeline } from '@/components/modules/QualityTimeline';
import { CommercialPrograms } from '@/components/modules/CommercialPrograms';
import { StoriesTestimonials } from '@/components/modules/StoriesTestimonials';
import { Cta } from '@/components/modules/Cta';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero with Video Background & Split Widgets */}
      <Hero />

      {/* 2. Trusted Partner Marquee */}
      <Partners />

      {/* 3. Who We Are / About Us & 4 Stat Cards */}
      <AboutMetrics />

      {/* 4. Why Choose Us (Strengths Bento Grid) */}
      <Strengths />

      {/* 5. Services & Cold-Chain Logistics */}
      <Services />

      {/* 6. Products / Complete Produce Catalog */}
      <Products />

      {/* 7. Global Sourcing 3D Globe & Country Corridors */}
      <SourcingMap />

      {/* 8. Certifications & Quality Timeline */}
      <QualityTimeline />

      {/* 9. Commercial Supply Programs */}
      <CommercialPrograms />

      {/* 10. Client Testimonials & Stories */}
      <StoriesTestimonials />

      {/* 11. Final Sourcing CTA */}
      <Cta />
    </div>
  );
}
