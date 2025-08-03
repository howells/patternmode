"use client";

import React from "react";
import { NumberField } from "./component";

export const DefaultExample = () => {
  return <NumberField label="Quantity" placeholder="Enter quantity" />;
};

export const WithConstraintsExample = () => {
  return (
    <NumberField
      label="Price"
      placeholder="$0.00"
      min={0}
      max={1000}
      step={0.01}
      defaultValue={29.99}
    />
  );
};

export const WithoutSteppersExample = () => {
  return (
    <NumberField
      label="Age"
      placeholder="Enter age"
      showSteppers={false}
      min={0}
      max={120}
    />
  );
};

export const DisabledScrubAreaExample = () => {
  return (
    <NumberField
      label="Score"
      placeholder="Enter score"
      showScrubArea={false}
      min={0}
      max={100}
    />
  );
};

export const FullWidthExample = () => {
  return (
    <NumberField
      label="Amount"
      placeholder="Enter amount"
      fullWidth
      defaultValue={500}
    />
  );
};

export const DisabledExample = () => {
  return <NumberField label="Read Only" defaultValue={42} disabled />;
};
