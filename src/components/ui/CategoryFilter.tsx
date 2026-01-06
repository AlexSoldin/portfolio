"use client";

import type { Tool } from "@/types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CategoryFilterProps {
  categories: Tool["category"][];
  selectedCategories: Tool["category"][];
  onSelectionChange: (categories: Tool["category"][]) => void;
  className?: string;
}

const categoryLabels: Record<Tool["category"], string> = {
  productivity: "Productivity",
  coding: "Coding",
  communication: "Communication",
  media: "Media",
  security: "Security",
  other: "Other",
};

export function CategoryFilter({
  categories,
  selectedCategories,
  onSelectionChange,
  className = "",
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calculate dropdown position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8, // 8px = mt-2 equivalent
          right: window.innerWidth - rect.right,
        });
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleCategory = (category: Tool["category"]) => {
    if (selectedCategories.includes(category)) {
      onSelectionChange(selectedCategories.filter((c) => c !== category));
    } else {
      onSelectionChange([...selectedCategories, category]);
    }
  };

  const displayText =
    selectedCategories.length === 0
      ? "All categories"
      : selectedCategories.length === 1
        ? categoryLabels[selectedCategories[0]]
        : `${selectedCategories.length} categories`;

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className="fixed w-56 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto"
      style={{
        top: `${dropdownPosition.top}px`,
        right: `${dropdownPosition.right}px`,
      }}
    >
      <div className="p-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--highlight)] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-[var(--accent)] border-[var(--border)] rounded focus:ring-[var(--accent)]/20"
              />
              <span className="text-sm">{categoryLabels[category]}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className={className}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full md:w-auto px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all flex items-center justify-between gap-2 min-w-[180px] cursor-pointer"
        >
          <span className="text-sm">{displayText}</span>
          <svg
            className={`h-4 w-4 text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {typeof window !== "undefined" && createPortal(dropdownContent, document.body)}
    </>
  );
}
