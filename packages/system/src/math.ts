/** Limits `value` to `min..max`. `NaN` stays `NaN`; when `min > max`, `max` wins. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Wraps a hue in degrees into `[0, 360)`. Non-finite input returns `NaN`. */
export const wrapHue = (hue: number): number => ((hue % 360) + 360) % 360;
