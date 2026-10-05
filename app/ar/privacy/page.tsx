import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { getCompanyProfile, getPrivacyPageContent } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'سياسة الخصوصية — نيرات للخدمات الغذائية قطر',
  description:
    'سياسة الخصوصية وممارسات حماية البيانات الشخصية لشركة نيرات للخدمات الغذائية ذ.م.م في الدوحة، قطر.',
  openGraph: {
    title: 'سياسة الخصوصية — نيرات للخدمات الغذائية قطر',
    description: 'سياسة خصوصية الشركة وحماية البيانات الشخصية لشركة نيرات للخدمات الغذائية ذ.م.م.',
    url: 'https://nairatfoodservices.com/ar/privacy',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArPrivacyPage(): Promise<React.ReactNode> {
  const [content, companyProfile] = await Promise.all([
    getPrivacyPageContent(),
    getCompanyProfile(),
  ]);

  const bannerTitle = content.bannerTitleAr || content.bannerTitle;
  const badge = content.badgeAr || content.badge;
  const title = content.titleAr || content.title;
  const lastUpdated = content.lastUpdatedAr || content.lastUpdated;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title={bannerTitle}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: bannerTitle },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]" dir="rtl">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              {badge}
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              {title}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              {lastUpdated}
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            {content.sections.map((sec, idx) => (
              <div key={sec._key || idx} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-[#111814]">
                  {sec.titleAr || sec.title}
                </h2>
                {(sec.bodyAr || sec.body) && (
                  <p className="whitespace-pre-line">{sec.bodyAr || sec.body}</p>
                )}
                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bp._key || bIdx}>{bp.textAr || bp.text}</li>
                    ))}
                  </ul>
                )}
                {idx === content.sections.length - 1 && (
                  <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814] mt-4">
                    <p className="font-semibold">{companyProfile.legalName}</p>
                    <p>العنوان: {companyProfile.contact.address}</p>
                    <p>صندوق البريد: {companyProfile.contact.poBox}</p>
                    <p>الهاتف: {companyProfile.contact.phone}</p>
                    <p>البريد الإلكتروني: {companyProfile.contact.email}</p>
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
