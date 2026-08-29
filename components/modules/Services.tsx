'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  actionText: string;
  actionHref: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'retail-wholesale',
    title: 'Retail & Wholesale Distribution',
    desc: 'Daily fresh-produce supply to retailers, wholesalers, supermarkets and food-service businesses across Qatar.',
    imageUrl: '/services/wholesale-distribution.avif',
    actionText: 'Explore Distribution',
    actionHref: '#contact',
  },
  {
    id: 'grower-partnerships',
    title: 'Grower & Exporter Partnerships',
    desc: 'A reliable local partner for growers and exporters looking to bring fresh produce to the Qatar market.',
    imageUrl: '/services/grower and exporter.avif',
    actionText: 'Partner With Us',
    actionHref: '#contact',
  },
  {
    id: 'nairat-shop',
    title: 'Nairat Retail Shop',
    desc: 'Fresh fruits and vegetables available directly to consumers at our retail store.',
    imageUrl: '/services/nairat shop.avif',
    actionText: 'Visit Nairat Shop',
    actionHref: '#contact',
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        '.service-header-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        '.service-card-item',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      );

      // Image scroll zoom/parallax on service cards
      const serviceImages = gsap.utils.toArray<HTMLElement>('.service-card-bg');
      serviceImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: -3 },
          {
            scale: 1.02,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="services" ref={containerRef} className="py-10 sm:py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 space-y-12">
        {/* Header Grid: Left Headline vs Right Subtext & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Headline */}
          <div className="lg:col-span-7 space-y-4">
            <span className="service-header-item font-sans type-eyebrow text-[#111814] block">
              WHAT WE DO
            </span>
            <h2 className="service-header-item font-display type-h2 font-medium text-[#111814] text-left">
              Fresh Produce Supply <br />
              at Every Scale.
            </h2>
          </div>

          {/* Right Paragraph & CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-6">
            <p className="service-header-item font-sans text-sm sm:text-[15px] text-[#6B7280] leading-[1.6] text-justify max-w-[52ch]">
              From sourcing and distribution to retail, we connect premium fresh produce with businesses and consumers across Qatar.
            </p>
            <div className="service-header-item self-start lg:self-end">
              <CtaButton href="#contact">
                Learn More
              </CtaButton>
            </div>
          </div>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="services-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="service-card-item flex flex-col space-y-4 group"
            >
              {/* Top Rounded Image */}
              <div className="relative w-full h-56 sm:h-60 md:h-64 rounded-2xl overflow-hidden bg-neutral-100">
                <div
                  className="service-card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${service.imageUrl}')` }}
                  aria-label={service.title}
                />
              </div>

              {/* Card Text & Link below image */}
              <div className="space-y-3 pt-1">
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#111814] tracking-[-0.015em] leading-snug group-hover:text-[#168849] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-[#6B7280] leading-[1.6]">
                  {service.desc}
                </p>
                <div className="pt-2">
                  <a
                    href={service.actionHref}
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-[-0.01em] text-[#111814] hover:text-[#168849] transition-colors group/link cursor-pointer"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



