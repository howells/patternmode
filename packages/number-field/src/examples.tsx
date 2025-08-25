"use client";

import React from "react";
import { NumberField } from "./component";

export const DefaultExample = () => <NumberField label="Quantity" placeholder="0" />;
export const SizesExample = () => (
  <div className="space-y-3">
    <NumberField label="Small" size="sm" />
    <NumberField label="Base" size="base" />
    <NumberField label="Large" size="lg" />
  </div>
);
export const WithLabelExample = () => <NumberField label="Speed" showScrubArea />;
export const WithoutSteppersExample = () => <NumberField label="Weight" showSteppers={false} />;
export const DisabledExample = () => <NumberField label="Disabled" disabled />;

