import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactMap } from '@/components/contact/ContactMap';
import { Cta } from '@/components/modules/Cta';
import { getCompanyProfile, getContactPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact Us — Nairat Food Services Qatar',
  description:
    'Get in touch with Nairat Food Services in Doha, Qatar. Direct communication channels for wholesale produce inquiries, retail partnerships, grower consignment, and facility distribution.',
  openGraph: {
    title: 'Contact Us — Nairat Food Services Qatar',
    description:
      'Connect with our fresh produce distribution network in Qatar. Facility located at Street 37, Industrial Area, Doha.',
    url: 'https://nairatfoodservices.com/contact',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function ContactPage(): Promise<React.ReactNode> {
  const [company, contactContent] = await Promise.all([
    getCompanyProfile(),
    getContactPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        title={contactContent.bannerTitle || 'Contact Us'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* 2. Contact Section: Two-Column Info Cards & Form */}
      <ContactSection company={company} content={contactContent} />

      {/* 3. Warehouse Location Map */}
      <ContactMap company={company} content={contactContent} />

      {/* 4. Global Contact & Inquiry Module */}
      <Cta />
    </div>
  );
}
