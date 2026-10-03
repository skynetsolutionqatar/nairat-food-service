'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import { ArrowRight } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useLocale } from '@/context/LocaleContext';

interface ServiceCard {
  id: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  imageUrl: string;
  actionText: string;
  actionTextAr: string;
  actionHref: string;
  actionHrefAr: string;
  isExternal?: boolean;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'global-sourcing-import',
    title: 'Global Sourcing & Import',
    titleAr: 'التوريد العالمي والاستيراد',
    desc: 'Direct relationship with growers and exporters across Europe, the Middle East and Asia. More than 1,200 active lines, selected for quality, shelf life and value, and consolidated through our own import operation.',
    descAr: 'علاقات مباشرة مع المزارعين والمصدرين عبر أوروبا والشرق الأوسط وآسيا. أكثر من 1,200 صنف نشط، مختارة للجودة وفترة الصلاحية والقيمة، ومجمعة عبر عمليات الاستيراد الخاصة بنا.',
    imageUrl: '/services/global-sourcing-import.webp',
    actionText: 'Partner with Sourcing',
    actionTextAr: 'استكشف التوريد العالمي',
    actionHref: '/contact?subject=sourcing',
    actionHrefAr: '/ar/contact?subject=sourcing',
  },
  {
    id: 'retail-supply-management',
    title: 'Retail Supply & Category Management',
    titleAr: 'توريد التجزئة وإدارة الفئات',
    desc: 'Daily supply to hypermarket and supermarket chains, from basic replenishment to full category management of the fresh section, including range planning, pricing and in-store availability.',
    descAr: 'إمداد يومي لسلاسل الهايبرماركت والسوبرماركت، من تجديد المخزون الأساسي إلى الإدارة الكاملة لفئة المنتجات الطازجة، بما في ذلك تخطيط التشكيلة والتسعير والتوافر على الرفوف.',
    imageUrl: '/services/retail-supply-management.webp',
    actionText: 'Inquire for Retail Supply',
    actionTextAr: 'استفسر عن توريد التجزئة',
    actionHref: '/contact?subject=retail',
    actionHrefAr: '/ar/contact?subject=retail',
  },
  {
    id: 'wholesale-foodservice',
    title: 'Wholesale & Foodservice',
    titleAr: 'التوريد بالجملة والخدمات الغذائية',
    desc: 'Bulk supply to wholesalers, caterers, restaurants and independent grocers, with the same sorting, packing and cold-chain standards as our retail programme.',
    descAr: 'توريد كميات كبيرة لتجار الجملة، ومتعهدي الحفلات، والمطاعم، ومتاجر البقالة المستقلة، بنفس معايير الفرز والتعبئة وسلسلة التبريد المطبقة في برنامجنا للتجزئة.',
    imageUrl: '/services/wholesale-foodservice.webp',
    actionText: 'Request Wholesale Rates',
    actionTextAr: 'اطلب أسعار الجملة',
    actionHref: '/contact?subject=wholesale',
    actionHrefAr: '/ar/contact?subject=wholesale',
  },
  {
    id: 'quick-commerce-grocery',
    title: 'Quick-Commerce & Online Grocery',
    titleAr: 'التجارة السريعة والبقالة الإلكترونية',
    desc: 'Cross-dock supply to dark-store and online grocery networks, packed to order and delivered to their operating rhythm, with weekly price lists and short lead times.',
    descAr: 'إمداد مباشر ومتقاطع لشبكات المتاجر المظلمة وتطبيقات البقالة الرقمية، معبأ حسب الطلب ومسلّم وفق إيقاع تشغيلها، مع قوائم أسعار أسبوعية وأوقات استجابة سريعة.',
    imageUrl: '/services/quick-commerce-grocery.webp',
    actionText: 'Connect for Q-Commerce',
    actionTextAr: 'تواصل لخدمات التجارة السريعة',
    actionHref: '/contact?subject=qcommerce',
    actionHrefAr: '/ar/contact?subject=qcommerce',
  },
  {
    id: 'cold-storage-logistics',
    title: 'Cold Storage & Logistics for Partners',
    titleAr: 'التخزين المبرد والخدمات اللوجستية للشركاء',
    desc: 'Temperature-controlled cold rooms with pallet racking, forklift handling, order picking and refrigerated delivery, available to retail and e-commerce partners who need a central warehouse in Doha.',
    descAr: 'غرف تبريد يتم التحكم بدرجات حرارتها مع رفوف للطبليات، ومناولة بالرافعات الشوكية، وانتقاء الطلبات، وتوصيل مبرد، متاحة لشركاء التجزئة والتجارة الإلكترونية المحتاجين لمستودع مركزي في الدوحة.',
    imageUrl: '/services/cold-storage-logistics.webp',
    actionText: 'Book Storage & Logistics',
    actionTextAr: 'احجز التخزين واللوجستيات',
    actionHref: '/contact?subject=logistics',
    actionHrefAr: '/ar/contact?subject=logistics',
  },
  {
    id: 'local-farm-partnerships',
    title: 'Local Farm Partnerships',
    titleAr: 'شراكات المزارع المحلية',
    desc: "Through our agreement with Mahaseel, Qatar's agricultural marketing company, we bring Qatari-grown vegetables to market alongside imports, supporting local farmers and national food security.",
    descAr: 'من خلال اتفاقيتنا مع شركة "محاصيل"، شركة التسويق الزراعي القطرية، نطرح الخضروات المزروعة محلياً في الأسواق جنباً إلى جنب مع الواردات، دعماً للمزارعين المحليين والأمن الغذائي الوطني.',
    imageUrl: '/services/local-farm-partnerships.webp',
    actionText: 'Partner Local Produce',
    actionTextAr: 'شارك في الإنتاج المحلي',
    actionHref: '/contact?subject=local-farms',
    actionHrefAr: '/ar/contact?subject=local-farms',
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        '.service-header-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
      ).fromTo(
        '.service-card-item',
        { opacity: 0, y: 20, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.05, ease: 'power3.out' },
        '-=0.25'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="services" ref={containerRef} className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-16 2xl:py-22 bg-white">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 2xl:space-y-12">
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 2xl:gap-10 items-end">
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-3">
            <div className="service-header-item">
              <SectionEyebrow title={isAr ? 'ما نقوم به' : 'WHAT WE DO'} />
            </div>
            <h2 className="service-header-item font-display type-h2 font-semibold text-[#111814] text-start">
              {isAr ? (
                <>
                  إمداد المنتجات الطازجة <br />
                  على كل المستويات.
                </>
              ) : (
                <>
                  Fresh Produce Supply <br />
                  at Every Scale.
                </>
              )}
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-4 2xl:space-y-5">
            <p className="service-header-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[48ch] 2xl:max-w-[52ch]">
              {isAr
                ? 'من التوريد والتوزيع إلى التجزئة، نربط المنتجات الطازجة المتميزة بالشركات والمستهلكين في جميع أنحاء قطر.'
                : 'From sourcing and distribution to retail, we connect premium fresh produce with businesses and consumers across Qatar.'}
            </p>
            <div className="service-header-item self-start lg:self-end">
              <CtaButton href={isAr ? '/ar/services' : '/services'}>
                {isAr ? 'اعرف المزيد' : 'Learn More'}
              </CtaButton>
            </div>
          </div>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="services-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 2xl:gap-8">
          {serviceCards.map((service) => {
            const title = isAr ? service.titleAr : service.title;
            const desc = isAr ? service.descAr : service.desc;
            const actionText = isAr ? service.actionTextAr : service.actionText;
            const actionHref = isAr ? service.actionHrefAr : service.actionHref;

            return (
              <div
                key={service.id}
                className="service-card-item flex flex-col justify-between space-y-3.5 group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Top Rounded Image */}
                <div className="relative w-full h-48 sm:h-52 md:h-56 2xl:h-60 rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={service.imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
                    loading="lazy"
                  />
                </div>

                {/* Card Text & Link below image */}
                <div className="flex flex-col flex-1 justify-between space-y-3 pt-0.5">
                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-lg sm:text-xl 2xl:text-2xl text-[#111814] tracking-[-0.015em] leading-snug group-hover:text-[#168849] transition-colors duration-200 text-start">
                      {title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.6] text-start">
                      {desc}
                    </p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={actionHref}
                      target={service.isExternal ? '_blank' : undefined}
                      rel={service.isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold tracking-[-0.01em] text-[#111814] hover:text-[#168849] transition-colors group/link cursor-pointer"
                    >
                      <span>{actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
