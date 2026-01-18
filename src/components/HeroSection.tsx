"use client";

import GenerativeArt from "./GenerativeArt";
import { TextReveal } from "./ui";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  artWidth?: number;
  artHeight?: number;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
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
          delay={0.2}
          duration={1}
          stagger={0.05}
        />
        <TextReveal
          text={subtitle}
          className="text-lg text-[var(--muted)] leading-relaxed"
          delay={0.6}
          duration={0.8}
          stagger={0.02}
        />
      </div>

      {/* Generative Art - Left/Bottom Side on mobile, Right on Desktop */}
      <div className="flex-shrink-0 flex justify-center lg:justify-start">
        <GenerativeArt width={artWidth} height={artHeight} />
      </div>
    </section>
  );
}
