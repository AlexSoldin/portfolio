import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Tag } from "@/components/ui";
import { getPublishedPosts, getPostCategories } from "@/data";

export const metadata: Metadata = {
  title: "Writing — Alex Soldin",
  description: "Thoughts on software engineering, design, and building better products.",
};

export default function WritingPage() {
  const posts = getPublishedPosts();
  const categories = ["All", ...getPostCategories()];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader
        title="Writing"
        subtitle="Thoughts on software engineering, design patterns, and building products. I write about things I've learned, often the hard way."
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-in-delay-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
              category === "All"
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "border-[var(--border)] hover:border-[var(--foreground)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="divide-y divide-[var(--border)]">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="group animate-fade-in-delay-2"
            style={{ animationDelay: `${0.2 + index * 0.05}s` }}
          >
            <Link href={`/writing/${post.slug}`} className="block py-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-[var(--muted)] whitespace-nowrap">
                  <span>{post.date}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">{post.readTime}</span>
                </div>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-3">{post.excerpt}</p>
              <Tag>{post.category}</Tag>
            </Link>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="mt-16 p-8 bg-[var(--highlight)] border border-[var(--border)] rounded-xl animate-fade-in-delay-4">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-2">
          Stay updated
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Get notified when I publish new articles. No spam, unsubscribe anytime.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
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
