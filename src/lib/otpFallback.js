// Fallback in-memory map for dev/testing when DB is down
export const otpsFallback = new Map();

/**
 * Remove any expired OTP entries from the in‑memory map.
 * Called before each verification attempt to keep the map tidy.
 */
export function cleanupOtpFallback() {
  const now = Date.now();
  for (const [key, value] of otpsFallback.entries()) {
    if (value.expires < now) {
      otpsFallback.delete(key);
    }
  }
}
