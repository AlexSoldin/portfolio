"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FlowerSpiral() {
  const containerRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Spiral out and bloom
      tl.fromTo(
        containerRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        { scale: 1.5, rotate: 360, opacity: 1, duration: 1 }
      ).to(containerRef.current, {
        scale: 0,
        rotate: 720,
        opacity: 0,
        duration: 1,
      });
    },
    { scope: containerRef }
  );

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 24 24"
      fill="none"
      className="absolute -top-8 -right-8 w-16 h-16 text-[var(--accent)] pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M12 2L14.5 9H21.5L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2.5 9H9.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function ValueProp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".twist-word");
      if (!words) return;

      // Text Twist Animation
      words.forEach((word, i) => {
        gsap.to(word, {
          rotateX: 15,
          rotateY: i % 2 === 0 ? 10 : -10,
          y: -10,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: word,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
          },
        });
      });

      // Reveal Animation
      gsap.from(words, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 border-y border-[var(--border)] my-24 overflow-hidden bg-[var(--highlight)]/30"
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold leading-tight perspective-1000">
          <span className="twist-word inline-block mr-3">Building</span>
          <span className="twist-word inline-block relative mr-3">
            delightful
            <FlowerSpiral />
          </span>
          <span className="twist-word inline-block mr-3">experiences</span>
          <br className="hidden md:block" />
          <span className="twist-word inline-block mr-3">that</span>
          <span className="twist-word inline-block mr-3">bridge</span>
          <span className="twist-word inline-block text-[var(--accent)] mr-3">design</span>
          <span className="twist-word inline-block mr-3">and</span>
          <span className="twist-word inline-block text-[var(--accent)]">engineering.</span>
        </h2>
        <p className="mt-12 text-xl md:text-2xl text-[var(--muted)] max-w-2xl mx-auto twist-word opacity-80">
          Focused on performance, accessibility, and the tiny details that make software feel human.
        </p>
      </div>
    </section>
  );
}
