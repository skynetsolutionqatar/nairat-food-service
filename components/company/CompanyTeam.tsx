'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

import { useLocale } from '@/context/LocaleContext';

export function CompanyTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headers = section.querySelectorAll('.team-header-item');
    const imageContainer = section.querySelector('.team-image-container');
    if (headers.length === 0 || !imageContainer) return;

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
        imageContainer,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' },
        '-=0.3'
      );
  });

  return (
    <section
      id="team"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-[#F8FAF8] text-[#111814] border-t border-neutral-200/60"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header Block */}
        <div className="w-full space-y-4 text-start">
          <div className="team-header-item flex items-center gap-2">
            <Users className="w-4 h-4 text-[#168849]" aria-hidden="true" />
            <span className="font-display type-eyebrow text-[#168849] block">
              {isAr ? 'فريق العمل' : 'Our Team'}
            </span>
          </div>

          <h2 className="team-header-item font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
            {isAr ? 'كفاءات متميزة تقود مسيرة نمونا' : 'The People Driving Our Growth'}
          </h2>

          <p className="team-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] w-full text-justify">
            {isAr
              ? 'في نيرات للأغذية، ندرك تطلعات وأهداف كل فرد في عائلتنا المهنية واحتياجات أعمالنا المتنامية. مع أكثر من 200 موظف، نلتزم بتمكين كوادرنا لتحقيق أقصى إمكاناتهم. ففريقنا هو أثمن أصولنا، ونضع في مقدمة أولوياتنا سلامتهم ورفاههم وتطويرهم المهني لضمان استمرار ريادة ونجاح شركتنا.'
              : 'At Nairat Food, we understand the goals and aspirations of each team member, as well as the needs of our growing business. With 200 employees, we are committed to helping our team reach their full potential. Our people are one of our most valuable assets, and we prioritize their well-being, development and a safe working environment to ensure the continued success of our company.'}
          </p>
        </div>

        {/* Team Photo Feature Banner */}
        <div className="team-image-container relative rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 bg-white aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9]">
          <Image
            src="/team/team.jpg"
            alt={isAr ? "فريق عمل شركة نيرات للخدمات الغذائية" : "Nairat Food Services Dedicated Team Members"}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1280px) 100vw, 1240px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
