"use client";

import { useState } from "react";
import { Slider } from "./components/slider";

const SLIDER_MAX = 100;
const SLIDER_STEP = 1;
const DEFAULT_SINGLE = 50;
const RANGE_START = 25;
const RANGE_END = 75;
const ALT_STEP = 10;
const CUSTOM_INITIAL = 20;
const CUSTOM_MAX = 40;
const CUSTOM_MIN = -10;
const DISABLED_DEFAULT = 30;
const VERTICAL_INITIAL = 40;
const VERTICAL_MIN = 0;

export function DefaultExample() {
  return (
    <Slider defaultValue={DEFAULT_SINGLE} max={SLIDER_MAX} step={SLIDER_STEP} />
  );
}

export function RangeExample() {
  return (
    <Slider
      defaultValue={[RANGE_START, RANGE_END]}
      max={SLIDER_MAX}
      step={SLIDER_STEP}
    />
  );
}

export function WithValueExample() {
  const [value, setValue] = useState<number>(DEFAULT_SINGLE);

  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm">Volume: {value}%</div>
        <Slider
          max={SLIDER_MAX}
          onValueChange={(newValue: number | [number, number]) =>
            setValue(Array.isArray(newValue) ? newValue[0] : newValue)
          }
          showValue
          step={ALT_STEP}
          value={value}
        />
      </div>
    </div>
  );
}

export function CustomRangeExample() {
  const [value, setValue] = useState<number>(CUSTOM_INITIAL);

  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm">Temperature: {value}°C</div>
        <Slider
          max={CUSTOM_MAX}
          min={CUSTOM_MIN}
          onValueChange={(newValue: number | [number, number]) =>
            setValue(Array.isArray(newValue) ? newValue[0] : newValue)
          }
          showValue
          step={SLIDER_STEP}
          value={value}
          valueFormatter={(val) => `${val}°C`}
        />
      </div>
    </div>
  );
}

export function DisabledExample() {
  return <Slider defaultValue={DISABLED_DEFAULT} disabled max={SLIDER_MAX} />;
}

export function VerticalExample() {
  const [value, setValue] = useState<number>(VERTICAL_INITIAL);

  return (
    <div className="flex h-64 items-center">
      <Slider
        max={SLIDER_MAX}
        min={VERTICAL_MIN}
        onValueChange={(newValue: number | [number, number]) =>
          setValue(Array.isArray(newValue) ? newValue[0] : newValue)
        }
        orientation="vertical"
        showValue
        step={SLIDER_STEP}
        value={value}
      />
    </div>
  );
}
