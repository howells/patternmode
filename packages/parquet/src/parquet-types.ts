import type { WeightedColorSegment } from "@patternmode/system";
import type { ReactNode } from "react";

/**
 * One weighted color rendered as a Parquet tile. Extends the shared
 * {@link WeightedColorSegment} so the same data can drive a Swatch
 * `DistributionBar` and a `Parquet`.
 */
export interface ParquetTile extends WeightedColorSegment {
  /** Optional stable identity, used for the React key when present. */
  id?: string;
}

/** Context passed to a {@link ParquetProps.renderTile} override. */
export interface ParquetTileMeta {
  /** True when the tile color reads as light, so a dark foreground is legible. */
  isLight: boolean;
  /** The tile's share of the distribution total, 0–100. */
  percent: number;
  /** Zero-based slot index; the largest weight always occupies slot 0. */
  slot: number;
}

export interface ParquetProps {
  /**
   * Weighted colors to pack. The mosaic re-tiles and morphs whenever this
   * changes; pass a new array to animate to a different palette.
   */
  colors: ParquetTile[];
  /** Aspect ratio (width ÷ height) of the mosaic. Default `4 / 3`. */
  aspectRatio?: number;
  /** Optional className merged onto the mosaic container. */
  className?: string;
  /** Disables enter and morph animation. `prefers-reduced-motion` also disables it. */
  disableMotion?: boolean;
  /** Gap between tiles, in the mosaic's internal layout units (≈ percent of width). Default `10`. */
  gap?: number;
  /**
   * Replaces the built-in label with custom content rendered inside each tile.
   * Receives the tile and its derived {@link ParquetTileMeta}.
   */
  renderTile?: (tile: ParquetTile, meta: ParquetTileMeta) => ReactNode;
  /** Shows the built-in label (color name + percentage) on hover. */
  showLabels?: boolean;
  /**
   * Fixed number of tile slots. Render a stable count so morphs between palettes
   * of different lengths stay smooth (extra slots collapse to nothing). Defaults
   * to the number of positive-weight colors.
   */
  slotCount?: number;
}
