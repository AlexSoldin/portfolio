import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Alex Soldin",
  description: "Learn more about my background, experience, and what drives me as an engineer and designer.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 animate-fade-in">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold mb-4">
          About Me
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Engineer, designer, and lifelong learner.
        </p>
      </header>

      <div className="prose max-w-none">
        <section className="mb-12 animate-fade-in-delay-1">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6">
            The Short Version
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            I&apos;m a <strong className="text-[var(--foreground)]">creative engineer</strong> with 
            a passion for building things that matter. My work sits at the intersection of 
            engineering excellence and thoughtful design—I believe the best software is both 
            technically robust and delightful to use.
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            Currently, I&apos;m focused on building scalable web applications, designing intuitive 
            user experiences, and exploring the creative possibilities of code.
          </p>
        </section>

        <section className="mb-12 animate-fade-in-delay-2">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6">
            Background
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            I started my journey in software development driven by curiosity about how things work. 
            Over the years, that curiosity has led me through backend systems, frontend interfaces, 
            and everything in between.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            My experience spans working on complex enterprise systems to crafting polished consumer 
            products. I&apos;ve learned that good engineering isn&apos;t just about writing code—it&apos;s 
            about understanding problems deeply and communicating solutions clearly.
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me exploring new technologies, reading about design 
            systems, or working on creative side projects.
          </p>
        </section>

        <section className="mb-12 animate-fade-in-delay-3">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6">
            Technical Expertise
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Backend & Systems</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  Python & Django
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  PostgreSQL & Database Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  REST APIs & GraphQL
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  Celery & Background Tasks
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Frontend & Design</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  React & TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  Next.js & Modern Frameworks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  CSS & Tailwind
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></span>
                  UI/UX Design Principles
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="animate-fade-in-delay-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6">
            Values
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Craft",
                description: "I care deeply about the quality of my work. Every line of code, every pixel matters."
              },
              {
                title: "Clarity",
                description: "Complex problems deserve simple solutions. I strive for code that tells a story."
              },
              {
                title: "Growth",
                description: "Technology evolves constantly. I embrace learning and adapting to new challenges."
              }
            ].map((value) => (
              <div 
                key={value.title}
                className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl"
              >
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--muted)]">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

