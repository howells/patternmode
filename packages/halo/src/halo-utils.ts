import { clamp, wrapHue } from "@patternmode/system";
import type { HslColor } from "@patternmode/system";

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

/** A position in the picker's pixel space. */
export interface HaloPoint {
  x: number;
  y: number;
}

export const clampPointToCircle = (x: number, y: number, radius: number): HaloPoint => {
  const distance = Math.hypot(x, y);
  if (distance <= radius || distance === 0) {
    return { x, y };
  }

  const scale = radius / distance;
  return { x: x * scale, y: y * scale };
};

export const hueToHaloAngle = (hue: number, placement: HaloPlacement = "bottom"): number =>
  getHaloGeometry(placement).arcStartDeg + (wrapHue(hue) / 360) * HALO_ARC_SPAN_DEG;

export const haloAngleToHue = (angleDeg: number, placement: HaloPlacement = "bottom"): number => {
  const { arcStartDeg } = getHaloGeometry(placement);
  /* Unwrap relative to the arc's start so placements whose span crosses 0°
     (right: 280°–440°) read continuously. Pointers in the gap snap to the
     nearer end of the arc. */
  const delta = (((angleDeg - arcStartDeg) % 360) + 360) % 360;
  if (delta <= HALO_ARC_SPAN_DEG) {
    /* The arc's far end is the same red as its start — emit the canonical 0
       so consumers see one red and `aria-valuenow` stays within 0..359. */
    return wrapHue((delta / HALO_ARC_SPAN_DEG) * 360);
  }
  /* Pointers in the gap snap to the nearer arc end; both ends are red, so
     either way the canonical hue is 0. */
  return 0;
};

export const getHaloPadHandlePosition = (saturation: number, lightness: number): HaloPoint => {
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
): HaloPoint => {
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
): Pick<HslColor, "l" | "s"> => {
  const localX = clientX - padRect.left - HALO_PAD_RADIUS;
  const localY = clientY - padRect.top - HALO_PAD_RADIUS;
  const clamped = clampPointToCircle(localX, localY, HALO_PAD_RADIUS);
  const xRatio = (clamped.x + HALO_PAD_RADIUS) / HALO_PAD_SIZE;
  const yRatio = (clamped.y + HALO_PAD_RADIUS) / HALO_PAD_SIZE;

  return {
    l: clamp((1 - yRatio) * 100, 3, 97),
    s: clamp(xRatio * 100, 0, 100),
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

/** One stop of the hue arc's gradient, offset as a 0..1 fraction of its vector. */
export interface HaloHueGradientStop {
  color: string;
  hue: number;
  offset: number;
}

/** A user-space linear gradient that paints the hue arc with the hue each point emits. */
export interface HaloHueGradient {
  stops: HaloHueGradientStop[];
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/* Stops sit 10° of hue apart, so every pair falls inside one 60° sector of the
   HSL hexagon. Interpolating two fully saturated colours in the same sector
   moves one sRGB channel linearly, which is exactly the hue in between; a pair
   straddling a sector boundary would dull through a darker mid-colour. */
const HALO_HUE_GRADIENT_STEP = 10;

/**
 * The hue arc's gradient, run from the arc's start to its end. Each stop is
 * a true HSL hue placed where that hue's angle projects onto the chord, so the
 * colour under the handle is the colour the picker emits. The arc spans less
 * than 180°, so the projection is monotonic and every offset is in order.
 */
export const getHaloHueGradient = (placement: HaloPlacement = "bottom"): HaloHueGradient => {
  const { arcStartDeg, centerX, centerY } = getHaloGeometry(placement);
  const pointAt = (hue: number): HaloPoint => {
    const angleRad = ((arcStartDeg + (hue / 360) * HALO_ARC_SPAN_DEG) * Math.PI) / 180;
    return {
      x: centerX + HALO_ARC_RADIUS * Math.cos(angleRad),
      y: centerY + HALO_ARC_RADIUS * Math.sin(angleRad),
    };
  };
  const start = pointAt(0);
  const end = pointAt(360);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  const stops = Array.from({ length: 360 / HALO_HUE_GRADIENT_STEP + 1 }, (_, index) => {
    const hue = index * HALO_HUE_GRADIENT_STEP;
    const point = pointAt(hue);
    const offset = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
    return {
      color: `hsl(${hue % 360} 100% 50%)`,
      /* Rounded so the server and the browser print the same attribute: their
         trig results can differ in the last bit and break hydration. */
      hue,
      offset: Math.round(offset * 10_000) / 10_000,
    };
  });
  return { stops, x1: start.x, x2: end.x, y1: start.y, y2: end.y };
};
