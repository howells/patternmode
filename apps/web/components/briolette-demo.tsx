"use client";

import { hexToHsl } from "@instruments/colorscope/convert";
import { BriolettePicker } from "@patternmode/briolette";
import type { BrioletteDensity } from "@patternmode/briolette";
import { HaloPicker, hslToHex } from "@patternmode/halo";
import type { HaloColor } from "@patternmode/halo";
import { Swatch } from "@patternmode/swatch";
import { useState } from "react";

import { OptionBar } from "./option-bar";

const DENSITY_OPTIONS: { label: string; value: BrioletteDensity }[] = [
  { label: "Coarse", value: "coarse" },
  { label: "Base", value: "base" },
  { label: "Fine", value: "fine" },
  { label: "Brilliant", value: "brilliant" },
];

const SEAM_OPTIONS: { label: string; value: number }[] = [
  { label: "None", value: 0 },
  { label: "Subtle", value: 0.35 },
  { label: "Full", value: 1 },
];

const HALO_FALLBACK: HaloColor = { h: 16, l: 69, s: 48 };

export const BrioletteDemo = () => {
  const [color, setColor] = useState<string | null>(null);
  const [density, setDensity] = useState<BrioletteDensity>("base");
  const [seamOpacity, setSeamOpacity] = useState(1);
  const haloValue = (color === null ? null : hexToHsl(color)) ?? HALO_FALLBACK;

  return (
    <div className="briolette-demo">
      <BriolettePicker
        aria-label="Accent color"
        density={density}
        onChange={setColor}
        seamOpacity={seamOpacity}
        showValue={false}
        size={360}
        value={color}
      />
      <div className="briolette-demo-halo" id="briolette-demo-halo" popover="auto">
        <HaloPicker
          aria-label="Fine-tune color"
          onChange={(next) => {
            setColor(hslToHex(next.h, next.s, next.l));
          }}
          value={haloValue}
        />
      </div>
      <div className="briolette-demo-controls">
        <Swatch
          asChild
          color={color ?? undefined}
          shape="circle"
          size="sm"
          unavailable={color === null}
        >
          <button
            aria-label="Fine-tune the current color"
            className="briolette-demo-swatch"
            popoverTarget="briolette-demo-halo"
            type="button"
          />
        </Swatch>
        <output className="briolette-demo-hex">{color ?? "—"}</output>
        <OptionBar label="Cut" onChange={setDensity} options={DENSITY_OPTIONS} value={density} />
        <OptionBar
          label="Seams"
          onChange={setSeamOpacity}
          options={SEAM_OPTIONS}
          value={seamOpacity}
        />
      </div>
    </div>
  );
};
