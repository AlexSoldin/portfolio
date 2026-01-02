"use client";

import { useEffect, useRef, useState } from "react";

interface Hobby {
  emoji: string;
  name: string;
}

interface BeyondCodeProps {
  hobbies: Hobby[];
}

function Hobby({
  hobby,
  index,
  total,
  isPaused,
  onHover,
  activeIndex,
}: {
  hobby: Hobby;
  index: number;
  total: number;
  isPaused: boolean;
  onHover: (index: number | null) => void;
  activeIndex: number | null;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef((index / total) * Math.PI * 2);
  const animationRef = useRef<number>(0);
  const isActive = activeIndex === index;

  // Orbital parameters - 2 rings
  const ring = index % 2;
  const orbitRadius = 120 + ring * 80;
  const speed = 0.0006 + ring * 0.0002;
  const tilt = 12;

  useEffect(() => {
    const animate = () => {
      if (!isPaused && !isActive) {
        angleRef.current += speed;
      }

      if (elementRef.current) {
        const angle = angleRef.current;

        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * Math.cos((tilt * Math.PI) / 180);
        const z = Math.sin(angle) * orbitRadius * Math.sin((tilt * Math.PI) / 180);

        const scale = isActive ? 1.05 : 0.85 + ((z + orbitRadius) / (orbitRadius * 2)) * 0.3;
        const opacity = isActive ? 1 : 0.5 + ((z + orbitRadius) / (orbitRadius * 2)) * 0.5;
        const zIndex = Math.round(z + orbitRadius);

        elementRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        elementRef.current.style.opacity = String(opacity);
        elementRef.current.style.zIndex = isActive ? "100" : String(zIndex);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, isActive, orbitRadius, speed, tilt]);

  return (
    <div
      ref={elementRef}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="absolute left-1/2 top-1/2 cursor-pointer will-change-transform"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* Minimal circle */}
      <div
        className={`
          flex items-center justify-center rounded-full
          transition-all duration-300
          ${isActive ? "bg-[var(--card)] border border-[var(--accent)] shadow-md" : "bg-[var(--card)] border border-[var(--border)]"}
        `}
        style={{
          width: isActive ? 64 : 56,
          height: isActive ? 64 : 56,
        }}
      >
        <span style={{ fontSize: isActive ? 32 : 28 }}>{hobby.emoji}</span>
      </div>

      {/* Label on hover */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 top-full mt-2
          transition-all duration-300
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        <span className="text-xs font-medium text-[var(--foreground)] whitespace-nowrap">
          {hobby.name}
        </span>
      </div>
    </div>
  );
}

export function BeyondCode({ hobbies }: BeyondCodeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setActiveIndex(index);
    setIsPaused(index !== null);
  };

  return (
    <div className="relative mt-8 sm:mt-12">
      {/* Orbital container */}
      <div
        className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center"
        onMouseLeave={() => handleHover(null)}
      >
        {/* Orbital rings - minimal */}
        {[0, 1].map((ring) => (
          <div
            key={ring}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--border)]/40"
            style={{
              width: (120 + ring * 80) * 2,
              height: (120 + ring * 80) * 2 * Math.cos((12 * Math.PI) / 180),
            }}
          />
        ))}

        {/* Center point - matches Timeline dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-6 h-6 rounded-full border-4 border-[var(--background)] shadow-lg bg-[var(--accent)]" />
        </div>

        {/* Orbiting hobbies */}
        {hobbies.map((hobby, index) => (
          <Hobby
            key={hobby.name}
            hobby={hobby}
            index={index}
            total={hobbies.length}
            isPaused={isPaused}
            onHover={handleHover}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
