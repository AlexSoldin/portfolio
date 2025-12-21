interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses =
    variant === "primary"
      ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
      : "bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--highlight)]";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
