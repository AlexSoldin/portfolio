"use client";

import { useEffect, useRef } from "react";

export const useOrbitAnimation = (
  isActive: boolean,
  isPaused: boolean,
  speed: number,
  radius: number,
  initialAngle: number
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(initialAngle);
  const reqRef = useRef<number>(0);

  // Reset angle when dependency changes
  useEffect(() => {
    angleRef.current = initialAngle;
  }, [initialAngle]);

  useEffect(() => {
    const animate = () => {
      // Rotate if not paused and not the active item
      if (!isPaused && !isActive) {
        angleRef.current += speed;
      }

      if (elementRef.current) {
        const a = angleRef.current;
        const tiltCos = 0.966; // cos(15deg)
        const tiltSin = 0.259; // sin(15deg)

        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius * tiltCos;
        const z = Math.sin(a) * radius * tiltSin;

        // Depth sorting and scaling
        const scale = isActive ? 1.1 : 0.8 + ((z + radius) / (radius * 2)) * 0.4;
        const opacity = isActive ? 1 : 0.4 + ((z + radius) / (radius * 2)) * 0.6;

        elementRef.current.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        elementRef.current.style.opacity = String(opacity);
        elementRef.current.style.zIndex = isActive ? "1000" : String(Math.round(z + radius));
      }
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [isActive, isPaused, radius, speed]);

  return elementRef;
};
