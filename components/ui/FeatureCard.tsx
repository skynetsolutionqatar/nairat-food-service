import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

const variantStyles = {
  light: 'bg-white text-ink',
  dark: 'bg-forest text-white',
};

/** Soft round card at radius-card. The dark variant sits on forest. */
export function FeatureCard({ children, variant = 'light', className }: FeatureCardProps) {
  return (
    <div className={cn('rounded-card p-7 flex flex-col gap-3', variantStyles[variant], className)}>
      {children}
    </div>
  );
}
