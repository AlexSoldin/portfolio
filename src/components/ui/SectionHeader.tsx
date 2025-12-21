import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkText?: string;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  linkText = "View all →",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
}
