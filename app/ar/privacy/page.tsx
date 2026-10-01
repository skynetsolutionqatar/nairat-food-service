import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { companyProfile } from '@/lib/config/company';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية — نيرات للخدمات الغذائية قطر',
  description:
    'سياسة الخصوصية وحماية البيانات الشخصية لشركة نيرات للخدمات الغذائية ذ.م.م في الدوحة، قطر.',
  openGraph: {
    title: 'سياسة الخصوصية — نيرات للخدمات الغذائية قطر',
    description: 'سياسة حماية البيانات والخصوصية لشركة نيرات للخدمات الغذائية ذ.م.م.',
    url: 'https://nairatfoodservices.com/ar/privacy',
    siteName: 'نيرات للخدمات الغذائية',
    locale: 'ar_QA',
    type: 'website',
  },
};

export default function ArPrivacyPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner
        title="سياسة الخصوصية"
        breadcrumbs={[
          { label: 'الرئيسية', href: '/ar' },
          { label: 'سياسة الخصوصية' },
        ]}
      />

      <section className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]" dir="rtl">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#168849]">
              الامتثال القانوني والخصوصية
            </span>
            <h1 className="font-display type-h2 font-semibold text-[#111814]">
              سياسة الخصوصية وحماية البيانات
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280]">
              آخر تحديث: يناير 2026 · نيرات للخدمات الغذائية ذ.م.م
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-8 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                1. التزامنا بحماية الخصوصية
              </h2>
              <p>
                تلتزم شركة نيرات للخدمات الغذائية ذ.م.م (&quot;نيرات&quot; أو &quot;نحن&quot;) بحماية خصوصية عملائنا التجاريين ومستهلكينا وشركائنا الزراعيين وزوار موقعنا الإلكتروني. توضح هذه السياسة كيفية جمع البيانات واستخدامها وحمايتها عبر قنواتنا الرسمية وموقعنا الإلكتروني (nairatfoodservices.com) في دولة قطر وفقاً للقوانين المعمول بها.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. البيانات التي نقوم بجمعها
              </h2>
              <p>نقوم بجمع البيانات اللازمة لتسيير المعاملات التجارية وتقديم الخدمات، بما في ذلك:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>معلومات الاتصال: الاسم، اسم الشركة أو المؤسسة، البريد الإلكتروني المهني، رقم الهاتف، وعنوان التسليم.</li>
                <li>طلبات عروض الأسعار (RFQ)، ومراسلات التوريد، والاتفاقيات التجارية.</li>
                <li>وثائق ومواصفات الشحنات الخاصة بالمزارعين والمصدرين وشهادات سلامة الأغذية.</li>
                <li>طلبات التوظيف والسير الذاتية المقدمة للعمل لدى الشركة.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. أغراض معالجة واستخدام البيانات
              </h2>
              <p>تُستخدم البيانات المقدمة حصرياً للأغراض التالية:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>تنفيذ عقود التوريد وتنسيق الجداول اليومية لتسليم المحاصيل الطازجة.</li>
                <li>الرد على الاستفسارات التجارية وتنسيق الشراكات مع المزارعين والموردين.</li>
                <li>الامتثال لمتطلبات وزارة الصحة العامة والمعايير القطرية لسلامة الغذاء.</li>
                <li>تطوير كفاءة موقعنا الإلكتروني وأمن الاتصالات والخدمات المقدمة.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. أمن البيانات وسريتها
              </h2>
              <p>
                نطبق إجراءات وتدابير أمنية وفنية وإدارية دقيقة لمنع الوصول غير المصرح به إلى المعلومات أو تسريبها. نحن لا نبيع ولا نؤجر البيانات لأي طرف ثالث.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. قنوات التواصل والاستفسارات
              </h2>
              <p>
                لأي استفسار يتعلق بهذه السياسة أو لتحديث بياناتكم المسجلة، يرجى التواصل مع إدارة الامتثال:
              </p>
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-neutral-200 space-y-1 text-sm text-[#111814]">
                <p className="font-semibold">{companyProfile.legalName}</p>
                <p>العنوان: {companyProfile.contact.address}</p>
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
