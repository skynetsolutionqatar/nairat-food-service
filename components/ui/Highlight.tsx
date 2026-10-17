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
  /** One phrase, or candidates in priority order; the first one found in `text` is marked. */
  phrase: string | string[];
  as?: typeof Highlight | typeof Accent;
}

/** Renders `text` with the first occurrence of `phrase` emphasised. */
export function MarkedText({ text, phrase, as: Mark = Highlight }: MarkedTextProps) {
  const match = [phrase].flat().find((candidate) => candidate && text.includes(candidate));
  if (!match) return <>{text}</>;

  const start = text.indexOf(match);

  return (
    <>
      {text.slice(0, start)}
      <Mark>{match}</Mark>
      {text.slice(start + match.length)}
    </>
  );
}
