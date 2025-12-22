"use client";

import { useState, FormEvent } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ContactLinkCard, Input, Textarea, Button, Alert } from "@/components/ui";
import { contactContent } from "@/data";

export default function ContactPage() {
  const { title, subtitle, methods } = contactContent;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        e.currentTarget.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
