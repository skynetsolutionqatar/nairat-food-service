import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CtaButton({
  text = 'Read More',
  href = '#',
  className,
  children,
  ...props
}: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-4 bg-[#168849] hover:bg-[#063B27] text-white font-sans text-sm sm:text-base font-bold pl-6 pr-2.5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#168849]/30',
        className
      )}
      {...props}
    >
      <span className="transition-colors duration-300">{children || text}</span>
      <div className="w-9 h-9 rounded-full bg-white group-hover:bg-[#168849] text-[#168849] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}
