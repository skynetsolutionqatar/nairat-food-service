'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

import { useLocale } from '@/context/LocaleContext';

interface ScaleItem {
  value: string;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}

const scaleItems: ScaleItem[] = [
  {
    value: '200+',
    label: 'Team Members',
    labelAr: 'أعضاء الفريق',
    description: 'Skilled logistics professionals, QA inspectors, and cold-storage operators.',
    descriptionAr: 'متخصصون لوجستيون ماهرون، ومفتشو ضمان الجودة، ومشغلو التخزين المبرد.',
  },
  {
    value: '5,000 m²',
    label: 'Cold-Chain Warehouse',
    labelAr: 'مستودع سلسلة التبريد',
    description: 'Purpose-built facility in Doha’s Industrial Area engineered for high-volume fresh handling.',
    descriptionAr: 'منشأة مصممة خصيصاً في المنطقة الصناعية بالدوحة ومجهزة للتعامل مع كميات كبيرة من المنتجات الطازجة.',
  },
  {
    value: '20',
    label: 'Dedicated Chiller Rooms',
    labelAr: 'غرف تبريد مخصصة',
    description: 'Custom temperature-controlled rooms, storing produce according to specific climate needs.',
    descriptionAr: 'غرف مخصصة يتم التحكم في درجة حرارتها، لتخزين المنتجات وفقاً للاحتياجات المناخية المحددة.',
  },
  {
    value: '40',
    label: 'Refrigerated Vehicles',
    labelAr: 'مركبات مبردة',
    description: 'Temperature-controlled fleet providing reliable daily distribution across all districts in Qatar.',
    descriptionAr: 'أسطول يتم التحكم في درجة حرارته يوفر توزيعاً يومياً موثوقاً في جميع مناطق قطر.',
  },
  {
    value: '6',
    label: 'Loading-Dock Truck Doors',
    labelAr: 'أبواب أرصفة تحميل الشاحنات',
    description: 'High-throughput receiving and dispatch bays minimizing produce exposure to ambient heat.',
    descriptionAr: 'أرصفة استلام وإرسال عالية السعة تقلل من تعرض المنتجات للحرارة المحيطة.',
  },
  {
    value: '1,200+',
    label: 'Active Produce Lines',
    labelAr: 'خطوط منتجات طازجة نشطة',
    description: 'Diverse catalog spanning fresh fruits, vegetables, and specialty gourmet lines across Qatar.',
    descriptionAr: 'كتالوج متنوع يشمل الفواكه الطازجة، والخضروات، وخطوط المنتجات الفاخرة المتخصصة في جميع أنحاء قطر.',
  },
];

export function CompanyInfrastructure() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headers = section.querySelectorAll('.infra-green-header');
    const cards = section.querySelectorAll('.infra-green-card');
    const items = section.querySelectorAll('.infra-green-item');
    if (headers.length === 0) return;

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
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
      );

    if (cards.length > 0) {
      timeline.fromTo(
        cards,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );
    }

    if (items.length > 0) {
      timeline.fromTo(
        items,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        '-=0.4'
      );
    }
  });

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-[#158647] text-white overflow-hidden"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Top Header: Left Title | Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end border-b border-white/20 pb-8 sm:pb-10">
          <div className="lg:col-span-7">
            <h2 className="infra-green-header font-display type-h2 font-semibold text-white text-start leading-[1.12]">
              {isAr ? (
                <>
                  صُممت حول النضارة: <br />
                  <span className="text-[#D4F056]">بنية تحتية مصممة للنمو والتوسع</span>
                </>
              ) : (
                <>
                  Built Around Freshness: <br />
                  <span className="text-[#D4F056]">Infrastructure Designed for Scale</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <p className="infra-green-header font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-white/90 leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              {isAr
                ? 'تشكل منشأة سلسلة التبريد المصممة خصيصاً لدينا في المنطقة الصناعية بالدوحة قلب عمليات التوزيع لدينا. مع غرف التبريد المخصصة، وبنية تحتية فعالة للتحميل، والنقل المبرد، تم تصميم منشأتنا لنقل المنتجات الطازجة بسرعة وأمان من الوصول إلى التسليم.'
                : "Our purpose-built cold-chain facility in Doha's Industrial Area forms the heart of our distribution operation. With dedicated chiller rooms, efficient loading infrastructure and refrigerated transportation, our facility is designed to move fresh produce quickly and safely from arrival to delivery."}
            </p>
          </div>
        </div>

        {/* Bottom Content: Left Photo | Right Stacked Scale Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Big Warehouse Photo Card */}
          <div className="infra-green-card lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5]">
              <Image
                src="/whychooseus/chiller-warehouse.avif"
                alt={isAr ? "منشأة مستودع التخزين المبرد لشركة نيرات للأغذية" : "Nairat Food Cold Storage Chiller Warehouse Facility"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-black/50 backdrop-blur-md text-white text-xs space-y-1 text-start">
                <span className="font-semibold text-[#D4F056] block uppercase tracking-wider">
                  {isAr ? 'مركز المنطقة الصناعية · الدوحة' : 'Industrial Area Hub · Doha'}
                </span>
                <span className="text-white/80 block">
                  {isAr
                    ? 'بنية تحتية لسلسلة تبريد غير منقطعة تعمل على مدار الساعة طوال أيام الأسبوع في جميع أنحاء قطر.'
                    : 'Unbroken cold-chain infrastructure operating 24/7 across Qatar.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Vertical Stack of 6 Scale Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {scaleItems.map((item, idx) => {
              const label = isAr ? item.labelAr : item.label;
              const desc = isAr ? item.descriptionAr : item.description;

              return (
                <div
                  key={idx}
                  className="infra-green-item p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors duration-300 space-y-2 text-start"
                >
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#D4F056] block">
                    {item.value}
                  </span>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                    {label}
                  </h3>
                  <p className="font-sans text-xs text-white/80 leading-[1.5]">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
