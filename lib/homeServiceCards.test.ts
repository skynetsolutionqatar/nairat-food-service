import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveHomeServiceCards } from './homeServiceCards';
import { homeServiceCards } from '../data/homeServiceCards';

test('falls back to the local cards when Sanity returns nothing', () => {
  assert.deepEqual(resolveHomeServiceCards(undefined), homeServiceCards);
  assert.deepEqual(resolveHomeServiceCards([]), homeServiceCards);
});

test('skips rows without a title', () => {
  assert.deepEqual(resolveHomeServiceCards([{ description: 'No title' }, null]), homeServiceCards);
});

test('keeps Sanity content and image URLs', () => {
  const [card] = resolveHomeServiceCards([
    { title: 'A', titleAr: 'أ', description: 'D', descriptionAr: 'د', imageUrl: 'https://cdn/x.webp' },
  ]);
  assert.deepEqual(card, { title: 'A', titleAr: 'أ', description: 'D', descriptionAr: 'د', imageUrl: 'https://cdn/x.webp' });
});

test('fills missing Arabic and image from fallbacks', () => {
  const [card] = resolveHomeServiceCards([{ title: 'A', description: 'D' }]);
  assert.equal(card.titleAr, 'A');
  assert.equal(card.descriptionAr, 'D');
  assert.equal(card.imageUrl, homeServiceCards[0].imageUrl);
});
