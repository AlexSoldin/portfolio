import type { Metadata } from "next";
import { PageHeader, SectionHeader, Card, RichText } from "@/components/ui";
import { aboutContent } from "@/data";

export const metadata: Metadata = {
  title: "About — Alex Soldin",
  description:
    "Learn more about my background, experience, and what drives me as an engineer and designer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader title="About me" subtitle="Engineer, designer, and lifelong learner." />

      <div className="prose max-w-none">
        {/* Intro Section */}
        <section className="mb-12 animate-fade-in-delay-1">
          <SectionHeader title={aboutContent.intro.title} />
          {aboutContent.intro.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`leading-relaxed mb-4 ${index === 0 ? "" : "text-[var(--muted)]"}`}
            >
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </section>

        {/* Background Section */}
        <section className="mb-12 animate-fade-in-delay-2">
          <SectionHeader title={aboutContent.background.title} />
          {aboutContent.background.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[var(--muted)] leading-relaxed mb-4">
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </section>

        {/* Expertise Section */}
        <section className="mb-12 animate-fade-in-delay-3">
          <SectionHeader title={aboutContent.expertise.title} />
          <div className="grid sm:grid-cols-2 gap-8">
            {aboutContent.expertise.categories.map((category) => (
              <div key={category.title}>
                <h3 className="font-bold mb-3">{category.title}</h3>
                <ul className="space-y-2 text-[var(--muted)]">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="animate-fade-in-delay-4">
          <SectionHeader title={aboutContent.values.title} />
          <div className="grid sm:grid-cols-3 gap-6">
            {aboutContent.values.items.map((value) => (
              <Card key={value.title} hoverable={false}>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--muted)]">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
