import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing — Alex Soldin",
  description: "Thoughts on software engineering, design, and building better products.",
};

const posts = [
  {
    title: "Building Scalable Django Applications",
    excerpt:
      "Lessons learned from architecting systems that handle millions of requests. From database optimization to caching strategies, a practical guide to scaling Python applications.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Engineering",
    slug: "scalable-django-applications",
  },
  {
    title: "The Art of Component Design",
    excerpt:
      "Creating reusable, accessible components that developers actually want to use. A deep dive into API design, composition patterns, and building for extensibility.",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    category: "Design Systems",
    slug: "art-of-component-design",
  },
  {
    title: "Performance Optimization Deep Dive",
    excerpt:
      "A comprehensive guide to measuring and improving web application performance. From Core Web Vitals to bundle optimization, with practical examples.",
    date: "Oct 12, 2024",
    readTime: "12 min read",
    category: "Performance",
    slug: "performance-optimization-deep-dive",
  },
  {
    title: "Async Patterns in Python",
    excerpt:
      "Understanding when and how to use asynchronous programming in Python. Comparing threading, multiprocessing, and asyncio with real-world use cases.",
    date: "Sep 20, 2024",
    readTime: "10 min read",
    category: "Python",
    slug: "async-patterns-python",
  },
  {
    title: "Designing for Developer Experience",
    excerpt:
      "What makes an API delightful to use? Exploring the principles of developer-focused design and how to build tools that people love.",
    date: "Aug 5, 2024",
    readTime: "7 min read",
    category: "Design",
    slug: "designing-developer-experience",
  },
  {
    title: "Database Migrations at Scale",
    excerpt:
      "Strategies for safely evolving database schemas in production systems with zero downtime. Learned the hard way so you don't have to.",
    date: "Jul 18, 2024",
    readTime: "9 min read",
    category: "Engineering",
    slug: "database-migrations-scale",
  },
];

const categories = ["All", ...new Set(posts.map((p) => p.category))];

export default function WritingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 animate-fade-in">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold mb-4">
          Writing
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl">
          Thoughts on software engineering, design patterns, and building products. I write about
          things I&apos;ve learned, often the hard way.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-in-delay-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
              category === "All"
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-1">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="group animate-fade-in-delay-2"
            style={{ animationDelay: `${0.2 + index * 0.05}s` }}
          >
            <Link
              href={`/writing/${post.slug}`}
              className="block p-6 -mx-6 rounded-xl hover:bg-[var(--highlight)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-[var(--muted)] whitespace-nowrap">
                  <span>{post.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">{post.readTime}</span>
                </div>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-3">{post.excerpt}</p>
              <span className="inline-block px-2 py-1 text-xs bg-[var(--highlight)] group-hover:bg-[var(--border)] rounded-md transition-colors">
                {post.category}
              </span>
            </Link>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="mt-16 p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl animate-fade-in-delay-4">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-2">
          Stay Updated
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Get notified when I publish new articles. No spam, unsubscribe anytime.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
