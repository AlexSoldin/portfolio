// <dot-matrix>: owns the canvas hero's lifecycle. Everything is set up in connectedCallback and torn
// down in disconnectedCallback, so it behaves the same under full page loads and client-side routing.
import { buildBoard, drawBoard, type Board } from "./board";
import { LOOP_MS, STILL_PHASE } from "./timeline";

/** Longest step the loop advances in one frame, so a stalled tab resumes instead of jumping. */
const MAX_STEP_MS = 100;

class DotMatrixElement extends HTMLElement {
  #context?: CanvasRenderingContext2D;
  #board?: Board;
  #colour = "";
  #elapsed = 0;
  #lastFrame = 0;
  #frame = 0;
  #isVisible = false;
  #reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  #teardown: (() => void)[] = [];

  connectedCallback() {
    const canvas = this.querySelector("canvas");
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    this.#context = context;
    this.#readColour();

    // device-pixel-content-box also fires when only the pixel density changes (zoom, moving screens).
    const resize = new ResizeObserver(([entry]) => this.#resize(canvas, entry));
    try {
      resize.observe(canvas, { box: "device-pixel-content-box" });
    } catch {
      resize.observe(canvas);
    }

    const visibility = new IntersectionObserver(([entry]) => {
      this.#isVisible = entry.isIntersecting;
      this.#schedule();
    });
    visibility.observe(canvas);

    // Redraw inside the theme swap so the view transition captures the new colour.
    const theme = new MutationObserver(() => {
      this.#readColour();
      this.#draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onMotionChange = () => this.#schedule();
    this.#reducedMotion.addEventListener("change", onMotionChange);

    this.#teardown = [
      () => resize.disconnect(),
      () => visibility.disconnect(),
      () => theme.disconnect(),
      () => this.#reducedMotion.removeEventListener("change", onMotionChange),
      () => cancelAnimationFrame(this.#frame),
    ];
  }

  disconnectedCallback() {
    this.#teardown.forEach((teardown) => teardown());
    this.#teardown = [];
  }

  #resize(canvas: HTMLCanvasElement, entry: ResizeObserverEntry) {
    const dpr = window.devicePixelRatio || 1;
    let width = Math.round(entry.contentRect.width * dpr);
    let height = Math.round(entry.contentRect.height * dpr);
    // Prefer the exact device-pixel size, but only when it agrees: device emulation can report CSS pixels.
    const devicePixels = entry.devicePixelContentBoxSize?.[0];
    if (devicePixels && Math.abs(devicePixels.inlineSize - width) <= 1) {
      [width, height] = [devicePixels.inlineSize, devicePixels.blockSize];
    }
    if (this.#board && width === canvas.width && height === canvas.height) return;

    canvas.width = width;
    canvas.height = height;
    this.#board = buildBoard(width, height, dpr);
    this.#draw();
  }

  #readColour() {
    this.#colour = getComputedStyle(this).getPropertyValue("--foreground").trim();
  }

  #schedule() {
    cancelAnimationFrame(this.#frame);
    if (this.#isVisible && !this.#reducedMotion.matches) {
      this.#lastFrame = performance.now();
      this.#frame = requestAnimationFrame(this.#tick);
    } else {
      this.#draw();
    }
  }

  #tick = (now: number) => {
    // rAF timestamps can precede the performance.now() taken when scheduling, so clamp at zero.
    this.#elapsed += Math.min(Math.max(now - this.#lastFrame, 0), MAX_STEP_MS);
    this.#lastFrame = now;
    this.#draw();
    this.#frame = requestAnimationFrame(this.#tick);
  };

  #draw() {
    if (!this.#context || !this.#board) return;
    const isStill = this.#reducedMotion.matches;
    drawBoard(this.#context, this.#board, {
      phase: isStill ? STILL_PHASE : (this.#elapsed % LOOP_MS) / LOOP_MS,
      time: this.#elapsed,
      hasPulses: !isStill,
      colour: this.#colour,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dot-matrix": DotMatrixElement;
  }
}

if (!customElements.get("dot-matrix")) customElements.define("dot-matrix", DotMatrixElement);
