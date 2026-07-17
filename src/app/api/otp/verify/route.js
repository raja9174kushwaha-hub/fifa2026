import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { otpsFallback, cleanupOtpFallback } from "@/lib/otpFallback";
import { createRateLimiter } from "@/lib/rateLimiter";
import crypto from "crypto";

// Rate limiter for verification attempts: max 5 per 10 minutes per user
const otpVerifyLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate‑limit verification attempts per user
    if (!otpVerifyLimiter.allow(session.user.id)) {
      return NextResponse.json({ error: "Too many verification attempts, try later" }, { status: 429 });
    }

    const { type, target, code } = await req.json();

    if (!type || !target || !code) {
      return NextResponse.json({ error: "Missing type, target, or code" }, { status: 400 });
    }

    // Basic validation for type & target
    if (type !== "email" && type !== "mobile") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    if (type === "email") {
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(target)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
    } else {
      const phoneRegex = /^\+\d{7,15}$/;
      if (!phoneRegex.test(target)) {
        return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
      }
    }

    let isValid = false;
    let isExpired = false;

    // Clean up any stale in‑memory OTPs before checking
    cleanupOtpFallback();

    try {
      // 1. Check DB first – constant‑time compare for security
      const record = await prisma.verificationToken.findFirst({
        where: { identifier: target }
      });
      if (record) {
        // Use timingSafeEqual to avoid timing attacks
        const stored = Buffer.from(record.token);
        const supplied = Buffer.from(code);
        if (stored.length === supplied.length && crypto.timingSafeEqual(stored, supplied)) {
          if (record.expires < new Date()) {
            isExpired = true;
          } else {
            isValid = true;
            // Delete used token
            await prisma.verificationToken.delete({ where: { id: record.id } });
          }
        }
      }
    } catch (dbError) {
      console.warn("[OTP] Database read failed, using in‑memory fallback:", dbError.message);
    }

    // 2. Fallback to in‑memory map if not already validated
    if (!isValid) {
      const fallbackRecord = otpsFallback.get(target);
      if (fallbackRecord && fallbackRecord.token === code) {
        if (fallbackRecord.expires < Date.now()) {
          isExpired = true;
        } else {
          isValid = true;
          otpsFallback.delete(target);
        }
      }
    }

    if (isExpired) {
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }
    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // 3. Mark as verified
    try {
      if (type === "email") {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { emailVerified: new Date() }
        });
      } else if (type === "mobile") {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { 
            mobileVerified: new Date(),
            mobileNumber: target 
          }
        });
      }
    } catch (dbError) {
      // If DB update fails, still return success because verification already succeeded in fallback mode
      console.warn("[OTP] Database update failed for user verification:", dbError.message);
    }

    return NextResponse.json({ success: true, message: "Verified successfully" });

  } catch (error) {
    console.error("Error in /api/otp/verify:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
