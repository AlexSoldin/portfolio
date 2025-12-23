"use client";

import { useState, useMemo } from "react";
import { FilterPill, PostCard } from "@/components/ui";
import { getPublishedPosts, getPostCategories } from "@/data";

export function PostsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const allPosts = getPublishedPosts();
  const categories = ["All", ...getPostCategories()];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return allPosts;
    }
    return allPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, allPosts]);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 animate-fade-in-delay-1">
        {categories.map((category) => (
          <FilterPill
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterPill>
        ))}
      </div>

      {/* Posts List */}
      <div className="divide-y divide-[var(--border)]">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              className="animate-fade-in-delay-2"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            />
          ))
        ) : (
          <div className="text-center py-12 text-[var(--muted)]">
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </>
  );
}
