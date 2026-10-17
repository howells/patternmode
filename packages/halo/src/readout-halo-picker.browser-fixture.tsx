import { useState } from "react";
import { HaloPicker } from "./index";
import type { HaloColor } from "./index";

/** A HaloPicker beside a readout of its colour, for browser tests; shipped code never imports it. */
export const ReadoutHaloPicker = () => {
  const [color, setColor] = useState<HaloColor>({ h: 16, l: 69, s: 48 });
  return (
    <div>
      <output data-slot="readout">{`${Math.round(color.h)} ${Math.round(color.s)} ${Math.round(color.l)}`}</output>
      <HaloPicker aria-label="Accent color" onChange={setColor} value={color} />
    </div>
  );
};
