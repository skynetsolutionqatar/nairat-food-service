'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCw, Home, AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for diagnostics
    console.error('App Router Caught Error:', error);

    // If error is chunk loading failure, auto-reload once to fetch fresh bundles
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      /Loading chunk [\w-]+ failed/i.test(error.message) ||
      /Failed to fetch dynamically imported module/i.test(error.message);

    if (isChunkError) {
      const lastReload = sessionStorage.getItem('error_boundary_reload');
      const now = Date.now();

      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem('error_boundary_reload', now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  const handleHardRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-white text-[#111814]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
          <AlertCircle className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111814]">
            Something went wrong
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            The page could not be loaded properly. This usually happens when a new version of the site has been deployed.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleHardRefresh}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#158647] hover:bg-[#0f6032] text-white font-sans text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111814] font-sans text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer"
          >
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-[#6B7280] font-sans text-xs sm:text-sm font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
