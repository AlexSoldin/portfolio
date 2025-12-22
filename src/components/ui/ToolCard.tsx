import Link from "next/link";
import { Card } from "./Card";
import { Tag } from "./Tag";
import type { Tool } from "@/types";

interface ToolCardProps {
  tool: Tool;
}

const categoryLabels: Record<Tool["category"], string> = {
  productivity: "Productivity",
  coding: "Coding",
  communication: "Communication",
  media: "Media",
  security: "Security",
  other: "Other",
};

export function ToolCard({ tool }: ToolCardProps) {
  const content = (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">{tool.name}</h3>
        <Tag>{categoryLabels[tool.category]}</Tag>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">{tool.description}</p>
      {tool.link && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--accent)] font-medium">Visit website →</span>
        </div>
      )}
    </Card>
  );

  if (tool.link) {
    return (
      <Link href={tool.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }

  return <div className="h-full">{content}</div>;
}
