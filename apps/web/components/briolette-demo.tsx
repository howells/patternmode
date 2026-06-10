"use client";

import { BriolettePicker } from "@patternmode/briolette";
import { Swatch } from "@patternmode/swatch";
import { useState } from "react";

export const BrioletteDemo = () => {
  const [color, setColor] = useState<string | null>(null);

  return (
    <div className="briolette-demo">
      <div className="briolette-demo-cell briolette-demo-picker">
        <BriolettePicker aria-label="Accent color" onChange={setColor} value={color} />
      </div>
      <div className="briolette-demo-cell briolette-demo-readout">
        <div className="briolette-demo-label">Current</div>
        {color === null ? (
          <Swatch aria-label="No color selected" shape="circle" size="6xl" unavailable />
        ) : (
          <Swatch aria-label={`Selected color ${color}`} color={color} shape="circle" size="6xl" />
        )}
        <dl>
          <div>
            <dt>Hex</dt>
            <dd>{color ?? "—"}</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>{color === null ? "Full universe" : "Refined around selection"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
