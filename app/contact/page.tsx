import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactMap } from '@/components/contact/ContactMap';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'Contact Us — Nairat Food Services Qatar',
  description:
    'Get in touch with Nairat Food Services in Doha, Qatar. Direct communication channels for wholesale produce inquiries, retail partnerships, grower consignment, and facility distribution.',
  openGraph: {
    title: 'Contact Us — Nairat Food Services Qatar',
    description:
      'Connect with our fresh produce distribution network in Qatar. Facility located at Street 37, Industrial Area, Doha.',
    url: 'https://nairatfood.com/contact',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* 2. Contact Section: Two-Column Info Cards & Form */}
      <ContactSection />

      {/* 3. Warehouse Location Map */}
      <ContactMap />

      {/* 4. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
