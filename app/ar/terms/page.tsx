import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { getCompanyProfile } from '@/sanity/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'شروط الخدمة — نيرات للخدمات الغذائية قطر',
  description:
    'شروط الخدمة التجارية، وشروط التسليم، وشروط التداول لشركة نيرات للخدمات الغذائية ذ.م.م في الدوحة، قطر.',
  openGraph: {
    title: 'شروط الخدمة — نيرات للخدمات الغذائية قطر',
    description: 'شروط وأحكام التوريد التجاري لشركة نيرات للخدمات الغذائية ذ.م.م.',
    url: 'https://nairatfoodservices.com/ar/terms',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default async function ArTermsPage(): Promise<React.ReactNode> {
  const companyProfile = await getCompanyProfile();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title="شروط الخدمة"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'شروط الخدمة' },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]" dir="rtl">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              الشروط التجارية
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              شروط وأحكام التوريد
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              آخر تحديث: يناير 2026 · نيرات للخدمات الغذائية ذ.م.م
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                1. نطاق الاتفاقية
              </h2>
              <p>
                تحكم هذه الشروط والأحكام التوزيع، والتجارة بالجملة، وخدمات الأمانة، واستخدام الموقع الإلكتروني المقدم من شركة نيرات للخدمات الغذائية ذ.م.م (&quot;نيرات&quot;) داخل دولة قطر. من خلال التعامل مع خدماتنا أو الوصول إلى موقعنا، يوافق العملاء والشركاء على هذه الشروط.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. جودة سلسلة التبريد والفحص
              </h2>
              <p>
                يتم استلام جميع الفواكه الطازجة، والخضروات، وأعشاب الطهي الموردة من نيرات، وفرزها، وتخزينها، وإرسالها من خلال منشأتنا المعتمدة بشهادتي HACCP و ISO 22000:2018 في المنطقة الصناعية بالدوحة. يُطلب من المشترين فحص الشحنات عند التسليم والتحقق من قراءات درجة الحرارة مع سائقي التوصيل لدينا قبل التوقيع على الاستلام.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. الطلبيات، والجدولة والتسليم
              </h2>
              <p>
                يتم تلبية الطلبيات التجارية وفقاً لجداول التسليم المتفق عليها. تشغل نيرات أسطولاً مبرداً نشطاً مكوناً من 40 مركبة مما يضمن التسليم على مستوى المتاجر عبر الهايبرماركت، والسوبرماركت، ومشغلي الخدمات الغذائية في قطر. سيتم إبلاغ الظروف القاهرة التي تؤثر على الشحن الدولي أو المعابر الحدودية على الفور.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. شراكات المزارعين وتوريد الأمانة
              </h2>
              <p>
                تلتزم اتفاقيات الأمانة مع المزارعين الدوليين والمزارع المحلية بسجلات تدقيق شفافة، وعمليات فحص رسمية للوزن والتصنيف عند الاستلام، ودورات تسوية تجارية متفق عليها.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. استفسارات الشركات والإشعارات القانونية
              </h2>
              <p>
                يجب توجيه جميع الإشعارات أو الاستفسارات الرسمية المتعلقة بهذه الشروط كتابياً إلى:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814]">
                <p className="font-semibold">{companyProfile.legalName}</p>
                <p>السجل التجاري: 144352</p>
                <p>المنشأة: {companyProfile.contact.address}</p>
                <p>العنوان البريدي: {companyProfile.contact.poBox}</p>
                <p>الهاتف: {companyProfile.contact.phone}</p>
                <p>البريد الإلكتروني: {companyProfile.contact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
