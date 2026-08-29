"use client";

import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";

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
      description: "Carrefour",
      image: "/partners/careefour.svg",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "safari",
      description: "Safari Hypermarket",
      image: "/partners/Safari Hyper Market Logo.png",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "grand",
      description: "Grand Hypermarket",
      image: "/partners/grand-logo.webp",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "mahaseel",
      description: "Mahaseel",
      image: "/partners/mahaseel.png",
      className: "h-10 w-auto object-contain",
    },
  ],
}: Logos3Props) => {
  // Duplicate logos to allow Embla infinite loop to function smoothly
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section
      id="partners"
      className="py-10 bg-white border-b border-black/5 relative overflow-hidden"
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        <span className="font-sans type-eyebrow text-[#47554E] block">
          {heading}
        </span>
      </div>
      <div className="pt-6 md:pt-8">
        <div className="relative mx-auto flex items-center justify-center max-w-[1440px] px-6">
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
            <CarouselContent className="ml-0">
              {duplicatedLogos.map((logo, index) => (
                <CarouselItem
                  key={`${logo.id}-${index}`}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="mx-3 flex shrink-0 items-center justify-center p-3 h-16 w-36 md:w-44 rounded-xl bg-gray-50/60 border border-gray-100 hover:border-emerald-200 hover:bg-white hover:shadow-md transition-all duration-300 group">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className || "h-10 w-auto object-contain"}
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


