"use client";

import { BriolettePicker } from "@patternmode/briolette";
import type { BriolettePickerProps } from "@patternmode/briolette";
import { Swatch } from "@patternmode/swatch";
import { useState } from "react";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./briolette-demo.css";

const NOTES = [
  { key: "Drag", note: "Spin the sphere" },
  { key: "Select", note: "Choose a facet and refine around it" },
  { key: "Again", note: "Select the pinned facet to clear" },
] as const;

/** The facet the design shows picked, so the sphere opens refined around it. */
const STARTING_COLOR = "#A97C4F";

export const BrioletteDemo = () => {
  const [color, setColor] = useState<string | null>(STARTING_COLOR);

  return (
    <div className="briolette-demo">
      <div className="briolette-demo-picker">
        <BriolettePicker
          aria-label="Accent color"
          onChange={setColor}
          showValue={false}
          size={260}
          value={color}
        />
        <div className="briolette-demo-hex">
          <Swatch
            aria-hidden="true"
            color={color ?? undefined}
            flat
            size="2xs"
            unavailable={color === null}
          />
          <output>{color === null ? "—" : color.toUpperCase()}</output>
        </div>
      </div>
      <div className="briolette-demo-notes">
        <dl>
          {NOTES.map(({ key, note }) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{note}</dd>
            </div>
          ))}
        </dl>
        <p>
          At rest the 80 facets span every hue around the equator and every lightness from pole to
          pole.
        </p>
      </div>
    </div>
  );
};

const BrioletteVariant = (props: Partial<BriolettePickerProps>) => {
  const [color, setColor] = useState<string | null>(null);

  return (
    <BriolettePicker
      aria-label="Accent color"
      onChange={setColor}
      size={112}
      value={color}
      {...props}
    />
  );
};

export const BrioletteVariants = () => (
  <VariantsBlock
    id="briolette-variants-title"
    lead="Cut it coarse at 20 facets or fine at 320, and set how much of the seams show."
  >
    <VariantCell code='density="base"' name="80 facets">
      <BrioletteVariant density="base" />
    </VariantCell>
    <VariantCell code="showValue={false}" name="Without the hex readout">
      <BrioletteVariant showValue={false} />
    </VariantCell>
    <VariantCell code="seamColor, seamOpacity" name="On a dark surface">
      <div className="briolette-demo-ground">
        <BrioletteVariant seamOpacity={0.6} showValue={false} />
      </div>
    </VariantCell>
  </VariantsBlock>
);
