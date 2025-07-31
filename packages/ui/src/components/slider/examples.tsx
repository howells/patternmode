"use client";

import { Slider } from "@patternmode/ui";
import React, { useState } from "react";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}

// Config example ID: "range" -> export name: RangeExample
export function RangeExample() {
  return <Slider defaultValue={[25, 75]} max={100} step={1} />;
}

// Config example ID: "steps" -> export name: StepsExample
export function StepsExample() {
  const [value, setValue] = useState([50]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Volume:
          {value}
          %
        </label>
        <Slider
          defaultValue={[50]}
          max={100}
          step={10}
          onValueChange={value => setValue(Array.isArray(value) ? value : [value])}
        />
      </div>
    </div>
  );
}

// Config example ID: "custom-range" -> export name: CustomRangeExample
export function CustomRangeExample() {
  const [value, setValue] = useState([20]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Temperature:
          {value}
          °C
        </label>
        <Slider
          defaultValue={[20]}
          min={-10}
          max={40}
          step={1}
          onValueChange={value => setValue(Array.isArray(value) ? value : [value])}
        />
      </div>
    </div>
  );
}

// Config example ID: "disabled" -> export name: DisabledExample
export function DisabledExample() {
  return <Slider defaultValue={[30]} max={100} disabled />;
}

// Additional examples (not referenced in config but good to have)
export function SliderExample() {
  const [value, setValue] = useState([50]);

  return (
    <Slider
      value={value}
      onValueChange={value => setValue(value as number[])}
      min={0}
      max={100}
      step={1}
    />
  );
}

export function WithValue() {
  const [value, setValue] = useState([25]);

  return (
    <Slider
      value={value}
      onValueChange={value => setValue(value as number[])}
      min={0}
      max={100}
      step={1}
      showValue
    />
  );
}

export function RangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <Slider
      value={range}
      onValueChange={value => setRange(value as number[])}
      min={0}
      max={100}
      step={1}
      showValue
    />
  );
}

export function CustomStep() {
  const [value, setValue] = useState([25]);

  return (
    <Slider
      value={value}
      onValueChange={value => setValue(value as number[])}
      min={0}
      max={100}
      step={5}
      showValue
      valueFormatter={val => `$${val}`}
    />
  );
}

export function Vertical() {
  const [value, setValue] = useState([40]);

  return (
    <div className="h-64 flex items-center">
      <Slider
        value={value}
        onValueChange={value => setValue(value as number[])}
        min={0}
        max={100}
        step={1}
        orientation="vertical"
        showValue
      />
    </div>
  );
}

export function Disabled() {
  const [value] = useState([60]);

  return (
    <Slider
      value={value}
      min={0}
      max={100}
      step={1}
      disabled
      showValue
    />
  );
}
