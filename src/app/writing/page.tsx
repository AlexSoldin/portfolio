import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { PostsList } from "@/components/features/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts on software engineering, design, and building better products.",
};

export default function WritingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader
        title="Writing"
        subtitle="Thoughts on software engineering, design patterns, and building products. I write about things I've learned, often the hard way."
      />

      <PostsList />
    </div>
  );
}
