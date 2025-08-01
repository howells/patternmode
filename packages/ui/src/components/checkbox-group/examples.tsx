"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { CheckboxGroup, CheckboxGroupItem } from "@patternmode/ui";

import React from "react";

// Default checkbox group
export const DefaultExample = () => (
  <CheckboxGroup label="Select options">
    <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
    <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
    <CheckboxGroupItem value="option3">Option 3</CheckboxGroupItem>
  </CheckboxGroup>
);

// With default selection
export const WithDefaultExample = () => (
  <CheckboxGroup label="Features" defaultValue={["feature1", "feature3"]}>
    <CheckboxGroupItem value="feature1">Feature 1</CheckboxGroupItem>
    <CheckboxGroupItem value="feature2">Feature 2</CheckboxGroupItem>
    <CheckboxGroupItem value="feature3">Feature 3</CheckboxGroupItem>
  </CheckboxGroup>
);

// Disabled checkbox group
export const DisabledExample = () => (
  <CheckboxGroup label="Disabled options" disabled>
    <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
    <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
  </CheckboxGroup>
);

// Mixed states
export const MixedStatesExample = () => (
  <CheckboxGroup label="Mixed states">
    <CheckboxGroupItem value="available">Available</CheckboxGroupItem>
    <CheckboxGroupItem value="unavailable" disabled>Unavailable</CheckboxGroupItem>
    <CheckboxGroupItem value="premium">Premium Feature</CheckboxGroupItem>
  </CheckboxGroup>
);

// Controlled checkbox group
export const ControlledExample = () => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(["notifications"]);

  return (
    <div className="space-y-4">
      <CheckboxGroup
        label="Settings"
        value={selectedValues}
        onValueChange={setSelectedValues}
      >
        <CheckboxGroupItem value="notifications">Email notifications</CheckboxGroupItem>
        <CheckboxGroupItem value="marketing">Marketing emails</CheckboxGroupItem>
        <CheckboxGroupItem value="analytics">Share analytics data</CheckboxGroupItem>
      </CheckboxGroup>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Selected:
        {" "}
        {selectedValues.join(", ") || "None"}
      </p>
    </div>
  );
};

// Horizontal layout
export const HorizontalExample = () => (
  <CheckboxGroup label="Choose colors" className="flex flex-row gap-4">
    <CheckboxGroupItem value="red">Red</CheckboxGroupItem>
    <CheckboxGroupItem value="green">Green</CheckboxGroupItem>
    <CheckboxGroupItem value="blue">Blue</CheckboxGroupItem>
  </CheckboxGroup>
);

// With descriptions
export const WithDescriptionsExample = () => (
  <CheckboxGroup label="Subscription tiers">
    <div className="space-y-3">
      <label className="flex items-start gap-2 cursor-pointer">
        <CheckboxGroupItem value="basic" className="mt-0.5">
          <span className="sr-only">Basic</span>
        </CheckboxGroupItem>
        <div>
          <div className="font-medium">Basic</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Essential features for individuals
          </div>
        </div>
      </label>
      <label className="flex items-start gap-2 cursor-pointer">
        <CheckboxGroupItem value="pro" className="mt-0.5">
          <span className="sr-only">Pro</span>
        </CheckboxGroupItem>
        <div>
          <div className="font-medium">Pro</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Advanced features for professionals
          </div>
        </div>
      </label>
      <label className="flex items-start gap-2 cursor-pointer">
        <CheckboxGroupItem value="enterprise" className="mt-0.5">
          <span className="sr-only">Enterprise</span>
        </CheckboxGroupItem>
        <div>
          <div className="font-medium">Enterprise</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Custom solutions for large teams
          </div>
        </div>
      </label>
    </div>
  </CheckboxGroup>
);

// Required selection
export const RequiredExample = () => {
  const [values, setValues] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");

  const handleChange = (newValues: string[]) => {
    setValues(newValues);
    if (newValues.length === 0) {
      setError("Please select at least one option");
    }
    else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <CheckboxGroup
        label="Required selection *"
        value={values}
        onValueChange={handleChange}
      >
        <CheckboxGroupItem value="agree">I agree to the terms</CheckboxGroupItem>
        <CheckboxGroupItem value="subscribe">Subscribe to updates</CheckboxGroupItem>
        <CheckboxGroupItem value="share">Share usage data</CheckboxGroupItem>
      </CheckboxGroup>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Nested groups
export const NestedGroupsExample = () => (
  <div className="space-y-4">
    <CheckboxGroup label="Permissions">
      <div className="space-y-4">
        <div>
          <CheckboxGroupItem value="files">Files</CheckboxGroupItem>
          <div className="ml-6 mt-2 space-y-2">
            <CheckboxGroupItem value="files.read">Read files</CheckboxGroupItem>
            <CheckboxGroupItem value="files.write">Write files</CheckboxGroupItem>
            <CheckboxGroupItem value="files.delete">Delete files</CheckboxGroupItem>
          </div>
        </div>
        <div>
          <CheckboxGroupItem value="users">Users</CheckboxGroupItem>
          <div className="ml-6 mt-2 space-y-2">
            <CheckboxGroupItem value="users.view">View users</CheckboxGroupItem>
            <CheckboxGroupItem value="users.edit">Edit users</CheckboxGroupItem>
          </div>
        </div>
      </div>
    </CheckboxGroup>
  </div>
);

// Custom styling
export const CustomStyleExample = () => (
  <CheckboxGroup label="Custom styled options">
    <CheckboxGroupItem
      value="option1"
      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
    >
      Purple option
    </CheckboxGroupItem>
    <CheckboxGroupItem
      value="option2"
      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
    >
      Green option
    </CheckboxGroupItem>
  </CheckboxGroup>
); export const CheckboxGroupExample = DefaultExample;

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
    id: "WithDefaultExample",
    title: "With Default",
    description: "With Default example",
    component: WithDefaultExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
  {
    id: "MixedStatesExample",
    title: "Mixed States",
    description: "Mixed States example",
    component: MixedStatesExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
  {
    id: "HorizontalExample",
    title: "Horizontal",
    description: "Horizontal example",
    component: HorizontalExample,
  },
  {
    id: "WithDescriptionsExample",
    title: "With Descriptions",
    description: "With Descriptions example",
    component: WithDescriptionsExample,
  },
  {
    id: "RequiredExample",
    title: "Required",
    description: "Required example",
    component: RequiredExample,
  },
  {
    id: "NestedGroupsExample",
    title: "Nested Groups",
    description: "Nested Groups example",
    component: NestedGroupsExample,
  },
  {
    id: "CustomStyleExample",
    title: "Custom Style",
    description: "Custom Style example",
    component: CustomStyleExample,
  },
  {
    id: "CheckboxGroupExample",
    title: "Checkbox Group",
    description: "Checkbox Group example",
    component: CheckboxGroupExample,
  },
];
