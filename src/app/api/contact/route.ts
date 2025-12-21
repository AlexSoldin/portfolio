import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

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
