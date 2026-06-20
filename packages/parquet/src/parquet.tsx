"use client";

import { hexLightness } from "@instruments/colorscope/math";
import { joinClassNames } from "@patternmode/system";
import { useMemo } from "react";

import { packSquarified } from "./parquet-packing";
import type { ParquetProps, ParquetTile, ParquetTileMeta } from "./parquet-types";

/** Internal layout width; tiles are converted to percentages so the mosaic is responsive. */
const LAYOUT_WIDTH = 1000;
const DEFAULT_ASPECT = 4 / 3;
const DEFAULT_GAP = 10;
/** Perceptual (OKLab) lightness above which a tile reads as "light". */
const LIGHT_LIGHTNESS_THRESHOLD = 0.62;

interface Slot {
  area: number;
  color: string;
  height: number;
  id: string;
  isLight: boolean;
  left: number;
  percent: number;
  tile: ParquetTile;
  top: number;
  width: number;
}

const sanitizeWeight = (value: number): number => (Number.isFinite(value) && value > 0 ? value : 0);

/**
 * A proportional color mosaic. Each tile's area encodes its weight; the largest
 * weight always occupies slot 0, so changing `colors` morphs the biggest tile to
 * the new biggest tile rather than teleporting.
 *
 * The morph is a CSS transition on the tiles' percentage geometry — reliable
 * across percentage layout values where a JS animation library is not.
 */
export const Parquet = ({
  colors,
  aspectRatio = DEFAULT_ASPECT,
  className,
  disableMotion = false,
  gap = DEFAULT_GAP,
  renderTile,
  showLabels = false,
  slotCount,
}: ParquetProps) => {
  const slots = useMemo<Slot[]>(() => {
    const layoutHeight = LAYOUT_WIDTH / aspectRatio;
    const rects = packSquarified(
      colors.map((tile) => tile.value),
      { gap, height: layoutHeight, width: LAYOUT_WIDTH },
    );
    const total = colors.reduce((sum, tile) => sum + sanitizeWeight(tile.value), 0);

    return rects
      .map((rect): Slot | null => {
        const tile = colors[rect.index];
        if (tile === undefined) {
          return null;
        }
        const lightness = hexLightness(tile.color);
        return {
          area: rect.w * rect.h,
          color: tile.color,
          height: (rect.h / layoutHeight) * 100,
          id: tile.id ?? `index-${rect.index}`,
          isLight: Number.isFinite(lightness) && lightness > LIGHT_LIGHTNESS_THRESHOLD,
          left: (rect.x / LAYOUT_WIDTH) * 100,
          percent: total > 0 ? (sanitizeWeight(tile.value) / total) * 100 : 0,
          tile,
          top: (rect.y / layoutHeight) * 100,
          width: (rect.w / LAYOUT_WIDTH) * 100,
        };
      })
      .filter((slot): slot is Slot => slot !== null)
      .toSorted((a, b) => b.area - a.area);
  }, [colors, aspectRatio, gap]);

  const count = slotCount ?? slots.length;

  return (
    <div
      className={joinClassNames("patternmode-parquet", className)}
      data-static={disableMotion ? "" : undefined}
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      {Array.from({ length: count }, (_, index) => {
        const slot = slots[index];
        const key = `slot-${index}`;

        if (!slot) {
          return (
            <div
              aria-hidden="true"
              className="patternmode-parquet__tile"
              key={key}
              style={{ opacity: 0 }}
            />
          );
        }

        const meta: ParquetTileMeta = {
          isLight: slot.isLight,
          percent: slot.percent,
          slot: index,
        };

        let content = null;
        if (renderTile) {
          content = renderTile(slot.tile, meta);
        } else if (showLabels) {
          content = (
            <div className="patternmode-parquet__label">
              {slot.tile.label === undefined ? null : (
                <span className="patternmode-parquet__label-name">{slot.tile.label}</span>
              )}
              <span className="patternmode-parquet__label-percent">
                {Math.round(slot.percent)}%
              </span>
            </div>
          );
        }

        return (
          <div
            className="patternmode-parquet__tile"
            data-light={slot.isLight ? "" : undefined}
            key={key}
            style={{
              backgroundColor: slot.color,
              height: `${slot.height}%`,
              left: `${slot.left}%`,
              top: `${slot.top}%`,
              width: `${slot.width}%`,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};
