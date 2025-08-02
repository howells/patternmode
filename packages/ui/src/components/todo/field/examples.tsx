"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@patternmode/ui";

import React from "react";

// Default field
export const DefaultExample = () => (
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="Enter your email" />
  </Field>
);

// With description
export const WithDescriptionExample = () => (
  <Field>
    <FieldLabel>Username</FieldLabel>
    <Input placeholder="Enter username" />
    <FieldDescription>Must be at least 3 characters long</FieldDescription>
  </Field>
);

// With error
export const WithErrorExample = () => (
  <Field invalid>
    <FieldLabel>Password</FieldLabel>
    <Input type="password" placeholder="Enter password" />
    <FieldError>Password must be at least 8 characters</FieldError>
  </Field>
);

export const FieldExample = DefaultExample;

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
    id: "WithDescriptionExample",
    title: "With Description",
    description: "With Description example",
    component: WithDescriptionExample,
  },
  {
    id: "WithErrorExample",
    title: "Error State",
    description: "Example showing error state styling",
    component: WithErrorExample,
  },
  {
    id: "FieldExample",
    title: "Field",
    description: "Field example",
    component: FieldExample,
  },
];
