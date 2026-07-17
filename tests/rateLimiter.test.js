import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRateLimiter } from '../src/lib/rateLimiter';

describe('createRateLimiter', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests up to the configured limit and then rejects them', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000 });

    expect(limiter.allow('user-1')).toBe(true);
    expect(limiter.allow('user-1')).toBe(true);
    expect(limiter.allow('user-1')).toBe(false);
  });

  it('tracks rate limits independently for each key', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1_000 });

    expect(limiter.allow('user-1')).toBe(true);
    expect(limiter.allow('user-2')).toBe(true);
    expect(limiter.allow('user-1')).toBe(false);
  });

  it('allows requests again after the time window expires', () => {
    vi.useFakeTimers();
    const limiter = createRateLimiter({ limit: 1, windowMs: 1_000 });

    expect(limiter.allow('user-1')).toBe(true);
    expect(limiter.allow('user-1')).toBe(false);

    vi.advanceTimersByTime(1_001);

    expect(limiter.allow('user-1')).toBe(true);
  });
});
