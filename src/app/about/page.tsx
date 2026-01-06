import { AboutOrbitSection } from "@/components/features/about";
import { Timeline } from "@/components/Timeline";
import { PageHeader, RichText, SectionHeader } from "@/components/ui";
import { aboutContent } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about my background, experience, and what drives me as a software engineer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader title="About me" subtitle="Software engineer and lifelong learner." />

      <div className="prose max-w-none">
        {/* Intro section */}
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

        {/* Background section with timeline */}
        <section className="mb-12 animate-fade-in-delay-2">
          <SectionHeader title={aboutContent.background.title} />

          <p className="leading-relaxed mb-4">
            <RichText>{aboutContent.background.introParagraph}</RichText>
          </p>

          <Timeline />

          {aboutContent.background.outroParagraphs.map((paragraph, index) => (
            <p key={index} className="text-[var(--muted)] leading-relaxed mb-4">
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </section>

        {/* Orbit section */}
        <section className="animate-fade-in-delay-4">
          <SectionHeader title={aboutContent.orbit.title} />
          <AboutOrbitSection
            paragraphs={aboutContent.orbit.paragraphs}
            categories={aboutContent.orbit.categories}
          />
        </section>
      </div>
    </div>
  );
}
