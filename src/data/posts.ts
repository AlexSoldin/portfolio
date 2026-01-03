import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "scalable-django-applications",
    title: "Building Scalable Django Applications",
    excerpt:
      "Lessons learned from architecting systems that handle millions of requests. From database optimization to caching strategies, a practical guide to scaling Python applications.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Engineering",
    published: true,
  },
  {
    slug: "performance-optimization-deep-dive",
    title: "Performance Optimization Deep Dive",
    excerpt:
      "A comprehensive guide to measuring and improving web application performance. From Core Web Vitals to bundle optimization, with practical examples.",
    date: "Oct 12, 2024",
    readTime: "12 min read",
    category: "Performance",
    published: true,
  },
  {
    slug: "async-patterns-python",
    title: "Async Patterns in Python",
    excerpt:
      "Understanding when and how to use asynchronous programming in Python. Comparing threading, multiprocessing, and asyncio with real-world use cases.",
    date: "Sep 20, 2024",
    readTime: "10 min read",
    category: "Python",
    published: true,
  },
];

// Helper functions that could later become API calls
export function getPublishedPosts(): Post[] {
  return posts.filter((p) => p.published);
}

export function getRecentPosts(count: number = 3): Post[] {
  return getPublishedPosts().slice(0, count);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostCategories(): string[] {
  return [...new Set(posts.map((p) => p.category))];
}
