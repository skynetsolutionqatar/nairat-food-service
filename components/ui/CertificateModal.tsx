'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface CertificateModalData {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateModalData | null;
}

export function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps): React.ReactNode {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl sm:max-w-2xl w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
          <div>
            <h3
              id="cert-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-[#111814] tracking-tight"
            >
              {certificate.title}
            </h3>
            {certificate.subtitle && (
              <p className="text-xs text-[#6B7280] font-sans mt-0.5">
                {certificate.subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-900"
            aria-label="Close certificate preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image Frame */}
        <div className="relative aspect-[3/4] max-h-[66vh] w-full my-3.5 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200/90 flex items-center justify-center">
          <Image
            src={certificate.imageSrc}
            alt={certificate.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 95vw, 640px"
            priority
          />
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-[#6B7280]">
          <span className="font-mono text-[11px] text-[#168849] font-medium">
            Official Verification · Qatar
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111814] font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
