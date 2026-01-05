export type ShapeType = "quarterCircle" | "halfCircle" | "circle" | "leaf" | "empty";

export interface CellConfig {
  shape: ShapeType;
  rotation: number;
  color: string;
  bgColor: string;
}

export interface GridState {
  cellSize: number;
  cells: CellConfig[];
}
