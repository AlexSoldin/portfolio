"use client";

import { FilterPill, RichText } from "@/components/ui";
import { useState } from "react";
import { AboutOrbit } from "./AboutOrbit";

interface OrbitCategory {
  id: string;
  title: string;
  items: { emoji: string; name: string }[];
}

interface AboutOrbitSectionProps {
  paragraphs: string[];
  categories: OrbitCategory[];
}

export function AboutOrbitSection({ paragraphs, categories }: AboutOrbitSectionProps) {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <>
      <div className="mb-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-[var(--muted)] leading-relaxed mb-4">
            <RichText>{paragraph}</RichText>
          </p>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <FilterPill
            key={category.id}
            isActive={activeTab === category.id}
            onClick={() => setActiveTab(category.id)}
          >
            {category.title}
          </FilterPill>
        ))}
      </div>

      <AboutOrbit items={activeCategory.items} />
    </>
  );
}
