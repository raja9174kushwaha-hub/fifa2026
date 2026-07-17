import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          mobileNumber: true,
          mobileVerified: true,
          role: true,
          image: true
        }
      });
    } catch (dbError) {
      console.warn("[Profile] Database read failed:", dbError.message);
      // Fallback response based on session
      user = {
        ...session.user,
        emailVerified: null,
        mobileNumber: null,
        mobileVerified: null,
      };
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
