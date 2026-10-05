'use client';

import React, { useRef } from 'react';
import { ClipboardCheck, Filter, PackageCheck, Snowflake, Truck, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

import type { QualityPageContent } from '@/sanity/lib/data';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface QualitySupplyChainProps {
  content?: QualityPageContent;
}

export function QualitySupplyChain({ content }: QualitySupplyChainProps = {}): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.supplyChainEyebrowAr || 'ضوابط في كل مرحلة')
    : (content?.supplyChainEyebrow || 'CONTROLS AT EVERY STEP');
  const headline = isAr
    ? (content?.supplyChainTitleAr || 'ضوابط رقابية صارمة في كل خطوة')
    : (content?.supplyChainTitle || 'Controls at Every Step');
  const subtitle = isAr
    ? (content?.supplyChainSubtitleAr || 'من استلام الشحنات إلى باب العميل، تحمي بروتوكولات التحقق الصارمة سلامة المنتجات وتحافظ على سلسلة تبريد غير منقطعة مع التتبع الكامل.')
    : (content?.supplyChainSubtitle || 'From arrival to the customer’s door, strict verification protocols protect product integrity and maintain an unbroken cold chain.');

  const stepIcons = [ClipboardCheck, Filter, PackageCheck, Snowflake, Truck];

  const defaultRawSteps = [
    {
      number: '01',
      title: 'Receiving',
      titleAr: 'الاستلام والفحص',
      description: 'Temperature and quality checks on arrival, with rejection of non-conforming goods.',
      descriptionAr: 'فحوصات لدرجة الحرارة والجودة عند الوصول، مع رفض قاطع للبضائع غير المطابقة.',
    },
    {
      number: '02',
      title: 'Sorting & Grading',
      titleAr: 'الفرز والتصنيف',
      description: 'Every lot inspected and graded in the hygiene-controlled hall.',
      descriptionAr: 'فحص وتصنيف كل دفعة بعناية داخل صالة مجهزة ومضبوطة النظافة الصحية.',
    },
    {
      number: '03',
      title: 'Packing',
      titleAr: 'التعبئة والتغليف',
      description: 'Packed to customer specification with full lot traceability.',
      descriptionAr: 'تعبئة مخصصة وفق مواصفات العميل مع ترميز التتبع الكامل للدفعات.',
    },
    {
      number: '04',
      title: 'Cold Storage',
      titleAr: 'التخزين المبرد',
      description: 'Held at the right temperature, monitored around the clock.',
      descriptionAr: 'حفظ بدرجات حرارة مثالية دقيقة ومراقبة محوسبة على مدار الساعة.',
    },
    {
      number: '05',
      title: 'Dispatch & Delivery',
      titleAr: 'الشحن والتوصيل',
      description: 'Refrigerated vehicles keep the cold chain unbroken to the customer’s door.',
      descriptionAr: 'مركبات مبردة تحافظ على سلسلة التبريد دون انقطاع حتى باب العميل.',
    },
  ];

  const rawSteps = content?.supplyChainSteps && content.supplyChainSteps.length > 0
    ? content.supplyChainSteps
    : defaultRawSteps;

  const steps: StepItem[] = rawSteps.map((step, index) => {
    const IconComponent = stepIcons[index % stepIcons.length] || ClipboardCheck;
    return {
      number: step.number || `0${index + 1}`.slice(-2),
      title: isAr && step.titleAr ? step.titleAr : step.title,
      description: isAr && step.descriptionAr ? step.descriptionAr : (step.description || ''),
      icon: <IconComponent className="w-5 h-5" aria-hidden="true" />,
    };
  });

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        '.chain-header-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      ).fromTo(
        '.chain-step-node',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.05, ease: 'power3.out' },
        '-=0.25'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="supply-chain"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-[#F8FAF8] text-[#111814] border-t border-[#E3EBE5]/70"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7 space-y-3 text-start">
            <div className="chain-header-item">
              <SectionEyebrow title={eyebrow} />
            </div>

            <h2 className="chain-header-item font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111814] leading-[1.15] tracking-tight">
              {headline}
            </h2>
          </div>

          <div className="lg:col-span-5 text-start lg:text-end">
            <p className="chain-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] max-w-[48ch] lg:ms-auto">
              {subtitle}
            </p>
          </div>
        </div>

        {/* 5-Step Stepper Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="chain-step-node p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-[#168849]/40 transition-all duration-300 flex flex-col justify-between space-y-4 text-start group"
            >
              <div>
                {/* Step Icon with Connecting Arrow */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#168849]/10 text-[#168849] border border-[#168849]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#168849] group-hover:text-white group-hover:scale-105">
                    {step.icon}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center text-neutral-300 pe-1">
                      <ArrowRight
                        className="w-4 h-4 text-neutral-300 group-hover:text-[#168849] transition-colors rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                {/* Step Number & Title */}
                <div className="pt-3">
                  <span className="font-mono text-xs font-bold text-[#168849] tracking-wider block">
                    {step.number}
                  </span>
                  <h3 className="font-display font-semibold text-base text-[#111814] mt-1 leading-snug group-hover:text-[#168849] transition-colors">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs text-[#6B7280] leading-[1.55]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
