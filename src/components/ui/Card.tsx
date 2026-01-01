interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", hoverable = true, style }: CardProps) {
  return (
    <div
      className={`
        p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl
        ${hoverable ? "hover:shadow-lg hover:border-[var(--muted)]/30 transition-all duration-300" : ""}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}
