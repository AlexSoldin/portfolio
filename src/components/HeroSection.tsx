import GenerativeArt from "./GenerativeArt";
import { TextReveal } from "./ui";

interface HeroSectionProps {
  title: string;
  description: string;
  artWidth?: number;
  artHeight?: number;
  artCellSize?: number;
  className?: string;
}

export function HeroSection({
  title,
  description,
  artWidth = 320,
  artHeight = 320,
  className = "",
}: HeroSectionProps) {
  return (
    <section
      className={`flex flex-col lg:flex-row lg:items-center gap-12 mb-16 lg:mb-20 ${className}`}
    >
      {/* Text Content - Left Side */}
      <div className="flex-1">
        <TextReveal
          text={title}
          className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold leading-none mb-6"
          duration={1}
        />
        <TextReveal
          text={description}
          className="text-lg text-[var(--muted)] leading-relaxed"
          delay={0.5}
          stagger={0.02}
          duration={0.8}
        />
      </div>

      {/* Generative Art - Right Side */}
      <div className="flex-shrink-0 flex justify-center lg:justify-start">
        <GenerativeArt width={artWidth} height={artHeight} />
      </div>
    </section>
  );
}
