"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

interface Word {
  text: string;
  isBold: boolean;
}

// Parse text with **bold** or *bold* markdown into words with formatting
function parseTextToWords(text: string): Word[] {
  const words: Word[] = [];
  // Match bold patterns and capture them with their content
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add normal words before this match
    if (match.index > lastIndex) {
      const normalText = text.slice(lastIndex, match.index);
      normalText
        .split(" ")
        .filter(Boolean)
        .forEach((word) => {
          words.push({ text: word, isBold: false });
        });
    }

    // Add bold words (group 1 for **, group 2 for *)
    const boldText = match[1] || match[2];
    boldText
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        words.push({ text: word, isBold: true });
      });

    lastIndex = regex.lastIndex;
  }

  // Add remaining normal words
  if (lastIndex < text.length) {
    text
      .slice(lastIndex)
      .split(" ")
      .filter(Boolean)
      .forEach((word) => {
        words.push({ text: word, isBold: false });
      });
  }

  return words;
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

  const words = parseTextToWords(text);

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span className="reveal-word inline-block translate-y-full">
            {word.isBold ? (
              <strong className="font-semibold text-[var(--foreground)]">{word.text}</strong>
            ) : (
              word.text
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
