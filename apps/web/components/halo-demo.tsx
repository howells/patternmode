"use client";

import { HaloPicker, hslToHex } from "@patternmode/halo";
import type { HaloColor } from "@patternmode/halo";
import { Swatch } from "@patternmode/swatch";
import { useState } from "react";

const startingColor: HaloColor = { h: 16, l: 69, s: 48 };

export const HaloDemo = () => {
  const [color, setColor] = useState<HaloColor>(startingColor);
  const hex = hslToHex(color.h, color.s, color.l);

  return (
    <div className="halo-demo">
      <div className="halo-demo-cell halo-demo-picker">
        <HaloPicker aria-label="Accent color" onChange={setColor} value={color} />
      </div>
      <div className="halo-demo-cell halo-demo-readout">
        <div className="halo-demo-label">Current</div>
        <Swatch aria-label={`Current color ${hex}`} color={hex} size="4xl" />
        <dl>
          <div>
            <dt>Hex</dt>
            <dd>{hex}</dd>
          </div>
          <div>
            <dt>HSL</dt>
            <dd>
              {Math.round(color.h)} {Math.round(color.s)} {Math.round(color.l)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
