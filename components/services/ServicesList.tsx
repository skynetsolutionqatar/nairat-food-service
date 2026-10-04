'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2, Globe, ShoppingBag, Truck, Zap, Warehouse, Sprout } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { CtaButton } from '@/components/ui/CtaButton';
import { useLocale } from '@/context/LocaleContext';
import type { ServiceData } from '@/sanity/lib/data';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
  actionText: string;
  actionHref: string;
  isExternal?: boolean;
  icon: React.ReactNode;
}

interface ServicesListProps {
  services?: ServiceData[];
}

export function ServicesList({ services }: ServicesListProps = {}): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale, dict } = useLocale();
  const prefix = locale === 'ar' ? '/ar' : '';

  const servicesData: ServiceItem[] = [
    {
      id: 'global-sourcing-import',
      number: '01',
      category: locale === 'ar' ? 'المشتريات والاستيراد العالمي' : 'Global Procurement & Import',
      title: locale === 'ar' ? 'التوريد العالمي والاستيراد' : 'Global Sourcing & Import',
      description:
        locale === 'ar'
          ? 'علاقات مباشرة مع المزارعين والمصدرين عبر أوروبا والشرق الأوسط وآسيا. أكثر من 1,200 صنف نشط، مختارة للجودة وفترة الصلاحية والقيمة، ومجمعة عبر عمليات الاستيراد الخاصة بنا.'
          : 'Direct relationship with growers and exporters across Europe, the Middle East and Asia. More than 1,200 active lines, selected for quality, shelf life and value, and consolidated through our own import operation.',
      imageUrl: '/services/global-sourcing-import.webp',
      features:
        locale === 'ar'
          ? [
              'علاقات مباشرة مع المزارعين عبر أوروبا والشرق الأوسط وآسيا',
              'أكثر من 1,200 صنف نشط تم اختيارها للجودة والنضارة وفترة الصلاحية',
              'تخليص جمركي موحد في الموانئ والمطارات مع استلام مبرد فوري',
            ]
          : [
              'Direct grower relationships across Europe, Middle East & Asia',
              'Over 1,200 active lines selected for quality, freshness & shelf life',
              'Consolidated port & airport customs clearance and rapid cold intake',
            ],
      actionText: locale === 'ar' ? 'استفسر عن التوريد العالمي' : 'Inquire About Global Sourcing',
      actionHref: `${prefix}/contact?subject=sourcing`,
      icon: <Globe className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      id: 'retail-supply-management',
      number: '02',
      category: locale === 'ar' ? 'التجزئة وإدارة الأقسام' : 'Retail & Category Management',
      title: locale === 'ar' ? 'توريد التجزئة وإدارة الفئات' : 'Retail Supply & Category Management',
      description:
        locale === 'ar'
          ? 'إمداد يومي لسلاسل الهايبرماركت والسوبرماركت، من تجديد المخزون الأساسي إلى الإدارة الكاملة لفئة المنتجات الطازجة، بما في ذلك تخطيط التشكيلة والتسعير والتوافر على الرفوف.'
          : 'Daily supply to hypermarket and supermarket chains, from basic replenishment to full category management of the fresh section, including range planning, pricing and in-store availability.',
      imageUrl: '/services/retail-supply-management.webp',
      features:
        locale === 'ar'
          ? [
              'توصيل يومي مجدول على مستوى المتاجر لسلاسل الهايبرماركت والسوبرماركت',
              'إدارة متكاملة لقسم المنتجات الطازجة وتخطيط التشكيلة الموسمية',
              'هيكلية تسعير تنافسية وضمان أعلى مستويات التوافر والنضارة على الرفوف',
            ]
          : [
              'Daily scheduled store-level delivery to hypermarket & supermarket chains',
              'End-to-end fresh section category management and seasonal range planning',
              'Competitive price architecture and maximum on-shelf fresh availability',
            ],
      actionText: locale === 'ar' ? 'استفسر عن توريد التجزئة' : 'Inquire for Retail Supply',
      actionHref: `${prefix}/contact?subject=retail`,
      icon: <ShoppingBag className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      id: 'wholesale-foodservice',
      number: '03',
      category: locale === 'ar' ? 'الجملة والتموين المؤسسي' : 'Wholesale & Commercial Foodservice',
      title: locale === 'ar' ? 'التوريد بالجملة والخدمات الغذائية' : 'Wholesale & Foodservice',
      description:
        locale === 'ar'
          ? 'توريد كميات كبيرة لتجار الجملة، ومتعهدي الحفلات، والمطاعم، ومتاجر البقالة المستقلة، بنفس معايير الفرز والتعبئة وسلسلة التبريد المطبقة في برنامجنا للتجزئة.'
          : 'Bulk supply to wholesalers, caterers, restaurants and independent grocers, with the same sorting, packing and cold-chain standards as our retail programme.',
      imageUrl: '/services/wholesale-foodservice.webp',
      features:
        locale === 'ar'
          ? [
              'إمداد بكميات كبيرة للمطابخ المركزية وشركات التموين والمطاعم',
              'فرز وتصنيف دقيق وتعبئة مبردة تلبي أعلى معايير الطهي الاحترافي',
              'تجارة في سوق الجملة المركزي مع تخصيص كميات يومية موثوقة',
            ]
          : [
              'High-volume bulk supply for central kitchens, catering operators & restaurants',
              'Culinary-grade sorting, temperature-controlled packing & consistent spec grading',
              'Central wholesale market trading with predictable daily volume allocations',
            ],
      actionText: locale === 'ar' ? 'اطلب أسعار الجملة' : 'Request Wholesale Rates',
      actionHref: `${prefix}/contact?subject=wholesale`,
      icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      id: 'quick-commerce-grocery',
      number: '04',
      category: locale === 'ar' ? 'التجارة السريعة والرقمية' : 'Quick-Commerce & Digital Grocery',
      title: locale === 'ar' ? 'التجارة السريعة والبقالة الإلكترونية' : 'Quick-Commerce & Online Grocery',
      description:
        locale === 'ar'
          ? 'إمداد مباشر ومتقاطع لشبكات المتاجر المظلمة وتطبيقات البقالة الرقمية، معبأ حسب الطلب ومسلّم وفق إيقاع تشغيلها، مع قوائم أسعار أسبوعية وأوقات استجابة سريعة.'
          : 'Cross-dock supply to dark-store and online grocery networks, packed to order and delivered to their operating rhythm, with weekly price lists and short lead times.',
      imageUrl: '/services/quick-commerce-grocery.webp',
      features:
        locale === 'ar'
          ? [
              'عمليات إمداد عبر التوصيل المباشر (Cross-dock) مهيأة للمتاجر المظلمة',
              'تعبئة حسب الطلب مطابقة لتطبيقات توصيل البقالة والمواصفات الاستهلاكية',
              'قوائم تسعير أسبوعية ديناميكية، ودورات توريد سريعة وشحنات ليلية',
            ]
          : [
              'Agile cross-dock fulfillment engineered for micro-fulfillment & dark stores',
              'Pack-to-order produce calibrated to online grocery consumer app SKUs',
              'Dynamic weekly price schedules, rapid fulfillment cycles & off-peak dispatch',
            ],
      actionText: locale === 'ar' ? 'تواصل لخدمات التجارة السريعة' : 'Connect for Q-Commerce',
      actionHref: `${prefix}/contact?subject=qcommerce`,
      icon: <Zap className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      id: 'cold-storage-logistics',
      number: '05',
      category: locale === 'ar' ? 'اللوجستيات والتخزين المبرد' : 'Cold Chain & Logistics',
      title: locale === 'ar' ? 'التخزين المبرد والخدمات اللوجستية للشركاء' : 'Cold Storage & Logistics for Partners',
      description:
        locale === 'ar'
          ? 'غرف تبريد يتم التحكم بدرجات حرارتها مع رفوف للطبليات، ومناولة بالرافعات الشوكية، وانتقاء الطلبات، وتوصيل مبرد، متاحة لشركاء التجزئة والتجارة الإلكترونية المحتاجين لمستودع مركزي في الدوحة.'
          : 'Temperature-controlled cold rooms with pallet racking, forklift handling, order picking and refrigerated delivery, available to retail and e-commerce partners who need a central warehouse in Doha.',
      imageUrl: '/services/cold-storage-logistics.webp',
      features:
        locale === 'ar'
          ? [
              'منشأة تبريد حديثة بمساحة 5,000 م² بالمنطقة الصناعية مع غرف متعددة الحرارة',
              'رفوف طبليات، ورافعات شوكية متطورة، وانتقاء دقيق للشحنات والطلبات',
              'أسطول يضم أكثر من 40 شاحنة مبردة تعمل يومياً في جميع أنحاء قطر',
            ]
          : [
              '5,000 m² modern cold facility in Industrial Area with multi-zone chillers',
              'Pallet racking, reach truck forklifts, and precision order picking',
              '40+ refrigerated fleet vehicles operating daily across all Qatar zones',
            ],
      actionText: locale === 'ar' ? 'احجز التخزين واللوجستيات' : 'Book Storage & Logistics',
      actionHref: `${prefix}/contact?subject=logistics`,
      icon: <Warehouse className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
    {
      id: 'local-farm-partnerships',
      number: '06',
      category: locale === 'ar' ? 'الإنتاج المحلي والأمن الغذائي' : 'Local Farms & Food Security',
      title: locale === 'ar' ? 'شراكات المزارع المحلية' : 'Local Farm Partnerships',
      description:
        locale === 'ar'
          ? 'من خلال اتفاقيتنا مع شركة "محاصيل"، شركة التسويق الزراعي القطرية، نطرح الخضروات المزروعة محلياً في الأسواق جنباً إلى جنب مع الواردات، دعماً للمزارعين المحليين والأمن الغذائي الوطني.'
          : "Through our agreement with Mahaseel, Qatar's agricultural marketing company, we bring Qatari-grown vegetables to market alongside imports, supporting local farmers and national food security.",
      imageUrl: '/services/local-farm-partnerships.webp',
      features:
        locale === 'ar'
          ? [
              'شراكة استراتيجية رسمية مع شركة "محاصيل" (شركة التسويق الزراعي القطرية)',
              'قنوات تسويق وتوزيع مباشرة لإنتاج البيوت المحمية والمزارع القطرية',
              'التزام راسخ بدعم المزارعين المحليين وتعزيز منظومة الأمن الغذائي لدولة قطر',
            ]
          : [
              'Official strategic partnership with Mahaseel (Qatar Agricultural Marketing Co.)',
              'Direct market distribution channels for Qatari greenhouse & field harvests',
              'Firm commitment to supporting local growers and advancing Qatar\'s food security',
            ],
      actionText: locale === 'ar' ? 'شارك في الإنتاج المحلي' : 'Partner Local Produce',
      actionHref: `${prefix}/contact?subject=local-farms`,
      icon: <Sprout className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    'global-sourcing-import': <Globe className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    'retail-supply-management': <ShoppingBag className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    'wholesale-foodservice': <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    'quick-commerce-grocery': <Zap className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    'cold-storage-logistics': <Warehouse className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
    'local-farm-partnerships': <Sprout className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  };

  const actionTextMap: Record<string, { en: string; ar: string }> = {
    'global-sourcing-import': { en: 'Inquire About Global Sourcing', ar: 'استفسر عن التوريد العالمي' },
    'retail-supply-management': { en: 'Inquire for Retail Supply', ar: 'استفسر عن توريد التجزئة' },
    'wholesale-foodservice': { en: 'Request Wholesale Rates', ar: 'اطلب أسعار الجملة' },
    'quick-commerce-grocery': { en: 'Connect for Q-Commerce', ar: 'تواصل لخدمات التجارة السريعة' },
    'cold-storage-logistics': { en: 'Book Storage & Logistics', ar: 'احجز التخزين واللوجستيات' },
    'local-farm-partnerships': { en: 'Partner Local Produce', ar: 'شارك في الإنتاج المحلي' },
  };

  const actionHrefMap: Record<string, string> = {
    'global-sourcing-import': `${prefix}/contact?subject=sourcing`,
    'retail-supply-management': `${prefix}/contact?subject=retail`,
    'wholesale-foodservice': `${prefix}/contact?subject=wholesale`,
    'quick-commerce-grocery': `${prefix}/contact?subject=qcommerce`,
    'cold-storage-logistics': `${prefix}/contact?subject=logistics`,
    'local-farm-partnerships': `${prefix}/contact?subject=local-farms`,
  };

  const activeServices: ServiceItem[] = services && services.length > 0
    ? services.map((s, idx) => ({
        id: s.id,
        number: String(idx + 1).padStart(2, '0'),
        title: locale === 'ar' && s.titleAr ? s.titleAr : s.title,
        category: locale === 'ar' && s.taglineAr ? s.taglineAr : s.tagline,
        description: locale === 'ar' && s.descriptionAr ? s.descriptionAr : s.description,
        imageUrl: s.imageUrl,
        features: s.features.map((f) => (locale === 'ar' && f.ar ? f.ar : f.en)),
        actionText: actionTextMap[s.id]
          ? (locale === 'ar' ? actionTextMap[s.id].ar : actionTextMap[s.id].en)
          : (locale === 'ar' ? 'استفسر الآن' : 'Inquire Now'),
        actionHref: actionHrefMap[s.id] || `${prefix}/contact`,
        icon: iconMap[s.id] || <Globe className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
      }))
    : servicesData;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>('.service-row-card');

      cards.forEach((card) => {
        if (!card) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.48, ease: 'power3.out' }
        ).fromTo(
          card.querySelectorAll('.service-card-item'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
          '-=0.3'
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-[#F8FAF8] text-[#111814]">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {activeServices.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="service-row-card rounded-3xl border border-neutral-200/90 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Card Image (5 cols) */}
              <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-neutral-100">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  priority={index === 0}
                  className="object-cover object-center transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Service Number Badge */}
                <div className="absolute top-4 start-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  <span className="font-mono text-[#D4F056] font-bold">{service.number}</span>
                  <span className="text-white/80">/ 06</span>
                </div>
              </div>

              {/* Right Column: Heading & Content (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-start">
                <div className="space-y-4">
                  {/* Category Pill + Icon */}
                  <div className="service-card-item flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#168849]/10 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="font-display type-eyebrow text-[#168849] block">
                      {service.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h2 className="service-card-item font-display font-semibold text-2xl sm:text-3xl tracking-[-0.025em] text-[#111814] leading-[1.2]">
                    {service.title}
                  </h2>

                  {/* Main Paragraph */}
                  <p className="service-card-item font-sans text-xs sm:text-[14px] 2xl:text-[15px] text-[#6B7280] leading-[1.6]">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <ul className="service-card-item space-y-2 pt-2 border-t border-neutral-100">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] 2xl:text-sm text-[#6B7280] leading-[1.55]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#168849] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Link */}
                <div className="service-card-item pt-2">
                  <CtaButton
                    href={service.actionHref}
                    text={service.actionText}
                    variant="primary"
                    target={service.isExternal || service.actionHref.startsWith('http') ? '_blank' : undefined}
                    rel={service.isExternal || service.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
