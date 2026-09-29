// Point sets for the homepage dot animation.
// Shapes are drawn on a 160 × 90 canvas (16:9) and returned as percentages of the box.
// Lines are sampled at a fixed pitch so every shape shares the same rhythm, and each point
// carries its own opacity so the important parts of a shape read brighter than the wiring.

export interface Point {
  x: number;
  y: number;
}

export interface Dot extends Point {
  alpha: number;
}

type Segment = readonly [Point, Point];

const WIDTH = 160;
const HEIGHT = 90;

/** Canvas units between dots along wires and weights. */
const LINE_PITCH = 2.2;
/** Canvas units between dots inside filled shapes (network nodes). */
const FILL_PITCH = 1.25;

const toPercent = <T extends Point>(point: T): T => ({
  ...point,
  x: (point.x / WIDTH) * 100,
  y: (point.y / HEIGHT) * 100,
});

const byColumn = (a: Point, b: Point) => a.x - b.x || a.y - b.y;

export function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pad a shape to exactly `count` dots. Extras sit on top of existing dots with zero opacity,
 * so they travel with the shape and fade in or out without adding visual weight.
 */
export function fitTo<T extends Dot>(points: readonly T[], count: number): T[] {
  const padding = Array.from({ length: Math.max(0, count - points.length) }, (_, index) => ({
    ...points[Math.floor((index * points.length) / (count - points.length)) % points.length],
    alpha: 0,
  }));
  return [...points.slice(0, count), ...padding].sort(byColumn);
}

/** An even lattice that fits within `count` dots at the canvas's 16:9 aspect. */
function latticeSize(count: number) {
  const columns = Math.floor(Math.sqrt((count * WIDTH) / HEIGHT));
  return { columns, rows: Math.floor(count / columns) };
}

export function gridPoints(count: number): Dot[] {
  const { columns, rows } = latticeSize(count);
  const points = Array.from({ length: columns * rows }, (_, index) => ({
    x: 8 + (index % columns) * (84 / (columns - 1)),
    y: 12 + Math.floor(index / columns) * (76 / (rows - 1)),
    alpha: 0.28,
  }));
  return fitTo(points, count);
}

/** The grid, nudged off its lattice and dimmed: calm noise rather than a random spray. */
export function loosePoints(grid: readonly Dot[], random: () => number): Dot[] {
  const { columns, rows } = latticeSize(grid.length);
  const [jitterX, jitterY] = [84 / (columns - 1), 76 / (rows - 1)];
  return grid.map((point) => ({
    x: point.x + (random() - 0.5) * jitterX * 1.6,
    y: point.y + (random() - 0.5) * jitterY * 1.6,
    alpha: point.alpha && 0.08 + random() * 0.16,
  }));
}

/** Dots along a set of line segments (canvas units), `pitch` apart, centred on each segment. */
function sampleSegments(segments: readonly Segment[], alpha: number, pitch = LINE_PITCH): Dot[] {
  return segments.flatMap(([a, b]) => {
    const steps = Math.max(1, Math.round(Math.hypot(b.x - a.x, b.y - a.y) / pitch));
    return Array.from({ length: steps }, (_, index) => {
      const t = (index + 0.5) / steps;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, alpha };
    });
  });
}

/** A filled disc of hex-packed dots, used for graph nodes. */
function discPoints(centre: Point, radius: number, alpha: number): Dot[] {
  const rowHeight = FILL_PITCH * (Math.sqrt(3) / 2);
  const rows = Math.floor(radius / rowHeight);
  return Array.from({ length: rows * 2 + 1 }, (_, row) => row - rows).flatMap((row) => {
    const y = row * rowHeight;
    const offset = Math.abs(row) % 2 === 1 ? FILL_PITCH / 2 : 0;
    const reach = Math.floor((Math.sqrt(radius ** 2 - y ** 2) - offset) / FILL_PITCH);
    return Array.from({ length: Math.max(0, reach * 2 + (offset ? 2 : 1)) }, (_, column) => ({
      x: centre.x + (offset ? (column - reach - 0.5) * FILL_PITCH : (column - reach) * FILL_PITCH),
      y: centre.y + y,
      alpha,
    }));
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

const WIRE_ALPHA = 0.4;
const COMPONENT_ALPHA = 0.95;

export interface CircuitDot extends Dot {
  /** How far along the current's path this dot sits, 0 (input) to 1 (back at the input on the rail). */
  flow: number;
}

/**
 * Current runs left to right along the top wire (across the capacitor) to the output, then back
 * right to left along the ground rail. The resistor branch is stretched so its pulse meets the
 * top wire and the rail at the same moments they do.
 */
function circuitFlow({ x, y }: Point): number {
  const { top, rail, inputX, outputX, resistorX } = HIGH_PASS;
  const span = outputX - inputX;
  const onRail = (x: number) => span + (outputX - x);

  if (y === rail) return onRail(x) / (span * 2);
  if (y > top && Math.abs(x - resistorX) <= 6) {
    const start = resistorX - inputX;
    return (start + ((y - top) / (rail - top)) * (onRail(resistorX) - start)) / (span * 2);
  }
  return (x - inputX) / (span * 2);
}

export function highPassPoints(): CircuitDot[] {
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

  const wires: Segment[] = [
    [
      { x: inputX, y: top },
      { x: plateA, y: top },
    ],
    [
      { x: plateB, y: top },
      { x: outputX, y: top },
    ],
    [
      { x: resistorX, y: top },
      { x: resistorX, y: zigTop },
    ],
    [
      { x: resistorX, y: zigBottom },
      { x: resistorX, y: rail },
    ],
    [
      { x: inputX, y: rail },
      { x: outputX, y: rail },
    ],
  ];

  const components: Segment[] = [
    [
      { x: plateA, y: top - 10 },
      { x: plateA, y: top + 10 },
    ],
    [
      { x: plateB, y: top - 10 },
      { x: plateB, y: top + 10 },
    ],
    ...zigzag,
  ];

  return [
    ...sampleSegments(wires, WIRE_ALPHA),
    ...sampleSegments(components, COMPONENT_ALPHA, LINE_PITCH * 0.6),
  ].map((point) => ({ ...toPercent(point), flow: circuitFlow(point) }));
}

/** Fully connected neural network, input layer on the left. Nodes are filled discs, weights are dotted lines. */
const NETWORK = {
  left: 26,
  right: 134,
  nodeGap: 26,
  nodeRadius: 4,
  nodeAlpha: 0.95,
  weightAlpha: 0.3,
} as const;

export function networkPoints(layerSizes: readonly number[]): Dot[] {
  const { left, right, nodeGap, nodeRadius, nodeAlpha, weightAlpha } = NETWORK;
  const layerGap = (right - left) / (layerSizes.length - 1);

  const layers = layerSizes.map((size, layer) =>
    Array.from({ length: size }, (_, index) => ({
      x: left + layer * layerGap,
      y: HEIGHT / 2 + (index - (size - 1) / 2) * nodeGap,
    }))
  );

  const nodes = layers.flat().flatMap((centre) => discPoints(centre, nodeRadius, nodeAlpha));

  // Every node connects to every node in the next layer; weights stop short of the discs.
  const weights = layers.slice(1).flatMap((targets, index) =>
    layers[index].flatMap((source) =>
      targets.map((target): Segment => {
        const length = Math.hypot(target.x - source.x, target.y - source.y);
        const gap = nodeRadius + 2;
        const [dx, dy] = [
          ((target.x - source.x) / length) * gap,
          ((target.y - source.y) / length) * gap,
        ];
        return [
          { x: source.x + dx, y: source.y + dy },
          { x: target.x - dx, y: target.y - dy },
        ];
      })
    )
  );

  return [...nodes, ...sampleSegments(weights, weightAlpha, LINE_PITCH * 1.2)].map(toPercent);
}
