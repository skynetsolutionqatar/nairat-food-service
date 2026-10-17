'use client';

import React from 'react';
import { ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';

type CommonProps = {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'light' | 'white' | 'slate' | 'forest' | 'outline' | 'amber';
  showIcon?: boolean;
  as?: 'a' | 'button';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export type CtaButtonProps = CommonProps & Omit<React.AllHTMLAttributes<HTMLElement>, keyof CommonProps>;

export function CtaButton({
  text = 'Read More',
  href,
  className,
  children,
  variant = 'primary',
  showIcon = true,
  as,
  type,
  disabled,
  ...props
}: CtaButtonProps) {
  const { isRTL } = useLocale();
  const isButton = as === 'button' || (!href && (type !== undefined || as !== 'a')) || type === 'submit';

  const getStyles = () => {
    switch (variant) {
      case 'amber':
        return 'bg-[#F2BD1D] hover:bg-[#e2ad14] text-[#111814] focus-visible:ring-[#F2BD1D]/50 shadow-md';
      case 'light':
        return 'bg-white text-nairat-green-deep ring-1 ring-inset ring-line hover:ring-nairat-green';
      case 'white':
        return 'bg-white hover:bg-neutral-100 text-[#168849] focus-visible:ring-white/50 shadow-sm';
      case 'slate':
        return 'bg-[#8CA8B8]/85 hover:bg-[#8CA8B8] text-[#0A2618] border border-white/30 backdrop-blur-sm shadow-md';
      case 'forest':
        return 'bg-[#063B27] hover:bg-[#042A1C] text-white border border-white/20 shadow-md';
      case 'outline':
        return 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm';
      case 'primary':
      default:
        return 'bg-[#168849] hover:bg-[#063B27] text-white focus-visible:ring-[#168849]/30 shadow-md';
    }
  };

  const getBadgeStyles = () => {
    switch (variant) {
      case 'amber':
        return 'bg-white text-[#111814] group-hover:scale-105';
      case 'light':
      case 'white':
        return 'bg-[#168849] text-white group-hover:scale-105';
      case 'slate':
        return 'bg-[#0A2618] text-white group-hover:scale-105';
      case 'forest':
        return 'bg-white text-[#063B27] group-hover:scale-105';
      case 'outline':
        return 'bg-white text-[#111814] group-hover:scale-105';
      case 'primary':
      default:
        return 'bg-white text-[#168849] group-hover:bg-[#168849] group-hover:text-white';
    }
  };

  const sharedClasses = cn(
    'group inline-flex items-center gap-2.5 sm:gap-3 font-sans text-xs sm:text-sm font-semibold tracking-[-0.01em] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168849] focus-visible:ring-offset-2 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none',
    showIcon ? 'ps-4 sm:ps-5 pe-1.5 sm:pe-2 py-1.5 sm:py-2' : 'px-5 sm:px-6 py-2 sm:py-2.5',
    getStyles(),
    className
  );

  const content = (
    <>
      <span className="transition-colors duration-300">{children || text}</span>
      {showIcon && (
        <div
          className={cn(
            'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs',
            getBadgeStyles()
          )}
        >
          {isRTL ? (
            <ArrowUpLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] cta-arrow cta-arrow-rtl" />
          ) : (
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] cta-arrow cta-arrow-ltr" />
          )}
        </div>
      )}
    </>
  );

  if (isButton) {
    return (
      <button
        type={type || 'button'}
        disabled={disabled}
        className={sharedClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href || '#'}
      className={sharedClasses}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {content}
    </a>
  );
}
