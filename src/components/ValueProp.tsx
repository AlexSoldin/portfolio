"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DesktopFlower = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      // ... (existing animation logic for DesktopFlower)
      // Ensure to scope selector correctly if reusing existing code
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(
        ".flower-trail",
        { strokeDasharray: 700, strokeDashoffset: 700 },
        { strokeDashoffset: 0, duration: 2, ease: "power1.inOut" }
      )
        .fromTo(
          ".flower-head",
          { scale: 0, rotate: -90, opacity: 0, transformOrigin: "50% 50%" },
          { scale: 1, rotate: 0, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.5)" },
          "-=0.5"
        )
        .fromTo(
          ".flower-particle",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.8, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
          "-=0.8"
        );

      gsap.to(".flower-head", {
        rotate: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 300"
      className="hidden md:block absolute left-[92%] bottom-[-10px] w-[600px] h-[300px] -z-10 text-[var(--accent)] pointer-events-none overflow-visible"
      fill="none"
    >
      {/* Desktop Path (Wide S-Curve) */}
      <path
        d="M 2 280 C 30 295, 80 320, 150 280 C 250 220, 250 100, 450 80 C 500 75, 520 70, 520 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="flower-trail opacity-60"
        fill="none"
      />
      <g transform="translate(520, 50) scale(2.4)" className="flower-head">
        {/* ... (Flower Head SVG content) ... */}
        {[22.5, 67.5, 112.5, 157.5].map((angle, i) => (
          <g key={`back-${i}`} transform={`rotate(${angle}) scale(0.8)`}>
            <ellipse cx="0" cy="-14" rx="3" ry="10" fill="currentColor" opacity="0.5" />
            <ellipse cx="0" cy="14" rx="3" ry="10" fill="currentColor" opacity="0.5" />
          </g>
        ))}
        {[0, 45, 90, 135].map((angle, i) => (
          <g key={`front-${i}`} transform={`rotate(${angle})`}>
            <ellipse cx="0" cy="-14" rx="4" ry="12" fill="currentColor" opacity="0.9" />
            <ellipse cx="0" cy="14" rx="4" ry="12" fill="currentColor" opacity="0.9" />
          </g>
        ))}
        <circle r="5" fill="currentColor" className="text-white mix-blend-overlay opacity-30" />
        <circle r="2.5" fill="currentColor" />
      </g>
      <circle cx="480" cy="80" r="2" fill="currentColor" className="flower-particle opacity-60" />
      <circle cx="560" cy="30" r="3" fill="currentColor" className="flower-particle opacity-40" />
      <circle cx="510" cy="10" r="1.5" fill="currentColor" className="flower-particle opacity-70" />
    </svg>
  );
};

const MobileFlower = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      // ... (Simpler animation logic for mobile)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(
        ".flower-trail",
        { strokeDasharray: 300, strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
      ).fromTo(
        ".flower-head",
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      );

      gsap.to(".flower-head", {
        rotate: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 150 200"
      className="md:hidden absolute left-[85%] bottom-0 w-[150px] h-[200px] -z-10 text-[var(--accent)] pointer-events-none overflow-visible"
      fill="none"
    >
      {/* Mobile Path (Vertical/Curved Up) */}
      <path
        d="M 0 190 Q 40 190, 60 150 C 80 110, 60 80, 80 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="flower-trail opacity-60"
        fill="none"
      />
      <g transform="translate(80, 40) scale(1.5)" className="flower-head">
        {/* Simplified Flower Head for mobile */}
        {[0, 60, 120].map((angle, i) => (
          <g key={`mb-${i}`} transform={`rotate(${angle})`}>
            <ellipse cx="0" cy="-12" rx="3.5" ry="10" fill="currentColor" opacity="0.9" />
            <ellipse cx="0" cy="12" rx="3.5" ry="10" fill="currentColor" opacity="0.9" />
          </g>
        ))}
        <circle r="4" fill="currentColor" className="text-white mix-blend-overlay opacity-30" />
        <circle r="2" fill="currentColor" />
      </g>
    </svg>
  );
};

export function ValueProp() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".fade-text", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 relative">
      <div className="max-w-4xl mx-auto text-center md:text-left relative">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl leading-tight text-[var(--foreground)] relative z-10">
          <span className="fade-text block mb-2">I build digital products</span>
          <span className="fade-text block">
            that <span className="italic">feel</span> natural to use
          </span>
          <span className="fade-text block">and beautiful to watch</span>
          <span className="fade-text block text-[var(--accent)] relative w-fit">
            grow.
            <DesktopFlower />
            <MobileFlower />
          </span>
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-12 text-lg md:text-xl text-[var(--muted)] fade-text relative z-10">
          <p>
            We often forget that software is used by real people. I focus on the subtle
            details—typography, spacing, micro-interactions—that transform a tool into an
            experience.
          </p>
          <p>
            Minimalism isn&apos;t just about less. It&apos;s about enough. Enough signal, enough
            noise, and enough breathing room for the content to shine.
          </p>
        </div>
      </div>
    </section>
  );
}
