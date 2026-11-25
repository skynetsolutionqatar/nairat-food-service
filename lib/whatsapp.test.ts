import { test } from 'node:test';
import assert from 'node:assert/strict';
import { whatsappChatUrl } from './whatsapp';

test('strips formatting from the phone number', () => {
  assert.equal(whatsappChatUrl('+974 5032 9385'), 'https://wa.me/97450329385');
});

test('appends an encoded prefilled message', () => {
  assert.equal(
    whatsappChatUrl('+97450329385', 'Hello & welcome'),
    'https://wa.me/97450329385?text=Hello+%26+welcome',
  );
});
