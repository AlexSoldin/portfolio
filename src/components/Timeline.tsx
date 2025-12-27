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
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Progress line fills as you scroll
      gsap.to(progressLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      });

      // Cards fade in
      gsap.utils.toArray<HTMLElement>(".city-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Scene emojis pop in (slower, more centered)
      gsap.utils.toArray<HTMLElement>(".city-scene").forEach((scene) => {
        gsap.from(scene, {
          opacity: 0,
          scale: 0.5,
          duration: 1.0,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: scene,
            start: "top 75%", // Triggers when scene is more centered
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* Timeline Line */}
      <div className="timeline-line-bg" />
      <div ref={progressLineRef} className="timeline-line-progress" />

      <div className="space-y-24">
        {cityChapters.map((chapter, index) => {
          const isLeft = index % 2 === 0; // Alternates left/right on desktop

          return (
            <div key={chapter.id} className="relative">
              {/* Dot */}
              <div className="timeline-dot" />

              {/* Content Row */}
              <div className={`flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Card */}
                <div
                  className={`city-card ml-16 md:ml-0 flex-1 ${isLeft ? "md:pr-16" : "md:pl-16"}`}
                >
                  <Card className="p-6 hover:border-[var(--accent)] transition-colors">
                    <div
                      className={`flex items-center gap-3 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="text-4xl">{chapter.flag}</span>
                      <div className={isLeft ? "md:text-right" : ""}>
                        <h3 className="text-2xl font-bold">{chapter.city}</h3>
                        <p className="text-sm text-[var(--muted)]">{chapter.period}</p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {chapter.events.map((event, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-lg">{event.emoji}</span>
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

                {/* Scene Emoji (desktop only) */}
                <div
                  className={`city-scene hidden md:flex flex-1 items-center justify-center ${isLeft ? "md:pl-16" : "md:pr-16"}`}
                >
                  <span className="text-[120px] opacity-80 hover:scale-110 transition-transform">
                    {chapter.scene}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
