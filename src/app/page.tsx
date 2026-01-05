import { HeroSection } from "@/components/HeroSection";
// import { getFeaturedProjects, getRecentPosts, heroContent } from "@/data";
import { heroContent } from "@/data";

export default function Home() {
  // const featuredProjects = getFeaturedProjects();
  // const recentPosts = getRecentPosts(3);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <HeroSection
        title={heroContent.greeting}
        description={heroContent.description}
        artWidth={320}
        artHeight={320}
      />

      {/* Value Proposition Section */}
      {/* <ValueProp /> */}

      {/* What I Do Section */}
      {/* <section className="mb-16 animate-fade-in-delay-2">
        <SectionHeader title="What I do" />
        <div className="space-y-6">
          {skills.map((category) => (
            <div key={category.title}>
              <h3 className="font-bold text-lg mb-3">{category.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <strong className="text-[var(--foreground)]">{item.name}</strong>:{" "}
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section> */}

      {/* Featured Projects Preview */}
      {/* <section className="mb-16 animate-fade-in-delay-3">
        <SectionHeader title="Projects" href="/projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group cursor-pointer">
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
      </section> */}

      {/* Recent Writing Preview */}
      {/* <section className="animate-fade-in-delay-4">
        <SectionHeader title="Writing" href="/writing" linkText="Read more →" />
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <article
              key={post.slug}
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
      </section> */}
    </div>
  );
}
