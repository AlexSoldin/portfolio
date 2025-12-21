import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Card, Tag } from "@/components/ui";

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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PageHeader
        title="Projects"
        subtitle="A collection of things I've built. From production applications to creative experiments, each project represents a problem I found interesting."
      />

      {/* Featured Projects */}
      <section className="mb-16">
        <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6 animate-fade-in-delay-1">
          Featured
        </p>
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="group animate-fade-in-delay-2"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <Card className="relative">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-[var(--muted)]">{project.year}</span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mt-1 group-hover:opacity-70 transition-opacity">
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
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            </article>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section>
        <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-6 animate-fade-in-delay-3">
          More Projects
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <article
              key={project.title}
              className="group animate-fade-in-delay-4"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <Card>
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
                <h3 className="font-bold mb-2 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
