export class PayloadTooLargeError extends Error {
  constructor() {
    super('Request body exceeds the allowed size');
    this.name = 'PayloadTooLargeError';
  }
}

/**
 * Reads and parses a JSON body, counting bytes while streaming so that
 * chunked requests without a Content-Length header are also capped.
 */
export async function readJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  if (!request.body) {
    return JSON.parse('');
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
