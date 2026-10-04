import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { getCompanyProfile } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Privacy Policy — Nairat Food Services Qatar',
  description:
    'Privacy Policy and personal data protection practices of Nairat Food Services W.L.L in Doha, Qatar.',
  openGraph: {
    title: 'Privacy Policy — Nairat Food Services Qatar',
    description: 'Corporate privacy and personal data protection policy for Nairat Food Services W.L.L.',
    url: 'https://nairatfoodservices.com/privacy',
    siteName: 'Nairat Food Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function PrivacyPage(): Promise<React.ReactNode> {
  const companyProfile = await getCompanyProfile();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title="Privacy Policy"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              Legal &amp; Compliance
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              Privacy &amp; Data Protection Policy
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              Last updated: January 2026 · Nairat Food Services W.L.L
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                1. Commitment to Privacy
              </h2>
              <p>
                Nairat Food Services W.L.L (&quot;Nairat&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of our commercial clients, retail customers, growers, and website visitors. This Privacy Policy outlines how we collect, handle, and safeguard information submitted through our website (nairatfoodservices.com) and commercial channels in the State of Qatar.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. Information We Collect
              </h2>
              <p>We collect information solely for legitimate business operations, including:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>Contact information: Name, company name, business email, phone number, and delivery location.</li>
                <li>Commercial procurement inquiries, requests for quotation (RFQs), and trade correspondence.</li>
                <li>Grower and exporter consignment specifications, documentation, and certifications.</li>
                <li>Employment applications, resumes, and candidate profile submissions.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. Purpose of Processing
              </h2>
              <p>Information provided to Nairat is used exclusively to:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>Fulfill commercial distribution agreements and schedule fresh produce deliveries.</li>
                <li>Respond to business inquiries, service requests, and partnership proposals.</li>
                <li>Comply with Qatar Ministry of Public Health, food safety, and trade regulations.</li>
                <li>Enhance website performance, communication security, and user experience.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. Data Security &amp; Retention
              </h2>
              <p>
                We implement industry-standard administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, or loss of information. We do not sell, rent, or lease personal or commercial data to third parties.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. Contact Information
              </h2>
              <p>
                For questions regarding this policy or to request data updates, please contact our compliance department:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814]">
                <p className="font-semibold">{companyProfile.legalName}</p>
                <p>Address: {companyProfile.contact.address}</p>
                <p>P.O. Box: {companyProfile.contact.poBox}</p>
                <p>Phone: {companyProfile.contact.phone}</p>
                <p>Email: {companyProfile.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
