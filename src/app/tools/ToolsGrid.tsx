"use client";

import { useState, useMemo } from "react";
import { SearchInput, ToolCard, CategoryFilter } from "@/components/ui";
import { getAllTools, searchTools, getToolCategories, filterToolsByCategories } from "@/data/tools";
import type { Tool } from "@/types";

export function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Tool["category"][]>([]);
  const allTools = getAllTools();
  const categories = getToolCategories();

  const filteredTools = useMemo(() => {
    let filtered = allTools;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchTools(searchQuery);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filterToolsByCategories(filtered, selectedCategories);
    }

    return filtered;
  }, [searchQuery, selectedCategories, allTools]);

  return (
    <>
      {/* Search and Filter - Flex Layout */}
      <div className="mb-8 animate-fade-in-delay-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md w-full sm:w-auto"
        />
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />
      </div>

      {/* Tools Grid - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-delay-2">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <div className="col-span-full text-center py-12 text-[var(--muted)]">
            <p>
              No tools found
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategories.length > 0 && " in selected categories"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
