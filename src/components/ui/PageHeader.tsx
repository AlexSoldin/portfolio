interface PageHeaderProps {
  title: string;
  subtitle?: string | React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <header className={`mb-12 animate-fade-in ${className}`}>
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-none mb-4 mt-0">
        {title}
      </h1>
      {subtitle && (
        <div className="text-lg text-[var(--muted)] max-w-2xl">
          {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
        </div>
      )}
    </header>
  );
}
