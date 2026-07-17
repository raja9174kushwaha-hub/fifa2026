// Simple in-memory rate limiter
// Usage: const limiter = createRateLimiter({ limit: 5, windowMs: 60_000 });
// if (!limiter.allow(key)) { /* reject */ }
export function createRateLimiter({ limit, windowMs }) {
  const store = new Map(); // key -> array of timestamps
  return {
    allow(key) {
      const now = Date.now();
      const timestamps = store.get(key) || [];
      // keep only timestamps within window
      const recent = timestamps.filter(ts => now - ts < windowMs);
      if (recent.length >= limit) {
        return false;
      }
      recent.push(now);
      store.set(key, recent);
      return true;
    }
  };
}
