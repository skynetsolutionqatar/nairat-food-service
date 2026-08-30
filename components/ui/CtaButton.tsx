import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'white' | 'slate' | 'forest' | 'outline';
  showIcon?: boolean;
}

export function CtaButton({
  text = 'Read More',
  href = '#',
  className,
  children,
  variant = 'primary',
  showIcon = true,
  ...props
}: CtaButtonProps) {
  const getStyles = () => {
    switch (variant) {
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

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 font-sans text-sm font-semibold tracking-[-0.01em] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168849] focus-visible:ring-offset-2 active:scale-95 cursor-pointer',
        showIcon ? 'pl-5 pr-2 py-2' : 'px-6 py-2.5',
        getStyles(),
        className
      )}
      {...props}
    >
      <span className="transition-colors duration-300">{children || text}</span>
      {showIcon && (
        <div
          className={cn(
            'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs',
            getBadgeStyles()
          )}
        >
          <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5" />
        </div>
      )}
    </a>
  );
}
