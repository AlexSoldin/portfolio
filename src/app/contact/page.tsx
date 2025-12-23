"use client";

import { HeroSection } from "@/components/HeroSection";
import { ContactLinkCard, Input, Textarea, Button, Alert } from "@/components/ui";
import { contactContent } from "@/data";
import { useContactForm } from "@/hooks";

export default function ContactPage() {
  const { title, subtitle, methods } = contactContent;
  const { isSubmitting, submitStatus, handleSubmit } = useContactForm();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <HeroSection
        title={title}
        subtitle={subtitle}
        artWidth={280}
        artHeight={280}
        artCellSize={35}
        className="animate-fade-in-delay-1"
      />

      <div className="grid lg:grid-cols-2 gap-16">
        <section className="animate-fade-in-delay-1">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
            Send a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <Button type="submit" disabled={isSubmitting} fullWidth>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </section>

        <section className="animate-fade-in-delay-2">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
            Other ways to reach me
          </h2>
          <div className="space-y-4">
            {methods.map((method) => (
              <ContactLinkCard key={method.label} method={method} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
