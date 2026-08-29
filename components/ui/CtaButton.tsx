import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'white';
}

export function CtaButton({
  text = 'Read More',
  href = '#',
  className,
  children,
  variant = 'primary',
  ...props
}: CtaButtonProps) {
  const isWhite = variant === 'white';

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 font-sans text-xs sm:text-sm font-bold pl-5 pr-2 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 active:scale-95 cursor-pointer',
        isWhite
          ? 'bg-white hover:bg-neutral-100 text-[#168849] focus:ring-white/50'
          : 'bg-[#168849] hover:bg-[#063B27] text-white focus:ring-[#168849]/30',
        className
      )}
      {...props}
    >
      <span className="transition-colors duration-300">{children || text}</span>
      <div
        className={cn(
          'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs',
          isWhite
            ? 'bg-[#168849] text-white group-hover:scale-105'
            : 'bg-white text-[#168849] group-hover:bg-[#168849] group-hover:text-white'
        )}
      >
        <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}
