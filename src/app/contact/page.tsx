import { ContactForm } from "@/components/features/contact";
import { HeroSection } from "@/components/HeroSection";
import { ContactLinkCard } from "@/components/ui";
import { contactContent } from "@/data";

export default function ContactPage() {
  const { title, subtitle, methods } = contactContent;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <HeroSection title={title} subtitle={subtitle} artWidth={320} artHeight={320} />

      <div className="grid lg:grid-cols-2 gap-16">
        <ContactForm />

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
