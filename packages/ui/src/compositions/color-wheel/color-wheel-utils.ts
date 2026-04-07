/** HSL value used by the ColorWheel component. */
export interface ColorWheelValue {
  h: number;
  l: number;
  s: number;
}

// ── Geometry constants ─────────────────────────────────────────────────

/** Diameter of the saturation/lightness circular pad. */
export const PAD_SIZE = 104;

/** Radius of the pad circle. */
export const PAD_RADIUS = PAD_SIZE / 2;

/** Gap between pad edge and arc centerline. */
export const ARC_GAP = 8;

/** Radius of the hue arc (concentric with pad). */
export const ARC_RADIUS = PAD_RADIUS + ARC_GAP;

/** Stroke width of the hue arc. */
export const ARC_STROKE_WIDTH = 8;

/** Arc start angle in degrees (CW from 3 o'clock). */
export const ARC_START_DEG = 10;

/** Arc end angle in degrees (CW from 3 o'clock). */
export const ARC_END_DEG = 170;

/** Total container width — fits pad + arc overshoot on each side. */
export const CONTAINER_WIDTH = 2 * (ARC_RADIUS + ARC_STROKE_WIDTH / 2) + 2;

/** Center X of both pad and arc within the container. */
export const CENTER_X = CONTAINER_WIDTH / 2;

/** Center Y of both pad and arc within the container. */
export const CENTER_Y = PAD_RADIUS + ARC_STROKE_WIDTH / 2 + 1;

/** Container height — from top to deepest arc point + handle radius. */
export const CONTAINER_HEIGHT =
  CENTER_Y + ARC_RADIUS + ARC_STROKE_WIDTH / 2 + 2;

/** SVG viewBox string for the overlay. */
export const SVG_VIEWBOX = `0 0 ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`;

// ── Pre-computed arc path ──────────────────────────────────────────────

const startRad = (ARC_START_DEG * Math.PI) / 180;
const endRad = (ARC_END_DEG * Math.PI) / 180;

const arcStartX = CENTER_X + ARC_RADIUS * Math.cos(startRad);
const arcStartY = CENTER_Y + ARC_RADIUS * Math.sin(startRad);
const arcEndX = CENTER_X + ARC_RADIUS * Math.cos(endRad);
const arcEndY = CENTER_Y + ARC_RADIUS * Math.sin(endRad);

/** Pre-computed SVG arc path (sweeps CW from startDeg to endDeg). */
export const ARC_PATH = `M ${arcStartX} ${arcStartY} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${arcEndX} ${arcEndY}`;

// ── Pure helpers ───────────────────────────────────────────────────────

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeHue(hue: number): number {
  const normalized = hue % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export function hslToHex(
  hue: number,
  saturation: number,
  lightness: number,
): string {
  const normalizedHue = normalizeHue(hue);
  const clampedSaturation = clampValue(saturation, 0, 100) / 100;
  const clampedLightness = clampValue(lightness, 0, 100) / 100;

  const chroma = (1 - Math.abs(2 * clampedLightness - 1)) * clampedSaturation;
  const x = chroma * (1 - Math.abs(((normalizedHue / 60) % 2) - 1));
  const m = clampedLightness - chroma / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (normalizedHue < 60) {
    rPrime = chroma;
    gPrime = x;
  } else if (normalizedHue < 120) {
    rPrime = x;
    gPrime = chroma;
  } else if (normalizedHue < 180) {
    gPrime = chroma;
    bPrime = x;
  } else if (normalizedHue < 240) {
    gPrime = x;
    bPrime = chroma;
  } else if (normalizedHue < 300) {
    rPrime = x;
    bPrime = chroma;
  } else {
    rPrime = chroma;
    bPrime = x;
  }

  const toHex = (channel: number) =>
    Math.round((channel + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(rPrime)}${toHex(gPrime)}${toHex(bPrime)}`;
}

export function clampPointToCircle(
  x: number,
  y: number,
  radius: number,
): { x: number; y: number } {
  const distance = Math.sqrt(x * x + y * y);
  if (distance <= radius || distance === 0) {
    return { x, y };
  }
  const scale = radius / distance;
  return { x: x * scale, y: y * scale };
}

// ── Angle/hue conversion ───────────────────────────────────────────────

const ARC_SPAN_DEG = ARC_END_DEG - ARC_START_DEG;

/** Map hue (0-360) to an angle in degrees on the arc (CW from 3 o'clock). */
export function hueToAngle(hue: number): number {
  return ARC_START_DEG + (normalizeHue(hue) / 360) * ARC_SPAN_DEG;
}

/** Map an angle (degrees, CW from 3 o'clock) back to hue (0-360). */
export function angleToHue(angleDeg: number): number {
  const clamped = clampValue(angleDeg, ARC_START_DEG, ARC_END_DEG);
  return ((clamped - ARC_START_DEG) / ARC_SPAN_DEG) * 360;
}

// ── Handle positions (for rendering) ───────────────────────────────────

/** Get the pixel position of the pad handle from S/L values. */
export function getPadHandlePosition(
  saturation: number,
  lightness: number,
): { x: number; y: number } {
  const rawX = (saturation / 100) * PAD_SIZE;
  const rawY = ((100 - lightness) / 100) * PAD_SIZE;
  const clamped = clampPointToCircle(
    rawX - PAD_RADIUS,
    rawY - PAD_RADIUS,
    PAD_RADIUS,
  );
  return {
    x: clamped.x + PAD_RADIUS,
    y: clamped.y + PAD_RADIUS,
  };
}

/** Get the SVG-space position of the hue handle on the arc. */
export function getHueHandlePosition(hue: number): { x: number; y: number } {
  const angleDeg = hueToAngle(hue);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + ARC_RADIUS * Math.cos(angleRad),
    y: CENTER_Y + ARC_RADIUS * Math.sin(angleRad),
  };
}

// ── Pointer → value conversion ─────────────────────────────────────────

/** Convert a pointer event (relative to the pad element) to S/L values. */
export function pointerToPadSL(
  clientX: number,
  clientY: number,
  padRect: DOMRect,
): { s: number; l: number } {
  const localX = clientX - padRect.left - PAD_RADIUS;
  const localY = clientY - padRect.top - PAD_RADIUS;
  const clamped = clampPointToCircle(localX, localY, PAD_RADIUS);

  const xRatio = (clamped.x + PAD_RADIUS) / PAD_SIZE;
  const yRatio = (clamped.y + PAD_RADIUS) / PAD_SIZE;

  return {
    s: clampValue(xRatio * 100, 0, 100),
    l: clampValue((1 - yRatio) * 100, 3, 97),
  };
}

/** Convert a pointer event (relative to the SVG element) to a hue value. */
export function pointerToHue(
  clientX: number,
  clientY: number,
  svgRect: DOMRect,
): number {
  const localX = clientX - svgRect.left;
  const localY = clientY - svgRect.top;
  const dx = localX - CENTER_X;
  const dy = localY - CENTER_Y;
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;
  const normalizedDeg = angleDeg < 0 ? angleDeg + 360 : angleDeg;
  return angleToHue(normalizedDeg);
}
