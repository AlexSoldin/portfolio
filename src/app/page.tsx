import GenerativeArt from "@/components/GenerativeArt";
import { SectionHeader, Card, Tag } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-start gap-12 mb-20">
        <div className="flex-1 order-2 lg:order-1 animate-fade-in">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-tight mb-8">
            Alex Soldin
          </h1>
          <div className="space-y-4 text-base leading-relaxed">
            <p className="animate-fade-in-delay-1">
              I&apos;m a <strong>creative engineer</strong> who builds delightful web experiences. I
              can advise your company about the <strong>web platform</strong>, performance, creative
              user interactions, and usable machine learning.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-delay-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Projects →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--foreground)] rounded-full text-sm font-medium hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 animate-fade-in-delay-1">
          <GenerativeArt width={320} height={320} cellSize={40} />
        </div>
      </section>

      {/* What I Do Section */}
      <section className="mb-16 animate-fade-in-delay-2">
        <SectionHeader title="What I Do" />
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-3">Engineering</h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">prototyping</strong>: build small
                prototypes while you&apos;re still figuring out your tech
              </li>
              <li>
                <strong className="text-[var(--foreground)]">backend development</strong>: robust
                APIs and scalable systems with Django, PostgreSQL, and modern Python
              </li>
              <li>
                <strong className="text-[var(--foreground)]">frontend engineering</strong>:
                responsive, accessible interfaces with React, TypeScript, and attention to detail
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Design & Strategy</h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">user experience</strong>: design
                interactions that are easy to use and intuitive for your users
              </li>
              <li>
                <strong className="text-[var(--foreground)]">system design</strong>: architect
                solutions that balance performance, maintainability, and developer experience
              </li>
              <li>
                <strong className="text-[var(--foreground)]">advising</strong>: answer technical
                questions, do code reviews, or offer feedback and suggestions
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="mb-16 animate-fade-in-delay-3">
        <SectionHeader title="Projects" href="/projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Project Alpha",
              description:
                "A full-stack application for managing complex workflows with real-time collaboration.",
              tags: ["Django", "React", "PostgreSQL"],
              year: "2024",
            },
            {
              title: "Design System",
              description: "A comprehensive component library with accessibility-first approach.",
              tags: ["TypeScript", "Storybook", "CSS"],
              year: "2024",
            },
          ].map((project) => (
            <Card key={project.title} className="group cursor-pointer">
              <span className="text-xs text-[var(--muted)]">{project.year}</span>
              <h3 className="font-bold text-lg mt-1 mb-2 group-hover:opacity-70 transition-opacity">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Writing Preview */}
      <section className="animate-fade-in-delay-4">
        <SectionHeader title="Writing" href="/writing" linkText="Read more →" />
        <div className="space-y-1">
          {[
            {
              title: "Building Scalable Django Applications",
              excerpt:
                "Lessons learned from architecting systems that handle millions of requests...",
              date: "Dec 2024",
            },
            {
              title: "The Art of Component Design",
              excerpt:
                "Creating reusable, accessible components that developers actually want to use...",
              date: "Nov 2024",
            },
            {
              title: "Performance Optimization Deep Dive",
              excerpt:
                "A comprehensive guide to measuring and improving web application performance...",
              date: "Oct 2024",
            },
          ].map((post) => (
            <article
              key={post.title}
              className="group flex items-start justify-between gap-4 py-4 border-b border-[var(--border)] last:border-0 cursor-pointer"
            >
              <div>
                <h3 className="font-medium group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mt-1">{post.excerpt}</p>
              </div>
              <span className="text-xs text-[var(--muted)] whitespace-nowrap">{post.date}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
