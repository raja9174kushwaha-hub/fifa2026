import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Adjust based on your prisma setup if different
import crypto from "crypto";

import { otpsFallback } from "@/lib/otpFallback";
import { createRateLimiter } from "@/lib/rateLimiter";

// Rate limiter: max 5 OTP requests per 10 minutes per user
const otpRequestLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate‑limit OTP requests per user
    if (!otpRequestLimiter.allow(session.user.id)) {
      return NextResponse.json({ error: "Too many OTP requests, try later" }, { status: 429 });
    }

    const { type, target } = await req.json();

    if (!type || !target) {
      return NextResponse.json({ error: "Missing type or target" }, { status: 400 });
    }

    if (type !== "email" && type !== "mobile") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // Basic input validation
    if (type === "email") {
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(target)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
    } else {
      // Very simple E.164‑like validation (starts with + and digits)
      const phoneRegex = /^\+\d{7,15}$/;
      if (!phoneRegex.test(target)) {
        return NextResponse.json({ error: "Invalid mobile number (use +<countrycode><number>)" }, { status: 400 });
      }
    }

    // Generate 6-digit OTP
    const code = crypto.randomInt(100000, 1_000_000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Mock send SMS/Email
    if (process.env.NODE_ENV !== "production") {
      console.log(`[OTP] Sending ${type} OTP ${code} to ${target}`);
    }

    let dbSuccess = false;
    try {
      // Upsert the verification token in DB
      const existing = await prisma.verificationToken.findFirst({
        where: { identifier: target }
      });

      if (existing) {
        await prisma.verificationToken.update({
          where: { id: existing.id },
          data: { token: code, expires }
        });
      } else {
        await prisma.verificationToken.create({
          data: {
            identifier: target,
            token: code,
            expires
          }
        });
      }
      dbSuccess = true;
    } catch (dbError) {
      console.warn("[OTP] Database update failed, falling back to in-memory map:", dbError.message);
      // Fallback
      otpsFallback.set(target, { token: code, expires: expires.getTime() });
    }

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully", 
      fallbackUsed: !dbSuccess
    });

  } catch (error) {
    console.error("Error in /api/otp/request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
