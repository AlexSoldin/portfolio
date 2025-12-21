import type { Metadata } from "next";
import { PageHeader, Card } from "@/components/ui";
import GenerativeArt from "@/components/GenerativeArt";

export const metadata: Metadata = {
  title: "Contact — Alex Soldin",
  description: "Get in touch for collaborations, consulting, or just to say hello.",
};

const contactMethods = [
  {
    label: "Email",
    value: "hello@alexsoldin.dev",
    href: "mailto:hello@alexsoldin.dev",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "@alexsoldin",
    href: "https://github.com/alexsoldin",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "/in/alexsoldin",
    href: "https://linkedin.com/in/alexsoldin",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    value: "@alexsoldin",
    href: "https://twitter.com/alexsoldin",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <section className="flex flex-col lg:flex-row items-start gap-12 mb-16">
        <div className="flex-1 order-2 lg:order-1">
          <PageHeader
            title="Let's work together"
            subtitle="I'm always interested in hearing about new projects, opportunities, or just having a conversation about technology and design."
          />
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
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20 focus:border-[var(--foreground)] transition-all"
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
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20 focus:border-[var(--foreground)] transition-all"
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
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20 focus:border-[var(--foreground)] transition-all"
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
                className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20 focus:border-[var(--foreground)] transition-all resize-none"
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
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Card className="flex items-center gap-4 group">
                  <span className="p-3 bg-[var(--highlight)] rounded-lg text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                    {method.icon}
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
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold">Available for Work</span>
            </div>
            <p className="text-sm text-[var(--muted)]">
              I&apos;m currently open to freelance projects, consulting work, and interesting
              full-time opportunities. Let&apos;s talk!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
