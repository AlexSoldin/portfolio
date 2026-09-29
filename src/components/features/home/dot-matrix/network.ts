// Fully connected 2-3-2 neural network on the lattice, input layer on the left. Nodes are round discs
// centred on a cell; weights are one-dot lines aimed centre to centre, stopping a dot short of each node.
import { CANVAS, lineCells, type Cell, type LatticeMap } from "./lattice";

/** Layout in canvas units. */
const NETWORK = {
  layers: [2, 3, 2],
  left: 26,
  right: 134,
  nodeGap: 26,
  nodeRadius: 4,
} as const;

const LEVEL = { node: 0.95, weight: 0.4 } as const;

export function drawNetwork(map: LatticeMap, network: Float32Array) {
  const { layers, left, right, nodeGap, nodeRadius } = NETWORK;
  const layerGap = (right - left) / (layers.length - 1);
  const centres = layers.map((size, layer) =>
    Array.from({ length: size }, (_, index) =>
      map.toCell({
        x: left + layer * layerGap,
        y: CANVAS.height / 2 + (index - (size - 1) / 2) * nodeGap,
      })
    )
  );
  const radius = Math.max(2, Math.round(nodeRadius / map.pitch));
  const isNearNode = ([column, row]: Cell) =>
    centres.flat().some(([x, y]) => Math.hypot(column - x, row - y) <= radius + 1.5);

  // Every node connects to every node in the next layer.
  centres.slice(1).forEach((targets, layer) => {
    for (const source of centres[layer]) {
      for (const target of targets) {
        for (const cell of lineCells(source, target)) {
          if (!isNearNode(cell)) map.light(network, cell, LEVEL.weight);
        }
      }
    }
  });

  for (const [x, y] of centres.flat()) {
    for (let row = -radius; row <= radius; row += 1) {
      for (let column = -radius; column <= radius; column += 1) {
        if (Math.hypot(column, row) <= radius + 0.35) {
          map.light(network, [x + column, y + row], LEVEL.node);
        }
      }
    }
  }
}
