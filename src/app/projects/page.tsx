import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Card, Tag } from "@/components/ui";
import { getAllProjects } from "@/data";

export const metadata: Metadata = {
  title: "Projects — Alex Soldin",
  description:
    "A collection of projects I've built, from full-stack applications to creative experiments.",
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects.filter((p) => !p.featured);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
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
              key={project.id}
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
                  {project.link && (
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
                  )}
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
          More projects
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <article
              key={project.id}
              className="group animate-fade-in-delay-4"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[var(--muted)]">{project.year}</span>
                  {project.link && (
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
                  )}
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
