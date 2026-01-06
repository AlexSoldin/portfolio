"use client";

import { Card } from "@/components/ui";
import { cityChapters } from "@/data/timeline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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
    <section ref={containerRef} className="relative max-w-4xl mx-auto py-8 sm:py-12 my-8 sm:my-10">
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
                  <Card
                    hoverable={false}
                    className="p-5 border border-[var(--border)] group bg-[var(--card)]"
                  >
                    <div className="flex flex-col gap-1">
                      {/* Header Row: Flag + City + Period */}
                      <div
                        className={`flex items-center gap-2.5 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="text-2xl filter drop-shadow-sm">{chapter.flag}</span>
                        <div
                          className={`flex flex-col ${isLeft ? "md:items-end" : "md:items-start"}`}
                        >
                          <div
                            className={`flex items-baseline gap-2 ${isLeft ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <h3 className="text-lg font-bold leading-tight">{chapter.city}</h3>
                            <span className="text-xs font-mono text-[var(--muted)]">
                              {chapter.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Events (Simplified) */}
                      <div className="mt-2">
                        {chapter.events.map((event, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2.5 ${
                              isLeft ? "md:flex-row-reverse md:text-right" : ""
                            }`}
                          >
                            <span className="text-lg leading-relaxed">{event.emoji}</span>
                            <div>
                              <p className="text-[var(--foreground)] text-sm font-medium leading-relaxed">
                                {event.activity}
                              </p>
                              {event.description && (
                                <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Scene Emoji (desktop only) */}
                <div
                  className={`city-scene hidden md:flex flex-1 items-center justify-center ${
                    isLeft ? "md:pl-16" : "md:pr-16"
                  }`}
                >
                  <span className="text-[100px] opacity-80 cursor-default">{chapter.scene}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
