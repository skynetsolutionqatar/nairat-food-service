'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';

import { useLocale } from '@/context/LocaleContext';

interface ScaleItem {
  value: string;
  valueAr?: string;
  label: string;
  labelAr: string;
}

const scaleItems: ScaleItem[] = [
  {
    value: '1,200+',
    label: 'active fresh produce lines',
    labelAr: 'خطوط منتجات طازجة نشطة',
  },
  {
    value: '15+',
    label: 'origin countries, plus Qatari farms',
    labelAr: 'دولة منشأ، بالإضافة إلى المزارع القطرية',
  },
  {
    value: '100+',
    label: 'retail branches supplied',
    labelAr: 'فرع تجزئة يتم توريده',
  },
  {
    value: '~100 t',
    valueAr: '~100 طن',
    label: 'of fresh produce delivered every day',
    labelAr: 'من المنتجات الطازجة تُسلَّم يومياً',
  },
  {
    value: '5,000 m²',
    valueAr: '5,000 م²',
    label: 'new temperature-controlled warehouse',
    labelAr: 'مستودع جديد يتم التحكم في درجة حرارته',
  },
  {
    value: '40',
    label: 'refrigerated delivery vehicles',
    labelAr: 'مركبة توصيل مبردة',
  },
  {
    value: '200+',
    label: 'people across sourcing, quality, warehousing and delivery',
    labelAr: 'شخص عبر التوريد والجودة والتخزين والتوصيل',
  },
  {
    value: 'HACCP',
    label: 'and ISO 22000:2018 certified food safety management',
    labelAr: 'وإدارة سلامة الغذاء المعتمدة وفق معيار ISO 22000:2018',
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

          {/* Right: 8 Scale Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {scaleItems.map((item, idx) => {
              const val = isAr && item.valueAr ? item.valueAr : item.value;
              const label = isAr ? item.labelAr : item.label;

              return (
                <div
                  key={idx}
                  className="infra-green-item p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors duration-300 space-y-1.5 text-start flex flex-col justify-center"
                >
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#D4F056] block tracking-tight">
                    {val}
                  </span>
                  <h3 className="font-display font-medium sm:font-semibold text-sm sm:text-base text-white leading-snug">
                    {label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
