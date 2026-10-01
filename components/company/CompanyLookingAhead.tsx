'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

export function CompanyLookingAhead() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const card = section.querySelector('.ahead-feature-card');
    if (!card) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    timeline.fromTo(
      card,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
    );
  });

  return (
    <section
      id="looking-ahead"
      ref={sectionRef}
      className="scroll-mt-24 py-10 sm:py-12 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ahead-feature-card rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Narrative & Ambition (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-start">
              <SectionEyebrow title={isAr ? 'نظرة مستقبلية' : 'Looking Ahead'} />

              <h3 className="font-display font-semibold text-2xl sm:text-3xl 2xl:text-4xl text-[#111814] tracking-tight leading-[1.18]">
                {isAr ? 'بناء مستقبل توريد المحاصيل الزراعية الطازجة' : 'Building the Future of Fresh-Produce Supply'}
              </h3>

              <div className="space-y-3 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
                <p>
                  {isAr
                    ? 'تواصل شركة نيرات للخدمات الغذائية تعزيز شبكات التوريد، والقدرات التشغيلية، والبنية التحتية لتلبية الاحتياجات المتنامية لقطاعات التجزئة والأغذية في دولة قطر.'
                    : "Nairat Food continues to strengthen its sourcing network, operational capabilities and infrastructure to meet the evolving needs of Qatar's food and retail sectors."}
                </p>
                <p>
                  {isAr
                    ? 'ينصب تركيزنا الدائم على بناء شراكات استراتيجية متينة، وتوسيع نطاق الوصول إلى أرقى المحاصيل، وضمان إمداد موثوق ومستدام للمنتجات الطازجة على مدار العام.'
                    : 'Our focus remains on building stronger partnerships, expanding access to quality produce and delivering a dependable fresh-produce supply throughout the year.'}
                </p>
              </div>

              {/* Ambition Highlight Quote Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F6F5] border-s-4 border-[#168849] space-y-1">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[#168849]">
                  {isAr ? 'طموحنا الاستراتيجي' : 'Our Strategic Ambition'}
                </span>
                <p className="font-display text-base font-semibold text-[#111814] leading-snug">
                  {isAr
                    ? '«أن نكون الشريك الأكثر موثوقية في توريد المحاصيل الطازجة للشركات والمستهلكين في كافة أنحاء قطر.»'
                    : '“To become the trusted fresh-produce partner for businesses and consumers across Qatar.”'}
                </p>
              </div>
            </div>

            {/* Right: Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-neutral-100 border border-neutral-200/80">
                <Image
                  src="/whychooseus/truck.avif"
                  alt={isAr ? 'أسطول النقل المبرد الحديث لشركة نيرات' : 'Nairat Food Modern Refrigerated Logistics Fleet'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-white text-xs font-semibold px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md">
                  <span>{isAr ? 'شبكة التوزيع المبرد' : 'Refrigerated Delivery Network'}</span>
                  <span className="text-[#D4F056]">{isAr ? 'جاهزية 24/7' : 'Active 24/7'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
