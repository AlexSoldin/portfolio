"use client";

import { useCallback, useEffect, useRef } from "react";

interface GenerativeArtProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

// Exact color palette from meowni.ca generative art
const COLORS = [
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

type ShapeType = "quarterCircle" | "halfCircle" | "circle" | "leaf" | "empty";

interface CellConfig {
  shape: ShapeType;
  rotation: number;
  color: string;
  bgColor: string;
}

// Helper function to generate cell configuration
function generateCellConfig(): CellConfig {
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
  const colorIndex1 = Math.floor(Math.random() * COLORS.length);
  let colorIndex2 = Math.floor(Math.random() * COLORS.length);
  while (colorIndex2 === colorIndex1) {
    colorIndex2 = Math.floor(Math.random() * COLORS.length);
  }

  return {
    shape: selectedShape,
    rotation,
    color: COLORS[colorIndex1],
    bgColor: Math.random() > 0.7 ? COLORS[colorIndex2] : "#FFFFFF",
  };
}

// Helper function to draw a cell
function drawCell(
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

export default function GenerativeArt({ width = 320, height = 320 }: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateArt = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle HiDPI/Retina scaling
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Pick a random grid density: Constrained range for consistency
    const sizes = [40, 64, 80];
    const randomizedCellSize = sizes[Math.floor(Math.random() * sizes.length)];

    // Clear canvas with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    const cols = Math.ceil(width / randomizedCellSize);
    const rows = Math.ceil(height / randomizedCellSize);

    // Generate grid of shapes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * randomizedCellSize;
        const y = row * randomizedCellSize;
        const config = generateCellConfig();
        drawCell(ctx, x, y, randomizedCellSize, config);
      }
    }
  }, [width, height]);

  useEffect(() => {
    generateArt();
  }, [generateArt]);

  return (
    <div
      className="art-container inline-block m-0 p-0"
      onClick={generateArt}
      title="Click to regenerate"
      style={{ maxWidth: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="block m-0 p-0"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: "100%",
          display: "block",
        }}
      />
      <p className="mt-3 text-sm m-0 text-center">
        <strong>Click this art</strong> to regenerate it
      </p>
    </div>
  );
}
