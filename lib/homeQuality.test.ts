import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveQualityCertificates, resolveQualitySteps } from './homeQuality';
import { homeQualityCertificates, homeQualitySteps } from '../data/homeQuality';

test('steps fall back to local content when Sanity is empty', () => {
  assert.deepEqual(resolveQualitySteps(undefined), homeQualitySteps);
  assert.deepEqual(resolveQualitySteps([null, { description: 'No title' }]), homeQualitySteps);
});

test('steps keep Sanity content and fill missing Arabic', () => {
  assert.deepEqual(resolveQualitySteps([{ title: 'A', description: 'D' }]), [
    { title: 'A', titleAr: 'A', description: 'D', descriptionAr: 'D' },
  ]);
});

test('certificates drop blanks and fall back to local labels', () => {
  assert.deepEqual(resolveQualityCertificates([' HACCP ', '', null]), ['HACCP']);
  assert.deepEqual(resolveQualityCertificates([]), homeQualityCertificates);
});
