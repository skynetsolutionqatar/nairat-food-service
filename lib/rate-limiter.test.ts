import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RateLimiter, clientIpFromHeaders } from './rate-limiter';

test('allows up to the limit then blocks', () => {
  const limiter = new RateLimiter(3, 1000, 100);
  const results = [1, 2, 3, 4].map(() => limiter.allow('a', 0));
  assert.deepEqual(results, [true, true, true, false]);
});

test('keys are limited independently', () => {
  const limiter = new RateLimiter(1, 1000, 100);
  assert.equal(limiter.allow('a', 0), true);
  assert.equal(limiter.allow('b', 0), true);
  assert.equal(limiter.allow('a', 0), false);
});

test('window resets after it expires', () => {
  const limiter = new RateLimiter(1, 1000, 100);
  assert.equal(limiter.allow('a', 0), true);
  assert.equal(limiter.allow('a', 500), false);
  assert.equal(limiter.allow('a', 1001), true);
});

test('expired keys are evicted once the cap is reached', () => {
  const limiter = new RateLimiter(1, 1000, 2);
  limiter.allow('a', 0);
  limiter.allow('b', 0);
  limiter.allow('c', 5000);
  assert.equal(limiter.allow('a', 5000), true);
});

test('map never grows past the cap', () => {
  const limiter = new RateLimiter(1, 60_000, 50);
  for (let i = 0; i < 1000; i++) limiter.allow(`ip-${i}`, 0);
  const windows = (limiter as unknown as { windows: Map<string, unknown> }).windows;
  assert.ok(windows.size <= 50, `size was ${windows.size}`);
});

test('client IP uses the right-most X-Forwarded-For entry', () => {
  const headers = new Headers({ 'x-forwarded-for': ' 1.1.1.1 , 203.0.113.9' });
  assert.equal(clientIpFromHeaders(headers), '203.0.113.9');
});

test('spoofed left-most entries do not change the client IP', () => {
  const real = '203.0.113.9';
  const spoofed = new Headers({ 'x-forwarded-for': `198.51.100.1, ${real}` });
  assert.equal(clientIpFromHeaders(spoofed), real);
});

test('falls back to x-real-ip then unknown', () => {
  assert.equal(clientIpFromHeaders(new Headers({ 'x-real-ip': '192.0.2.5' })), '192.0.2.5');
  assert.equal(clientIpFromHeaders(new Headers()), 'unknown');
});
