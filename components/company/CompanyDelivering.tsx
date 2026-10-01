'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

import { useLocale } from '@/context/LocaleContext';

export function CompanyDelivering() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imageCard = section.querySelector('.delivering-image-card');
    const textItems = section.querySelectorAll('.delivering-text-item');
    if (!imageCard || textItems.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    timeline
      .fromTo(
        imageCard,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' }
      )
      .fromTo(
        textItems,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
  });

  return (
    <section
      id="delivering"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814]"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Image Card (5 cols) */}
          <div className="delivering-image-card lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/4.5]">
              <Image
                src="/whychooseus/warehouse.avif"
                alt={isAr ? "مرافق التوزيع وسلاسل التبريد لشركة نيرات بالدوحة" : "Nairat Food Cold-Chain Distribution Facility in Doha"}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Meta Badges */}
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between gap-3 text-white text-xs font-semibold">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#168849]/95 backdrop-blur-md shadow-sm">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isAr ? 'تأسست 2020' : 'Est. 2020'}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-[#D4F056]" aria-hidden="true" />
                  <span>{isAr ? 'شارع 37، المنطقة الصناعية' : 'Street 37, Industrial Area'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy + Commitment Box (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="delivering-text-item">
              <SectionEyebrow title={isAr ? 'توصيل النضارة' : 'Delivering Freshness'} />
            </div>

            <h2 className="delivering-text-item font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
              {isAr ? (
                <>
                  شريك شامل للمنتجات <br className="hidden sm:inline" />
                  <span className="text-[#168849]">الطازجة لقطر.</span>
                </>
              ) : (
                <>
                  A comprehensive fresh-produce <br className="hidden sm:inline" />
                  <span className="text-[#168849]">partner for Qatar.</span>
                </>
              )}
            </h2>

            <div className="space-y-3.5 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start">
              <p className="delivering-text-item">
                {isAr
                  ? 'تعد نيرات للأغذية إحدى الشركات الرائدة في مجال المنتجات الطازجة في قطر، وهي متخصصة في استيراد وتوزيع وتسليم الفواكه والخضروات الفاخرة.'
                  : "Nairat Food is one of Qatar's leading fresh-produce houses, specializing in the import, distribution and delivery of premium fruits and vegetables."}
              </p>
              <p className="delivering-text-item">
                {isAr
                  ? 'تأسست نيرات في عام 2020، ونمت بسرعة من خلال الجمع بين التوريد العالمي، والمعرفة القوية بالسوق المحلي، والخدمات اللوجستية الموثوقة. اليوم، نحن نخدم الهايبرماركت، والسوبرماركت، ومشتري الجملة، وشركات الخدمات الغذائية، والمستهلكين في جميع أنحاء قطر.'
                  : 'Established in 2020, Nairat has grown rapidly by combining global sourcing, strong local market knowledge and dependable logistics. Today, we serve hypermarkets, supermarkets, wholesale buyers, food-service businesses and consumers across Qatar.'}
              </p>
              <p className="delivering-text-item">
                {isAr
                  ? 'من المزارع عبر بلاد الشام، والخليج، وإفريقيا، وآسيا وما وراءها، تنتقل منتجاتنا عبر سلسلة توريد متكاملة مصممة للحفاظ على النضارة من المصدر إلى العميل.'
                  : 'From farms across the Levant, Gulf, Africa, Asia and beyond, our produce travels through an integrated supply chain designed to preserve freshness from source to customer.'}
              </p>
            </div>

            {/* Commitment Box Matching Reference Card */}
            <div className="delivering-text-item group p-5 sm:p-6 rounded-[19px] border border-neutral-200/90 flex items-start gap-5 shadow-2xs hover:border-neutral-300 transition-colors duration-300">
              <div className="commitment-icon-ring shrink-0 bg-white">
                <ShieldCheck
                  className="w-7 h-7 text-[#88888A] group-hover:text-[#168849] transition-colors duration-300 relative z-10"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1.5 flex-1 text-start">
                <h3 className="font-display font-semibold text-base sm:text-lg text-[#111814]">
                  {isAr ? 'التزامنا الأساسي' : 'Our Core Commitment'}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]">
                  {isAr
                    ? 'تقديم منتجات طازجة عالية الجودة بأمان، وكفاءة، وبشكل متسق. تم التوريد بعناية. تم التعامل بدقة. تم التسليم بكل ثقة.'
                    : 'To deliver high-quality fresh produce safely, efficiently and consistently. Sourced with care. Handled with precision. Delivered with confidence.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
