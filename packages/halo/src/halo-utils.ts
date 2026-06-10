/** HSL value used by HaloPicker. */
export interface HaloColor {
  h: number;
  l: number;
  s: number;
}

/** Which side of the pad the hue arc (and value readout) sits on. */
export type HaloPlacement = "bottom" | "left" | "right" | "top";

export const HALO_PAD_SIZE = 104;
export const HALO_PAD_RADIUS = HALO_PAD_SIZE / 2;
export const HALO_ARC_GAP = 8;
export const HALO_ARC_RADIUS = HALO_PAD_RADIUS + HALO_ARC_GAP;
export const HALO_ARC_STROKE_WIDTH = 8;

/* Stage box anatomy: the axis parallel to the arc spans the full arc
   diameter; the perpendicular axis is shallow on the pad side and deep on
   the arc side. Rotating the placement swaps which edges get which. */
const HALO_ARC_EXTENT = HALO_ARC_RADIUS + HALO_ARC_STROKE_WIDTH / 2;
const HALO_FULL_SPAN = 2 * HALO_ARC_EXTENT + 2;
const HALO_NEAR_DEPTH = HALO_PAD_RADIUS + HALO_ARC_STROKE_WIDTH / 2 + 1;
const HALO_DEEP_DEPTH = HALO_NEAR_DEPTH + HALO_ARC_EXTENT + 2;

export interface HaloGeometry {
  arcEndDeg: number;
  arcPath: string;
  arcStartDeg: number;
  centerX: number;
  centerY: number;
  /** Axis the hue gradient should run along for this placement. */
  gradientAxis: "horizontal" | "vertical";
  height: number;
  viewBox: string;
  width: number;
}

const HALO_ARC_SPAN_DEG = 160;

const buildArcPath = (centerX: number, centerY: number, startDeg: number, endDeg: number) => {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const startX = centerX + HALO_ARC_RADIUS * Math.cos(startRad);
  const startY = centerY + HALO_ARC_RADIUS * Math.sin(startRad);
  const endX = centerX + HALO_ARC_RADIUS * Math.cos(endRad);
  const endY = centerY + HALO_ARC_RADIUS * Math.sin(endRad);
  return `M ${startX} ${startY} A ${HALO_ARC_RADIUS} ${HALO_ARC_RADIUS} 0 0 1 ${endX} ${endY}`;
};

const buildGeometry = (
  placement: HaloPlacement,
  arcStartDeg: number,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
): HaloGeometry => ({
  arcEndDeg: arcStartDeg + HALO_ARC_SPAN_DEG,
  arcPath: buildArcPath(centerX, centerY, arcStartDeg, arcStartDeg + HALO_ARC_SPAN_DEG),
  arcStartDeg,
  centerX,
  centerY,
  gradientAxis: placement === "left" || placement === "right" ? "vertical" : "horizontal",
  height,
  viewBox: `0 0 ${width} ${height}`,
  width,
});

const HALO_GEOMETRIES: Record<HaloPlacement, HaloGeometry> = {
  bottom: buildGeometry(
    "bottom",
    10,
    HALO_FULL_SPAN,
    HALO_DEEP_DEPTH,
    HALO_FULL_SPAN / 2,
    HALO_NEAR_DEPTH,
  ),
  left: buildGeometry(
    "left",
    100,
    HALO_DEEP_DEPTH,
    HALO_FULL_SPAN,
    HALO_DEEP_DEPTH - HALO_NEAR_DEPTH,
    HALO_FULL_SPAN / 2,
  ),
  right: buildGeometry(
    "right",
    280,
    HALO_DEEP_DEPTH,
    HALO_FULL_SPAN,
    HALO_NEAR_DEPTH,
    HALO_FULL_SPAN / 2,
  ),
  top: buildGeometry(
    "top",
    190,
    HALO_FULL_SPAN,
    HALO_DEEP_DEPTH,
    HALO_FULL_SPAN / 2,
    HALO_DEEP_DEPTH - HALO_NEAR_DEPTH,
  ),
};

export const getHaloGeometry = (placement: HaloPlacement = "bottom"): HaloGeometry =>
  HALO_GEOMETRIES[placement];

/* Legacy bottom-placement constants, kept for callers that predate
   `placement`. They are the "bottom" geometry by another name. */
export const HALO_ARC_START_DEG = HALO_GEOMETRIES.bottom.arcStartDeg;
export const HALO_ARC_END_DEG = HALO_GEOMETRIES.bottom.arcEndDeg;
export const HALO_WIDTH = HALO_GEOMETRIES.bottom.width;
export const HALO_HEIGHT = HALO_GEOMETRIES.bottom.height;
export const HALO_CENTER_X = HALO_GEOMETRIES.bottom.centerX;
export const HALO_CENTER_Y = HALO_GEOMETRIES.bottom.centerY;
export const HALO_VIEWBOX = HALO_GEOMETRIES.bottom.viewBox;
export const HALO_ARC_PATH = HALO_GEOMETRIES.bottom.arcPath;

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

export const hueToHaloAngle = (hue: number, placement: HaloPlacement = "bottom"): number =>
  getHaloGeometry(placement).arcStartDeg + (normalizeHue(hue) / 360) * HALO_ARC_SPAN_DEG;

export const haloAngleToHue = (angleDeg: number, placement: HaloPlacement = "bottom"): number => {
  const { arcStartDeg } = getHaloGeometry(placement);
  /* Unwrap relative to the arc's start so placements whose span crosses 0°
     (right: 280°–440°) read continuously. Pointers in the gap snap to the
     nearer end of the arc. */
  const delta = (((angleDeg - arcStartDeg) % 360) + 360) % 360;
  if (delta <= HALO_ARC_SPAN_DEG) {
    return (delta / HALO_ARC_SPAN_DEG) * 360;
  }
  return delta - HALO_ARC_SPAN_DEG < 360 - delta ? 360 : 0;
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

export const getHaloHueHandlePosition = (
  hue: number,
  placement: HaloPlacement = "bottom",
): { x: number; y: number } => {
  const { centerX, centerY } = getHaloGeometry(placement);
  const angleRad = (hueToHaloAngle(hue, placement) * Math.PI) / 180;
  return {
    x: centerX + HALO_ARC_RADIUS * Math.cos(angleRad),
    y: centerY + HALO_ARC_RADIUS * Math.sin(angleRad),
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

export const pointerToHaloHue = (
  clientX: number,
  clientY: number,
  svgRect: DOMRect,
  placement: HaloPlacement = "bottom",
): number => {
  const { centerX, centerY } = getHaloGeometry(placement);
  const localX = clientX - svgRect.left;
  const localY = clientY - svgRect.top;
  const dx = localX - centerX;
  const dy = localY - centerY;
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;
  const normalizedDeg = angleDeg < 0 ? angleDeg + 360 : angleDeg;
  return haloAngleToHue(normalizedDeg, placement);
};
