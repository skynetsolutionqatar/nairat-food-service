import React from 'react';
import { cn } from '@/lib/utils';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'start' | 'center';
  /** Class added to each animated child so a section can stagger them. */
  itemClassName?: string;
  className?: string;
}

function HeadingText({ eyebrow, title, lead, align, itemClassName }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('flex flex-col gap-4', centered ? 'items-center text-center' : 'items-start text-start max-w-[640px]')}>
      <SectionEyebrow title={eyebrow} className={itemClassName} />
      <h2 className={cn('type-h2 text-ink', centered && 'max-w-[820px]', itemClassName)}>{title}</h2>
      {lead && (
        <p className={cn('font-sans text-base leading-[1.7] text-ink-muted max-w-[640px]', itemClassName)}>{lead}</p>
      )}
    </div>
  );
}

/** Eyebrow → heading → optional lead, with an optional action at the inline end. */
export function SectionHeading(props: SectionHeadingProps) {
  const { action, align = 'start', itemClassName, className } = props;

  if (!action) {
    return (
      <div className={className}>
        <HeadingText {...props} align={align} />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-6', className)}>
      <HeadingText {...props} align={align} />
      <div className={itemClassName}>{action}</div>
    </div>
  );
}
