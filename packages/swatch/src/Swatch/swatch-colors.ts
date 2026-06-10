import type { SwatchColorStop } from "./swatch-types";

const normalizeHex = (hex: string): string | null => {
  const value = hex.trim().replace(/^#/u, "");
  if (/^[\da-f]{3}$/iu.test(value)) {
    return `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
  }
  if (/^[\da-f]{6}$/iu.test(value)) {
    return value;
  }
  return null;
};

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
  const normalized = normalizeHex(color);
  if (normalized === null) {
    return false;
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.62;
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
