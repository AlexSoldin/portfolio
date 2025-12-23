import Link from "next/link";
import { Tag } from "./Tag";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}

export function PostCard({ post, className = "", style }: PostCardProps) {
  return (
    <article className={`group ${className}`} style={style}>
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
  );
}
