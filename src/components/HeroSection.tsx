import GenerativeArt from "./GenerativeArt";
import { PageHeader } from "./ui";

interface HeroSectionProps {
  title: string;
  subtitle?: string | React.ReactNode;
  artWidth?: number;
  artHeight?: number;
  artCellSize?: number;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  artWidth = 320,
  artHeight = 320,
  artCellSize = 40,
  className = "",
}: HeroSectionProps) {
  return (
    <section
      className={`flex flex-col lg:flex-row lg:items-center gap-12 mb-16 lg:mb-20 ${className}`}
    >
      {/* Text Content - Left Side */}
      <div className="flex-1">
        <PageHeader
          title={title}
          subtitle={typeof subtitle === "string" ? subtitle : undefined}
          className="mb-0"
        />
        {subtitle && typeof subtitle !== "string" && (
          <div className="text-lg text-[var(--muted)] leading-relaxed mt-4">{subtitle}</div>
        )}
      </div>

      {/* Generative Art - Right Side */}
      <div className="flex-shrink-0">
        <GenerativeArt width={artWidth} height={artHeight} cellSize={artCellSize} />
      </div>
    </section>
  );
}
