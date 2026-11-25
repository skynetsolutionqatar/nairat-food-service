export interface PhraseParts {
  before: string;
  phrase: string;
  after: string;
}

/** Splits a heading around its highlighted phrase, or returns null when the phrase is absent. */
export function splitAroundPhrase(text: string, phrase: string): PhraseParts | null {
  const index = phrase ? text.indexOf(phrase) : -1;
  if (index < 0) return null;
  return {
    before: text.slice(0, index).trim(),
    phrase,
    after: text.slice(index + phrase.length).trim(),
  };
}
