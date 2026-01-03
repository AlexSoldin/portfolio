import { contactFormSchema } from "@/lib/validation";
import { saveContactRequest } from "@/services/contact";
import { verifyTurnstileToken } from "@/services/turnstile";
import { Env } from "@/types/env";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate Input
    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }

    const { token, ...formData } = parseResult.data;
    const { env } = (await getCloudflareContext()) as unknown as { env: Env };

    // 2. Security Check (Turnstile)
    const isHuman = await verifyTurnstileToken(
      token,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP") || undefined
    );

    if (!isHuman) {
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 403 }
      );
    }

    // 3. Save to Database
    if (env.portfolio) {
      const db = drizzle(env.portfolio);
      // Construct the full object for the service
      await saveContactRequest(db, { token, ...formData });
    } else {
      console.warn("D1 'portfolio' binding missing. Skipping DB save.");
    }

    return NextResponse.json(
      { success: true, message: "Thank you! I'll be in touch." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
