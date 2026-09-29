// The dot lattice for one canvas size, and drawing a frame of it. Dots sit on whole device pixels so
// they stay sharp, and one fill per opacity step keeps a frame to a couple of dozen draw calls.
import { buildFields, type Fields } from "./fields";
import { CANVAS, type Lattice } from "./lattice";
import { boostAt, levelAt } from "./timeline";

const ALPHA_STEPS = 24;
const REST_ALPHA = 0.12;
/** Dot radius as a fraction of the lattice pitch, resting and fully lit. */
const RADIUS = { rest: 0.075, lit: 0.36 };

/** How a dot looks at a brightness level and pulse boost: radius (in pitches) and opacity. */
export function dotLook(level: number, boost = 0) {
  const alpha = REST_ALPHA + (1 - REST_ALPHA) * level;
  return {
    radius: (RADIUS.rest + (RADIUS.lit - RADIUS.rest) * level) * (1 + 0.5 * boost),
    alpha: alpha + (1 - alpha) * boost,
  };
}

/**
 * Centre a lattice of `pitch`-spaced cells in a `width` × `height` box (any units). The 160 × 90 shape
 * canvas fits the box's width and sits centred vertically, so shapes keep their proportions.
 */
export function fitLattice(width: number, height: number, pitch: number) {
  const [columns, rows] = [Math.floor(width / pitch), Math.floor(height / pitch)];
  const origin = {
    x: Math.round((width - (columns - 1) * pitch) / 2),
    y: Math.round((height - (rows - 1) * pitch) / 2),
  };
  const scale = width / CANVAS.width;
  const insetY = (height - CANVAS.height * scale) / 2;
  const lattice: Lattice = {
    columns,
    rows,
    origin: { x: origin.x / scale, y: (origin.y - insetY) / scale },
    pitch: pitch / scale,
  };
  return { origin, lattice, fields: buildFields(lattice) };
}

export interface Board {
  xs: Float32Array;
  ys: Float32Array;
  pitch: number;
  fields: Fields;
  radii: Float32Array;
  buckets: Uint8Array;
}

/** A lattice for a canvas of `width` × `height` device pixels, about 88 dots across. */
export function buildBoard(width: number, height: number, dpr: number): Board {
  const pitch = Math.round(Math.min(8, Math.max(5, width / dpr / 88)) * dpr);
  const { origin, lattice, fields } = fitLattice(width, height, pitch);
  const size = lattice.columns * lattice.rows;
  const xs = new Float32Array(size);
  const ys = new Float32Array(size);
  for (let index = 0; index < size; index += 1) {
    xs[index] = origin.x + (index % lattice.columns) * pitch;
    ys[index] = origin.y + Math.floor(index / lattice.columns) * pitch;
  }
  return { xs, ys, pitch, fields, radii: new Float32Array(size), buckets: new Uint8Array(size) };
}

export interface Frame {
  phase: number;
  time: number;
  hasPulses: boolean;
  colour: string;
}

export function drawBoard(context: CanvasRenderingContext2D, board: Board, frame: Frame) {
  const { xs, ys, pitch, fields, radii, buckets } = board;
  for (let index = 0; index < xs.length; index += 1) {
    const level = levelAt(fields, index, frame.phase, frame.time);
    const look = dotLook(level, frame.hasPulses ? boostAt(fields, index, frame.phase) : 0);
    radii[index] = Math.max(0.5, look.radius * pitch);
    buckets[index] = Math.round(look.alpha * (ALPHA_STEPS - 1));
  }

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = frame.colour;
  for (let step = 0; step < ALPHA_STEPS; step += 1) {
    context.beginPath();
    for (let index = 0; index < xs.length; index += 1) {
      if (buckets[index] !== step) continue;
      context.moveTo(xs[index] + radii[index], ys[index]);
      context.arc(xs[index], ys[index], radii[index], 0, Math.PI * 2);
    }
    context.globalAlpha = step / (ALPHA_STEPS - 1);
    context.fill();
  }
  context.globalAlpha = 1;
}
