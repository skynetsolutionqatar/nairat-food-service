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
      className: "h-7 sm:h-8 md:h-9 max-w-[130px] sm:max-w-[150px] w-auto object-contain cursor-pointer",
    },
    {
      id: "lulu",
      description: "LuLu Hypermarket",
      image: "/partners/lulu-logo.png",
      className: "h-7 sm:h-8 md:h-9 max-w-[115px] sm:max-w-[135px] w-auto object-contain cursor-pointer",
    },
    {
      id: "carrefour",
      description: "Carrefour Qatar",
      image: "/partners/careefour.svg",
      className: "h-7 sm:h-8 md:h-9 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer",
    },
    {
      id: "safari",
      description: "Safari Hypermarket",
      image: "/partners/safari-hypermarket-logo.png",
      className: "h-11 sm:h-13 md:h-14 max-w-[55px] sm:max-w-[65px] w-auto object-contain cursor-pointer",
    },
    {
      id: "grand",
      description: "Grand Mall",
      image: "/partners/grand-logo.webp",
      className: "h-8 sm:h-9 md:h-10 max-w-[85px] sm:max-w-[100px] w-auto object-contain cursor-pointer",
    },
    {
      id: "rawabi",
      description: "Rawabi Hypermarket",
      image: "/partners/rawabi-hypermarket.svg",
      className: "h-9 sm:h-10 md:h-11 max-w-[60px] sm:max-w-[70px] w-auto object-contain cursor-pointer",
    },
    {
      id: "saudia",
      description: "Saudia Hypermarket",
      image: "/partners/saudia.png",
      className: "h-11 sm:h-13 md:h-14 max-w-[65px] sm:max-w-[75px] w-auto object-contain cursor-pointer",
    },
    {
      id: "abcfresh",
      description: "ABC Fresh",
      image: "/partners/abc.webp",
      className: "h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer",
    },
    {
      id: "talabat",
      description: "Talabat Mart",
      image: "/partners/talabat-mart.svg",
      className: "h-6 sm:h-7 md:h-8 max-w-[125px] sm:max-w-[145px] w-auto object-contain cursor-pointer",
    },
    {
      id: "mahaseel",
      description: "Mahaseel",
      image: "/partners/mahaseel.png",
      className: "h-9 sm:h-11 md:h-12 max-w-[75px] sm:max-w-[90px] w-auto object-contain cursor-pointer",
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
                  <div className="mx-3 sm:mx-5 w-28 sm:w-32 md:w-36 flex shrink-0 items-center justify-center h-12 sm:h-14 cursor-pointer transition-transform duration-300 hover:scale-105 select-none">
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


