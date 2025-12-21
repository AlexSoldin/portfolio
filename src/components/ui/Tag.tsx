interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`px-2 py-1 text-xs bg-[var(--highlight)] rounded-md ${className}`}>
      {children}
    </span>
  );
}
