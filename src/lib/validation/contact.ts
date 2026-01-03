import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  token: z.string().min(1, "Turnstile token is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
