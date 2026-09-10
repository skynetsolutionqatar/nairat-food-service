'use client';

import React, { useEffect } from 'react';
import { RotateCw, AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root Global Error Caught:', error);
  }, [error]);

  const handleHardRefresh = () => {
    window.location.reload();
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#111814] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <AlertCircle className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111814]">
              Unable to load page
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We encountered an unexpected display issue while transitioning pages. Please reload to restore standard view.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleHardRefresh}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#158647] hover:bg-[#0f6032] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111814] text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer"
            >
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
