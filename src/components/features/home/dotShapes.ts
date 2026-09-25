// Point sets for the homepage dot animation.
// Shapes are drawn on a 160 × 90 canvas (16:9) and returned as percentages of the box.

export interface Point {
  x: number;
  y: number;
}

type Segment = readonly [Point, Point];

const WIDTH = 160;
const HEIGHT = 90;

const toPercent = ({ x, y }: Point): Point => ({ x: (x / WIDTH) * 100, y: (y / HEIGHT) * 100 });

const byColumn = (a: Point, b: Point) => a.x - b.x || a.y - b.y;

export function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function scatterPoints(count: number, random: () => number): Point[] {
  return Array.from({ length: count }, () => ({ x: 4 + random() * 92, y: 6 + random() * 88 }));
}

export function gridPoints(columns: number, rows: number): Point[] {
  const points = Array.from({ length: columns * rows }, (_, index) => ({
    x: 8 + (index % columns) * (84 / (columns - 1)),
    y: 12 + Math.floor(index / columns) * (76 / (rows - 1)),
  }));
  return points.sort(byColumn);
}

/** Spread `count` points evenly along a set of line segments. */
function sampleSegments(segments: readonly Segment[], count: number): Point[] {
  const lengths = segments.map(([a, b]) => Math.hypot(b.x - a.x, b.y - a.y));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const step = total / count;

  return Array.from({ length: count }, (_, index) => {
    let distance = (index + 0.5) * step;
    let segment = 0;
    while (distance > lengths[segment] && segment < segments.length - 1) {
      distance -= lengths[segment];
      segment += 1;
    }
    const [a, b] = segments[segment];
    const t = distance / lengths[segment];
    return toPercent({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  });
}

/** First-order RC high-pass filter: series capacitor, resistor to the ground rail. */
export const HIGH_PASS = {
  top: 27,
  rail: 72,
  inputX: 16,
  outputX: 144,
  capacitorX: [62, 70],
  resistorX: 104,
} as const;

export function highPassPoints(count: number): Point[] {
  const { top, rail, inputX, outputX, capacitorX, resistorX } = HIGH_PASS;
  const [plateA, plateB] = capacitorX;
  const zigTop = top + 10;
  const zigBottom = rail - 10;
  const zigSteps = 6;
  const zigHeight = (zigBottom - zigTop) / zigSteps;

  const zigzag: Segment[] = Array.from({ length: zigSteps }, (_, step) => {
    const fromX = step === 0 ? resistorX : resistorX + (step % 2 === 0 ? -6 : 6);
    const toX = step === zigSteps - 1 ? resistorX : resistorX + (step % 2 === 0 ? 6 : -6);
    return [
      { x: fromX, y: zigTop + step * zigHeight },
      { x: toX, y: zigTop + (step + 1) * zigHeight },
    ];
  });

  const segments: Segment[] = [
    [
      { x: inputX, y: top },
      { x: plateA, y: top },
    ],
    [
      { x: plateA, y: top - 10 },
      { x: plateA, y: top + 10 },
    ],
    [
      { x: plateB, y: top - 10 },
      { x: plateB, y: top + 10 },
    ],
    [
      { x: plateB, y: top },
      { x: outputX, y: top },
    ],
    [
      { x: resistorX, y: top },
      { x: resistorX, y: zigTop },
    ],
    ...zigzag,
    [
      { x: resistorX, y: zigBottom },
      { x: resistorX, y: rail },
    ],
    [
      { x: inputX, y: rail },
      { x: outputX, y: rail },
    ],
  ];

  return sampleSegments(segments, count).sort(byColumn);
}

/** Label anchor positions (percent of the box) for the high-pass diagram. */
export function highPassLabels() {
  const { top, rail, inputX, outputX, capacitorX, resistorX } = HIGH_PASS;
  const capacitorCentre = (capacitorX[0] + capacitorX[1]) / 2;
  return [
    { text: "in", ...toPercent({ x: inputX, y: top - 8 }) },
    { text: "out", ...toPercent({ x: outputX, y: top - 8 }) },
    { text: "C", ...toPercent({ x: capacitorCentre, y: top - 17 }) },
    { text: "R", ...toPercent({ x: resistorX + 14, y: (top + rail) / 2 }) },
  ];
}
