"use client";

import { Alert, Button, Input, Textarea } from "@/components/ui";
import { useContactForm } from "@/hooks";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function ContactForm() {
  const { isSubmitting, submitStatus, handleSubmit } = useContactForm();
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, token);
  };

  return (
    <section className="animate-fade-in-delay-1">
      <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
        Send a message
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {submitStatus.type && <Alert type={submitStatus.type} message={submitStatus.message} />}

        <Input id="name" name="name" label="Name" required placeholder="Your name" />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          placeholder="you@example.com"
        />
        <Input id="subject" name="subject" label="Subject" placeholder="What's this about?" />
        <Textarea
          id="message"
          name="message"
          label="Message"
          required
          rows={5}
          placeholder="Tell me more..."
        />
        <div className="min-h-[65px] -mt-2">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            onSuccess={(token: string) => setToken(token)}
            onError={() => setToken(null)}
            onExpire={() => setToken(null)}
            options={{ theme: "dark", size: "flexible" }}
          />
        </div>

        <Button type="submit" disabled={isSubmitting || !token} fullWidth>
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </form>
    </section>
  );
}
