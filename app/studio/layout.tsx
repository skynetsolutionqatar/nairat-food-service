import React from 'react';
import type { Metadata, Viewport } from 'next';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Nairat Food Services Studio',
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: 'resizes-content',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {children}
    </div>
  );
}
