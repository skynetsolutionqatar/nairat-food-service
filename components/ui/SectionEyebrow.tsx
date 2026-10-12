import React from 'react';
import Image from 'next/image';

interface SectionEyebrowProps {
  title: string;
  textColor?: string;
  className?: string;
}

export function SectionEyebrow({
  title,
  textColor = 'text-[#168849]',
  className = '',
}: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/icon/icon.png"
        alt=""
        width={32}
        height={16}
        className="h-4 w-auto object-contain shrink-0"
        style={{ width: 'auto', height: 'auto' }}
        aria-hidden="true"
      />
      <span className={`font-eyebrow type-eyebrow ${textColor} block uppercase tracking-wider`}>
        {title}
      </span>
    </div>
  );
}
