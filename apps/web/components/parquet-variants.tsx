"use client";

import { Parquet } from "@patternmode/parquet";
import type { ParquetProps } from "@patternmode/parquet";

import { PALETTE } from "./parquet-palette";
import { VariantCell, VariantsBlock } from "./variant-cells";
import "./parquet-demo.css";

const FOREST_AND_BLUSH = [PALETTE[1], PALETTE[3]].filter((tile) => tile !== undefined);

const Specimen = ({ width = 144, ...props }: Partial<ParquetProps> & { width?: number }) => (
  <div style={{ width }}>
    <Parquet colors={PALETTE} {...props} />
  </div>
);

export const ParquetVariants = () => (
  <VariantsBlock
    id="parquet-variants-title"
    lead="Read-only and controlled. Pass a new colors array to morph to a new palette."
  >
    <VariantCell code="default" name="No labels">
      <Specimen className="parquet-specimen" />
    </VariantCell>
    <VariantCell code="showLabels" name="Label and share on hover">
      <Specimen className="parquet-specimen" showLabels />
    </VariantCell>
    <VariantCell code="aspectRatio={2}" name="Wider frame">
      <Specimen aspectRatio={2} className="parquet-specimen" width={180} />
    </VariantCell>
    <VariantCell code="gap={4}" name="Tighter gap">
      <Specimen className="parquet-specimen parquet-specimen--tight" gap={4} />
    </VariantCell>
    <VariantCell code="slotCount={4}" name="Fewer colours, stable slots">
      <Specimen className="parquet-specimen" colors={FOREST_AND_BLUSH} slotCount={4} />
    </VariantCell>
    <VariantCell code="renderTile(tile, meta)" name="Your own tile content">
      <Specimen
        className="parquet-specimen"
        renderTile={(tile, meta) =>
          meta.slot < 2 ? (
            <span className="parquet-specimen-hex" data-light={meta.isLight ? "" : undefined}>
              {tile.color.toUpperCase()}
            </span>
          ) : null
        }
      />
    </VariantCell>
  </VariantsBlock>
);
