import { CellConfig, GridState, ShapeType } from "@/types/art";

export interface BusinessCardText {
  name: string;
  role: string;
  contact?: string;
}

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

export function drawBusinessCard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: GridState,
  text: BusinessCardText,
  scale: number = 1
) {
  // 1. Draw the generative art background
  drawFullGrid(ctx, width, height, state, scale);

  // 2. Draw the "Glass" card overlay
  const cardWidth = width * 0.8 * scale;
  const cardHeight = height * 0.45 * scale;
  const cardX = (width * scale - cardWidth) / 2;
  const cardY = (height * scale - cardHeight) / 2;
  const radius = 12 * scale;

  ctx.save();

  // Shadow for the card
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 20 * scale;
  ctx.shadowOffsetY = 10 * scale;

  // Background of the text card - Force Light Mode
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

  // Rounded rectangle path
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, radius);
  ctx.fill();

  ctx.restore();

  // 3. Draw Text
  const textColor = "#000000";
  const mutedColor = "rgba(0, 0, 0, 0.6)";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Name
  // Note: Using system fonts as fallback, assuming 'Inter' or 'Playfair' is loaded on page
  ctx.font = `bold ${32 * scale}px "Playfair Display", serif`;
  ctx.fillStyle = textColor;
  ctx.fillText(text.name, (width * scale) / 2, cardY + cardHeight * 0.4);

  // Role
  ctx.font = `${14 * scale}px "Inter", sans-serif`;
  ctx.fillStyle = mutedColor;
  ctx.globalAlpha = 0.8;
  ctx.fillText(text.role.toUpperCase(), (width * scale) / 2, cardY + cardHeight * 0.65);

  if (text.contact) {
    ctx.font = `${12 * scale}px "Inter", sans-serif`;
    ctx.fillText(text.contact, (width * scale) / 2, cardY + cardHeight * 0.82);
  }
}
