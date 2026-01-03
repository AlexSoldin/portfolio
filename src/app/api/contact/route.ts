import { contactRequests } from "@/db/schema";
import { contactFormSchema } from "@/lib/validation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D1DatabaseKey = any;

interface Env {
  portfolio: D1DatabaseKey;
  TURNSTILE_SECRET_KEY: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body with zod
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    const { name, email, subject, message, token } = parseResult.data;
    const { env } = (await getCloudflareContext()) as unknown as { env: Env };

    // 1. Verify Turnstile Token
    const formData = new FormData();
    formData.append("secret", env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", request.headers.get("CF-Connecting-IP") || "");

    const turnstileResult = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    interface TurnstileOutcome {
      success: boolean;
      "error-codes"?: string[];
    }

    const turnstileOutcome = (await turnstileResult.json()) as TurnstileOutcome;

    if (!turnstileOutcome.success) {
      console.error("Turnstile verification failed:", turnstileOutcome);
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 403 }
      );
    }

    // 2. Store in D1 Database (using Drizzle)
    if (env.portfolio) {
      const db = drizzle(env.portfolio);

      await db.insert(contactRequests).values({
        name,
        email,
        subject: subject || null,
        message,
        // createdAt is handled by default constraint in schema
      });
    } else {
      console.warn("D1 Database binding 'portfolio' not found. Message not stored.");
      // For development without D1 binding, verify logic flows
      console.warn("Would store:", { name, email, subject, message });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
