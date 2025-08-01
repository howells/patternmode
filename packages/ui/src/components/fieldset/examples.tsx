"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Field, FieldLabel, Fieldset, FieldsetLegend, Input } from "@patternmode/ui";

import React from "react";

// Default fieldset
export const DefaultExample = () => (
  <Fieldset>
    <FieldsetLegend>Personal Information</FieldsetLegend>
    <div className="space-y-4">
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <Input />
      </Field>
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input />
      </Field>
    </div>
  </Fieldset>
);

export const FieldsetExample = DefaultExample;

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
    id: "FieldsetExample",
    title: "Fieldset",
    description: "Fieldset example",
    component: FieldsetExample,
  },
];
