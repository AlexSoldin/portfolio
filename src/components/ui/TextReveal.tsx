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
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".reveal-word");
      if (!words || words.length === 0) return;

      const animation = gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          paused: true,
        }
      );

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 98%",
        onEnter: () => animation.play(),
        onRefresh: (self) => {
          if (self.progress > 0) animation.play();
        },
      });

      // Manual check for hero elements already in view
      if (trigger.progress > 0) {
        animation.play();
      }
    },
    { scope: containerRef, dependencies: [text, delay, stagger, duration] }
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
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-x-[0.3em] overflow-hidden whitespace-normal ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span className="reveal-word inline-block will-change-transform" style={{ opacity: 0 }}>
            {renderWord(word)}
          </span>
        </span>
      ))}
    </div>
  );
}
