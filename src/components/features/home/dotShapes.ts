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

/** Spread `count` points evenly along a set of line segments (canvas units). */
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
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  });
}

/** `count` points on a small circle, used to draw graph nodes. */
function ringPoints(centre: Point, radius: number, count: number): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + Math.PI / 4;
    return { x: centre.x + Math.cos(angle) * radius, y: centre.y + Math.sin(angle) * radius };
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

  return sampleSegments(segments, count).map(toPercent).sort(byColumn);
}

/** Fully connected neural network, input layer on the left. Nodes are rings, weights are dotted lines. */
const NETWORK = {
  left: 26,
  right: 134,
  nodeGap: 26,
  nodeRadius: 3.4,
  dotsPerNode: 6,
} as const;

export function networkPoints(layerSizes: readonly number[], count: number): Point[] {
  const { left, right, nodeGap, nodeRadius, dotsPerNode } = NETWORK;
  const layerGap = (right - left) / (layerSizes.length - 1);

  const layers = layerSizes.map((size, layer) =>
    Array.from({ length: size }, (_, index) => ({
      x: left + layer * layerGap,
      y: HEIGHT / 2 + (index - (size - 1) / 2) * nodeGap,
    }))
  );

  const nodes = layers.flat().flatMap((centre) => ringPoints(centre, nodeRadius, dotsPerNode));

  // Every node connects to every node in the next layer; weights stop short of the rings.
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

  return [...nodes, ...sampleSegments(weights, count - nodes.length)].map(toPercent).sort(byColumn);
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Dots pinned to a latitude/longitude lattice on a sphere. The projection and spin happen in CSS,
 * so the globe can rotate once formed. Rows sit on parallels and columns line up into meridians.
 */
export function globeCoordinates(parallels: number, meridians: number): Coordinate[] {
  const latitudeStep = 150 / parallels;
  return Array.from({ length: parallels * meridians }, (_, index) => ({
    latitude: -75 + latitudeStep * (Math.floor(index / meridians) + 0.5),
    longitude: (index % meridians) * (360 / meridians) - 180,
  })).sort((a, b) => a.longitude - b.longitude || a.latitude - b.latitude);
}
