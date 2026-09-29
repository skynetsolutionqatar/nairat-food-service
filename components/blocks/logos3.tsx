"use client";

import React, { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { gsap, useGSAP } from "@/lib/gsap";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "TRUSTED BY QATAR’S LEADING PARTNERS",
  logos = [
    {
      id: "almeera",
      description: "Al Meera",
      image: "/partners/almeera-logo-b.svg",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "lulu",
      description: "LuLu Hypermarket",
      image: "/partners/lulu-logo.png",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "carrefour",
      description: "Carrefour Qatar",
      image: "/partners/careefour.svg",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "safari",
      description: "Safari Hypermarket",
      image: "/partners/safari-hypermarket-logo.png",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "grand",
      description: "Grand Mall",
      image: "/partners/grand-logo.webp",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "rawabi",
      description: "Rawabi Hypermarket",
      image: "/partners/rawabi-hypermarket.svg",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "saudia",
      description: "Saudia Hypermarket",
      image: "/partners/saudia.png",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "abcfresh",
      description: "ABC Fresh",
      image: "/partners/abc.webp",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "talabat",
      description: "Talabat Mart",
      image: "/partners/talabat-mart.svg",
      className: "h-9 w-auto object-contain",
    },
    {
      id: "mahaseel",
      description: "Mahaseel",
      image: "/partners/mahaseel.png",
      className: "h-10 w-auto object-contain",
    },
  ],
}: Logos3Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate logos to allow Embla infinite loop to function smoothly
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Reveal on page load with a subtle delay so it is immediately visible in the hero viewport
      gsap.fromTo(
        container,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="partners"
      ref={containerRef}
      className="scroll-mt-24 sm:scroll-mt-28 py-5 sm:py-6 bg-white border-b border-black/5 relative overflow-hidden will-change-transform"
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        <span className="font-display type-eyebrow text-[#6B7280] block">
          {heading}
        </span>
      </div>
      <div className="pt-3 sm:pt-4">
        <div className="relative mx-auto flex items-center justify-center max-w-[1140px] 2xl:max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                speed: 1.2,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0 items-center">
              {duplicatedLogos.map((logo, index) => (
                <CarouselItem
                  key={`${logo.id}-${index}`}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-4 sm:mx-6 flex shrink-0 items-center justify-center h-10 sm:h-12 cursor-pointer transition-transform duration-300 hover:scale-105 select-none">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className || "h-8 sm:h-10 w-auto object-contain cursor-pointer"}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };


