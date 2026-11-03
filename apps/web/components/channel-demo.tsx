"use client";

import { ChannelSlider } from "@patternmode/channel";
import { Swatch, SWATCH_SIZES } from "@patternmode/swatch";
import { useState } from "react";

import { VariantsBlock } from "@/components/variant-cells";

type Ramp = readonly [string, string, string];

const LIGHTNESS_COLORS: Ramp = ["#faf5e9", "#b6a180", "#191a17"];
const LIGHTNESS = `linear-gradient(to right in srgb, ${LIGHTNESS_COLORS.join(", ")})`;
const WARMTH_COLORS: Ramp = ["#a6bdd5", "#d9cbb6", "#d99460"];
const WARMTH = `linear-gradient(to right in srgb, ${WARMTH_COLORS.join(", ")})`;

/**
 * The colour a three-stop ramp shows at `value` (0-100), so a preview matches
 * the point on the track the thumb sits over.
 */
const rampColor = ([start, middle, end]: Ramp, value: number) =>
  value <= 50
    ? `color-mix(in srgb, ${start}, ${middle} ${value * 2}%)`
    : `color-mix(in srgb, ${middle}, ${end} ${(value - 50) * 2}%)`;

/** Crop the same ramp to the selected interval, keeping its middle colour stop. */
const rangeBackground = ([start, end]: readonly [number, number]) => {
  if (start === end) {
    return rampColor(LIGHTNESS_COLORS, start);
  }
  const stops = LIGHTNESS_COLORS.map(
    (color, index) => `${color} ${((index * 50 - start) / (end - start)) * 100}%`,
  );
  return `linear-gradient(to right in srgb, ${stops.join(", ")})`;
};
const contrast = (value: number) => (value < 55 ? "#1d1d1b" : "rgba(255,255,255,0.85)");

export const ChannelDemo = () => {
  const [lightness, setLightness] = useState(45);
  const [warmth, setWarmth] = useState(50);
  const [range, setRange] = useState<readonly [number, number]>([20, 75]);
  const [committed, setCommitted] = useState("No committed changes yet");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="channel-demo">
      <section className="channel-demo-studio">
        <div className="channel-demo-heading">
          <div>
            <h2>Colour studio</h2>
            <p>Glass controls, sized to sit beside Swatch.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setLightness(45);
              setWarmth(50);
              setRange([20, 75]);
              setCommitted("Reset");
            }}
          >
            Reset
          </button>
        </div>
        <div className="channel-demo-row">
          <Swatch
            size="xl"
            color={`hsl(35 25% ${100 - lightness}%)`}
            aria-label="Lightness preview"
          />
          <ChannelSlider
            label="Lightness"
            size="xl"
            background={LIGHTNESS}
            value={lightness}
            onValueChange={setLightness}
            onValueCommitted={(value) => {
              setCommitted(`Lightness: ${value}`);
            }}
            getThumbColor={contrast}
            labelStart="Lighter"
            labelEnd="Darker"
            disabled={disabled}
          />
        </div>
        <div className="channel-demo-row">
          <Swatch size="xl" color={rampColor(WARMTH_COLORS, warmth)} aria-label="Warmth preview" />
          <ChannelSlider
            label="Warmth"
            size="xl"
            background={WARMTH}
            value={warmth}
            onValueChange={setWarmth}
            onValueCommitted={(value) => {
              setCommitted(`Warmth: ${value}`);
            }}
            labelStart="Cooler"
            labelEnd="Warmer"
            disabled={disabled}
          />
        </div>
        <div className="channel-demo-row">
          <Swatch
            size="xl"
            background={rangeBackground(range)}
            aria-label="Lightness range preview"
          />
          <ChannelSlider
            label="Lightness range"
            size="xl"
            background={LIGHTNESS}
            value={range}
            onValueChange={setRange}
            onValueCommitted={(value) => {
              setCommitted(`Range: ${value.join("–")}`);
            }}
            getThumbColor={contrast}
            labelStart="Range start"
            labelEnd="Range end"
            disabled={disabled}
          />
        </div>
        <div className="channel-demo-status">
          <output aria-live="polite">{committed}</output>
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => {
                setDisabled(event.target.checked);
              }}
            />{" "}
            Disabled
          </label>
        </div>
      </section>
    </div>
  );
};

/**
 * The size scale, for the reference column: each channel exactly as tall as
 * the Swatch beside it, at every step.
 */
export const ChannelSizes = () => (
  <VariantsBlock
    id="channel-sizes-title"
    lead="Each channel is exactly as tall as its neighbouring Swatch. Width remains flexible."
    title="The Swatch size scale"
  >
    {SWATCH_SIZES.map((size) => (
      <li className="channel-demo-size-row" key={size}>
        <code>{size}</code>
        <Swatch aria-label={`${size} Swatch`} size={size} color="#b6a180" />
        <ChannelSlider
          label={`${size} size`}
          size={size}
          background={LIGHTNESS}
          defaultValue={45}
          getThumbColor={contrast}
        />
      </li>
    ))}
  </VariantsBlock>
);
