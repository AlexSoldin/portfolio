"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cityChapters } from "@/data/timeline";
import { Card } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate cards
      const cards = gsap.utils.toArray<HTMLElement>(".city-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate scene illustrations
      const scenes = gsap.utils.toArray<HTMLElement>(".city-scene");
      scenes.forEach((scene) => {
        gsap.fromTo(
          scene,
          { opacity: 0, scale: 0.5, rotate: -10 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: scene,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* Vertical Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-[var(--accent)] md:-translate-x-1/2 rounded-full" />

      <div className="space-y-24">
        {cityChapters.map((chapter, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={chapter.id} className="relative">
              {/* Dot */}
              <div
                className={`absolute left-8 md:left-1/2 w-6 h-6 rounded-full border-4 border-[var(--background)] shadow-lg md:-translate-x-1/2 z-10 ${chapter.color}`}
              />

              {/* Content Row */}
              <div
                className={`flex flex-col md:flex-row items-start gap-8 ${
                  isLeft ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Spacer for mobile */}
                <div className="w-16 shrink-0 md:hidden" />

                {/* Card Side */}
                <div
                  className={`city-card flex-1 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <Card className="p-6 hover:border-[var(--accent)] transition-all duration-300">
                    {/* Header */}
                    <div
                      className={`flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="text-4xl">{chapter.flag}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{chapter.city}</h3>
                        <p className="text-sm text-[var(--muted)] font-medium">{chapter.period}</p>
                      </div>
                    </div>

                    {/* Events */}
                    <ul className={`space-y-3 ${isLeft ? "md:text-left" : ""}`}>
                      {chapter.events.map((event, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-lg shrink-0">{event.emoji}</span>
                          <div>
                            <p className="font-medium">{event.activity}</p>
                            {event.description && (
                              <p className="text-sm text-[var(--muted)]">{event.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Scene Illustration Side */}
                <div
                  className={`city-scene hidden md:flex flex-1 md:w-[calc(50%-2rem)] items-center justify-center ${
                    isLeft ? "md:pl-16" : "md:pr-16"
                  }`}
                >
                  <div className="text-[120px] select-none opacity-80 hover:scale-110 transition-transform duration-300">
                    {chapter.scene}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
