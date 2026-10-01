import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { companyProfile } from '@/lib/config/company';

export const metadata: Metadata = {
  title: 'شروط الخدمة — نيرات للخدمات الغذائية قطر',
  description:
    'شروط الخدمة والمعاملات التجارية والتوريد لشركة نيرات للخدمات الغذائية ذ.م.م في الدوحة، قطر.',
  openGraph: {
    title: 'شروط الخدمة — نيرات للخدمات الغذائية قطر',
    description: 'شروط التوريد والمعاملات التجارية لشركة نيرات للخدمات الغذائية ذ.م.م.',
    url: 'https://nairatfoodservices.com/ar/terms',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArTermsPage(): React.ReactNode {
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
              الشروط التجارية والتعاقدية
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              شروط وأحكام التوريد التجاري
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
                تنظم هذه الشروط والأحكام كافة خدمات التوزيع والتجارة بالجملة وخدمات الأمانة واستخدام الموقع الإلكتروني المقدمة من شركة نيرات للخدمات الغذائية ذ.م.م (&quot;نيرات&quot;) داخل دولة قطر. يعد التعامل التجاري مع الشركة موافقة صريحة على هذه البنود.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. معايير سلسلة التبريد والفحص والاستلام
              </h2>
              <p>
                تخضع جميع الفواكه والخضروات والأعشاب الموردة لإجراءات استلام وفرز وتخزين وتوزيع صارمة بموجب شهادات HACCP و ISO 22000:2018 في منشأتنا بالمنطقة الصناعية. يلتزم المشتري بفحص الشحنات ومراجعة قراءات درجة الحرارة مع فريق التوصيل قبل التوقيع على الاستلام.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. الطلبيات والجداول الزمنية للتسليم
              </h2>
              <p>
                يتم توريد الطلبيات وفق الجداول المعتمدة مسبقاً. تشغل الشركة أسطولاً مبرداً يضم 40 شاحنة لضمان استمرار إمداد فروع الهايبرماركت والسوبرماركت وقطاع الضيافة في قطر. يتم إخطار العملاء فوراً بأي ظروف قاهرة قد تؤثر على الشحن الدولي أو المعابر.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. شراكات المزارعين وتوريد الأمانة
              </h2>
              <p>
                تخضع عقود التوريد وشراكات الأمانة مع المزارع العالمية والمحلية لسجلات تدقيق واضحة، وفحوصات رسمية للأوزان ومستويات الجودة عند الوصول، مع تسويات مالية مجدولة ومنتظمة.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. الإخطارات القانونية والمراسلات
              </h2>
              <p>
                توجه جميع المراسلات الرسمية والاستفسارات التعاقدية إلى مقر الشركة الرئيسي:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814]">
                <p className="font-semibold">{companyProfile.legalName}</p>
                <p>السجل التجاري: 144352</p>
                <p>الموقع: {companyProfile.contact.address}</p>
                <p>صندوق البريد: {companyProfile.contact.poBox}</p>
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
