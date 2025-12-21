import GenerativeArt from "@/components/GenerativeArt";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-start gap-12 mb-20">
        <div className="flex-1 animate-fade-in">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold leading-tight mb-6">
            Alex <br />
            <span className="text-[var(--accent)]">Soldin</span>
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-6 max-w-xl animate-fade-in-delay-1">
            I&apos;m a <strong className="text-[var(--foreground)]">creative engineer</strong> who
            builds delightful web experiences. I specialize in the{" "}
            <strong className="text-[var(--foreground)]">web platform</strong>, performance
            optimization, and crafting intuitive user interactions.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-xl animate-fade-in-delay-2">
            Currently focused on building scalable applications with Django, React, and everything
            in between. I believe great software is at the intersection of engineering excellence
            and thoughtful design.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-delay-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--border)]/50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="animate-fade-in-delay-2 animate-float">
          <GenerativeArt width={280} height={280} />
        </div>
      </section>

      {/* What I Do Section */}
      <section className="mb-20 animate-fade-in-delay-3">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-8">
          What I Do
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Backend Development",
              description:
                "Building robust APIs and scalable systems with Django, PostgreSQL, and modern Python practices.",
              icon: "⚙️",
            },
            {
              title: "Frontend Engineering",
              description:
                "Creating responsive, accessible interfaces with React, TypeScript, and attention to detail.",
              icon: "🎨",
            },
            {
              title: "System Design",
              description:
                "Architecting solutions that balance performance, maintainability, and developer experience.",
              icon: "📐",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:shadow-lg hover:border-[var(--accent)]/30 transition-all duration-300"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <span className="text-2xl mb-4 block">{item.icon}</span>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="mb-20 animate-fade-in-delay-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold">
            Featured Projects
          </h2>
          <Link href="/projects" className="text-sm text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>
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
              description:
                "A comprehensive component library with accessibility-first approach and thorough documentation.",
              tags: ["TypeScript", "Storybook", "CSS"],
              year: "2024",
            },
          ].map((project) => (
            <article
              key={project.title}
              className="group p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:shadow-lg hover:border-[var(--accent)]/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--muted)]">{project.year}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-[var(--highlight)] rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Writing Preview */}
      <section className="animate-fade-in-delay-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold">
            Recent Writing
          </h2>
          <Link href="/writing" className="text-sm text-[var(--accent)] hover:underline">
            Read more →
          </Link>
        </div>
        <div className="space-y-4">
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
              className="group flex items-start justify-between gap-4 p-4 -mx-4 rounded-lg hover:bg-[var(--highlight)] transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
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
