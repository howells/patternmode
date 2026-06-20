/**
 * Squarified treemap packing.
 *
 * Packs a list of weighted values into a rectangle, choosing rows that keep each
 * tile as close to square as possible (Bruls, Huizing & van Wijk). The geometry
 * is computed in an abstract coordinate space; the renderer converts the result
 * to percentages so a Parquet stays responsive within any aspect ratio.
 */

/** A packed rectangle for one input weight, in abstract coordinate space. */
export interface PackedRect {
  /** Index into the original weights array. */
  index: number;
  /** Rectangle width. */
  h: number;
  /** Rectangle height. */
  w: number;
  /** Left edge. */
  x: number;
  /** Top edge. */
  y: number;
}

/** Dimensions and inter-tile gap for {@link packSquarified}. */
export interface PackOptions {
  gap: number;
  height: number;
  width: number;
}

interface Rect {
  h: number;
  w: number;
  x: number;
  y: number;
}

/** A weighted entry with its original index, threaded through the recursion. */
interface Entry {
  area: number;
  index: number;
}

/** Worst (largest) aspect ratio produced by laying `row` along `sideLength`. */
const worstRatio = (row: Entry[], sideLength: number, rowArea: number): number => {
  const thickness = rowArea / sideLength;
  let worst = 0;
  for (const entry of row) {
    const cellLength = entry.area / thickness;
    const ratio = Math.max(thickness / cellLength, cellLength / thickness);
    if (ratio > worst) {
      worst = ratio;
    }
  }
  return worst;
};

const layoutStrip = (entries: Entry[], rect: Rect, gap: number, out: PackedRect[]): void => {
  if (entries.length === 0) {
    return;
  }

  const half = gap / 2;

  if (entries.length === 1) {
    const [only] = entries;
    if (only !== undefined) {
      out.push({
        h: Math.max(rect.h - gap, 0),
        index: only.index,
        w: Math.max(rect.w - gap, 0),
        x: rect.x + half,
        y: rect.y + half,
      });
    }
    return;
  }

  const shorter = Math.min(rect.w, rect.h);
  const isWide = rect.w >= rect.h;

  let row: Entry[] = [];
  let rowArea = 0;

  for (const entry of entries) {
    const testRow = [...row, entry];
    const testArea = rowArea + entry.area;

    if (
      row.length === 0 ||
      worstRatio(testRow, shorter, testArea) <= worstRatio(row, shorter, rowArea)
    ) {
      row = testRow;
      rowArea = testArea;
    } else {
      break;
    }
  }

  const thickness = rowArea / shorter;
  let offset = 0;

  for (const entry of row) {
    const cellLength = entry.area / thickness;
    if (isWide) {
      out.push({
        h: Math.max(cellLength - gap, 0),
        index: entry.index,
        w: Math.max(thickness - gap, 0),
        x: rect.x + half,
        y: rect.y + offset + half,
      });
    } else {
      out.push({
        h: Math.max(thickness - gap, 0),
        index: entry.index,
        w: Math.max(cellLength - gap, 0),
        x: rect.x + offset + half,
        y: rect.y + half,
      });
    }
    offset += cellLength;
  }

  const remaining: Rect = isWide
    ? { h: rect.h, w: rect.w - thickness, x: rect.x + thickness, y: rect.y }
    : { h: rect.h - thickness, w: rect.w, x: rect.x, y: rect.y + thickness };

  layoutStrip(entries.slice(row.length), remaining, gap, out);
};

/** Treats non-finite or negative weights as 0. */
const sanitizeWeight = (weight: number): number =>
  Number.isFinite(weight) && weight > 0 ? weight : 0;

/**
 * Packs `weights` into a `width` × `height` rectangle, insetting each tile by
 * `gap`. Returns one {@link PackedRect} per positive weight (zero or invalid
 * weights produce no rectangle), in layout order. Indices refer to positions in
 * the original `weights` array.
 */
export const packSquarified = (weights: number[], options: PackOptions): PackedRect[] => {
  const { width, height, gap } = options;

  const entries = weights
    .map((weight, index) => ({ area: sanitizeWeight(weight), index }))
    .filter((entry) => entry.area > 0)
    .toSorted((a, b) => b.area - a.area);

  if (entries.length === 0 || width <= 0 || height <= 0) {
    return [];
  }

  const half = gap / 2;
  const expandedWidth = width + gap;
  const expandedHeight = height + gap;
  const totalWeight = entries.reduce((sum, entry) => sum + entry.area, 0);
  const totalArea = expandedWidth * expandedHeight;

  const out: PackedRect[] = [];
  layoutStrip(
    entries.map((entry) => ({
      area: (entry.area / totalWeight) * totalArea,
      index: entry.index,
    })),
    { h: expandedHeight, w: expandedWidth, x: -half, y: -half },
    gap,
    out,
  );
  return out;
};
