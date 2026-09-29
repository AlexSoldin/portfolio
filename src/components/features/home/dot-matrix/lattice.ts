// The dot lattice. Shapes are authored on a 160 × 90 canvas and drawn onto lattice cells like pixel
// art: strokes snap to rows and columns, so they stay crisp at any lattice size.

export interface Point {
  x: number;
  y: number;
}

export type Cell = readonly [column: number, row: number];

/** The 16:9 canvas shapes are authored on, in arbitrary units. */
export const CANVAS = { width: 160, height: 90 } as const;

export interface Lattice {
  columns: number;
  rows: number;
  /** Canvas position of cell (0, 0). */
  origin: Point;
  /** Canvas units between neighbouring cells. */
  pitch: number;
}

/** Converts between canvas points and cells, and lights cells in a per-cell field. */
export function latticeMap({ columns, rows, origin, pitch }: Lattice) {
  return {
    pitch,
    size: columns * rows,
    cellAt: (index: number): Cell => [index % columns, Math.floor(index / columns)],
    toCell: ({ x, y }: Point): Cell => [
      Math.round((x - origin.x) / pitch),
      Math.round((y - origin.y) / pitch),
    ],
    toCanvas: ([column, row]: Cell): Point => ({
      x: origin.x + column * pitch,
      y: origin.y + row * pitch,
    }),
    /** Raise a cell to at least `level`; returns its index, or -1 when it falls off the lattice. */
    light(field: Float32Array, [column, row]: Cell, level: number) {
      if (column < 0 || column >= columns || row < 0 || row >= rows) return -1;
      const index = row * columns + column;
      field[index] = Math.max(field[index], level);
      return index;
    },
  };
}

export type LatticeMap = ReturnType<typeof latticeMap>;

/** Every cell on the straight line from `a` to `b`, inclusive. */
export function lineCells([x0, y0]: Cell, [x1, y1]: Cell): Cell[] {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  return Array.from({ length: steps + 1 }, (_, step) => {
    const t = steps === 0 ? 0 : step / steps;
    return [Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t)];
  });
}
