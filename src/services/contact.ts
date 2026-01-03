import { contactRequests } from "@/db/schema";
import { ContactFormData } from "@/lib/validation";
import { DrizzleD1Database } from "drizzle-orm/d1";

// D1Database is globally available via @cloudflare/workers-types

export async function saveContactRequest(
  db: DrizzleD1Database<Record<string, unknown>>,
  data: ContactFormData
): Promise<void> {
  await db.insert(contactRequests).values({
    name: data.name,
    email: data.email,
    subject: data.subject || null,
    message: data.message,
    // createdAt is handled by default constraint in schema
  });
}
