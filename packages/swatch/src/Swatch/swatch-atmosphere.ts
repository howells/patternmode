import { hexToRgb, rgbToHex } from "@instruments/colorscope/convert";

import type { SwatchColorStop } from "./swatch-types";

export interface SwatchAtmosphereOptions {
  /** 0 = diffuse, wide wash · 1 = dense, tight pools. Default 0.5. */
  density?: number;
  /** -1 = grounds (pools sink) · 1 = lifts (pools rise). Default 0. */
  gravity?: number;
}

/**
 * Per-pool layout for the atmosphere fill:
 * `[focal x%, focal y%, base alpha (0-255), radius delta %, gravity sign]`.
 *
 * The first three entries reproduce the original three-pool blend identity
 * gradient exactly; further entries extend the pattern for palettes with
 * more than three colors.
 */
const POOLS: readonly (readonly [number, number, number, number, number])[] = [
  [30, 42, 0xcc, 0, -1],
  [72, 58, 0x99, -5, 1],
  [45, 65, 0x77, 8, -1],
  [62, 32, 0x66, 3, 1],
  [24, 72, 0x55, -3, -1],
  [80, 40, 0x44, 6, 1],
];

/**
 * Build a soft, layered radial "atmosphere" background from color stops — a
 * stack of overlapping elliptical pools rather than a flat or linear fill.
 * Density controls how far each pool reaches; gravity shifts the pools
 * vertically. Returns `undefined` when there are no colors.
 */

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const withAlpha = (color: string, alpha: number): string => {
  const rgb = hexToRgb(color);
  if (rgb !== null) {
    const suffix = Math.round(clamp(alpha, 0, 255))
      .toString(16)
      .padStart(2, "0");
    return `${rgbToHex(rgb.r, rgb.g, rgb.b)}${suffix}`;
  }
  const percent = Math.round((clamp(alpha, 0, 255) / 255) * 100);
  /* Mix in oklab, not srgb. This branch takes every non-hex colour, including
     the `oklch()` values a wide-gamut consumer passes — and `in srgb` narrows
     those to the sRGB gamut on the way through, silently. Nothing throws and
     the swatch still renders; it just renders a duller colour than the one it
     was given. The hex branch above is already sRGB by construction, so this
     is the only path where the gamut is live. */
  return `color-mix(in oklab, ${color} ${percent}%, transparent)`;
};

export const getSwatchAtmosphereBackground = (
  colors: SwatchColorStop[] | undefined,
  options: SwatchAtmosphereOptions = {},
): string | undefined => {
  if (colors === undefined || colors.length === 0) {
    return undefined;
  }

  const density = clamp(options.density ?? 0.5, 0, 1);
  const gravity = clamp(options.gravity ?? 0, -1, 1);
  const gy = Math.round(gravity * 8);
  const reach = Math.round(50 + (1 - density) * 15);

  const layers = colors.map((stop, index) => {
    const color = typeof stop === "string" ? stop : stop.color;
    const pool = POOLS[index % POOLS.length];
    if (pool === undefined) {
      throw new Error("Expected atmosphere pool to exist.");
    }
    const [x, y, baseAlpha, radiusDelta, gravitySign] = pool;
    // Each wrap past the palette length fades the extra pools further back.
    const cycle = Math.floor(index / POOLS.length);
    const alpha = Math.max(0x22, baseAlpha - cycle * 0x22);
    const focalY = clamp(y + gravitySign * gy, 0, 100);
    const radius = Math.max(8, reach + radiusDelta);
    return `radial-gradient(ellipse at ${x}% ${focalY}%, ${withAlpha(
      color,
      alpha,
    )} 0%, transparent ${radius}%)`;
  });

  return layers.join(", ");
};
