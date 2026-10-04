import React from 'react';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { getCompanyProfile } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';

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
  const companyProfile = await getCompanyProfile();
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
              الشؤون القانونية والامتثال
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
                1. الالتزام بالخصوصية
              </h2>
              <p>
                تلتزم شركة نيرات للخدمات الغذائية ذ.م.م (&quot;نيرات&quot;، أو &quot;نحن&quot;، أو &quot;خاصتنا&quot;) بحماية خصوصية عملائنا التجاريين، وعملاء التجزئة، والمزارعين، وزوار الموقع الإلكتروني. تحدد سياسة الخصوصية هذه كيفية جمعنا للمعلومات المقدمة من خلال موقعنا الإلكتروني (nairatfoodservices.com) وقنواتنا التجارية في دولة قطر والتعامل معها وحمايتها.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                2. المعلومات التي نجمعها
              </h2>
              <p>نحن نجمع المعلومات فقط للعمليات التجارية المشروعة، بما في ذلك:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>معلومات الاتصال: الاسم، واسم الشركة، والبريد الإلكتروني للعمل، ورقم الهاتف، وموقع التسليم.</li>
                <li>استفسارات المشتريات التجارية، وطلبات عروض الأسعار (RFQs)، والمراسلات التجارية.</li>
                <li>مواصفات شحنات المزارعين والمصدرين، والوثائق، والشهادات.</li>
                <li>طلبات التوظيف، والسير الذاتية، وملفات تعريف المرشحين المقدمة.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                3. الغرض من المعالجة
              </h2>
              <p>تُستخدم المعلومات المقدمة إلى نيرات حصرياً من أجل:</p>
              <ul className="list-disc ps-6 space-y-1 text-sm sm:text-base text-[#4B5563]">
                <li>تنفيذ اتفاقيات التوزيع التجاري وجدولة تسليم المنتجات الطازجة.</li>
                <li>الرد على استفسارات العمل، وطلبات الخدمة، ومقترحات الشراكة.</li>
                <li>الامتثال للوائح وزارة الصحة العامة القطرية، وسلامة الغذاء، والتجارة.</li>
                <li>تحسين أداء الموقع الإلكتروني، وأمن الاتصالات، وتجربة المستخدم.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                4. أمن البيانات والاحتفاظ بها
              </h2>
              <p>
                نحن نطبق ضمانات إدارية وفنية ومادية متوافقة مع معايير الصناعة لمنع الوصول غير المصرح به إلى المعلومات أو الكشف عنها أو فقدانها. نحن لا نبيع أو نؤجر البيانات الشخصية أو التجارية لأطراف ثالثة.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#111814]">
                5. معلومات الاتصال
              </h2>
              <p>
                للأسئلة المتعلقة بهذه السياسة أو لطلب تحديثات البيانات، يرجى الاتصال بقسم الامتثال لدينا:
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
