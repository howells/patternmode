/** HSL value used by HaloPicker. */
export interface HaloColor {
  h: number;
  l: number;
  s: number;
}

export const HALO_PAD_SIZE = 104;
export const HALO_PAD_RADIUS = HALO_PAD_SIZE / 2;
export const HALO_ARC_GAP = 8;
export const HALO_ARC_RADIUS = HALO_PAD_RADIUS + HALO_ARC_GAP;
export const HALO_ARC_STROKE_WIDTH = 8;
export const HALO_ARC_START_DEG = 10;
export const HALO_ARC_END_DEG = 170;
export const HALO_WIDTH = 2 * (HALO_ARC_RADIUS + HALO_ARC_STROKE_WIDTH / 2) + 2;
export const HALO_CENTER_X = HALO_WIDTH / 2;
export const HALO_CENTER_Y = HALO_PAD_RADIUS + HALO_ARC_STROKE_WIDTH / 2 + 1;
export const HALO_HEIGHT = HALO_CENTER_Y + HALO_ARC_RADIUS + HALO_ARC_STROKE_WIDTH / 2 + 2;
export const HALO_VIEWBOX = `0 0 ${HALO_WIDTH} ${HALO_HEIGHT}`;

const HALO_ARC_SPAN_DEG = HALO_ARC_END_DEG - HALO_ARC_START_DEG;
const startRad = (HALO_ARC_START_DEG * Math.PI) / 180;
const endRad = (HALO_ARC_END_DEG * Math.PI) / 180;
const arcStartX = HALO_CENTER_X + HALO_ARC_RADIUS * Math.cos(startRad);
const arcStartY = HALO_CENTER_Y + HALO_ARC_RADIUS * Math.sin(startRad);
const arcEndX = HALO_CENTER_X + HALO_ARC_RADIUS * Math.cos(endRad);
const arcEndY = HALO_CENTER_Y + HALO_ARC_RADIUS * Math.sin(endRad);

export const HALO_ARC_PATH =
  `M ${arcStartX} ${arcStartY} ` +
  `A ${HALO_ARC_RADIUS} ${HALO_ARC_RADIUS} 0 0 1 ${arcEndX} ${arcEndY}`;

export const clampValue = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const normalizeHue = (hue: number): number => {
  const normalized = hue % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const toHexPart = (value: number): string => Math.round(value).toString(16).padStart(2, "0");

export const hslToHex = (hue: number, saturation: number, lightness: number): string => {
  const h = normalizeHue(hue) / 360;
  const s = clampValue(saturation, 0, 100) / 100;
  const l = clampValue(lightness, 0, 100) / 100;

  if (s === 0) {
    const gray = l * 255;
    return `#${toHexPart(gray)}${toHexPart(gray)}${toHexPart(gray)}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hueToRgb = (t: number) => {
    let next = t;
    if (next < 0) {
      next += 1;
    }
    if (next > 1) {
      next -= 1;
    }
    if (next < 1 / 6) {
      return p + (q - p) * 6 * next;
    }
    if (next < 1 / 2) {
      return q;
    }
    if (next < 2 / 3) {
      return p + (q - p) * (2 / 3 - next) * 6;
    }
    return p;
  };

  return `#${toHexPart(hueToRgb(h + 1 / 3) * 255)}${toHexPart(
    hueToRgb(h) * 255,
  )}${toHexPart(hueToRgb(h - 1 / 3) * 255)}`;
};

export const clampPointToCircle = (
  x: number,
  y: number,
  radius: number,
): { x: number; y: number } => {
  const distance = Math.hypot(x, y);
  if (distance <= radius || distance === 0) {
    return { x, y };
  }

  const scale = radius / distance;
  return { x: x * scale, y: y * scale };
};

export const hueToHaloAngle = (hue: number): number =>
  HALO_ARC_START_DEG + (normalizeHue(hue) / 360) * HALO_ARC_SPAN_DEG;

export const haloAngleToHue = (angleDeg: number): number => {
  const clamped = clampValue(angleDeg, HALO_ARC_START_DEG, HALO_ARC_END_DEG);
  return ((clamped - HALO_ARC_START_DEG) / HALO_ARC_SPAN_DEG) * 360;
};

export const getHaloPadHandlePosition = (
  saturation: number,
  lightness: number,
): { x: number; y: number } => {
  const rawX = (saturation / 100) * HALO_PAD_SIZE;
  const rawY = ((100 - lightness) / 100) * HALO_PAD_SIZE;
  const clamped = clampPointToCircle(
    rawX - HALO_PAD_RADIUS,
    rawY - HALO_PAD_RADIUS,
    HALO_PAD_RADIUS,
  );

  return {
    x: clamped.x + HALO_PAD_RADIUS,
    y: clamped.y + HALO_PAD_RADIUS,
  };
};

export const getHaloHueHandlePosition = (hue: number): { x: number; y: number } => {
  const angleRad = (hueToHaloAngle(hue) * Math.PI) / 180;
  return {
    x: HALO_CENTER_X + HALO_ARC_RADIUS * Math.cos(angleRad),
    y: HALO_CENTER_Y + HALO_ARC_RADIUS * Math.sin(angleRad),
  };
};

export const pointerToHaloPad = (
  clientX: number,
  clientY: number,
  padRect: DOMRect,
): Pick<HaloColor, "l" | "s"> => {
  const localX = clientX - padRect.left - HALO_PAD_RADIUS;
  const localY = clientY - padRect.top - HALO_PAD_RADIUS;
  const clamped = clampPointToCircle(localX, localY, HALO_PAD_RADIUS);
  const xRatio = (clamped.x + HALO_PAD_RADIUS) / HALO_PAD_SIZE;
  const yRatio = (clamped.y + HALO_PAD_RADIUS) / HALO_PAD_SIZE;

  return {
    l: clampValue((1 - yRatio) * 100, 3, 97),
    s: clampValue(xRatio * 100, 0, 100),
  };
};

export const pointerToHaloHue = (clientX: number, clientY: number, svgRect: DOMRect): number => {
  const localX = clientX - svgRect.left;
  const localY = clientY - svgRect.top;
  const dx = localX - HALO_CENTER_X;
  const dy = localY - HALO_CENTER_Y;
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;
  const normalizedDeg = angleDeg < 0 ? angleDeg + 360 : angleDeg;
  return haloAngleToHue(normalizedDeg);
};
