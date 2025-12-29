"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
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
        }
      );
    },
    { scope: containerRef }
  );

  // Split text into words
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span className="reveal-word inline-block translate-y-full">{word}</span>
        </span>
      ))}
    </div>
  );
}
