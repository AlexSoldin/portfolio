import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body with zod
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parseResult.data;

    // TODO: In the future, integrate with:
    // - Email service (SendGrid, Resend, etc.)
    // - Database to store messages
    // - Notification service (Slack, Discord, etc.)
    // For now, we'll just log it (using console.warn as allowed by lint rules)

    console.warn("Contact form submission:", {
      name,
      email,
      subject: subject || "(no subject)",
      message,
      timestamp: new Date().toISOString(),
    });

    // In production, you would:
    // 1. Send an email notification
    // 2. Store in database
    // 3. Return success response

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
