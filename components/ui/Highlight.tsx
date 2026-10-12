import React from 'react';

interface HighlightProps {
  children: React.ReactNode;
}

/** Green marker behind one or two key words. Use once per heading. */
export function Highlight({ children }: HighlightProps) {
  return <span className="highlight">{children}</span>;
}

/** Second emphasis in a heading: text-safe green, no fill. */
export function Accent({ children }: HighlightProps) {
  return <span className="text-nairat-green-deep">{children}</span>;
}

interface MarkedTextProps {
  text: string;
  phrase: string;
  as?: typeof Highlight | typeof Accent;
}

/** Renders `text` with the first occurrence of `phrase` emphasised. */
export function MarkedText({ text, phrase, as: Mark = Highlight }: MarkedTextProps) {
  const start = phrase ? text.indexOf(phrase) : -1;
  if (start === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <Mark>{phrase}</Mark>
      {text.slice(start + phrase.length)}
    </>
  );
}
