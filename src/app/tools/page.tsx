import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tools — Alex Soldin",
  description: "Useful tools and utilities that I use on a daily basis.",
};

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <PageHeader
        title="Tools"
        subtitle="Useful tools and utilities that I use on a daily basis."
      />
    </div>
  );
}
