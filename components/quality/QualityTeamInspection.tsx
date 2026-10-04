'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCheck } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

import type { QualityPageContent } from '@/sanity/lib/data';

interface QualityTeamInspectionProps {
  content?: QualityPageContent;
}

export function QualityTeamInspection({ content }: QualityTeamInspectionProps = {}): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const eyebrow = isAr
    ? (content?.inspectionEyebrowAr || 'الفحص والرقابة الصحية')
    : (content?.inspectionEyebrow || 'INSPECTION & HYGIENE');
  const headline = isAr
    ? (content?.inspectionTitleAr || 'فريق رقابة متخصص. فحص دقيق قبل كل شحنة.')
    : (content?.inspectionTitle || 'A Dedicated QA Team. Inspected Before It Ships.');
  const pillar1Title = isAr
    ? (content?.inspectionPillar1TitleAr || 'فريق متخصص لسلامة الغذاء والنظافة الصحية')
    : (content?.inspectionPillar1Title || 'A Dedicated Food Safety & Hygiene Team');
  const pillar1Desc = isAr
    ? (content?.inspectionPillar1DescAr || 'يضع قسم سلامة الغذاء والنظافة الصحية لدينا السياسات الصارمة، ويدرب كل موظف ويدقق العمليات على أرض الواقع باستمرار. تمتد برامج التدريب بشكل دوري، من أساسيات سلامة الغذاء وحسن الإدارة إلى تدريب المشرفين على إدارة معايير ISO 22000:2018.')
    : (content?.inspectionPillar1Desc || 'Our food safety and hygiene department sets the policies, trains every employee and audits the floor. Training runs continuously, from basic food safety and housekeeping to ISO 22000:2018 management training for supervisors.');
  const pillar2Title = isAr
    ? (content?.inspectionPillar2TitleAr || 'فحص دقيق قبل كل شحنة وتوزيع')
    : (content?.inspectionPillar2Title || 'Inspected Before It Ships');
  const pillar2Desc = isAr
    ? (content?.inspectionPillar2DescAr || 'يتم فحص كل دفعة واردة ومطابقتها لمواصفاتنا المحددة لدرجة الحرارة، ومستوى النضج، والحجم، وخلوها من العيوب. تُرفض المنتجات غير المطابقة أو تُخفض درجتها قبل وصولها لخط التعبئة، وتغادر كل شحنة برقم الدفعة المرجعي لضمان التتبع الكامل.')
    : (content?.inspectionPillar2Desc || 'Every incoming lot is checked against our specifications for temperature, ripeness, size and defects. Goods that fail are rejected or downgraded before they reach the packing line, and every delivery leaves with its lot reference for full traceability.');

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
        '.team-anim-image',
        { opacity: 0, x: isAr ? 20 : -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      ).fromTo(
        '.team-anim-content',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out' },
        '-=0.3'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="team-inspection"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Team Inspection Photo (6 cols) */}
          <div className="team-anim-image lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-neutral-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-neutral-100 group">
              <Image
                src="/quality/qa-team-inspection.webp"
                alt={
                  isAr
                    ? 'فريق ضمان الجودة وسلامة الغذاء لشركة نيرات أثناء فحص المنتجات الطازجة'
                    : 'Nairat Food Quality Assurance and Food Safety Team Inspecting Fresh Produce'
                }
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Facility Badge */}
              <div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-black/65 backdrop-blur-md text-white text-xs space-y-1 text-start">
                <span className="font-semibold text-[#D4F056] block uppercase tracking-wider">
                  {isAr ? 'صالة فحص الجودة · المنطقة الصناعية، الدوحة' : 'QA Inspection Hall · Industrial Area, Doha'}
                </span>
                <span className="text-white/85 block leading-relaxed">
                  {isAr
                    ? 'فحص مخبري مستمر ومراقبة درجات الحرارة لجميع الشحنات الواردة لضمان التتبع والأمان.'
                    : 'Continuous lot sampling, digital refractometry, and core temperature checks on arrival.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 2 Detailed Quality Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div className="team-anim-content space-y-3">
              <SectionEyebrow title={eyebrow} />

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111814] leading-[1.18] tracking-tight whitespace-pre-line">
                {headline}
              </h2>
            </div>

            {/* Pillar 1: Dedicated Team */}
            <div className="team-anim-content p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 hover:border-[#168849]/30 transition-colors duration-300 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#111814]">
                  {pillar1Title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-[14px] text-[#47554E] leading-[1.6]">
                {pillar1Desc}
              </p>
            </div>

            {/* Pillar 2: Inspected Before It Ships */}
            <div className="team-anim-content p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 hover:border-[#168849]/30 transition-colors duration-300 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#168849]/10 text-[#168849] flex items-center justify-center shrink-0">
                  <CheckCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#111814]">
                  {pillar2Title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-[14px] text-[#47554E] leading-[1.6]">
                {pillar2Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
