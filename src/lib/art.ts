import { CellConfig, GridState, ShapeType } from "@/types/art";

// Exact color palette from meowni.ca generative art
export const ART_COLORS = [
  "#E53935", // Red (tomato red)
  "#1565C0", // Dark blue (navy/cobalt)
  "#42A5F5", // Light blue (sky blue)
  "#F9A825", // Yellow (golden/mustard)
  "#00897B", // Teal (dark teal/green)
  "#000000", // Black
  "#FFCDD2", // Light pink (blush/salmon)
  "#B2DFDB", // Mint (light teal)
  "#FFFFFF", // White
];

// Helper function to generate cell configuration
export function generateCellConfig(): CellConfig {
  const shapes: ShapeType[] = ["quarterCircle", "halfCircle", "circle", "leaf", "empty"];
  const weights = [0.35, 0.25, 0.15, 0.15, 0.1];

  // Weighted random selection
  const random = Math.random();
  let cumulative = 0;
  let selectedShape: ShapeType = "quarterCircle";

  for (let i = 0; i < shapes.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      selectedShape = shapes[i];
      break;
    }
  }

  const rotations = [0, 90, 180, 270];
  const rotation = rotations[Math.floor(Math.random() * rotations.length)];

  // Pick two different colors
  const colorIndex1 = Math.floor(Math.random() * ART_COLORS.length);
  let colorIndex2 = Math.floor(Math.random() * ART_COLORS.length);
  while (colorIndex2 === colorIndex1) {
    colorIndex2 = Math.floor(Math.random() * ART_COLORS.length);
  }

  return {
    shape: selectedShape,
    rotation,
    color: ART_COLORS[colorIndex1],
    bgColor: Math.random() > 0.7 ? ART_COLORS[colorIndex2] : "#FFFFFF",
  };
}

// Helper function to draw a cell
export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  config: CellConfig
) {
  const { shape, rotation, color, bgColor } = config;
  const centerX = x + size / 2;
  const centerY = y + size / 2;

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, size, size);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-centerX, -centerY);

  ctx.fillStyle = color;

  switch (shape) {
    case "quarterCircle":
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, size, 0, Math.PI / 2);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      break;

    case "halfCircle":
      ctx.beginPath();
      ctx.arc(x + size / 2, y, size / 2, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      break;

    case "circle":
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.35, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "leaf":
      ctx.beginPath();
      ctx.moveTo(x, y + size);
      ctx.arc(x, y + size, size, -Math.PI / 2, 0);
      ctx.arc(x + size, y, size, Math.PI / 2, Math.PI);
      ctx.closePath();
      ctx.fill();
      break;

    case "empty":
      break;
  }

  ctx.restore();
}

// Helper to draw the entire grid to a context
export function drawFullGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GridState,
  scale: number = 1
) {
  const { cellSize, cells } = state;
  const cols = Math.ceil(width / cellSize);

  // Clear background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width * scale, height * scale);

  cells.forEach((config, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    drawCell(ctx, col * cellSize * scale, row * cellSize * scale, cellSize * scale, config);
  });
}
