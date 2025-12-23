interface FilterPillProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterPill({
  children,
  isActive = false,
  onClick,
  className = "",
}: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full border transition-colors ${
        isActive
          ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
          : "border-[var(--border)] hover:border-[var(--foreground)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
