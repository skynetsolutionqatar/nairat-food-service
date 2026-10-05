import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { getCompanyProfile, getPrivacyPageContent } from '@/sanity/lib/data';

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
  const [content, companyProfile] = await Promise.all([
    getPrivacyPageContent(),
    getCompanyProfile(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title={content.bannerTitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: content.bannerTitle },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              {content.badge}
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              {content.title}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              {content.lastUpdated}
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            {content.sections.map((sec, idx) => (
              <div key={sec._key || idx} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-[#111814]">
                  {sec.title}
                </h2>
                {sec.body && <p className="whitespace-pre-line">{sec.body}</p>}
                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bp._key || bIdx}>{bp.text}</li>
                    ))}
                  </ul>
                )}
                {idx === content.sections.length - 1 && (
                  <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814] mt-4">
                    <p className="font-semibold">{companyProfile.legalName}</p>
                    <p>Address: {companyProfile.contact.address}</p>
                    <p>P.O. Box: {companyProfile.contact.poBox}</p>
                    <p>Phone: {companyProfile.contact.phone}</p>
                    <p>Email: {companyProfile.contact.email}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
