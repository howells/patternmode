"use client";

import { deriveDistribution, isLightColor, joinClassNames } from "@patternmode/system";
import { useMemo } from "react";

import { packSquarified } from "./parquet-packing";
import type { ParquetProps, ParquetTile, ParquetTileMeta } from "./parquet-types";

/** Internal layout width; tiles are converted to percentages so the mosaic is responsive. */
const LAYOUT_WIDTH = 1000;
const DEFAULT_ASPECT = 4 / 3;
const DEFAULT_GAP = 10;

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
    const values = colors.map((tile) => tile.value);
    const rects = packSquarified(values, { gap, height: layoutHeight, width: LAYOUT_WIDTH });
    const { percentages } = deriveDistribution(values);

    return rects
      .map((rect): Slot | null => {
        const tile = colors[rect.index];
        if (tile === undefined) {
          return null;
        }
        return {
          area: rect.w * rect.h,
          color: tile.color,
          height: (rect.h / layoutHeight) * 100,
          id: tile.id ?? `index-${rect.index}`,
          isLight: isLightColor(tile.color),
          left: (rect.x / LAYOUT_WIDTH) * 100,
          percent: percentages[rect.index] ?? 0,
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
          height: slot.height,
          isLight: slot.isLight,
          percent: slot.percent,
          slot: index,
          width: slot.width,
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
