'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

import { useLocale } from '@/context/LocaleContext';

export function CompanySourcing() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headers = section.querySelectorAll('.sourcing-header-item');
    const cards = section.querySelectorAll('.sourcing-card-item');
    if (headers.length === 0 || cards.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    timeline
      .fromTo(
        headers,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
      .fromTo(
        cards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );
  });

  return (
    <section
      id="sourcing"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Title & Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="sourcing-header-item font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
              {isAr ? (
                <>
                  التوريد الاستراتيجي: <br />
                  <span className="text-[#168849]">من البساتين العالمية</span> <br />
                  إلى قطر.
                </>
              ) : (
                <>
                  Strategic Sourcing: <br />
                  <span className="text-[#168849]">From Global Orchards</span> <br />
                  to Qatar.
                </>
              )}
            </h2>

            <div className="sourcing-header-item space-y-3.5 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start">
              <p>
                {isAr
                  ? 'المنتجات الطازجة موسمية. وإمدادنا يحتاج إلى أن يكون موثوقاً. تعمل نيرات مباشرة مع المزارعين والموردين عبر مناطق الإنتاج الرئيسية حول العالم.'
                  : 'Fresh produce is seasonal. Our supply needs to be dependable. Nairat works directly with growers and suppliers across major producing regions around the world.'}
              </p>
              <p>
                {isAr
                  ? 'تمتد شبكة التوريد لدينا عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، مما يسمح لنا بتخطيط الإمداد وفقاً للتوافر الموسمي والطلب في السوق.'
                  : 'Our sourcing network spans the Levant, Gulf, Africa, Asia and beyond, allowing us to plan supply according to seasonal availability and market demand.'}
              </p>
              <p>
                {isAr
                  ? 'من خلال التوريد من مناطق متعددة في وقت واحد، نحافظ على اتساق أكبر في جودة المنتج وتنوعه وتوافره طوال العام بأكمله.'
                  : 'By sourcing from multiple regions simultaneously, we maintain greater consistency in product quality, variety, and availability throughout the entire year.'}
              </p>
            </div>
          </div>

          {/* Right Column: Stacked Sourcing Cards with Yellow Badges (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 1: Multi-Region Network */}
            <div className="sourcing-card-item p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'توريد متنوع' : 'Diversified Sourcing'}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#111814] leading-snug text-start">
                {isAr ? 'بلاد الشام، والخليج، وإفريقيا وآسيا' : 'The Levant, Gulf, Africa & Asia'}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55] text-start">
                {isAr
                  ? 'علاقات مباشرة مع مزارعين موثوقين عبر الأردن، ولبنان، وسوريا، والمملكة العربية السعودية، ومصر، وجنوب إفريقيا، وتركيا، والهند تضمن وصولاً دون انقطاع للحمضيات، والفواكه ذات النواة الحجرية، والخضروات الورقية، والخضروات الجذرية، وخطوط الطهي الغريبة.'
                  : 'Direct relationships with verified growers across Jordan, Lebanon, Syria, Saudi Arabia, Egypt, South Africa, Turkey, and India ensure uninterrupted arrivals of citrus, stone fruits, leafy greens, root vegetables, and exotic culinary lines.'}
              </p>
            </div>

            {/* Card 2: Point of Entry Inspection */}
            <div className="sourcing-card-item p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'حدود أبو سمرة وضمان الجودة' : 'Abu Samra Border & QA'}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#111814] leading-snug text-start">
                {isAr ? 'الحجر الصحي على الحدود والفحص في المنشأ' : 'Border Quarantine & Origin Inspection'}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55] text-start">
                {isAr
                  ? 'تقوم فرق المشتريات لدينا بفحص الشحنات في بلد المنشأ والحفاظ على التحقق الفعال من الجودة في نقاط الدخول الرئيسية، بما في ذلك فحص ضمان الجودة البري عند حدود أبو سمرة البرية، قبل دخول الشحنة إلى مستودعنا الذي يتم التحكم في درجة حرارته في الدوحة.'
                  : 'Our procurement teams inspect consignments at origin and maintain active quality verification at key entry points, including overland QA inspection at the Abu Samra land border, before cargo enters our temperature-controlled warehouse in Doha.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
