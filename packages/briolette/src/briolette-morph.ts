"use client";

import { useEffect, useState } from "react";

import { buildBriolettePalette } from "./briolette-colors";
import {
  BRIOLETTE_DENSITIES,
  buildBrioletteFaces,
  mapBrioletteParents,
  morphBrioletteFaces,
} from "./briolette-geometry";
import type { BrioletteDensity, BrioletteFace, BrioletteVec3 } from "./briolette-geometry";

const FACE_CACHE = new Map<number, BrioletteFace[]>();

/** Cached facet set for a density token. */
export const facesForDensity = (density: BrioletteDensity): BrioletteFace[] => {
  const frequency = BRIOLETTE_DENSITIES[density];
  let faces = FACE_CACHE.get(frequency);
  if (!faces) {
    faces = buildBrioletteFaces(frequency);
    FACE_CACHE.set(frequency, faces);
  }
  return faces;
};

const PARENT_CACHE = new Map<string, BrioletteVec3[]>();

/** Parent centroid for every facet of the finer cut, against the coarser cut. */
const parentCentersFor = (
  fineDensity: BrioletteDensity,
  coarseDensity: BrioletteDensity,
): BrioletteVec3[] => {
  const key = `${fineDensity}->${coarseDensity}`;
  let centers = PARENT_CACHE.get(key);
  if (!centers) {
    const fineFaces = facesForDensity(fineDensity);
    const coarseFaces = facesForDensity(coarseDensity);
    const parents = mapBrioletteParents(fineFaces, coarseFaces);
    centers = parents.map(
      (parentIndex, i) =>
        coarseFaces[parentIndex]?.center ?? fineFaces[i]?.center ?? { x: 0, y: 0, z: 1 },
    );
    PARENT_CACHE.set(key, centers);
  }
  return centers;
};

const MORPH_MS = 480;
const MORPH_MAX_FRAME_MS = 64;

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

interface BrioletteMorphState {
  from: BrioletteDensity;
  progress: number;
}

/** The two sphere layers rendered while a cut morph is in flight. */
export interface BrioletteMorphLayers {
  over: { cull: number; faces: BrioletteFace[]; palette: string[] };
  under: { faces: BrioletteFace[]; palette: string[] };
}

/**
 * Animate density changes: the finer cut grows out of (or collapses back
 * into) the coarser one, every vertex interpolated on the sphere. Returns
 * `null` layers when no morph is in flight. Honors reduced motion by
 * swapping instantly.
 */
export const useBrioletteMorph = (
  density: BrioletteDensity,
  targetPalette: string[],
  isReducedMotion: boolean,
): BrioletteMorphLayers | null => {
  const [morph, setMorph] = useState<BrioletteMorphState | null>(null);
  const [prevDensity, setPrevDensity] = useState(density);

  // Adjusted during render so the first frame of the new cut already morphs.
  if (prevDensity !== density) {
    setPrevDensity(density);
    setMorph(isReducedMotion ? null : { from: prevDensity, progress: 0 });
  }

  const isMorphing = morph !== null;
  useEffect(() => {
    if (!isMorphing || typeof requestAnimationFrame !== "function") {
      return () => {
        // No morph in flight.
      };
    }
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, MORPH_MAX_FRAME_MS);
      last = now;
      setMorph((current) => {
        if (!current) {
          return current;
        }
        const progress = current.progress + elapsed / MORPH_MS;
        return progress >= 1 ? null : { from: current.from, progress };
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isMorphing]);

  if (!morph) {
    return null;
  }

  const faces = facesForDensity(density);
  const fromFaces = facesForDensity(morph.from);
  const growingIn = faces.length >= fromFaces.length;
  const finerDensity = growingIn ? density : morph.from;
  const coarserDensity = growingIn ? morph.from : density;
  const finerFaces = growingIn ? faces : fromFaces;
  const coarserFaces = growingIn ? fromFaces : faces;
  const eased = easeOutCubic(Math.min(morph.progress, 1));
  const growth = growingIn ? eased : 1 - eased;

  return {
    over: {
      // The growing overlay sits on the unit sphere while the coarser cut
      // beneath chords inside it, so rim facets would poke past the coarse
      // silhouette as floating slivers. Cull the overlay's rim harder while
      // small, easing back to the standard cull as the cut completes.
      cull: 0.3 - 0.42 * growth,
      faces: morphBrioletteFaces(
        finerFaces,
        parentCentersFor(finerDensity, coarserDensity),
        growth,
      ),
      palette: growingIn ? targetPalette : buildBriolettePalette(finerFaces, null),
    },
    under: {
      faces: coarserFaces,
      palette: growingIn ? buildBriolettePalette(coarserFaces, null) : targetPalette,
    },
  };
};
