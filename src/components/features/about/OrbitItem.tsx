"use client";

import { useOrbitAnimation } from "@/hooks/useOrbitAnimation";
import { OrbitItem } from "@/types";

interface OrbitItemProps {
  item: OrbitItem;
  isActive: boolean;
  isPaused: boolean;
  speed: number;
  radius: number;
  angle: number;
  onHover: (name: string | null) => void;
}

export const OrbitItemComponent = ({
  item,
  isActive,
  isPaused,
  isTransitioning,
  speed,
  radius,
  angle,
  onHover,
}: OrbitItemProps & { isTransitioning: boolean }) => {
  const elementRef = useOrbitAnimation(isActive, isPaused, speed, radius, angle);

  return (
    <div
      ref={elementRef}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      className="absolute left-1/2 top-1/2 cursor-pointer will-change-transform w-10 h-10 sm:w-[52px] sm:h-[52px]"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        className={`transition-all duration-300 w-full h-full ${isTransitioning ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
      >
        <div
          className={`
          flex items-center justify-center rounded-full transition-all duration-300
          w-full h-full
          ${
            isActive
              ? "bg-[var(--card)] border border-[var(--accent)] shadow-lg"
              : "bg-[var(--card)] border border-[var(--border)]"
          }
        `}
        >
          <span className="text-xl sm:text-3xl">{item.emoji}</span>
        </div>
        <div
          className={`
          absolute left-1/2 -translate-x-1/2 top-full mt-2 transition-opacity duration-300 pointer-events-none
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
        >
          <span className="text-xs font-medium text-[var(--foreground)] bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--border)] shadow-sm whitespace-nowrap">
            {item.name}
          </span>
        </div>
      </div>
    </div>
  );
};
