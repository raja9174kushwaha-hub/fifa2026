import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanupOtpFallback, otpsFallback } from '../src/lib/otpFallback';

describe('cleanupOtpFallback', () => {
  afterEach(() => {
    otpsFallback.clear();
    vi.useRealTimers();
  });

  it('removes expired OTPs while keeping valid OTPs', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-16T00:00:00.000Z'));
    otpsFallback.set('expired@example.com', { token: '111111', expires: Date.now() - 1 });
    otpsFallback.set('valid@example.com', { token: '222222', expires: Date.now() + 60_000 });

    cleanupOtpFallback();

    expect(otpsFallback.has('expired@example.com')).toBe(false);
    expect(otpsFallback.get('valid@example.com')).toEqual({ token: '222222', expires: Date.now() + 60_000 });
  });
});
