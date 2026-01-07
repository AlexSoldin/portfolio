"use client";

import { RichText, TextReveal } from "@/components/ui";
import { valuePropContent } from "@/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ValueProp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".value-prop-desc",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 relative">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <TextReveal
          text={valuePropContent.title}
          className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl leading-tight text-[var(--foreground)] mb-8 justify-center"
        />

        <div className="value-prop-desc space-y-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed opacity-0">
          {valuePropContent.description.map((paragraph, index) => (
            <p key={index}>
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
