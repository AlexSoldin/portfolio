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
      className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
          : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
