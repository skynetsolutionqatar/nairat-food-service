import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isNativeScrollRoute, shouldUseSmoothScroll } from './smoothScroll';

test('Studio routes keep native scrolling', () => {
  assert.equal(isNativeScrollRoute('/studio'), true);
  assert.equal(isNativeScrollRoute('/studio/structure/homePage'), true);
  assert.equal(isNativeScrollRoute('/studios'), false);
  assert.equal(isNativeScrollRoute('/'), false);
});

test('smooth scrolling runs only for mouse users outside Studio', () => {
  assert.equal(shouldUseSmoothScroll({ pathname: '/', pointerFine: true }), true);
  assert.equal(shouldUseSmoothScroll({ pathname: '/ar/company', pointerFine: true }), true);
  assert.equal(shouldUseSmoothScroll({ pathname: '/studio/desk', pointerFine: true }), false);
  assert.equal(shouldUseSmoothScroll({ pathname: '/', pointerFine: false }), false);
});
