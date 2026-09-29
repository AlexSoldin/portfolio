// First-order RC high-pass filter on the lattice: series capacitor, resistor to the ground rail.
// Wires snap to rows and columns, the resistor is a 45° zigzag, and terminals and junctions are
// single full-size dots so the schematic reads at a glance.
import { lineCells, type Cell, type LatticeMap, type Point } from "./lattice";

/** Layout in canvas units. */
const HIGH_PASS = {
  top: 27,
  rail: 72,
  inputX: 16,
  outputX: 144,
  capacitorX: [62, 70],
  plateReach: 10,
  resistorX: 104,
  resistorLead: 6,
} as const;

const LEVEL = { wire: 0.4, component: 0.95, junction: 1 } as const;
/** Zigzag half-width in cells; legs step one cell across per row, so every diagonal is 45°. */
const ZIGZAG_AMPLITUDE = 2;

/**
 * How far along the current's path a point sits, 0 (input) to 1 (back at the input on the rail).
 * Current runs left to right along the top wire to the output, then back right to left along the
 * rail; the resistor branch is stretched so its pulse meets the wire and the rail as they do.
 */
function flowAt({ x, y }: Point): number {
  const { top, rail, inputX, outputX, resistorX } = HIGH_PASS;
  const span = outputX - inputX;
  const onRail = (x: number) => span + (outputX - x);

  if (y >= rail) return onRail(x) / (span * 2);
  if (y > top) {
    const start = resistorX - inputX;
    return (start + ((y - top) / (rail - top)) * (onRail(resistorX) - start)) / (span * 2);
  }
  return (x - inputX) / (span * 2);
}

export function drawCircuit(map: LatticeMap, circuit: Float32Array, flow: Float32Array) {
  const { top, rail, inputX, outputX, capacitorX, plateReach, resistorX, resistorLead } = HIGH_PASS;
  const [inputColumn, topRow] = map.toCell({ x: inputX, y: top });
  const [outputColumn, railRow] = map.toCell({ x: outputX, y: rail });
  const [resistorColumn] = map.toCell({ x: resistorX, y: top });
  const [plateA] = map.toCell({ x: capacitorX[0], y: top });
  const plateB = Math.max(plateA + 3, map.toCell({ x: capacitorX[1], y: top })[0]);
  const reach = Math.max(3, Math.round(plateReach / map.pitch));

  const stroke = (from: Cell, to: Cell, level: number, onPath: (point: Point) => Point) => {
    for (const cell of lineCells(from, to)) {
      const index = map.light(circuit, cell, level);
      if (index >= 0) flow[index] = flowAt(onPath(map.toCanvas(cell)));
    }
  };
  // Snap each lattice point back onto the wire it belongs to, so the pulse follows the real path.
  const onTop = ({ x }: Point) => ({ x, y: top });
  const onRail = ({ x }: Point) => ({ x, y: rail });
  const onResistor = ({ y }: Point) => ({
    x: resistorX,
    y: Math.min(rail - 0.01, Math.max(top + 0.01, y)),
  });

  stroke([inputColumn, topRow], [plateA - 1, topRow], LEVEL.wire, onTop);
  stroke([plateB + 1, topRow], [outputColumn, topRow], LEVEL.wire, onTop);
  stroke([inputColumn, railRow], [outputColumn, railRow], LEVEL.wire, onRail);
  for (const plate of [plateA, plateB]) {
    stroke([plate, topRow - reach], [plate, topRow + reach], LEVEL.component, onTop);
  }

  // Resistor: a zigzag centred between two leads.
  const lead = Math.max(2, Math.round(resistorLead / map.pitch));
  const legs = Math.max(1, Math.floor((railRow - topRow - lead * 2) / (ZIGZAG_AMPLITUDE * 2)));
  const zigTop = topRow + Math.floor((railRow - topRow - legs * ZIGZAG_AMPLITUDE * 2) / 2);
  const zigzag: Cell[] = [
    [resistorColumn, zigTop],
    ...Array.from(
      { length: legs },
      (_, leg): Cell => [
        resistorColumn + (leg % 2 === 0 ? ZIGZAG_AMPLITUDE : -ZIGZAG_AMPLITUDE),
        zigTop + ZIGZAG_AMPLITUDE * (1 + leg * 2),
      ]
    ),
    [resistorColumn, zigTop + legs * ZIGZAG_AMPLITUDE * 2],
  ];
  stroke([resistorColumn, topRow + 1], zigzag[0], LEVEL.wire, onResistor);
  zigzag.slice(1).forEach((cell, index) => {
    stroke(zigzag[index], cell, LEVEL.component, onResistor);
  });
  stroke(zigzag[zigzag.length - 1], [resistorColumn, railRow - 1], LEVEL.wire, onResistor);

  const junctions: Cell[] = [
    [inputColumn, topRow],
    [outputColumn, topRow],
    [inputColumn, railRow],
    [outputColumn, railRow],
    [resistorColumn, topRow],
    [resistorColumn, railRow],
  ];
  for (const cell of junctions) map.light(circuit, cell, LEVEL.junction);
}
