'use client';

import React from 'react';
import { ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'light' | 'lime';
type LegacyVariant = 'white' | 'slate' | 'forest' | 'outline' | 'amber';

const legacyVariants: Record<LegacyVariant, Variant> = {
  white: 'light',
  slate: 'light',
  outline: 'light',
  forest: 'primary',
  amber: 'lime',
};

const pillStyles: Record<Variant, string> = {
  primary: 'bg-nairat-green hover:bg-nairat-green-deep text-white',
  light: 'bg-white text-nairat-green-deep ring-1 ring-inset ring-line hover:ring-nairat-green',
  lime: 'bg-lime hover:bg-[#C8E64A] text-ink',
};

const chipStyles: Record<Variant, string> = {
  primary: 'bg-white text-nairat-green-deep',
  light: 'bg-nairat-green text-white',
  lime: 'bg-forest text-lime',
};

type CommonProps = {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: Variant | LegacyVariant;
  showIcon?: boolean;
  as?: 'a' | 'button';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export type CtaButtonProps = CommonProps & Omit<React.AllHTMLAttributes<HTMLElement>, keyof CommonProps>;

function resolveVariant(variant: Variant | LegacyVariant): Variant {
  return variant in legacyVariants ? legacyVariants[variant as LegacyVariant] : (variant as Variant);
}

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
  const resolved = resolveVariant(variant);

  const sharedClasses = cn(
    'group inline-flex items-center gap-3 min-h-12 font-sans text-sm font-semibold leading-5 whitespace-nowrap rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-nairat-green-deep focus-visible:ring-offset-2 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none',
    showIcon ? 'ps-[22px] pe-2 py-2' : 'px-6 py-2',
    pillStyles[resolved],
    className
  );

  const content = (
    <>
      <span>{children || text}</span>
      {showIcon && (
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
            chipStyles[resolved]
          )}
        >
          {isRTL ? (
            <ArrowUpLeft className="w-4 h-4 stroke-[2.2] cta-arrow cta-arrow-rtl" />
          ) : (
            <ArrowUpRight className="w-4 h-4 stroke-[2.2] cta-arrow cta-arrow-ltr" />
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
