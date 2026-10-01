import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { companyProfile } from '@/lib/config/company';

export const metadata: Metadata = {
  title: 'Terms of Service — Nairat Food Services Qatar',
  description:
    'Commercial terms of service, delivery conditions, and trading terms for Nairat Food Services W.L.L in Doha, Qatar.',
  openGraph: {
    title: 'Terms of Service — Nairat Food Services Qatar',
    description: 'Commercial supply terms and conditions for Nairat Food Services W.L.L.',
    url: 'https://nairatfoodservices.com/terms',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title="Terms of Service"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              Commercial Terms
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              Terms &amp; Conditions of Supply
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              Last updated: January 2026 · Nairat Food Services W.L.L
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                1. Scope of Agreement
              </h2>
              <p>
                These Terms and Conditions govern the distribution, wholesale trading, consignment services, and website use provided by Nairat Food Services W.L.L (&quot;Nairat&quot;) within the State of Qatar. By engaging our services or accessing our site, clients and partners agree to these terms.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. Cold-Chain Quality &amp; Inspection
              </h2>
              <p>
                All fresh fruits, vegetables, and culinary herbs supplied by Nairat are received, sorted, stored, and dispatched through our HACCP and ISO 22000:2018 certified facility in Doha Industrial Area. Buyers are required to inspect shipments upon delivery and verify temperature readings with our delivery drivers before sign-off.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. Orders, Scheduling &amp; Deliveries
              </h2>
              <p>
                Commercial orders are fulfilled in accordance with agreed delivery schedules. Nairat operates an active refrigerated fleet of 40 vehicles ensuring store-level delivery across Qatar hypermarkets, supermarkets, and foodservice operators. Force majeure circumstances affecting international shipping or border crossings will be communicated promptly.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. Grower &amp; Consignment Partnerships
              </h2>
              <p>
                Consignment agreements with international growers and local farms adhere to transparent audit trails, formal weight and grading inspections upon receipt, and agreed commercial settlement cycles.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. Corporate Enquiries &amp; Legal Notices
              </h2>
              <p>
                All official notices or inquiries regarding these terms should be addressed in writing to:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814]">
                <p className="font-semibold">{companyProfile.legalName}</p>
                <p>Commercial Registration: 144352</p>
                <p>Facility: {companyProfile.contact.address}</p>
                <p>Postal Address: {companyProfile.contact.poBox}</p>
                <p>Telephone: {companyProfile.contact.phone}</p>
                <p>Email: {companyProfile.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
