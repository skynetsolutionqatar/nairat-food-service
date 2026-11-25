import React from 'react';
import { splitAroundPhrase } from '@/lib/splitAroundPhrase';

interface HighlightedTitleProps {
  text: string;
  phrase: string;
}

/** Renders a heading from Sanity text with its phrase in green on its own line. */
export function HighlightedTitle({ text, phrase }: HighlightedTitleProps) {
  const parts = splitAroundPhrase(text, phrase);
  if (!parts) return <>{text}</>;

  return (
    <>
      {parts.before && <>{parts.before} <br /></>}
      <span className="text-[#168849]">{parts.phrase}</span>
      {parts.after && <> <br />{parts.after}</>}
    </>
  );
}
