// Timeline for the dot-matrix hero: how lit each cell is at a point in the loop, and how much a pulse
// lifts it. Stages: noise → grid → high-pass filter → neural network → noise. Transitions ripple left to
// right; current pulses through the circuit, and the network runs a forward pass then sends the gradient back.
import type { Fields } from "./fields";

type Stage = "noise" | "grid" | "circuit" | "network";

export const LOOP_MS = 22000;
/** Reduced motion and the no-JS fallback show the finished circuit. */
export const STILL_PHASE = 0.43;

/** Holds as fractions of the loop; the gaps between them are transitions. */
const TIMELINE: readonly { stage: Stage; from: number; to: number }[] = [
  { stage: "noise", from: 0, to: 0.04 },
  { stage: "grid", from: 0.14, to: 0.22 },
  { stage: "circuit", from: 0.33, to: 0.53 },
  { stage: "network", from: 0.65, to: 0.85 },
  { stage: "noise", from: 0.95, to: 1 },
];
const CURRENT = { start: 0.345, sweepMs: 2400, width: 0.035 };
/** Network passes sweep across the layers: forward is a soft preview, backward is the gradient. */
const FORWARD = { start: 0.662, sweepMs: 1500, width: 0.03, strength: 0.55 };
const BACKWARD = { start: 0.745, sweepMs: 1800, width: 0.035, strength: 1 };

/** --ease-in-out from globals.css as a lookup table: cubic-bezier(0.77, 0, 0.175, 1). */
const EASE = (() => {
  const [x1, y1, x2, y2] = [0.77, 0, 0.175, 1];
  const bezier = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  const table = new Float32Array(257);
  for (let t = 0; t <= 1; t += 1 / 4096) {
    table[Math.round(bezier(t, x1, x2) * 256)] = bezier(t, y1, y2);
  }
  table[256] = 1;
  return (progress: number) => table[Math.round(progress * 256)];
})();

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const pulse = (distance: number, width: number) => Math.exp(-((distance / width) ** 2));

/** A cell's brightness (0–1) at `phase` through the loop; `time` drives the noise shimmer. */
export function levelAt(fields: Fields, index: number, phase: number, time: number): number {
  const value = (stage: Stage) =>
    stage === "noise"
      ? fields.noise[index] *
        (0.55 + 0.45 * Math.sin(time * 0.0012 + fields.seed[index] * Math.PI * 2))
      : fields[stage][index];

  const next = TIMELINE.findIndex(({ to }) => phase < to);
  const { stage, from } = TIMELINE[next];
  if (phase >= from) return value(stage);

  // Between holds: each cell crosses over in turn, sweeping left to right with a little jitter.
  const previous = TIMELINE[next - 1];
  const local = (phase - previous.to) / (from - previous.to);
  const stagger = fields.across[index] * 0.8 + fields.seed[index] * 0.2;
  const eased = EASE(clamp01((local - stagger * 0.45) / 0.55));
  return value(previous.stage) + (value(stage) - value(previous.stage)) * eased;
}

/** Extra lift (0–1) from the current or network pulses passing through a cell. */
export function boostAt(fields: Fields, index: number, phase: number): number {
  const elapsed = (start: number) => (phase - start) * LOOP_MS;
  if (phase > 0.33 && phase < 0.53) {
    const front = elapsed(CURRENT.start) / CURRENT.sweepMs;
    return pulse(fields.flow[index] - front, CURRENT.width) * clamp01(fields.circuit[index] / 0.4);
  }
  if (phase > 0.65 && phase < 0.85) {
    const forward = 0.1 + (0.8 * elapsed(FORWARD.start)) / FORWARD.sweepMs;
    const backward = 0.9 - (0.8 * elapsed(BACKWARD.start)) / BACKWARD.sweepMs;
    const across = fields.across[index];
    const wave = Math.max(
      pulse(across - forward, FORWARD.width) * FORWARD.strength,
      pulse(across - backward, BACKWARD.width) * BACKWARD.strength
    );
    return wave * clamp01(fields.network[index] / 0.3);
  }
  return 0;
}
