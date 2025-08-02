"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { NumberField } from "@patternmode/ui";

import React from "react";

export function NumberFieldExample() {
  return <NumberField label="Quantity" placeholder="Enter quantity" />;
}

export function WithConstraintsExample() {
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
}

export function WithoutSteppersExample() {
  return (
    <NumberField
      label="Age"
      placeholder="Enter age"
      showSteppers={false}
      min={0}
      max={120}
    />
  );
}

export function DisabledScrubAreaExample() {
  return (
    <NumberField
      label="Score"
      placeholder="Enter score"
      showScrubArea={false}
      min={0}
      max={100}
    />
  );
}

export function FullWidthExample() {
  return (
    <NumberField
      label="Amount"
      placeholder="Enter amount"
      fullWidth
      defaultValue={500}
    />
  );
}

export function DisabledExample() {
  return <NumberField label="Read Only" defaultValue={42} disabled />;
}

export const DefaultExample = NumberFieldExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "NumberFieldExample",
    title: "Number Field",
    description: "Number Field example",
    component: NumberFieldExample,
  },
  {
    id: "WithConstraintsExample",
    title: "With Constraints",
    description: "With Constraints example",
    component: WithConstraintsExample,
  },
  {
    id: "WithoutSteppersExample",
    title: "Without Steppers",
    description: "Without Steppers example",
    component: WithoutSteppersExample,
  },
  {
    id: "DisabledScrubAreaExample",
    title: "Disabled Scrub Area",
    description: "Disabled Scrub Area example",
    component: DisabledScrubAreaExample,
  },
  {
    id: "FullWidthExample",
    title: "Full Width",
    description: "Full Width example",
    component: FullWidthExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
];
