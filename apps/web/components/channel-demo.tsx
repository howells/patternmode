"use client";

import { ChannelSlider } from "@patternmode/channel";
import { Swatch } from "@patternmode/swatch";
import { PATTERNMODE_EXTENDED_SIZES } from "@patternmode/system";
import { useState } from "react";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./channel-demo.css";

const WHITE_TO_BLACK = "linear-gradient(to right in srgb, #fff, #000)";
const HUES = `linear-gradient(to right in srgb, ${["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f", "#f00"].join(", ")})`;
const COOL = "#7f9fbf";
const NEUTRAL = "#c9c3b6";
const WARM = "#d9894a";
const TEMPERATURE = `linear-gradient(to right in srgb, ${COOL}, ${NEUTRAL}, ${WARM})`;

const channel = (hex: string, offset: number) => Number.parseInt(hex.slice(offset, offset + 2), 16);

/** The hex the temperature ramp shows at `value` (0-100), under the thumb. */
const temperatureHex = (value: number) => {
  const [from, to, share] =
    value <= 50 ? [COOL, NEUTRAL, value / 50] : [NEUTRAL, WARM, (value - 50) / 50];
  return `#${[1, 3, 5]
    .map((offset) =>
      Math.round(channel(from, offset) + (channel(to, offset) - channel(from, offset)) * share)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase()}`;
};

const contrast = (value: number) => (value < 55 ? "#1d1d1b" : "rgba(255,255,255,0.85)");
/* A bare glass thumb: no core dot. */
const glass = () => "transparent";

const ChannelField = ({
  children,
  label,
  readout,
}: {
  children: React.ReactNode;
  label: string;
  readout: React.ReactNode;
}) => (
  <div className="channel-demo-field">
    <div className="channel-demo-header">
      <span className="channel-demo-label">{label}</span>
      <output className="channel-demo-value">{readout}</output>
    </div>
    {children}
  </div>
);

export const ChannelDemo = () => {
  const [lightness, setLightness] = useState(62);
  const [temperature, setTemperature] = useState(64);
  const [range, setRange] = useState<readonly [number, number]>([30, 70]);
  const hex = temperatureHex(temperature);

  return (
    <div className="channel-demo">
      <ChannelField label="Lightness" readout={lightness}>
        <ChannelSlider
          background={WHITE_TO_BLACK}
          getThumbColor={glass}
          label="Lightness"
          onValueChange={setLightness}
          size="xl"
          value={lightness}
        />
      </ChannelField>
      <ChannelField
        label="Temperature"
        readout={
          <>
            <Swatch aria-hidden="true" color={hex} flat size="2xs" />
            {hex}
          </>
        }
      >
        <ChannelSlider
          background={TEMPERATURE}
          getThumbColor={glass}
          label="Temperature"
          labelEnd="Warmer"
          labelStart="Cooler"
          onValueChange={setTemperature}
          size="xl"
          value={temperature}
        />
      </ChannelField>
      <ChannelField label="Lightness range" readout={`${range[0]} to ${range[1]}`}>
        <ChannelSlider
          background={WHITE_TO_BLACK}
          getThumbColor={glass}
          label="Lightness range"
          onValueChange={setRange}
          value={range}
        />
      </ChannelField>
    </div>
  );
};

export const ChannelVariants = () => (
  <VariantsBlock
    id="channel-variants-title"
    lead="Sizes follow Swatch, base is 32px and xl is 48px. Endpoint captions are optional."
  >
    <VariantCell code='size="base"' name="One value, base size">
      <ChannelSlider background={HUES} defaultValue={30} label="Hue" />
    </VariantCell>
    <VariantCell code="getThumbColor(value, index)" name="Thumb contrast from your rule">
      <ChannelSlider
        background={WHITE_TO_BLACK}
        defaultValue={[22, 62]}
        getThumbColor={contrast}
        label="Lightness"
        size="xl"
      />
    </VariantCell>
    <VariantCell code="labelStart, labelEnd" name="Endpoint captions">
      <ChannelSlider
        background={TEMPERATURE}
        defaultValue={50}
        label="Temperature"
        labelEnd="Warmer"
        labelStart="Cooler"
      />
    </VariantCell>
    <VariantCell code="disabled" name="Disabled">
      <ChannelSlider background={WHITE_TO_BLACK} defaultValue={50} disabled label="Lightness" />
    </VariantCell>
  </VariantsBlock>
);

/**
 * The size scale, for the reference column: each channel exactly as tall as
 * the Swatch above it, at every step.
 */
export const ChannelSizes = () => (
  <VariantsBlock
    id="channel-sizes-title"
    lead="Each channel is exactly as tall as its neighbouring Swatch. Width remains flexible."
    title="The Swatch size scale"
  >
    {PATTERNMODE_EXTENDED_SIZES.map((size) => (
      <li className="channel-demo-size-row" key={size}>
        <code>{size}</code>
        <Swatch aria-label={`${size} Swatch`} color="#b6a180" size={size} />
        <ChannelSlider
          background={WHITE_TO_BLACK}
          defaultValue={45}
          getThumbColor={contrast}
          label={`${size} size`}
          size={size}
        />
      </li>
    ))}
  </VariantsBlock>
);
