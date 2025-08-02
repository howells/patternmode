"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Meter } from "@patternmode/ui";

import React from "react";

export const DefaultExample = () => <Meter value={65} />;

export const WithLabelExample = () => <Meter value={75} label="Progress" />;

export const VariantsExample = () => (
  <div className="w-full space-y-4">
    <Meter value={65} variant="default" label="Default" />
    <Meter value={45} variant="neutral" label="Neutral" />
    <Meter value={85} variant="success" label="Success" />
    <Meter value={70} variant="info" label="Info" />
    <Meter value={90} variant="warning" label="Warning" />
    <Meter value={95} variant="error" label="Error" />
    <Meter value={80} variant="critical" label="Critical" />
    <Meter value={75} variant="positive" label="Positive" />
    <Meter value={60} variant="negative" label="Negative" />
  </div>
);

export const CustomRangeExample = () => (
  <Meter value={750} min={0} max={1000} label="Storage Used (MB)" />
);

export const NoAnimationExample = () => (
  <Meter value={40} showAnimation={false} label="Static Progress" />
);

export const ValueOnlyExample = () => <Meter value={80} showValue={true} />;
export const MeterExample = DefaultExample;

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
    id: "WithLabelExample",
    title: "With Label",
    description: "With Label example",
    component: WithLabelExample,
  },
  {
    id: "VariantsExample",
    title: "Variants",
    description: "Variants example",
    component: VariantsExample,
  },
  {
    id: "CustomRangeExample",
    title: "Custom Range",
    description: "Custom Range example",
    component: CustomRangeExample,
  },
  {
    id: "NoAnimationExample",
    title: "No Animation",
    description: "No Animation example",
    component: NoAnimationExample,
  },
  {
    id: "ValueOnlyExample",
    title: "Value Only",
    description: "Value Only example",
    component: ValueOnlyExample,
  },
  {
    id: "MeterExample",
    title: "Meter",
    description: "Meter example",
    component: MeterExample,
  },
];
