"use client";

import { getRings } from "@/lib/orbit";
import { OrbitItem } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitItemComponent } from "./OrbitItem";

export function AboutOrbit({ items }: { items: OrbitItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [displayItems, setDisplayItems] = useState(items);
  const [transitioning, setTransitioning] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Measure container for responsive scaling
  useEffect(() => {
    if (!container.current) return;
    const obs = new ResizeObserver((e) => setScale(Math.min(1.0, e[0].contentRect.width / 620)));
    obs.observe(container.current);
    return () => obs.disconnect();
  }, []);

  // Handle category transitions
  useEffect(() => {
    if (items === displayItems) return;
    setTransitioning(true);
    setActive(null);
    const t = setTimeout(() => {
      setDisplayItems(items);
      setTransitioning(false);
    }, 300);
    return () => clearTimeout(t);
  }, [items, displayItems]);

  const rings = useMemo(() => getRings(displayItems, scale), [displayItems, scale]);

  return (
    <div className="relative mt-8 sm:mt-12 overflow-visible">
      <div
        ref={container}
        className="relative w-full h-[400px] sm:h-[620px] flex items-center justify-center"
        onMouseLeave={() => setActive(null)}
      >
        {/* Render Orbital Rings */}
        {rings.map((r) => (
          <div
            key={r.rIndex}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--border)]/15"
            style={{ width: r.radius * 2, height: r.radius * 2 * 0.966 }}
          />
        ))}

        {/* Center Object */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border-4 border-[var(--background)] shadow-lg bg-[var(--accent)] pointer-events-none" />

        {/* Orbital Items */}
        {rings.map((r) =>
          r.items.map((item, i) => {
            const ringOffset = (r.rIndex * Math.PI * 2) / 3;
            const angle = (i / r.items.length) * Math.PI * 2 + ringOffset;

            return (
              <OrbitItemComponent
                key={`${item.name}-${r.rIndex}`}
                item={item}
                isActive={active === item.name}
                isPaused={active !== null}
                isTransitioning={transitioning}
                speed={r.speed}
                radius={r.radius}
                angle={angle}
                onHover={transitioning ? () => {} : setActive}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
