"use client";

import { Parquet } from "@patternmode/parquet";
import type { ParquetTile } from "@patternmode/parquet";
import { useEffect, useState } from "react";

import { OptionBar } from "./option-bar";

interface DemoPalette {
  colors: ParquetTile[];
  name: string;
}

const PALETTES: DemoPalette[] = [
  {
    colors: [
      { color: "#c2703e", label: "Terracotta", value: 38 },
      { color: "#e8b4b8", label: "Blush", value: 24 },
      { color: "#7a4a32", label: "Umber", value: 18 },
      { color: "#dcc4a0", label: "Sand", value: 12 },
      { color: "#3a2a22", label: "Espresso", value: 8 },
    ],
    name: "Terracotta",
  },
  {
    colors: [
      { color: "#2d5a27", label: "Forest", value: 34 },
      { color: "#7fa66a", label: "Moss", value: 26 },
      { color: "#d8d2a8", label: "Wheat", value: 22 },
      { color: "#1b3a2a", label: "Pine", value: 18 },
    ],
    name: "Forest",
  },
  {
    colors: [
      { color: "#1b2a4a", label: "Navy", value: 40 },
      { color: "#3f6f9e", label: "Tide", value: 22 },
      { color: "#a8c4d6", label: "Mist", value: 16 },
      { color: "#c5a03f", label: "Brass", value: 14 },
      { color: "#0d1626", label: "Ink", value: 8 },
    ],
    name: "Tide",
  },
];

const ROTATION_MS = 3600;
const MAX_SLOTS = Math.max(...PALETTES.map((palette) => palette.colors.length));

export const ParquetDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [labels, setLabels] = useState<"on" | "off">("on");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PALETTES.length);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const active = PALETTES[activeIndex] ?? PALETTES[0];
  if (active === undefined) {
    return null;
  }

  return (
    <div className="parquet-demo">
      <div className="parquet-demo-stage">
        <Parquet
          aspectRatio={4 / 3}
          colors={active.colors}
          showLabels={labels === "on"}
          slotCount={MAX_SLOTS}
        />
      </div>

      <div className="parquet-demo-dots" role="tablist" aria-label="Palette">
        {PALETTES.map((palette, index) => (
          <button
            aria-label={palette.name}
            aria-selected={index === activeIndex}
            className="parquet-demo-dot"
            data-active={index === activeIndex ? "" : undefined}
            key={palette.name}
            onClick={() => {
              setActiveIndex(index);
            }}
            role="tab"
            type="button"
          />
        ))}
      </div>

      <div className="parquet-demo-controls">
        <OptionBar
          label="Labels"
          onChange={setLabels}
          options={[
            { label: "on", value: "on" as const },
            { label: "off", value: "off" as const },
          ]}
          value={labels}
        />
      </div>
    </div>
  );
};
