"use client";

import { parseTextToWords } from "@/lib/text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Play animation immediately without waiting for scroll trigger */
  immediate?: boolean;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  immediate = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".reveal-word");
      if (!words) return;

      gsap.fromTo(
        words,
        { y: "100%" },
        {
          y: "0%",
          duration,
          delay,
          stagger,
          ease: "power4.out",
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }),
        }
      );
    },
    { scope: containerRef }
  );

  const words = parseTextToWords(text);

  function renderWord(word: { text: string; isAccent?: boolean; isBold?: boolean }) {
    if (word.isAccent) {
      return <span className="text-[var(--accent)]">{word.text}</span>;
    }
    if (word.isBold) {
      return <strong className="font-semibold text-[var(--foreground)]">{word.text}</strong>;
    }
    return word.text;
  }

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span className="reveal-word inline-block translate-y-full">{renderWord(word)}</span>
        </span>
      ))}
    </div>
  );
}
