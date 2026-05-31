"use client";

import {
  DistributionBar,
  type DistributionBarSegment,
  DistributionDisplay,
  Swatch,
} from "@patternmode/swatch";
import type { SVGProps } from "react";
import { useState } from "react";

/* ── Palettes ──────────────────────────────────── */

const finishes = [
  { color: "#315c4b", name: "Evergreen" },
  { color: "#e1ebe5", name: "Sage" },
  { color: "#9b3d32", name: "Oxblood" },
  { color: "#d9a441", name: "Saffron" },
  { color: "#1d1d1b", name: "Ink" },
  { color: "#c4b7a3", name: "Dune" },
] as const;

const palettes = [
  {
    name: "Terrace",
    type: "segmented" as const,
    colors: [
      { color: "#c4b7a3", ratio: 45 },
      { color: "#9b3d32", ratio: 30 },
      { color: "#e8dfd3", ratio: 25 },
    ],
  },
  {
    name: "Dusk",
    type: "gradient" as const,
    background: "linear-gradient(135deg, #1d1d1b, #315c4b 52%, #3d6b6e)",
  },
  {
    name: "Archive",
    type: "segmented" as const,
    colors: [
      { color: "#1d1d1b", ratio: 50 },
      { color: "#f5f0e8", ratio: 30 },
      { color: "#6b4c3b", ratio: 20 },
    ],
  },
] as const;

const gradients = [
  {
    name: "Patina",
    background: "linear-gradient(135deg, #3d6b6e, #c4b7a3)",
  },
  {
    name: "Copper",
    background: "linear-gradient(135deg, #6b4c3b, #d9a441)",
  },
  {
    name: "Stone",
    background: "linear-gradient(135deg, #c4b7a3, #e8dfd3)",
  },
  {
    name: "Ember",
    background: "linear-gradient(135deg, #9b3d32, #d9a441)",
  },
  {
    name: "Moss",
    background: "linear-gradient(135deg, #1d1d1b, #315c4b)",
  },
  {
    name: "Dune",
    background: "linear-gradient(135deg, #e1ebe5, #c4b7a3)",
  },
] as const;

const startingDistribution: DistributionBarSegment[] = [
  { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
  { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
  { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
];

const assignedDistribution: DistributionBarSegment[] = [
  { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 38 },
  { id: "saffron", color: "#d9a441", label: "Saffron", value: 24 },
  { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 17 },
];

type FinishColor = (typeof finishes)[number]["color"];
type PaletteName = (typeof palettes)[number]["name"];

/* ── Icons ─────────────────────────────────────── */

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Selected</title>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* ── Demo ──────────────────────────────────────── */

export function SwatchDemo() {
  const [selected, setSelected] = useState<FinishColor>(finishes[0].color);
  const [selectedPalette, setSelectedPalette] = useState<PaletteName>(
    palettes[0].name,
  );
  const [distribution, setDistribution] =
    useState<DistributionBarSegment[]>(startingDistribution);

  return (
    <div className="swatch-demo">
      {/* ① Finish selector */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">Finishes</div>
        <fieldset aria-label="Select a finish" className="swatch-demo-swatches">
          <legend className="sr-only">Select a finish</legend>
          {finishes.map((finish) => (
            <button
              aria-label={`Select ${finish.name}`}
              aria-pressed={selected === finish.color}
              className="swatch-demo-button"
              key={finish.color}
              onClick={() => setSelected(finish.color)}
              type="button"
            >
              <Swatch
                aria-hidden="true"
                color={finish.color}
                icon={CheckIcon}
                selected={selected === finish.color}
                size="xl"
              />
            </button>
          ))}
        </fieldset>
      </div>

      {/* ② Curated palettes */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">Palettes</div>
        <div className="swatch-demo-palette-grid">
          {palettes.map((palette) => (
            <button
              aria-label={`Select ${palette.name} palette`}
              aria-pressed={selectedPalette === palette.name}
              className="swatch-demo-palette-item"
              key={palette.name}
              onClick={() => setSelectedPalette(palette.name)}
              type="button"
            >
              <Swatch
                aria-hidden="true"
                {...(palette.type === "gradient"
                  ? { background: palette.background }
                  : { colors: [...palette.colors] })}
                selected={selectedPalette === palette.name}
                shape="pill"
                showRing={selectedPalette === palette.name}
                size="xl"
              />
              <span>{palette.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ③ Gradient squares */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">Gradients</div>
        <div className="swatch-demo-swatches">
          {gradients.map((gradient) => (
            <div className="swatch-demo-specimen" key={gradient.name}>
              <Swatch
                aria-label={gradient.name}
                background={gradient.background}
                shape="square"
                size="xl"
              />
              <span>{gradient.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ④ States */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">States</div>
        <div className="swatch-demo-swatches">
          <div className="swatch-demo-specimen">
            <Swatch
              aria-label="Selected"
              color="#315c4b"
              icon={CheckIcon}
              selected
              size="xl"
            />
            <span>Selected</span>
          </div>
          <div className="swatch-demo-specimen">
            <Swatch aria-label="Default" color="#315c4b" size="xl" />
            <span>Default</span>
          </div>
          <div className="swatch-demo-specimen">
            <Swatch aria-label="Raised" color="#315c4b" raised size="xl" />
            <span>Raised</span>
          </div>
          <div className="swatch-demo-specimen">
            <Swatch
              aria-label="Unavailable"
              color="#315c4b"
              size="xl"
              unavailable
            />
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      {/* ⑤ Distribution */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">Distribution</div>
        <DistributionDisplay
          aria-label="Assigned finish distribution: 79% assigned, 21% unassigned"
          emptyValue={21}
          legend="summary"
          segments={assignedDistribution}
        />
      </div>

      {/* ⑥ Adjustable distribution */}
      <div className="swatch-demo-cell">
        <div className="swatch-demo-label">Adjustable distribution</div>
        <DistributionBar
          aria-label="Adjust finish distribution"
          onChange={setDistribution}
          segments={distribution}
        />
      </div>
    </div>
  );
}
