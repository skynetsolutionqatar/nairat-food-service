'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

import { useLocale } from '@/context/LocaleContext';
import type { CompanyPageContent } from '@/sanity/lib/data';

interface CompanyVisionMissionProps {
  content?: CompanyPageContent;
}

export function CompanyVisionMission({ content }: CompanyVisionMissionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const defaultNarrativeParagraphs = isAr
    ? [
        'منذ تأسيسنا في عام 2020، وسّعت نيرات للأغذية قدراتها لتلبية الطلب المتزايد على المنتجات الطازجة في جميع أنحاء قطر.',
        'من التوريد العالمي إلى التوزيع الموثوق عبر سلسلة التبريد، نجمع بين المعرفة العميقة بالسوق المحلي وشراكات المزارعين الدولية لتقديم منتجات طازجة ومتسقة لعملاء التجزئة والجملة على مدار العام.',
      ]
    : [
        'Since our establishment in 2020, Nairat Food has expanded its capabilities to meet the growing demand for fresh produce across Qatar.',
        'From global sourcing to dependable cold-chain distribution, we combine deep local market knowledge with international grower partnerships to deliver consistent, fresh produce to retail and commercial clients year-round.',
      ];

  const narrativeText = isAr
    ? content?.visionMissionNarrativeAr?.replace(/والتجاريين/g, 'والجملة')
    : content?.visionMissionNarrative;
  const narrativeParagraphs = narrativeText?.includes('\n')
    ? narrativeText.split(/\n\s*\n|\n/).filter(Boolean)
    : narrativeText
    ? [narrativeText]
    : defaultNarrativeParagraphs;

  const renderTitle = () => {
    if (!isAr) {
      const text = content?.visionMissionTitle;
      if (text && text.includes('Growing a Fresher Future')) {
        return (
          <>
            Our Journey: <br />
            <span className="text-[#168849]">Growing a Fresher Future</span> <br />
            for Qatar.
          </>
        );
      }
      if (text) return text;
      return (
        <>
          Our Journey: <br />
          <span className="text-[#168849]">Growing a Fresher Future</span> <br />
          for Qatar.
        </>
      );
    } else {
      const text = content?.visionMissionTitleAr;
      if (text && text.includes('تنمية مستقبل أكثر نضارة')) {
        return (
          <>
            مسيرتنا: <br />
            <span className="text-[#168849]">تنمية مستقبل أكثر نضارة</span> <br />
            لقطر.
          </>
        );
      }
      if (text) return text;
      return (
        <>
          مسيرتنا: <br />
          <span className="text-[#168849]">تنمية مستقبل أكثر نضارة</span> <br />
          لقطر.
        </>
      );
    }
  };

  const visionTitle = isAr
    ? (content?.visionTitleAr || 'تنمية مستقبل أكثر نضارة لقطر.')
    : (content?.visionTitle || 'Growing a fresher future for Qatar.');
  const visionBody = isAr
    ? (content?.visionBodyAr || 'أن نكون المزود الرائد للفواكه والخضروات الطازجة في قطر، ونقدم جودة استثنائية، وخدمة موثوقة، وتوافراً على مدار العام مع خلق قيمة دائمة لعملائنا، وموردينا، ومجتمعاتنا.')
    : (content?.visionBody || "To be Qatar's premier provider of fresh fruits and vegetables, offering exceptional quality, dependable service and year-round availability while creating lasting value for our customers, suppliers and communities.");
  const missionTitle = isAr
    ? (content?.missionTitleAr || 'الجودة، والسلامة وقيمة أصحاب المصلحة')
    : (content?.missionTitle || 'Quality, Safety & Stakeholder Value');
  const missionBody = isAr
    ? (content?.missionBodyAr || 'نحن ملتزمون بتوريد منتجات طازجة عالية الجودة وبأسعار معقولة مع الحفاظ على ثقافة قوية لسلامة الغذاء عبر كل جانب من جوانب عملياتنا. نحن نستثمر باستمرار في موظفينا، وعملياتنا، وبنيتنا التحتية لبناء علاقات طويلة الأمد.')
    : (content?.missionBody || 'We are committed to supplying high-quality and affordable fresh produce while maintaining a strong food-safety culture across every aspect of our operations. We continuously invest in our people, processes and infrastructure to build long-term relationships.');

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textItems = section.querySelectorAll('.vision-mission-text-item');
    const cards = section.querySelectorAll('.vision-mission-card');
    if (textItems.length === 0 || cards.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      },
    });

    timeline
      .fromTo(
        textItems,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      )
      .fromTo(
        cards,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
        '-=0.25'
      );
  });

  return (
    <section
      id="vision-mission"
      ref={sectionRef}
      className="scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#111814] border-t border-neutral-100"
    >
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="vision-mission-text-item font-display type-h2 font-semibold text-[#111814] text-start leading-[1.12]">
              {renderTitle()}
            </h2>

            <div className="vision-mission-text-item space-y-3.5 font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-start">
              {narrativeParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Stacked Vision & Mission Cards with Highlight Badges (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 1: Our Vision */}
            <div className="vision-mission-card p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'رؤيتنا' : 'Our Vision'}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#111814] leading-snug text-start">
                {visionTitle}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55] text-start">
                {visionBody}
              </p>
            </div>

            {/* Card 2: Our Mission */}
            <div className="vision-mission-card p-6 sm:p-7 rounded-2xl bg-[#F8FAF8] border border-neutral-200/80 shadow-2xs space-y-3">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-md bg-[#FDE047] text-[#111814] font-display text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'رسالتنا' : 'Our Mission'}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[#111814] leading-snug text-start">
                {missionTitle}
              </h3>
              <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55] text-start">
                {missionBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
