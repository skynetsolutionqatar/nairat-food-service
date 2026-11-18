import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PayloadTooLargeError, readJsonBody } from './read-json-body';

const jsonRequest = (text: string) => new Request('http://localhost/x', { method: 'POST', body: text });

test('parses a body within the limit', async () => {
  const body = await readJsonBody(jsonRequest('{"name":"Ali"}'), 100);
  assert.deepEqual(body, { name: 'Ali' });
});

test('rejects a body over the limit', async () => {
  await assert.rejects(readJsonBody(jsonRequest('x'.repeat(200)), 100), PayloadTooLargeError);
});

test('accepts a body exactly at the limit', async () => {
  const text = JSON.stringify({ a: 'b'.repeat(10) });
  const body = await readJsonBody(jsonRequest(text), Buffer.byteLength(text));
  assert.deepEqual(body, { a: 'b'.repeat(10) });
});

test('invalid JSON still throws a SyntaxError', async () => {
  await assert.rejects(readJsonBody(jsonRequest('{not json'), 100), SyntaxError);
});
