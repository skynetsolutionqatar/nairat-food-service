import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  title: string;
  textColor?: string;
  className?: string;
}

export function SectionEyebrow({
  title,
  textColor = 'text-nairat-green',
  className = '',
}: SectionEyebrowProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Image
        src="/icon/icon.png"
        alt=""
        width={32}
        height={16}
        className="h-4 w-auto object-contain shrink-0"
        style={{ width: 'auto', height: 'auto' }}
        aria-hidden="true"
      />
      <span className={cn('type-eyebrow block', textColor)}>{title}</span>
    </div>
  );
}
