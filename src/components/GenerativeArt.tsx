"use client";

import { useEffect, useRef, useCallback } from "react";

interface GenerativeArtProps {
  width?: number;
  height?: number;
}

export default function GenerativeArt({ width = 320, height = 320 }: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateArt = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, width, height);

    // Color palettes inspired by warm, artistic tones
    const palettes = [
      ["#c45d3a", "#e07a5a", "#f4a261", "#2a9d8f", "#264653"],
      ["#9b2226", "#ae2012", "#bb3e03", "#ca6702", "#ee9b00"],
      ["#264653", "#287271", "#2a9d8f", "#8ab17d", "#e9c46a"],
      ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
      ["#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c"],
    ];

    const palette = palettes[Math.floor(Math.random() * palettes.length)];

    // Random art style
    const style = Math.floor(Math.random() * 4);

    if (style === 0) {
      // Flowing curves
      const curves = 8 + Math.floor(Math.random() * 8);
      for (let i = 0; i < curves; i++) {
        ctx.beginPath();
        ctx.strokeStyle = palette[i % palette.length];
        ctx.lineWidth = 2 + Math.random() * 4;
        ctx.lineCap = "round";

        const startX = Math.random() * width;
        const startY = Math.random() * height;
        ctx.moveTo(startX, startY);

        const points = 3 + Math.floor(Math.random() * 4);
        for (let j = 0; j < points; j++) {
          const cpX = Math.random() * width;
          const cpY = Math.random() * height;
          const endX = Math.random() * width;
          const endY = Math.random() * height;
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        }
        ctx.stroke();
      }
    } else if (style === 1) {
      // Geometric shapes
      const shapes = 12 + Math.floor(Math.random() * 12);
      for (let i = 0; i < shapes; i++) {
        ctx.save();
        ctx.translate(Math.random() * width, Math.random() * height);
        ctx.rotate(Math.random() * Math.PI * 2);

        const size = 20 + Math.random() * 60;
        const shapeType = Math.floor(Math.random() * 3);

        ctx.fillStyle = palette[i % palette.length] + (Math.random() > 0.5 ? "80" : "cc");

        if (shapeType === 0) {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (shapeType === 1) {
          // Rectangle
          ctx.fillRect(-size / 2, -size / 4, size, size / 2);
        } else {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    } else if (style === 2) {
      // Grid pattern with variations
      const cellSize = 32;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize;
          const y = row * cellSize;
          const pattern = Math.floor(Math.random() * 4);

          ctx.fillStyle = palette[(row + col) % palette.length] + "60";
          ctx.strokeStyle = palette[(row + col + 1) % palette.length];
          ctx.lineWidth = 2;

          if (pattern === 0) {
            ctx.beginPath();
            ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
            ctx.fill();
          } else if (pattern === 1) {
            ctx.fillRect(x + 4, y + 4, cellSize - 8, cellSize - 8);
          } else if (pattern === 2) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize / 2, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
          }
        }
      }
    } else {
      // Abstract blobs
      const blobs = 5 + Math.floor(Math.random() * 5);
      for (let i = 0; i < blobs; i++) {
        const centerX = Math.random() * width;
        const centerY = Math.random() * height;
        const radius = 30 + Math.random() * 80;
        const points = 6 + Math.floor(Math.random() * 4);

        ctx.beginPath();
        ctx.fillStyle = palette[i % palette.length] + "90";

        for (let j = 0; j <= points; j++) {
          const angle = (j / points) * Math.PI * 2;
          const r = radius + (Math.random() - 0.5) * radius * 0.5;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevAngle = ((j - 1) / points) * Math.PI * 2;
            const cpAngle = (angle + prevAngle) / 2;
            const cpR = radius + (Math.random() - 0.5) * radius * 0.8;
            const cpX = centerX + Math.cos(cpAngle) * cpR;
            const cpY = centerY + Math.sin(cpAngle) * cpR;
            ctx.quadraticCurveTo(cpX, cpY, x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [width, height]);

  useEffect(() => {
    generateArt();
  }, [generateArt]);

  return (
    <div className="art-container inline-block" onClick={generateArt} title="Click to regenerate">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-xl shadow-lg"
        style={{
          background: "var(--card)",
          display: "block",
        }}
      />
      <p className="text-center text-xs text-[var(--muted)] mt-2">click to regenerate ✨</p>
    </div>
  );
}
