import { oklabToHex, oklchToOklab } from "@instruments/colorscope/convert";
import { fitOklabToSrgbGamut } from "@instruments/colorscope/embedding";
import { hexToOklab, oklabDistance } from "@instruments/colorscope/math";

import type { BrioletteFace, BrioletteVec3 } from "./briolette-geometry";
import { normalizeBrioletteVec, quatFromAxisAngle, rotateBrioletteVec } from "./briolette-geometry";

/**
 * The active refinement view. `null` means the sphere shows the full
 * color universe.
 */
export interface BrioletteView {
  /** Facet that anchors the neighborhood — it keeps `anchorHex` exactly. */
  anchorFaceIndex: number;
  /** The selected color at the center of the neighborhood. */
  anchorHex: string;
  /** Refinement depth — each level tightens the neighborhood. */
  depth: number;
}

/**
 * Spread of the depth-1 neighborhood: a dimensionless knob scaling how far
 * rim facets travel from the anchor in hue turn, lightness headroom, and
 * chroma swing. (The realized OKLab ΔE varies with the anchor's chroma and
 * lightness — this is the dial, not a literal ΔE radius.)
 */
export const BRIOLETTE_NEIGHBORHOOD_DELTA = 0.5;

/**
 * Floor on the neighborhood radius. Refinement tightens the spread but never
 * below this, so the sphere always offers perceptibly distinct choices instead
 * of collapsing to a single flat color.
 */
export const BRIOLETTE_MIN_DELTA = 0.11;

/**
 * Tailoff exponent applied to the geodesic angle from the anchor. Below 1 the
 * ramp is concave — color diverges quickly even for facets near the anchor, so
 * variety spreads evenly across the visible face rather than bunching the
 * centre into one shade.
 */
export const BRIOLETTE_TAILOFF_EXPONENT = 0.72;

/** Each refinement depth multiplies the neighborhood delta by this factor. */
export const BRIOLETTE_DEPTH_FALLOFF = 0.62;

/** Deepest refinement level — beyond this, facets become indistinguishable. */
export const BRIOLETTE_MAX_DEPTH = 6;

/**
 * Geodesic angle (radians) beyond which a facet click *travels* — opening a
 * fresh depth-1 neighborhood around the clicked color — instead of refining
 * deeper. Without this, every click tightens the spread, so exploring away
 * from an anchor is indistinguishable from zooming into it and the sphere
 * traps you in one corner of color space.
 */
export const BRIOLETTE_TRAVEL_ANGLE = 1;

/**
 * Depth for the next selection: near clicks refine (one level deeper, capped
 * at `maxDepth`), far clicks travel (back to depth 1). `currentDepth` is null
 * when nothing is selected yet.
 */
export const nextBrioletteDepth = (
  currentDepth: number | null,
  angleFromAnchor: number,
  maxDepth: number = BRIOLETTE_MAX_DEPTH,
): number => {
  if (currentDepth === null || angleFromAnchor >= BRIOLETTE_TRAVEL_ANGLE) {
    return 1;
  }
  const cap = Math.max(1, Math.min(maxDepth, BRIOLETTE_MAX_DEPTH));
  return Math.min(currentDepth + 1, cap);
};

const MIN_LIGHTNESS = 0.34;
const MAX_LIGHTNESS = 0.82;
const MIN_CHROMA = 0.03;
const CHROMA_RANGE = 0.14;
const RAD_TO_DEG = 180 / Math.PI;
const HALF_PI = Math.PI / 2;

// How the neighborhood spread splits across hue, lightness, and chroma. Hue
// rotation dominates so neighbors read as a related family rather than a fade.
const HUE_WEIGHT = 1;
const CHROMA_WEIGHT = 0.5;
// Rim facets can travel up to a semicircle of hue.
const MAX_HUE_TURN = Math.PI;

// Lightness travels into the headroom available on its side of the anchor
// (gain × spread × headroom), so near-white and near-black anchors compress
// smoothly instead of slamming into a clamp and flattening to one color.
const NEIGHBOR_MIN_LIGHTNESS = 0.05;
const NEIGHBOR_MAX_LIGHTNESS = 0.97;
const MID_LIGHTNESS = (NEIGHBOR_MIN_LIGHTNESS + NEIGHBOR_MAX_LIGHTNESS) / 2;
const LIGHTNESS_GAIN = 1.35;

// Anchors below this chroma can't express hue by rotating their chroma vector
// (it is ~zero), so they bloom instead: an additive chroma swing whose hue
// comes from the facet's bearing — a wheel of tints around a grey. The bloom
// carries the parity alternation too, since the multiplicative chroma swing
// is inert on a near-zero vector.
const NEUTRAL_CHROMA_REF = 0.08;
const CHROMA_BLOOM = 0.18;
const BLOOM_SIGN_WEIGHT = 0.3;

const POLE: BrioletteVec3 = { x: 0, y: 1, z: 0 };
const POLE_FALLBACK: BrioletteVec3 = { x: 1, y: 0, z: 0 };
const FALLBACK_ANCHOR = { L: 0.6, a: 0, b: 0 };

const cross = (a: BrioletteVec3, b: BrioletteVec3): BrioletteVec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

const dot = (a: BrioletteVec3, b: BrioletteVec3): number => a.x * b.x + a.y * b.y + a.z * b.z;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Map a facet direction to the color universe: hue wraps the sphere's
 * equator, lightness runs pole to pole, chroma peaks at the equator so
 * the poles stay near-neutral.
 */
export const brioletteUniverseColor = (direction: BrioletteVec3): string => {
  const pole = direction.y;
  const equator = Math.sqrt(Math.max(0, 1 - pole * pole));
  let hue = Math.atan2(direction.z, direction.x) * RAD_TO_DEG;
  if (hue < 0) {
    hue += 360;
  }

  return oklabToHex(
    oklchToOklab({
      C: MIN_CHROMA + CHROMA_RANGE * equator,
      L: MIN_LIGHTNESS + ((pole + 1) / 2) * (MAX_LIGHTNESS - MIN_LIGHTNESS),
      h: hue,
    }),
  );
};

/**
 * Neighborhood delta for a refinement depth — tightens with each level but
 * never below {@link BRIOLETTE_MIN_DELTA}, so deep refinement keeps offering
 * distinct choices instead of flattening to one color.
 */
export const brioletteNeighborhoodDelta = (depth: number): number =>
  Math.max(
    BRIOLETTE_MIN_DELTA,
    BRIOLETTE_NEIGHBORHOOD_DELTA * BRIOLETTE_DEPTH_FALLOFF ** (Math.max(1, depth) - 1),
  );

interface OklabPoint {
  L: number;
  a: number;
  b: number;
}

const rotateChroma = (anchor: OklabPoint, angle: number): { a: number; b: number } => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { a: anchor.a * cos - anchor.b * sin, b: anchor.a * sin + anchor.b * cos };
};

/**
 * Map a facet direction to a similar-but-distinct neighbor of the anchor,
 * built directly in OKLab (via colorscope) so spacing is perceptually even.
 *
 * The facet's geodesic angle from the anchor drives the tailoff: color
 * diverges quickly even near the anchor, so variety spreads evenly across the
 * visible face. The tangent bearing decides *how* a facet differs — azimuth
 * rotates hue, the pole component shifts lightness into whatever headroom the
 * anchor has, and distance swings chroma. Near-neutral anchors bloom into a
 * wheel of tints, and the far hemisphere glides toward the anchor's
 * complement so the antipode is a calm landmark rather than noise. Results
 * are gamut-clamped to sRGB.
 */
export const brioletteNeighborColor = (
  direction: BrioletteVec3,
  anchorDirection: BrioletteVec3,
  anchorHex: string,
  delta: number,
  chromaSign: number,
): string => {
  const anchor = hexToOklab(anchorHex) ?? FALLBACK_ANCHOR;
  const reference = Math.abs(anchorDirection.y) > 0.98 ? POLE_FALLBACK : POLE;
  const hueAxis = normalizeBrioletteVec(cross(reference, anchorDirection));
  const lightnessAxis = normalizeBrioletteVec(cross(anchorDirection, hueAxis));

  // Geodesic angle 0..π from the anchor, normalized over the front hemisphere.
  const cosAngle = clamp(dot(direction, anchorDirection), -1, 1);
  const angle = Math.acos(cosAngle);
  const reach = (Math.min(angle, HALF_PI) / HALF_PI) ** BRIOLETTE_TAILOFF_EXPONENT;
  const spread = delta * reach;

  // Tangent bearing: which way this facet leans relative to the anchor.
  const tangent = {
    x: direction.x - anchorDirection.x * cosAngle,
    y: direction.y - anchorDirection.y * cosAngle,
    z: direction.z - anchorDirection.z * cosAngle,
  };
  const tangentLength = Math.hypot(tangent.x, tangent.y, tangent.z) || 1;
  const bearingHue = dot(tangent, hueAxis) / tangentLength;
  const bearingLightness = dot(tangent, lightnessAxis) / tangentLength;

  const hueTurn = clamp(bearingHue * spread * HUE_WEIGHT * Math.PI, -MAX_HUE_TURN, MAX_HUE_TURN);
  const rotated = rotateChroma(anchor, hueTurn);
  const chromaScale = 1 + chromaSign * spread * CHROMA_WEIGHT;

  const anchorChroma = Math.hypot(anchor.a, anchor.b);
  const neutralBlend = Math.max(0, 1 - anchorChroma / NEUTRAL_CHROMA_REF);
  const bloom = neutralBlend * CHROMA_BLOOM * spread * (1 + chromaSign * BLOOM_SIGN_WEIGHT);
  const bloomAngle = Math.atan2(bearingLightness, bearingHue);

  const headroom =
    bearingLightness >= 0
      ? Math.max(0, NEIGHBOR_MAX_LIGHTNESS - anchor.L)
      : Math.max(0, anchor.L - NEIGHBOR_MIN_LIGHTNESS);

  const bearingColor = {
    L: clamp(
      anchor.L + bearingLightness * spread * LIGHTNESS_GAIN * headroom,
      NEIGHBOR_MIN_LIGHTNESS,
      NEIGHBOR_MAX_LIGHTNESS,
    ),
    a: rotated.a * chromaScale + Math.cos(bloomAngle) * bloom,
    b: rotated.b * chromaScale + Math.sin(bloomAngle) * bloom,
  };

  // Past the 90° ring the tangent bearing degenerates, so glide toward a
  // stable landmark: the anchor's far-side complement, pulled toward mid
  // lightness. The exact antipode is the most different color on the sphere.
  const past = clamp((angle - HALF_PI) / HALF_PI, 0, 1);
  if (past === 0) {
    return oklabToHex(fitOklabToSrgbGamut(bearingColor));
  }
  const blend = past * past * (3 - 2 * past);
  const farTurn = Math.min(2 * delta * HUE_WEIGHT * Math.PI, Math.PI);
  const farRotated = rotateChroma(anchor, farTurn);
  const farBloom = neutralBlend * CHROMA_BLOOM * delta;
  const farColor = {
    L: anchor.L + (MID_LIGHTNESS - anchor.L) * Math.min(1, 2 * delta),
    a: farRotated.a + Math.cos(farTurn) * farBloom,
    b: farRotated.b + Math.sin(farTurn) * farBloom,
  };

  return oklabToHex(
    fitOklabToSrgbGamut({
      L: bearingColor.L + (farColor.L - bearingColor.L) * blend,
      a: bearingColor.a + (farColor.a - bearingColor.a) * blend,
      b: bearingColor.b + (farColor.b - bearingColor.b) * blend,
    }),
  );
};

const COLLISION_ESCAPE_ATTEMPTS = 6;
const COLLISION_ESCAPE_TURN = 0.12;

/**
 * Compute the hex color of every facet for the current view — the full
 * universe when `view` is `null`, otherwise the neighborhood around the
 * anchored selection.
 *
 * Every facet is guaranteed a distinct hex: in tight gamut corners (near
 * white or black) the chroma fit can land two facets on the same gamut-wall
 * color, so collisions deterministically retry with the facet's bearing
 * rotated a few degrees around the anchor — same distance, different hue,
 * different wall point.
 */
export const buildBriolettePalette = (
  faces: readonly BrioletteFace[],
  view: BrioletteView | null,
): string[] => {
  if (!view) {
    return faces.map((face) => brioletteUniverseColor(face.center));
  }

  const anchorDirection = faces[view.anchorFaceIndex]?.center ?? { x: 0, y: 0, z: 1 };
  const delta = brioletteNeighborhoodDelta(view.depth);
  const used = new Set<string>([view.anchorHex]);

  return faces.map((face) => {
    if (face.index === view.anchorFaceIndex) {
      return view.anchorHex;
    }

    const chromaSign = face.index % 2 === 0 ? 1 : -1;
    let hex = brioletteNeighborColor(
      face.center,
      anchorDirection,
      view.anchorHex,
      delta,
      chromaSign,
    );
    for (let attempt = 1; used.has(hex) && attempt <= COLLISION_ESCAPE_ATTEMPTS; attempt += 1) {
      const nudged = rotateBrioletteVec(
        quatFromAxisAngle(anchorDirection, COLLISION_ESCAPE_TURN * attempt),
        face.center,
      );
      hex = brioletteNeighborColor(nudged, anchorDirection, view.anchorHex, delta, chromaSign);
    }
    used.add(hex);
    return hex;
  });
};

/**
 * Perceptual OKLab distance between two hex colors, re-exported from
 * colorscope for callers that want to measure neighborhood spread.
 */
export const brioletteColorDistance = (a: string, b: string): number => {
  const left = hexToOklab(a);
  const right = hexToOklab(b);
  if (!left || !right) {
    return 0;
  }
  return oklabDistance(left, right);
};

/**
 * The facet whose at-rest universe color is perceptually closest to `hex` —
 * where an externally supplied value anchors its neighborhood.
 */
export const nearestBrioletteFace = (
  faces: readonly BrioletteFace[],
  hex: string,
): BrioletteFace | undefined => {
  let best: BrioletteFace | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const face of faces) {
    const distance = brioletteColorDistance(hex, brioletteUniverseColor(face.center));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = face;
    }
  }
  return best;
};
