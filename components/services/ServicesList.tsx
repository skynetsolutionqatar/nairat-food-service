'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2, Store, Truck, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CtaButton } from '@/components/ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

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

const servicesData: ServiceItem[] = [
  {
    id: 'retail-wholesale',
    number: '01',
    category: 'Commercial Supply',
    title: 'Retail & Wholesale Distribution',
    description:
      'Daily programme supply to hypermarkets, supermarkets and online grocery platforms (Talabat Mart) across Qatar with store-level delivery, plus wholesale market trading.',
    imageUrl: '/services/wholesale-distribution.avif',
    features: [
      'Daily scheduled store-level delivery',
      'Hypermarkets, supermarkets & online platforms (Talabat Mart)',
      'Wholesale market trading & high-volume bulk supply',
    ],
    actionText: 'Inquire About Distribution',
    actionHref: '#contact',
    icon: <Truck className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    id: 'growers-exporters',
    number: '02',
    category: 'Trade Partnerships',
    title: 'For Growers & Exporters',
    description:
      'Consignment and direct-trading partnerships: Nairat receives, clears, stores, markets and distributes your produce in Qatar with transparent settlement.',
    imageUrl: '/services/grower and exporter.avif',
    features: [
      'Port clearance, customs handling, and local regulatory documentation',
      '5,000 m² cold storage with 20 independent chiller chambers',
      'Transparent market reporting, prompt audit trails, and fair settlement',
    ],
    actionText: 'Partner With Us',
    actionHref: '#contact',
    icon: <Handshake className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
  {
    id: 'nairat-shop',
    number: '03',
    category: 'Direct Retail',
    title: 'Nairat Shop',
    description:
      'Our own fresh-produce retail store, open to the public, with the full range at market-fresh prices.',
    imageUrl: '/services/nairat shop.avif',
    features: [
      'Open to the general public with walk-in access',
      'Comprehensive selection of premium fruits, vegetables, and specialty herbs',
      'Unbeatable farm-direct freshness at market-competitive pricing',
    ],
    actionText: 'Visit Nairat Shop',
    actionHref: 'https://www.google.com/maps/place/Nairat+Food+Service/@25.1879132,51.451866,17z/data=!3m1!4b1!4m6!3m5!1s0x3e45d1d6fa5f0107:0x208dd617d12cb28c!8m2!3d25.1879084!4d51.4544409!16s%2Fg%2F11q3d_k5z2?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
    isExternal: true,
    icon: <Store className="w-5 h-5 text-[#168849]" aria-hidden="true" />,
  },
];

export function ServicesList(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-row-card');

      cards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        ).fromTo(
          card.querySelectorAll('.service-card-item'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.45'
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-[#F8FAF8] text-[#111814]">
      <div className="max-w-[1140px] 2xl:max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {servicesData.map((service, index) => (
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
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  <span className="font-mono text-[#D4F056] font-bold">{service.number}</span>
                  <span className="text-white/80">/ 03</span>
                </div>
              </div>

              {/* Right Column: Heading & Content (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category Pill + Icon */}
                  <div className="service-card-item flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#168849]/10 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-[#168849]">
                      {service.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h2 className="service-card-item font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#111814] leading-[1.2]">
                    {service.title}
                  </h2>

                  {/* Main Paragraph */}
                  <p className="service-card-item font-sans text-sm sm:text-base text-[#47554E] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <ul className="service-card-item space-y-2 pt-2 border-t border-neutral-100">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#47554E]"
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
