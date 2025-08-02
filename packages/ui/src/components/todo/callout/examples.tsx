"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Callout, iconRegistry } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { AlertTriangle } = iconRegistry;

// Default callout
export const DefaultExample = () => (
  <Callout title="Information">
    This is important information you should know about.
  </Callout>
);

// Success callout
export const SuccessExample = () => (
  <Callout title="Success" variant="success">
    Your operation completed successfully!
  </Callout>
);

// Error callout
export const ErrorExample = () => (
  <Callout title="Error" variant="error">
    Something went wrong. Please try again.
  </Callout>
);

// Warning callout
export const WarningExample = () => (
  <Callout title="Warning" variant="warning">
    Please review this information carefully.
  </Callout>
);

// Neutral callout
export const NeutralExample = () => (
  <Callout title="Note" variant="neutral">
    This is a neutral callout for general information.
  </Callout>
);

// With icon
export const WithIconExample = () => (
  <Callout title="Alert" variant="warning" icon={AlertTriangle}>
    This callout includes an icon for better visual communication.
  </Callout>
); export const CalloutExample = DefaultExample;

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
    id: "SuccessExample",
    title: "Success",
    description: "Success example",
    component: SuccessExample,
  },
  {
    id: "ErrorExample",
    title: "Error",
    description: "Error example",
    component: ErrorExample,
  },
  {
    id: "WarningExample",
    title: "Warning",
    description: "Warning example",
    component: WarningExample,
  },
  {
    id: "NeutralExample",
    title: "Neutral",
    description: "Neutral example",
    component: NeutralExample,
  },
  {
    id: "WithIconExample",
    title: "With Icon",
    description: "With Icon example",
    component: WithIconExample,
  },
  {
    id: "CalloutExample",
    title: "Callout",
    description: "Callout example",
    component: CalloutExample,
  },
];
