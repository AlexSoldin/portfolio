import type { Metadata } from "next";
import { PageHeader, Card, ContactIcon } from "@/components/ui";
import { contactContent } from "@/data";
import GenerativeArt from "@/components/GenerativeArt";

export const metadata: Metadata = {
  title: "Contact — Alex Soldin",
  description: "Get in touch for collaborations, consulting, or just to say hello.",
};

export default function ContactPage() {
  const { title, subtitle, availability, methods } = contactContent;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <section className="flex flex-col lg:flex-row items-start gap-12 mb-16">
        <div className="flex-1 order-2 lg:order-1">
          <PageHeader title={title} subtitle={subtitle} />
        </div>
        <div className="order-1 lg:order-2 animate-fade-in-delay-1">
          <GenerativeArt width={280} height={280} cellSize={35} />
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section className="animate-fade-in-delay-1">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
            Send a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me more..."
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Methods */}
        <section className="animate-fade-in-delay-2">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-6">
            Other Ways to Reach Me
          </h2>
          <div className="space-y-4">
            {methods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Card className="flex items-center gap-4 group">
                  <span className="p-3 bg-[var(--highlight)] rounded-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    <ContactIcon icon={method.icon} />
                  </span>
                  <div>
                    <p className="text-sm text-[var(--muted)]">{method.label}</p>
                    <p className="font-medium group-hover:opacity-70 transition-opacity">
                      {method.value}
                    </p>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          {/* Availability Notice */}
          <div className="mt-8 p-6 bg-[var(--highlight)] border border-[var(--border)] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  availability.status === "available"
                    ? "bg-[var(--accent)]"
                    : availability.status === "busy"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              ></span>
              <span className="text-sm font-bold">
                {availability.status === "available"
                  ? "Available for Work"
                  : availability.status === "busy"
                    ? "Limited Availability"
                    : "Not Available"}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)]">{availability.message}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
