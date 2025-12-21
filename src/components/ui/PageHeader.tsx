interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <header className={`mb-12 animate-fade-in ${className}`}>
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-tight mb-4">
        {title}
      </h1>
      {subtitle && <p className="text-lg text-[var(--muted)] max-w-2xl">{subtitle}</p>}
    </header>
  );
}
