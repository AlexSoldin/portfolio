import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Alex Soldin",
  description:
    "A collection of projects I've built, from full-stack applications to creative experiments.",
};

const projects = [
  {
    title: "Project Alpha",
    description:
      "A full-stack application for managing complex workflows with real-time collaboration features. Built to handle enterprise-scale data while maintaining a delightful user experience.",
    longDescription:
      "This project challenged me to think deeply about system architecture, real-time data synchronization, and building intuitive interfaces for complex operations.",
    tags: ["Django", "React", "PostgreSQL", "WebSockets"],
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    title: "Design System",
    description:
      "A comprehensive component library with an accessibility-first approach. Includes thorough documentation, interactive examples, and design tokens.",
    longDescription:
      "Created to establish consistency across multiple products while empowering designers and developers to work faster without sacrificing quality.",
    tags: ["TypeScript", "Storybook", "CSS Variables", "A11y"],
    year: "2024",
    link: "#",
    featured: true,
  },
  {
    title: "Data Pipeline",
    description:
      "An ETL pipeline for processing and transforming large datasets with built-in monitoring and error recovery mechanisms.",
    tags: ["Python", "Celery", "RabbitMQ", "PostgreSQL"],
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    title: "API Gateway",
    description:
      "A high-performance API gateway with rate limiting, authentication, and comprehensive logging for microservices architecture.",
    tags: ["Django REST Framework", "Redis", "Docker"],
    year: "2023",
    link: "#",
    featured: false,
  },
  {
    title: "Creative Experiments",
    description:
      "A collection of generative art pieces and creative coding experiments exploring the intersection of code and visual design.",
    tags: ["Canvas API", "p5.js", "TypeScript"],
    year: "2024",
    link: "#",
    featured: false,
  },
  {
    title: "CLI Tooling",
    description:
      "Developer productivity tools including code generators, migration helpers, and project scaffolding utilities.",
    tags: ["Python", "Click", "Rich"],
    year: "2023",
    link: "#",
    featured: false,
  },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 animate-fade-in">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold mb-4">
          Projects
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl">
          A collection of things I&apos;ve built. From production applications to creative
          experiments, each project represents a problem I found interesting.
        </p>
      </header>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6 animate-fade-in-delay-1">
          Featured
        </h2>
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="group p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:shadow-xl hover:border-[var(--accent)]/30 transition-all duration-300 animate-fade-in-delay-2"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-[var(--muted)]">{project.year}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mt-1 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <Link
                  href={project.link}
                  className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--highlight)] transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--muted)]"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-3">{project.description}</p>
              {project.longDescription && (
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 italic">
                  {project.longDescription}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-[var(--highlight)] rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section>
        <h2 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6 animate-fade-in-delay-3">
          More Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <article
              key={project.title}
              className="group p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:shadow-lg hover:border-[var(--accent)]/30 transition-all duration-300 animate-fade-in-delay-4"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--muted)]">{project.year}</span>
                <Link
                  href={project.link}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`View ${project.title}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--muted)]"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-[var(--highlight)] rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
