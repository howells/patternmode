import type { OklabColor } from "./color";
import { oklabToLinearRgb, oklabToOklch, oklchToOklab } from "./color";

const chromaLimits = new Map<string, number>();

const withinGamut = (L: number, C: number, h: number): boolean => {
  const rgb = oklabToLinearRgb(oklchToOklab({ C, L, h }));
  return Object.values(rgb).every((channel) => channel >= 0 && channel <= 1);
};

const findChromaLimit = (lightness: number, hue: number): number => {
  if (!Number.isFinite(lightness) || !Number.isFinite(hue) || lightness <= 0 || lightness >= 1) {
    return 0;
  }
  const h = ((hue % 360) + 360) % 360;
  const key = `${Math.round(lightness * 10_000)}:${Math.round(h * 10)}`;
  const known = chromaLimits.get(key);
  if (known !== undefined) {
    return known;
  }
  let lower = 0;
  let upper = 0.4;
  for (let step = 0; step < 24; step += 1) {
    const candidate = (lower + upper) / 2;
    if (withinGamut(lightness, candidate, h)) {
      lower = candidate;
    } else {
      upper = candidate;
    }
  }
  chromaLimits.set(key, lower);
  return lower;
};

/** Reduces chroma to the sRGB boundary while preserving hue and in-range lightness. */
export const fitOklabToSrgbGamut = (lab: OklabColor): OklabColor => {
  const lch = oklabToOklch(lab);
  const limit = findChromaLimit(lab.L, lch.h);
  return lch.C <= limit
    ? lab
    : oklchToOklab({ C: limit, L: Math.min(1, Math.max(0, lab.L)), h: lch.h });
};
