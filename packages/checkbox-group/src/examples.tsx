"use client";

import React from "react";

import { CheckboxGroup, CheckboxGroupItem } from "./component";

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
  <CheckboxGroup defaultValue={["feature1", "feature3"]} label="Features">
    <CheckboxGroupItem value="feature1">Feature 1</CheckboxGroupItem>
    <CheckboxGroupItem value="feature2">Feature 2</CheckboxGroupItem>
    <CheckboxGroupItem value="feature3">Feature 3</CheckboxGroupItem>
  </CheckboxGroup>
);

// Disabled checkbox group
export const DisabledExample = () => (
  <CheckboxGroup disabled label="Disabled options">
    <CheckboxGroupItem value="option1">Option 1</CheckboxGroupItem>
    <CheckboxGroupItem value="option2">Option 2</CheckboxGroupItem>
  </CheckboxGroup>
);

// Mixed states
export const MixedStatesExample = () => (
  <CheckboxGroup label="Mixed states">
    <CheckboxGroupItem value="available">Available</CheckboxGroupItem>
    <CheckboxGroupItem disabled value="unavailable">
      Unavailable
    </CheckboxGroupItem>
    <CheckboxGroupItem value="premium">Premium Feature</CheckboxGroupItem>
  </CheckboxGroup>
);

// Controlled checkbox group
export const ControlledExample = () => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    "notifications",
  ]);

  return (
    <div className="space-y-4">
      <CheckboxGroup
        label="Settings"
        onValueChange={setSelectedValues}
        value={selectedValues}
      >
        <CheckboxGroupItem value="notifications">
          Email notifications
        </CheckboxGroupItem>
        <CheckboxGroupItem value="marketing">
          Marketing emails
        </CheckboxGroupItem>
        <CheckboxGroupItem value="analytics">
          Share analytics data
        </CheckboxGroupItem>
      </CheckboxGroup>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Selected: {selectedValues.join(", ") || "None"}
      </p>
    </div>
  );
};

// Horizontal layout
export const HorizontalExample = () => (
  <CheckboxGroup className="flex flex-row gap-4" label="Choose colors">
    <CheckboxGroupItem value="red">Red</CheckboxGroupItem>
    <CheckboxGroupItem value="green">Green</CheckboxGroupItem>
    <CheckboxGroupItem value="blue">Blue</CheckboxGroupItem>
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
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <CheckboxGroup
        label="Required selection *"
        onValueChange={handleChange}
        value={values}
      >
        <CheckboxGroupItem value="agree">
          I agree to the terms
        </CheckboxGroupItem>
        <CheckboxGroupItem value="subscribe">
          Subscribe to updates
        </CheckboxGroupItem>
        <CheckboxGroupItem value="share">Share usage data</CheckboxGroupItem>
      </CheckboxGroup>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};
