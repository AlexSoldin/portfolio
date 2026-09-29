// Brightness fields for the dot-matrix hero. The dots never move: each stage is a value from
// 0 (resting) to 1 (fully lit) for every lattice cell, and the renderer blends between them.
import { drawCircuit } from "./circuit";
import { CANVAS, latticeMap, type Lattice } from "./lattice";
import { drawNetwork } from "./network";

export interface Fields {
  noise: Float32Array;
  grid: Float32Array;
  circuit: Float32Array;
  network: Float32Array;
  /** Position along the circuit's current path (0–1), for the current pulse. */
  flow: Float32Array;
  /** Horizontal position (0–1), for left-to-right stagger and the network passes. */
  across: Float32Array;
  /** A stable random value per cell, for stagger jitter and noise shimmer. */
  seed: Float32Array;
}

/** Fixed seed so every render, including the no-JS fallback, draws the same noise. */
const SEED = 20260924;
const GRID_LEVEL = 0.28;
const NOISE_LEVEL = 0.55;

/** Seeded PRNG (mulberry32). */
function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildFields(lattice: Lattice): Fields {
  const map = latticeMap(lattice);
  const random = createRandom(SEED);
  const fields: Fields = {
    noise: new Float32Array(map.size),
    grid: new Float32Array(map.size).fill(GRID_LEVEL),
    circuit: new Float32Array(map.size),
    network: new Float32Array(map.size),
    flow: new Float32Array(map.size),
    across: new Float32Array(map.size),
    seed: new Float32Array(map.size),
  };

  for (let index = 0; index < map.size; index += 1) {
    const { x } = map.toCanvas(map.cellAt(index));
    fields.noise[index] = random() ** 2 * NOISE_LEVEL;
    fields.seed[index] = random();
    fields.across[index] = Math.min(1, Math.max(0, x / CANVAS.width));
  }

  drawCircuit(map, fields.circuit, fields.flow);
  drawNetwork(map, fields.network);
  return fields;
}
