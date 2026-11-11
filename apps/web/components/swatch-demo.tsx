"use client";

import { DistributionBar, DistributionDisplay, Swatch } from "@patternmode/swatch";
import type { DistributionSegment, SwatchDefaultProps } from "@patternmode/swatch";
import { useState } from "react";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./swatch-demo.css";

const evergreen = "#315c4b";
const saffron = "#d9a441";
const oxblood = "#9b3d32";

const startingDistribution: DistributionSegment[] = [
  { color: evergreen, id: "evergreen", label: "Evergreen", value: 48 },
  { color: saffron, id: "saffron", label: "Saffron", value: 30 },
  { color: oxblood, id: "oxblood", label: "Oxblood", value: 22 },
];

const assignedDistribution: DistributionSegment[] = [
  { color: evergreen, id: "evergreen", label: "Evergreen", value: 38 },
  { color: saffron, id: "saffron", label: "Saffron", value: 24 },
  { color: oxblood, id: "oxblood", label: "Oxblood", value: 17 },
];

/* The row of options, picked in turn; the unavailable one cannot be. */
const options: { id: string; name: string; swatch: SwatchDefaultProps }[] = [
  { id: "circle", name: "Evergreen circle", swatch: { color: evergreen } },
  {
    id: "pill",
    name: "Evergreen and sage pill",
    swatch: {
      colors: [
        { color: evergreen, ratio: 60 },
        { color: "#e1ebe5", ratio: 40 },
      ],
      variant: "pill",
    },
  },
  { id: "square", name: "Saffron square", swatch: { color: saffron, variant: "square" } },
  { id: "selected", name: "Oxblood circle", swatch: { color: oxblood } },
  {
    id: "unavailable",
    name: "Unavailable circle",
    swatch: { color: "#c9c3b6", unavailable: true },
  },
  {
    id: "block",
    name: "Palette block",
    swatch: {
      className: "swatch-demo-block",
      colors: [
        { color: evergreen, ratio: 48 },
        { color: saffron, ratio: 30 },
        { color: oxblood, ratio: 22 },
      ],
      variant: "block",
    },
  },
];

const SwatchButton = ({
  onSelect,
  selected,
  option,
}: {
  onSelect: (id: string) => void;
  selected: boolean;
  option: (typeof options)[number];
}) => (
  <button
    aria-label={option.name}
    aria-pressed={selected}
    className="swatch-demo-button"
    disabled={option.swatch.unavailable}
    onClick={() => {
      onSelect(option.id);
    }}
    type="button"
  >
    <Swatch
      aria-hidden="true"
      selected={selected}
      showRing={selected}
      size="2xl"
      {...option.swatch}
    />
  </button>
);

/* Demo: the options you can pick, and the bar that divides a palette. */

export const SwatchDemo = () => {
  const [selected, setSelected] = useState<string>("selected");
  const [distribution, setDistribution] = useState<DistributionSegment[]>(startingDistribution);

  return (
    <div className="swatch-demo">
      <fieldset aria-label="Select a swatch" className="swatch-demo-options">
        {options.map((option) => (
          <SwatchButton
            key={option.id}
            onSelect={setSelected}
            selected={selected === option.id}
            option={option}
          />
        ))}
      </fieldset>
      <DistributionBar
        aria-label="Adjust finish distribution"
        onChange={setDistribution}
        segments={distribution}
      />
    </div>
  );
};

const RemovableSwatch = () => {
  const [removed, setRemoved] = useState(false);

  return removed ? (
    <button
      className="swatch-demo-restore"
      onClick={() => {
        setRemoved(false);
      }}
      type="button"
    >
      Restore
    </button>
  ) : (
    <Swatch
      aria-label="Oxblood"
      color={oxblood}
      onRemove={() => {
        setRemoved(true);
      }}
      removeLabel="Remove Oxblood"
      size="3xl"
    />
  );
};

/* Reference: each state and variant on its own, beside the demo. */

export const SwatchVariants = () => (
  <VariantsBlock
    id="swatch-variants-title"
    lead="Four options, sizes from 2xs to 7xl. Each state is a prop."
  >
    <VariantCell code="raised" name="Default and raised">
      <Swatch aria-label="Default" color={evergreen} size="lg" />
      <Swatch aria-label="Raised" color={evergreen} raised size="lg" />
    </VariantCell>
    <VariantCell code="selected, unavailable" name="Selected and unavailable">
      <Swatch aria-label="Selected" color={saffron} selected showRing size="lg" />
      <Swatch aria-label="Unavailable" color="#c9c3b6" size="lg" unavailable />
    </VariantCell>
    <VariantCell code="onRemove, removeLabel" name="Removable">
      <RemovableSwatch />
    </VariantCell>
    <VariantCell code='texture="atmosphere"' name="Atmosphere texture">
      <Swatch
        aria-label="Atmosphere texture"
        colors={[evergreen, "#6f9a86", "#1f3b30"]}
        size="3xl"
        texture="atmosphere"
      />
    </VariantCell>
    {/* The pair is the point: the same 40% alpha colour with and without a
        backdrop. Without one it reads as a pale solid, indistinguishable
        from a lighter opaque colour. */}
    <VariantCell code="transparencyBackdrop" name="40% on a backdrop">
      <Swatch
        aria-label="Translucent on a backdrop"
        color="rgb(49 92 75 / 40%)"
        size="3xl"
        transparencyBackdrop
      />
    </VariantCell>
    <VariantCell code="DistributionDisplay" name="Read-only display">
      <div className="swatch-variant-display">
        <DistributionDisplay
          aria-label="Assigned finish distribution: 79% assigned, 21% unassigned"
          emptyValue={21}
          legend="summary"
          segments={assignedDistribution}
        />
      </div>
    </VariantCell>
  </VariantsBlock>
);
