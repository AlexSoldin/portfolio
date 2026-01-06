import { OrbitItem } from "@/types";

export interface RingData {
  rIndex: number;
  items: OrbitItem[];
  radius: number;
  speed: number;
}

// Distribute items into rings based on list size
export const getRings = (items: OrbitItem[], scale: number): RingData[] => {
  const total = items.length;

  // Configuration for small vs large lists
  let counts: number[];
  if (total <= 6) {
    counts = [Math.ceil(total / 2), Math.floor(total / 2), 0];
  } else {
    // e.g., 20% inner, 35% middle, rest outer
    const inner = Math.max(3, Math.floor(total * 0.2));
    const middle = Math.max(4, Math.floor(total * 0.35));
    const outer = total - inner - middle;
    counts = [inner, middle, outer];
  }

  let cursor = 0;
  return counts
    .map((count, i) => ({
      rIndex: i,
      items: items.slice(cursor, (cursor += count)),
      radius: (80 + i * 85) * scale,
      speed: 0.0003 + i * 0.00015,
    }))
    .filter((r) => r.items.length > 0);
};
