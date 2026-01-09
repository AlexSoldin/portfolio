"use client";

import { Input } from "@/components/ui/Input";
import { BusinessCardText, drawBusinessCard, generateCellConfig } from "@/lib/art";
import { CellConfig, GridState } from "@/types/art";
import { useCallback, useEffect, useRef, useState } from "react";

const EXPORT_SCALE = 20;

export function BusinessCardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridState, setGridState] = useState<GridState | null>(null);

  const [cardText, setCardText] = useState<BusinessCardText>({
    name: "Alex Soldin",
    role: "Software engineer",
    contact: "alex.soldin@gmail.com",
  });

  const shuffleArt = useCallback(() => {
    const width = 600;
    const height = 342;
    const cellSize = 60;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    const cells: CellConfig[] = [];
    for (let i = 0; i < rows * cols; i++) {
      cells.push(generateCellConfig());
    }

    setGridState({ cellSize, cells });
  }, []);

  useEffect(() => {
    shuffleArt();
  }, [shuffleArt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gridState) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = 600;
    const height = 342;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    // Handled by CSS
    // canvas.style.width = "100%";
    // canvas.style.height = "auto";
    // canvas.style.aspectRatio = "600/342";

    drawBusinessCard(ctx, width, height, gridState, cardText, dpr);
  }, [gridState, cardText]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent shuffle when clicking download
    if (!gridState) return;

    const baseWidth = 600;
    const baseHeight = 342;
    const offscreen = document.createElement("canvas");
    offscreen.width = baseWidth * EXPORT_SCALE;
    offscreen.height = baseHeight * EXPORT_SCALE;
    const ctx = offscreen.getContext("2d");

    if (ctx) {
      drawBusinessCard(ctx, baseWidth, baseHeight, gridState, cardText, EXPORT_SCALE);
      const link = document.createElement("a");
      link.download = `digital-card-${cardText.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = offscreen.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl mb-4">
            Pick a card, any card
          </h2>
          <p className="text-[var(--muted)] max-w-lg mx-auto">
            Grab my details for your contacts, or make it your own.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Inputs - Left Column */}
          <div className="w-full lg:w-1/3 space-y-4">
            <Input
              id="card-name"
              label="Name"
              value={cardText.name}
              onChange={(e) => setCardText({ ...cardText, name: e.target.value })}
              placeholder="Your name"
              maxLength={25}
            />
            <Input
              id="card-role"
              label="Role"
              value={cardText.role}
              onChange={(e) => setCardText({ ...cardText, role: e.target.value })}
              placeholder="Your role"
              maxLength={35}
            />
            <Input
              id="card-contact"
              label="Contact"
              value={cardText.contact || ""}
              onChange={(e) => setCardText({ ...cardText, contact: e.target.value })}
              placeholder="Email or @handle"
              maxLength={30}
            />
          </div>

          {/* Preview - Right Column */}
          <div className="w-full lg:w-2/3">
            <div
              className="relative group rounded-xl overflow-hidden shadow-2xl cursor-pointer transition-transform hover:scale-[1.01] duration-500 bg-[var(--highlight)] aspect-[600/342]"
              onClick={shuffleArt}
              title="Click to regenerate pattern"
            >
              <canvas
                ref={canvasRef}
                className={`w-full h-full block bg-white transition-opacity duration-500 ${gridState ? "opacity-100" : "opacity-0"}`}
              />

              {/* Loading Skeleton */}
              {!gridState && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Download Button - Appearing on Hover like GenerativeArt */}
              <button
                onClick={handleDownload}
                className="absolute bottom-6 right-6 p-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-[var(--border)] rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-y-4 lg:group-hover:translate-y-0 hover:scale-110 active:scale-95 shadow-lg z-10"
                title="Download High-Res"
              >
                <svg
                  width="20"
                  height="20"
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
            </div>

            <p className="mt-4 text-center text-sm text-[var(--muted)] flex items-center justify-center gap-2">
              Click art to regenerate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
