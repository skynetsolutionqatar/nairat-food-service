interface Window {
  count: number;
  expiresAt: number;
}

export class RateLimiter {
  private readonly windows = new Map<string, Window>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly maxKeys: number
  ) {}

  allow(key: string, now: number = Date.now()): boolean {
    this.sweep(now);
    const window = this.windows.get(key);
    if (!window || now > window.expiresAt) {
      this.windows.set(key, { count: 1, expiresAt: now + this.windowMs });
      return true;
    }
    if (window.count >= this.limit) {
      return false;
    }
    window.count += 1;
    return true;
  }

  private sweep(now: number): void {
    if (this.windows.size < this.maxKeys) {
      return;
    }
    for (const [key, window] of this.windows) {
      if (now > window.expiresAt) {
        this.windows.delete(key);
      }
    }
    if (this.windows.size >= this.maxKeys) {
      this.windows.clear();
    }
  }
}

/**
 * The left-most X-Forwarded-For entry is set by the client and can be
 * anything. The right-most entry is appended by the proxy in front of the app.
 */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const entries = forwarded.split(',');
    return entries[entries.length - 1].trim() || 'unknown';
  }
  return headers.get('x-real-ip')?.trim() || 'unknown';
}
