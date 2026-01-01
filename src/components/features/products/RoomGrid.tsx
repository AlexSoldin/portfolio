"use client";

import { ProductIcon } from "@/components/ui";
import { getProductsByRoom, roomLabels } from "@/data";
import type { Product, ProductChild, RoomType } from "@/types";
import { useRef, useState } from "react";

interface RoomData {
  id: RoomType;
  label: string;
  products: Product[];
}

// Rooms sorted by product count
const rooms: RoomData[] = (
  ["office", "kitchen", "living", "bedroom", "bathroom", "balcony"] as RoomType[]
).map((id) => ({
  id,
  label: roomLabels[id],
  products: getProductsByRoom(id),
}));

// Number of icons to show on mobile before +n
const MOBILE_MAX_ICONS = 4;

// Detail panel for selected product
function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedChild, setSelectedChild] = useState<ProductChild | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:w-auto sm:min-w-[400px] sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] bg-[var(--card)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up sm:animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--border)] p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white">
            <ProductIcon icon={product.icon} className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-xs text-[var(--muted)] capitalize">{product.category}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--highlight)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {/* Use case */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              What I use it for
            </h4>
            <p className="text-sm leading-relaxed">{product.useCase}</p>
          </div>

          {/* Why I like it */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">
              Why I like it
            </h4>
            <p className="text-sm leading-relaxed italic text-[var(--muted)]">
              &ldquo;{product.whyILikeIt}&rdquo;
            </p>
          </div>

          {/* Children (sub-items) */}
          {product.children && product.children.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">
                {product.icon === "laptop" ? "Apps I use" : "Includes"}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(selectedChild?.id === child.id ? null : child)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                      selectedChild?.id === child.id
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--highlight)]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedChild?.id === child.id
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--highlight)] text-[var(--muted)]"
                      }`}
                    >
                      <ProductIcon icon={child.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium truncate">{child.name}</span>
                  </button>
                ))}
              </div>

              {/* Selected child description */}
              {selectedChild && (
                <div className="mt-4 p-3 rounded-xl bg-[var(--highlight)] border border-[var(--border)] animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white">
                      <ProductIcon icon={selectedChild.icon} className="w-3 h-3" />
                    </div>
                    <span className="font-medium text-sm">{selectedChild.name}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {selectedChild.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function RoomGrid() {
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleProductHover = (product: Product, event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setHoveredProduct(product);
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  // Calculate size class based on product count
  const getSizeClass = (count: number) => {
    if (count >= 5) return "col-span-2 row-span-2";
    if (count >= 3) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[minmax(120px,auto)] sm:auto-rows-[minmax(140px,auto)]">
        {rooms.map((room) => {
          const visibleProducts = room.products;
          const hiddenCount = Math.max(0, room.products.length - MOBILE_MAX_ICONS);
          const sizeClass = getSizeClass(room.products.length);

          return (
            <div
              key={room.id}
              className={`relative rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-lg p-4 ${sizeClass}`}
            >
              {/* Room Header */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] sm:text-xs font-medium text-[var(--muted)] uppercase tracking-wider truncate max-w-[70%]">
                  {room.label}
                </span>
                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--highlight)] text-[var(--muted)] flex-shrink-0">
                  {room.products.length}
                </span>
              </div>

              {/* Product Icons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {/* On mobile, show limited icons */}
                {visibleProducts.slice(0, MOBILE_MAX_ICONS).map((product) => {
                  const hasChildren = product.children && product.children.length > 0;
                  return (
                    <button
                      key={product.id}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[var(--accent)] flex items-center justify-center border-2 border-transparent hover:border-white hover:scale-110 transition-all duration-200 hover:shadow-lg hover:z-20 text-white ${
                        hasChildren
                          ? "ring-2 ring-white/30 ring-offset-2 ring-offset-[var(--card)]"
                          : ""
                      }`}
                      onMouseEnter={(e) => handleProductHover(product, e)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => setSelectedProduct(product)}
                      aria-label={product.name}
                    >
                      <ProductIcon icon={product.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  );
                })}

                {/* Show remaining icons only on desktop */}
                {visibleProducts.slice(MOBILE_MAX_ICONS).map((product) => {
                  const hasChildren = product.children && product.children.length > 0;
                  return (
                    <button
                      key={product.id}
                      className={`hidden sm:flex w-11 h-11 rounded-full bg-[var(--accent)] items-center justify-center border-2 border-transparent hover:border-white hover:scale-110 transition-all duration-200 hover:shadow-lg hover:z-20 text-white ${
                        hasChildren
                          ? "ring-2 ring-white/30 ring-offset-2 ring-offset-[var(--card)]"
                          : ""
                      }`}
                      onMouseEnter={(e) => handleProductHover(product, e)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => setSelectedProduct(product)}
                      aria-label={product.name}
                    >
                      <ProductIcon icon={product.icon} className="w-5 h-5" />
                    </button>
                  );
                })}

                {/* +n indicator on mobile */}
                {hiddenCount > 0 && (
                  <span className="sm:hidden w-9 h-9 rounded-full bg-[var(--highlight)] flex items-center justify-center text-[10px] font-medium text-[var(--muted)]">
                    +{hiddenCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip (desktop only) */}
      {hoveredProduct && !selectedProduct && (
        <div
          className="absolute z-40 pointer-events-none animate-fade-in hidden sm:block"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translate(-50%, -100%) translateY(-16px)",
          }}
        >
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-3 w-56">
            <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-[var(--card)] border-r border-b border-[var(--border)] transform -translate-x-1/2 rotate-45" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{hoveredProduct.name}</h4>
                {hoveredProduct.children && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/20 text-[var(--accent)]">
                    +{hoveredProduct.children.length}
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
                {hoveredProduct.useCase}
              </p>
              <span className="block mt-2 text-xs text-[var(--accent)] font-medium">
                Click for details →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Detail Panel */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Instructions */}
      <p className="text-center text-xs sm:text-sm text-[var(--muted)] mt-6">
        Click any icon to see details
        <span className="hidden sm:inline"> · Products with rings have sub-items</span>
      </p>
    </div>
  );
}
