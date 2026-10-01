'use client';

import React, { useRef } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { MapPin, Navigation, Clock, Warehouse, ShieldCheck } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useLocale } from '@/context/LocaleContext';

export function ContactMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

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
        '.map-anim-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      ).fromTo(
        '.map-container-card',
        { opacity: 0, y: 24, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="warehouse-location"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-20 bg-[#F4F8F5] text-[#111814] border-t border-neutral-200/80"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="map-anim-header space-y-3">
          <SectionEyebrow title={isAr ? 'موقع المرافق المركزية' : 'FACILITY LOCATION'} />

          <h2 className="font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
            {isAr
              ? 'مستودعنا المركزي ومرافق التبريد بالدوحة'
              : 'Our Doha Central Warehouse & Cold Storage'}
          </h2>
        </div>

        {/* Map Container with Details Overlay */}
        <div className="map-container-card rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm relative">
          {/* Top Facility Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#F8FAF8] border-b border-neutral-200/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">
                  {isAr ? 'الموقع' : 'Location'}
                </span>
                <span className="font-semibold text-[#111814]">
                  {isAr ? 'شارع 37، المنطقة الصناعية' : 'Street 37, Industrial Area'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <Warehouse className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">
                  {isAr ? 'الطاقة الاستيعابية' : 'Capacity'}
                </span>
                <span className="font-semibold text-[#111814]">
                  {isAr ? '5,000 م² • 20 غرفة تبريد' : '5,000 m² • 20 Chillers'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">
                  {isAr ? 'العمليات' : 'Operations'}
                </span>
                <span className="font-semibold text-[#111814]">
                  {isAr ? 'استلام وتوزيع 24/7' : '24/7 Receiving & Dispatch'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] block">
                  {isAr ? 'الامتثال والجودة' : 'Compliance'}
                </span>
                <span className="font-semibold text-[#111814]">
                  {isAr ? 'الهاسب • آيزو 22000' : 'HACCP • ISO 22000'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px]">
            <iframe
              title={
                isAr
                  ? 'موقع مستودع نيرات للأغذية المركزي بالدوحة'
                  : 'Nairat Food Central Warehouse Location Doha Qatar'
              }
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57763.27363835163!2d51.3660583!3d25.1963217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d10076a23d59%3A0x3ee7f3ae5d1130be!2sNairat%20Food%20-%20Main%20Warehouse!5e0!3m2!1sen!2sqa!4v1790839233998!5m2!1sen!2sqa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-95 contrast-105"
            />

            {/* Float Navigation Card */}
            <div className="absolute bottom-4 start-4 end-4 sm:end-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md flex items-center justify-between gap-4">
              <div>
                <span className="font-display font-bold text-sm text-[#111814] block">
                  {isAr ? 'شركة نيرات للخدمات الغذائية' : 'Nairat Food Services'}
                </span>
                <span className="font-sans text-xs text-[#6B7280] block">
                  {isAr
                    ? 'شارع 37، المنطقة الصناعية، الدوحة'
                    : 'Street 37, Industrial Area, Doha'}
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/FGEeJiMmQ172UCx3A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#168849] hover:bg-[#12723c] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? 'الاتجاهات' : 'Directions'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
