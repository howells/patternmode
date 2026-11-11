"use client";

import { Parquet } from "@patternmode/parquet";
import { useState } from "react";

import { PALETTE } from "./parquet-palette";
import "./parquet-demo.css";

const WEIGHTS = PALETTE.map((tile) => tile.value).toSorted((a, b) => b - a);

/** The palette with `lead` given the largest weight and the rest keeping their order. */
const weighted = (lead: number) => {
  const order = [lead];
  for (const index of PALETTE.keys()) {
    if (index !== lead) {
      order.push(index);
    }
  }
  return PALETTE.map((tile, index) => ({ ...tile, value: WEIGHTS[order.indexOf(index)] ?? 0 }));
};

export const ParquetDemo = () => {
  const [lead, setLead] = useState(0);
  const colors = weighted(lead);

  return (
    <div className="parquet-demo">
      <div className="parquet-demo-mosaic">
        <Parquet
          aspectRatio={4 / 3}
          colors={colors}
          renderTile={(tile, meta) => (
            <span className="parquet-demo-label" data-light={meta.isLight ? "" : undefined}>
              <span className="parquet-demo-name">{tile.label}</span>
              <span className="parquet-demo-percent">{Math.round(meta.percent)}%</span>
            </span>
          )}
        />
      </div>

      <div className="parquet-demo-legend">
        <div aria-hidden="true" className="parquet-demo-bar">
          {colors.map((tile) => (
            <span
              className="parquet-demo-bar-segment"
              key={tile.color}
              style={{ backgroundColor: tile.color, flexGrow: tile.value }}
            />
          ))}
        </div>
        <ul className="parquet-demo-rows">
          {colors.map((tile, index) => (
            <li key={tile.color}>
              <button
                aria-pressed={index === lead}
                className="parquet-demo-row"
                onClick={() => {
                  setLead(index);
                }}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="parquet-demo-dot"
                  style={{ backgroundColor: tile.color }}
                />
                <span className="parquet-demo-row-name">{tile.label}</span>
                <span className="parquet-demo-row-percent">{Math.round(tile.value * 100)}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
