import { sanitizeWeight } from "@patternmode/system";

import type { SwatchColorStop } from "./swatch-types";

const toColorStop = (stop: SwatchColorStop): { color: string; ratio?: number } =>
  typeof stop === "string" ? { color: stop } : stop;

/** Missing ratios default to equal weight; finite/negative handling is shared. */
const getRatioWeight = (ratio: number | undefined): number =>
  ratio === undefined ? 1 : sanitizeWeight(ratio);

const formatPercent = (value: number): string =>
  `${Number.isInteger(value) ? value : Number(value.toFixed(2))}%`;

export const getSwatchColorsBackground = (
  colors: SwatchColorStop[] | undefined,
  blend: "smooth" | "step" = "step",
): string | undefined => {
  if (colors === undefined || colors.length === 0) {
    return undefined;
  }

  const [singleColor] = colors;
  if (colors.length === 1 && singleColor !== undefined) {
    return toColorStop(singleColor).color;
  }

  const stops = colors.map(toColorStop);

  /* Smooth blend: one position per stop, interpolated in OKLab so ramps
     read as a continuous region of color rather than discrete bands. */
  if (blend === "smooth") {
    const parts = stops.map((stop, index) => {
      const position = stops.length === 1 ? 0 : (index / (stops.length - 1)) * 100;
      return `${stop.color} ${formatPercent(position)}`;
    });
    return `linear-gradient(in oklab 90deg, ${parts.join(", ")})`;
  }

  const weights = stops.map((stop) => getRatioWeight(stop.ratio));
  const rawTotal = weights.reduce((sum, ratio) => sum + ratio, 0);
  const useEqualWeights = rawTotal <= 0;
  const total = useEqualWeights ? stops.length : rawTotal;
  let cursor = 0;
  const parts = stops.map((stop, index) => {
    const ratio = useEqualWeights ? 1 : (weights[index] ?? 0);
    const start = cursor;
    const end = index === stops.length - 1 ? 100 : cursor + (ratio / total) * 100;
    cursor = end;
    return `${stop.color} ${formatPercent(start)} ${formatPercent(end)}`;
  });

  return `linear-gradient(90deg, ${parts.join(", ")})`;
};
