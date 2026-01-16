# Generative art

This portfolio features a procedural art system inspired by geometric patterns, rendered on HTML5 canvas. The system creates unique compositions on each page load and click, with the core rendering logic reused to power an interactive business card generator.

## File structure

```
src/
├── components/
│   ├── GenerativeArt.tsx              # Standalone art component (hero sections)
│   ├── HeroSection.tsx                # Combines art + TextReveal for pages
│   └── features/home/
│       └── BusinessCardGenerator.tsx  # Business card with editable text
├── lib/
│   └── art.ts                         # Core rendering logic + color palette
└── types/
    └── art.ts                         # TypeScript definitions
```

## How it works

### Core architecture

The generative art system is built on three layers:

1. **Types** (`src/types/art.ts`) - Define the data structures
2. **Rendering** (`src/lib/art.ts`) - Pure functions that draw to canvas
3. **Components** - React wrappers that manage state and user interaction

This separation allows the same rendering logic to be reused across different components with different features.

### Shape primitives

The art is composed of five geometric shapes, each drawn relative to a cell:

```ts
// src/types/art.ts:1
export type ShapeType = "quarterCircle" | "halfCircle" | "circle" | "leaf" | "empty";
```

| Shape | Description | Visual |
|-------|-------------|--------|
| `quarterCircle` | 90° arc from corner | Pie slice |
| `halfCircle` | Semicircle along edge | Half moon |
| `circle` | Centered circle (35% of cell) | Dot |
| `leaf` | Two opposing quarter-circle arcs | Organic curve |
| `empty` | No shape, only background | Whitespace |

### Cell configuration

Each cell in the grid stores its visual properties:

```ts
// src/types/art.ts:3-8
export interface CellConfig {
  shape: ShapeType;
  rotation: number;     // 0, 90, 180, or 270 degrees
  color: string;        // Shape fill color
  bgColor: string;      // Cell background color
}
```

### Grid state

The complete art state captures the grid dimensions and all cell configurations:

```ts
// src/types/art.ts:10-13
export interface GridState {
  cellSize: number;     // Pixels per cell (40, 64, or 80)
  cells: CellConfig[];  // Flattened array, row-major order
}
```

### Color palette

The palette is carefully curated for visual harmony, with bold primaries balanced by neutrals:

```ts
// src/lib/art.ts:10-20
export const ART_COLORS = [
  "#E53935", // Red (tomato)
  "#1565C0", // Dark blue (cobalt)
  "#42A5F5", // Light blue (sky)
  "#F9A825", // Yellow (golden)
  "#00897B", // Teal (dark)
  "#000000", // Black
  "#FFCDD2", // Light pink (blush)
  "#B2DFDB", // Mint (light teal)
  "#FFFFFF", // White
];
```

### Weighted random generation

Shapes are selected using weighted probability to favor more interesting compositions:

```ts
// src/lib/art.ts:24-38
const shapes: ShapeType[] = ["quarterCircle", "halfCircle", "circle", "leaf", "empty"];
const weights = [0.35, 0.25, 0.15, 0.15, 0.1];

// Weighted random selection
const random = Math.random();
let cumulative = 0;
for (let i = 0; i < shapes.length; i++) {
  cumulative += weights[i];
  if (random < cumulative) {
    selectedShape = shapes[i];
    break;
  }
}
```

| Shape | Probability |
|-------|-------------|
| quarterCircle | 35% |
| halfCircle | 25% |
| circle | 15% |
| leaf | 15% |
| empty | 10% |

### Canvas rendering

The `drawCell` function handles all shape rendering with rotation transforms:

```ts
// src/lib/art.ts:59-118
export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  config: CellConfig
) {
  // 1. Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, size, size);

  // 2. Apply rotation transform around cell center
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-centerX, -centerY);

  // 3. Draw shape using arc/path primitives
  ctx.fillStyle = color;
  switch (shape) {
    case "quarterCircle":
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, size, 0, Math.PI / 2);
      // ...
  }

  ctx.restore();
}
```

### High-resolution export

Both components support exporting at 20x resolution for print quality:

```ts
// src/components/GenerativeArt.tsx:12-13
const EXPORT_SCALE = 20;  // 320px × 20 = 6400px output
```

The export creates an offscreen canvas, redraws at high resolution, and triggers download:

```ts
// src/components/GenerativeArt.tsx:52-65
const offscreen = document.createElement("canvas");
offscreen.width = width * EXPORT_SCALE;
offscreen.height = height * EXPORT_SCALE;
const ctx = offscreen.getContext("2d");

drawFullGrid(ctx, width, height, gridState, EXPORT_SCALE);
const dataUrl = offscreen.toDataURL("image/png");
```

## Business card extension

The `BusinessCardGenerator` reuses the core art system and adds a text overlay for creating personalized digital business cards.

### Composition approach

Rather than duplicating code, the business card extends the art by layering:

```ts
// src/lib/art.ts:142-200
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

  // 2. Draw frosted glass card overlay
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, radius);

  // 3. Draw text (name, role, contact)
  ctx.font = `bold ${32 * scale}px "Playfair Display", serif`;
  ctx.fillText(text.name, ...);
}
```

### Text configuration

The business card accepts customizable text fields:

```ts
// src/lib/art.ts:3-7
export interface BusinessCardText {
  name: string;
  role: string;
  contact?: string;  // Optional email or handle
}
```

### Fixed dimensions

The business card uses standard card proportions (1.75:1 ratio):

```ts
// src/components/features/home/BusinessCardGenerator.tsx:22-24
const width = 600;
const height = 342;
const cellSize = 60;  // Fixed for consistent look
```

Unlike the general `GenerativeArt` component which randomizes cell size from [40, 64, 80], the business card uses a fixed 60px cell size for predictable text placement.

### Interactive customization

Users can edit card text in real-time via controlled inputs:

```tsx
// src/components/features/home/BusinessCardGenerator.tsx:94-118
<Input
  id="card-name"
  label="Name"
  value={cardText.name}
  onChange={(e) => setCardText({ ...cardText, name: e.target.value })}
  maxLength={25}
/>
```

The canvas re-renders whenever `gridState` or `cardText` changes:

```ts
// src/components/features/home/BusinessCardGenerator.tsx:40-58
useEffect(() => {
  // ...
  drawBusinessCard(ctx, width, height, gridState, cardText, dpr);
}, [gridState, cardText]);
```

## Design choices

### Pure rendering functions

**Why:** Separating rendering logic (`drawCell`, `drawFullGrid`, `drawBusinessCard`) from React components enables:
- Reuse across different component contexts
- Easy testing without React
- Support for offscreen canvas rendering (exports)

**Alternative considered:** Embedding all drawing logic in components—rejected for code duplication.

### Weighted shape distribution

**Why:** Equal probability (20% each) produced visually monotonous results. Weighting toward `quarterCircle` (35%) creates more dynamic compositions with interlocking curves.

**Rationale:** Quarter circles create visual flow when adjacent cells have complementary rotations. Empty cells (10%) provide breathing room.

### Device pixel ratio handling

**Why:** Canvas renders at native resolution, then CSS scales the element. This ensures crisp rendering on Retina displays.

```ts
// src/components/GenerativeArt.tsx:41-45
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
drawFullGrid(ctx, width, height, gridState, dpr);
```

### Click to regenerate interaction

**Why:** Provides delight and discovery. Users can "hunt" for a composition they like, encouraging engagement.

```tsx
// src/components/GenerativeArt.tsx:73-75
<div onClick={generateArt} title="Click to regenerate">
```

### Separate scale parameter

**Why:** The `scale` parameter in drawing functions allows the same `GridState` to render at different resolutions without regenerating the art.

- Display: `scale = devicePixelRatio` (typically 1-3)
- Export: `scale = 20` (6400px for 320px base)

## Technology usage

| Technology | Purpose | Why chosen |
|------------|---------|------------|
| HTML5 Canvas | Rendering | Precise control, pixel-perfect output, easy export |
| React state | Grid storage | Enables click-to-regenerate, text editing |
| `toDataURL()` | PNG export | Browser-native, no dependencies |
| CSS aspect-ratio | Responsive sizing | Canvas scales without distortion |

## Key patterns

### Offscreen canvas for exports

```ts
const offscreen = document.createElement("canvas");
offscreen.width = width * EXPORT_SCALE;
// Draw to offscreen context
const dataUrl = offscreen.toDataURL("image/png");
```

This pattern allows high-resolution export without affecting the visible canvas.

### Flattened grid array

Cells are stored in a flat array with row-major indexing:

```ts
const cols = Math.ceil(width / cellSize);
cells.forEach((config, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  // Draw at (col * cellSize, row * cellSize)
});
```

This simplifies state management while enabling efficient iteration.

### Transform-based rotation

Instead of calculating rotated coordinates, the code uses canvas transforms:

```ts
ctx.translate(centerX, centerY);
ctx.rotate((rotation * Math.PI) / 180);
ctx.translate(-centerX, -centerY);
// Draw shape at original coordinates
```

This keeps shape drawing code simple regardless of rotation.

## Component usage

### GenerativeArt (standalone)

```tsx
import GenerativeArt from "@/components/GenerativeArt";

<GenerativeArt width={320} height={320} />
```

### HeroSection (with text)

```tsx
import { HeroSection } from "@/components/HeroSection";

<HeroSection
  title="Welcome"
  subtitle="A brief description..."
  artWidth={320}
  artHeight={320}
/>
```

### BusinessCardGenerator (editable)

```tsx
import { BusinessCardGenerator } from "@/components/features/home";

<BusinessCardGenerator />
```

## Best practices

1. **Always pass scale to drawing functions** rather than using `ctx.scale()`, ensuring consistent coordinate math

2. **Use `ctx.save()` and `ctx.restore()`** around transforms to prevent state leakage between cells

3. **Handle missing canvas context** gracefully:
   ```ts
   const ctx = canvas.getContext("2d");
   if (!ctx) return;
   ```

4. **Use `stopPropagation()` on download button** to prevent triggering regeneration:
   ```ts
   const handleDownload = (e: React.MouseEvent) => {
     e.stopPropagation();
     // ...
   };
   ```

5. **Specify font fallbacks** for canvas text rendering since custom fonts may not load:
   ```ts
   ctx.font = `bold ${32 * scale}px "Playfair Display", serif`;
   ```
