import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveImageAlt, toSanityAlt } from './imageAlt';
import { splitAroundPhrase } from './splitAroundPhrase';

const fallback = { en: 'Local alt', ar: 'نص بديل' };

test('image alt falls back per language', () => {
  assert.deepEqual(resolveImageAlt(undefined, fallback), fallback);
  assert.deepEqual(resolveImageAlt({ alt: ' Sanity alt ', altAr: '' }, fallback), { en: 'Sanity alt', ar: 'نص بديل' });
});

test('splits a heading around its highlighted phrase', () => {
  assert.deepEqual(splitAroundPhrase('Our Journey: Growing a Fresher Future for Qatar.', 'Growing a Fresher Future'), {
    before: 'Our Journey:',
    phrase: 'Growing a Fresher Future',
    after: 'for Qatar.',
  });
});

test('keeps edited text around the phrase', () => {
  assert.deepEqual(splitAroundPhrase('Sourcing: From Global Orchards', 'From Global Orchards'), {
    before: 'Sourcing:',
    phrase: 'From Global Orchards',
    after: '',
  });
});

test('returns null when the phrase is missing', () => {
  assert.equal(splitAroundPhrase('Plain heading', 'Growing'), null);
  assert.equal(splitAroundPhrase('Plain heading', ''), null);
});

test('alt text maps to Sanity sub-fields', () => {
  assert.deepEqual(toSanityAlt(fallback), { alt: 'Local alt', altAr: 'نص بديل' });
});
