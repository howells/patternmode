import { hexLightness } from "@instruments/colorscope/math";

import type { SwatchColorStop } from "./swatch-types";

/** Perceptual (OKLab) lightness above which a swatch reads as "light". */
const LIGHT_LIGHTNESS_THRESHOLD = 0.62;

const toColorStop = (stop: SwatchColorStop): { color: string; ratio?: number } =>
  typeof stop === "string" ? { color: stop } : stop;

const getRatioWeight = (ratio: number | undefined): number => {
  if (ratio === undefined) {
    return 1;
  }

  return Number.isFinite(ratio) ? Math.max(0, ratio) : 0;
};

const formatPercent = (value: number): string =>
  `${Number.isInteger(value) ? value : Number(value.toFixed(2))}%`;

export const isLightColor = (color: string): boolean => {
  const lightness = hexLightness(color);
  return Number.isFinite(lightness) && lightness > LIGHT_LIGHTNESS_THRESHOLD;
};

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
