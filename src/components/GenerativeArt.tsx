"use client";

import { drawFullGrid, generateCellConfig } from "@/lib";
import { CellConfig, GridState } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface GenerativeArtProps {
  width?: number;
  height?: number;
}

// Resolution for downloaded images. 12 = 3840px (4K), 20 = 6400px (6K+)
const EXPORT_SCALE = 20;

export default function GenerativeArt({ width = 320, height = 320 }: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridState, setGridState] = useState<GridState | null>(null);

  const generateArt = useCallback(() => {
    const sizes = [40, 64, 80];
    const cellSize = sizes[Math.floor(Math.random() * sizes.length)];
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    const cells: CellConfig[] = [];
    for (let i = 0; i < rows * cols; i++) {
      cells.push(generateCellConfig());
    }

    setGridState({ cellSize, cells });
  }, [width, height]);

  // Effect to draw to the on-screen canvas whenever gridState changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gridState) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    // We don't need ctx.scale if we pass the scale into the helper
    drawFullGrid(ctx, width, height, gridState, dpr);
  }, [width, height, gridState]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gridState) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = width * EXPORT_SCALE;
    offscreen.height = height * EXPORT_SCALE;
    const ctx = offscreen.getContext("2d");

    if (ctx) {
      drawFullGrid(ctx, width, height, gridState, EXPORT_SCALE);
      const dataUrl = offscreen.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `generative-art-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  useEffect(() => {
    generateArt();
  }, [generateArt]);

  return (
    <div
      className="art-container relative group inline-block m-0 p-0 cursor-pointer"
      onClick={generateArt}
      title="Click to regenerate"
      style={{ maxWidth: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="block m-0 p-0 rounded-xl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: "100%",
          display: "block",
        }}
      />

      {/* Download Button Overlay */}
      <button
        onClick={handleDownload}
        className="absolute bottom-10 right-2 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-[var(--border)] rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 lg:hover:scale-110 active:scale-95 shadow-lg z-10"
        title="Download"
        aria-label="Download"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>

      <p className="mt-3 text-sm m-0 text-center opacity-60">
        <strong>Click</strong> art to rotate
      </p>
    </div>
  );
}
