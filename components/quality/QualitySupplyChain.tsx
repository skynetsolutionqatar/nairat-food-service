'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Sprout, Search, Snowflake, Truck, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function QualitySupplyChain(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const steps: StepItem[] = [
    {
      number: '01',
      title: isAr ? 'التوريد' : 'Source',
      description: isAr
        ? 'نحن نتشارك مع مزارعين وموردين موثوقين في جميع أنحاء العالم.'
        : 'We partner with trusted growers and suppliers worldwide.',
      icon: <Sprout className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      number: '02',
      title: isAr ? 'الفحص' : 'Inspect',
      description: isAr
        ? 'يتم فحص واختبار كل شحنة للتأكد من الجودة والسلامة.'
        : 'Every consignment is inspected and tested for quality and safety.',
      icon: <Search className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      number: '03',
      title: isAr ? 'سلسلة التبريد' : 'Cold Chain',
      description: isAr
        ? 'تخزين ونقل يتم التحكم في درجة حرارته للحفاظ على النضارة.'
        : 'Temperature-controlled storage and transport maintain freshness.',
      icon: <Snowflake className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      number: '04',
      title: isAr ? 'التسليم' : 'Deliver',
      description: isAr
        ? 'تصل المنتجات الطازجة إلى عملائنا في جميع أنحاء قطر.'
        : 'Fresh produce reaches our customers across Qatar.',
      icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.chain-anim-left',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      ).fromTo(
        '.chain-step-node',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="supply-chain"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Narrative (4 cols) */}
          <div className="chain-anim-left lg:col-span-4 space-y-4 text-start">
            <SectionEyebrow title={isAr ? 'سلسلة التوريد لدينا' : 'OUR SUPPLY CHAIN'} />

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111814] leading-[1.15] tracking-tight">
              {isAr ? 'من المزرعة إليك' : 'From Farm to You'}
            </h2>

            <p className="font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
              {isAr
                ? 'تم بناء سلسلة التوريد لدينا على الشفافية، والتحكم، والموثوقية - مما يضمن وصول المنتجات الطازجة إليك في حالة ممتازة.'
                : 'Our supply chain is built on transparency, control and reliability — ensuring fresh produce reaches you in perfect condition.'}
            </p>
          </div>

          {/* Right Column: 4-Step Stepper with Arrows (8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <div key={step.number} className="chain-step-node flex flex-col space-y-3 relative text-start">
                  {/* Step Icon with Optional Connecting Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#EBF5EE] border border-[#168849]/20 flex items-center justify-center">
                      {step.icon}
                    </div>

                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center text-neutral-300 w-full px-2">
                        <ArrowRight className="w-4 h-4 text-neutral-300 rtl:rotate-180" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Step Number, Title & Description */}
                  <div>
                    <span className="font-mono text-sm font-bold text-[#168849] block">
                      {step.number}
                    </span>
                    <h3 className="font-display font-semibold text-base text-[#111814] mt-1">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-[#6B7280] leading-[1.55] mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
