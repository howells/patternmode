"use client";

import React from "react";
import {
  RadioCardOption,
  RadioItem,
  RadioLabel,
  RadioOption,
} from "./radio";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return (
    <div className="flex items-center space-x-2">
      <RadioOption value="option1" label="Option 1" />
    </div>
  );
}

// Config example ID: "checked" -> export name: CheckedExample  
export function CheckedExample() {
  return (
    <div className="flex items-center space-x-2">
      <RadioOption value="checked" label="Checked Option" defaultChecked />
    </div>
  );
}

// Config example ID: "disabled" -> export name: DisabledExample
export function DisabledExample() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioOption value="disabled1" label="Disabled Unchecked" disabled />
      </div>
      <div className="flex items-center space-x-2">
        <RadioOption value="disabled2" label="Disabled Checked" defaultChecked disabled />
      </div>
    </div>
  );
}

// Additional examples (not referenced in config but good to have)
export function DefaultRadio() {
  return (
    <RadioOption
      value="option1"
      label="Option 1"
      description="This is the first option"
    />
  );
}

export function RadioSizes() {
  return (
    <div className="space-y-4">
      <RadioOption value="small" label="Small Radio" size="sm" />
      <RadioOption value="medium" label="Medium Radio" size="md" />
      <RadioOption value="large" label="Large Radio" size="lg" />
    </div>
  );
}

export function RadioWithDescription() {
  return (
    <div className="space-y-4">
      <RadioOption
        value="basic"
        label="Basic Plan"
        description="Perfect for individuals getting started"
      />
      <RadioOption
        value="pro"
        label="Pro Plan"
        description="Best for small teams and growing businesses"
      />
      <RadioOption
        value="enterprise"
        label="Enterprise Plan"
        description="Advanced features for large organizations"
      />
    </div>
  );
}

export function RadioCardStyle() {
  return (
    <div className="space-y-3">
      <RadioCardOption
        value="starter"
        title="Starter"
        description="Perfect for personal projects and small websites"
      />
      <RadioCardOption
        value="professional"
        title="Professional"
        description="Ideal for growing businesses and medium-scale applications"
      />
      <RadioCardOption
        value="enterprise"
        title="Enterprise"
        description="Advanced features for large-scale applications"
      />
    </div>
  );
}

export function RadioDisabledState() {
  return (
    <div className="space-y-4">
      <RadioOption
        value="enabled"
        label="Enabled Option"
        description="This option is available"
      />
      <RadioOption
        value="disabled"
        label="Disabled Option"
        description="This option is not available"
        disabled
      />
    </div>
  );
}

export function RadioCustomStructure() {
  return (
    <div className="space-y-4">
      <RadioLabel size="md">
        <RadioItem value="custom1" size="md" />
        <div className="flex flex-col">
          <span className="font-medium">Custom Radio 1</span>
          <span className="text-sm text-zinc-500">
            Built with individual components
          </span>
        </div>
      </RadioLabel>

      <RadioLabel size="md">
        <RadioItem value="custom2" size="md" />
        <div className="flex flex-col">
          <span className="font-medium">Custom Radio 2</span>
          <span className="text-sm text-zinc-500">
            Full control over styling
          </span>
        </div>
      </RadioLabel>
    </div>
  );
}

export function RadioCardSizes() {
  return (
    <div className="space-y-3">
      <RadioCardOption
        value="small-card"
        title="Small Card"
        description="Compact card style"
        size="sm"
      />
      <RadioCardOption
        value="medium-card"
        title="Medium Card"
        description="Default card size"
        size="md"
      />
      <RadioCardOption
        value="large-card"
        title="Large Card"
        description="Spacious card layout"
        size="lg"
      />
    </div>
  );
}