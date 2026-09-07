import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Cta } from '@/components/modules/Cta';

export const metadata: Metadata = {
  title: 'Page Not Found — Nairat Food Services Qatar',
  description:
    'The requested page could not be found. Return to Nairat Food Services home or explore our fresh produce lines.',
};

export default function NotFound(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 404 Hero Section matching reference */}
      <section className="flex-grow flex items-center justify-center pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="relative flex items-center justify-center select-none">
            {/* Left '4' */}
            <span
              className="font-display font-bold text-[85px] min-[360px]:text-[105px] min-[420px]:text-[135px] sm:text-[210px] md:text-[270px] lg:text-[320px] text-[#E8ECE9] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              4
            </span>

            {/* Center '0' Framing the Text Content */}
            <div className="relative mx-1 min-[420px]:mx-2 sm:mx-4 md:mx-6 w-[170px] h-[230px] min-[360px]:w-[190px] min-[360px]:h-[255px] min-[420px]:w-[220px] min-[420px]:h-[295px] sm:w-[310px] sm:h-[390px] md:w-[370px] md:h-[460px] lg:w-[420px] lg:h-[510px] rounded-[85px] min-[360px]:rounded-[95px] min-[420px]:rounded-[110px] sm:rounded-[155px] md:rounded-[185px] lg:rounded-[210px] border-[14px] min-[360px]:border-[16px] min-[420px]:border-[20px] sm:border-[28px] md:border-[36px] lg:border-[42px] border-[#E8ECE9] flex flex-col items-center justify-center p-3 min-[360px]:p-4 sm:p-7 md:p-8 text-center bg-white z-10">
              <div className="space-y-1.5 sm:space-y-2.5 max-w-[130px] min-[360px]:max-w-[150px] min-[420px]:max-w-[170px] sm:max-w-[240px] md:max-w-[280px]">
                {/* Heading */}
                <h1 className="font-display font-medium sm:font-semibold text-base min-[360px]:text-lg min-[420px]:text-xl sm:text-2xl md:text-3xl text-[#111814] tracking-tight leading-tight">
                  Page not found
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-[10px] min-[360px]:text-[11px] min-[420px]:text-xs sm:text-sm text-[#6B7280] leading-snug sm:leading-relaxed">
                  The page you are looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Action Button */}
                <div className="pt-2 sm:pt-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 min-[420px]:px-4 min-[420px]:py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#063B27] hover:bg-[#042A1C] text-white font-sans text-[11px] min-[360px]:text-xs sm:text-sm font-medium transition-all duration-300 shadow-md active:scale-95 group cursor-pointer"
                  >
                    <span>Go to Home</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right '4' */}
            <span
              className="font-display font-bold text-[85px] min-[360px]:text-[105px] min-[420px]:text-[135px] sm:text-[210px] md:text-[270px] lg:text-[320px] text-[#E8ECE9] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              4
            </span>
          </div>
        </div>
      </section>

      {/* Global CTA Banner directly below */}
      <Cta />
    </div>
  );
}
