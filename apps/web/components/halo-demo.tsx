"use client";

import { HaloPicker } from "@patternmode/halo";
import type { HaloPlacement } from "@patternmode/halo";
import { hslToHex } from "@patternmode/system";
import type { HslColor } from "@patternmode/system";
import { Swatch } from "@patternmode/swatch";
import { useState } from "react";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./halo-demo.css";

const startingColor: HslColor = { h: 16, l: 69, s: 48 };

export const HaloDemo = () => {
  const [color, setColor] = useState<HslColor>(startingColor);
  const hex = hslToHex(color.h, color.s, color.l);

  return (
    <div className="halo-demo">
      <div className="halo-demo-picker">
        <HaloPicker aria-label="Accent color" onChange={setColor} showValue={false} value={color} />
        <div className="halo-demo-hex">
          <Swatch aria-hidden="true" color={hex} flat size="2xs" />
          <output>{hex.toUpperCase()}</output>
        </div>
      </div>
      <div className="halo-demo-readout">
        <dl>
          <div>
            <dt>Hue</dt>
            <dd>{Math.round(color.h)}</dd>
          </div>
          <div>
            <dt>Saturation</dt>
            <dd>{Math.round(color.s)}</dd>
          </div>
          <div>
            <dt>Lightness</dt>
            <dd>{Math.round(color.l)}</dd>
          </div>
        </dl>
        <p>
          Drag across the pad for saturation, up and down for lightness. Drag along the arc for hue.
        </p>
      </div>
    </div>
  );
};

const HaloVariant = ({
  placement,
  showValue,
}: {
  placement?: HaloPlacement;
  showValue: boolean;
}) => {
  const [color, setColor] = useState<HslColor>(startingColor);

  return (
    <HaloPicker
      aria-label="Accent color"
      onChange={setColor}
      placement={placement}
      showValue={showValue}
      value={color}
    />
  );
};

export const HaloVariants = () => (
  <VariantsBlock
    id="halo-variants-title"
    lead="Put the hue arc on any side. The hex readout follows it."
  >
    <VariantCell code='placement="bottom"' name="Arc below">
      <HaloVariant placement="bottom" showValue />
    </VariantCell>
    <VariantCell code='placement="right"' name="Arc to the right">
      <HaloVariant placement="right" showValue={false} />
    </VariantCell>
    <VariantCell code='placement="top"' name="Arc above">
      <HaloVariant placement="top" showValue={false} />
    </VariantCell>
    <VariantCell code="showValue={false}" name="No hex readout">
      <HaloVariant showValue={false} />
    </VariantCell>
  </VariantsBlock>
);
