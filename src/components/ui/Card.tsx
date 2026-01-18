interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  const baseStyles = "p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl";
  const hoverStyles = hoverable
    ? "hover:shadow-lg hover:border-[var(--muted)]/30 transition-all duration-300"
    : "";

  return <div className={`${baseStyles} ${hoverStyles} ${className}`}>{children}</div>;
}
