"use client";

import React from "react";
import {
  RadioCardOption,
  RadioGroup,
  RadioItem,
  RadioOption,
} from "./component";

export const DefaultExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("option1");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="flex items-center space-x-2">
        <RadioOption label="Option 1" value="option1" />
      </div>
    </RadioGroup>
  );
};

export const SizesExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("medium");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <RadioOption label="Small Radio" size="sm" value="small" />
        <RadioOption label="Medium Radio" size="base" value="medium" />
        <RadioOption label="Large Radio" size="lg" value="large" />
      </div>
    </RadioGroup>
  );
};

export const WithDescriptionExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("pro");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <RadioOption
          description="Perfect for individuals getting started"
          label="Basic Plan"
          value="basic"
        />
        <RadioOption
          description="Best for small teams and growing businesses"
          label="Pro Plan"
          value="pro"
        />
        <RadioOption
          description="Advanced features for large organizations"
          label="Enterprise Plan"
          value="enterprise"
        />
      </div>
    </RadioGroup>
  );
};

export const DisabledExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("enabled");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <RadioOption
          description="This option is available"
          label="Enabled Option"
          value="enabled"
        />
        <RadioOption
          description="This option is not available"
          disabled
          label="Disabled Option"
          value="disabled"
        />
      </div>
    </RadioGroup>
  );
};

export const CardStyleExample = () => {
  const [selectedValue, setSelectedValue] =
    React.useState<string>("professional");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-3">
        <RadioCardOption
          description="Perfect for personal projects and small websites"
          title="Starter"
          value="starter"
        />
        <RadioCardOption
          description="Ideal for growing businesses and medium-scale applications"
          title="Professional"
          value="professional"
        />
        <RadioCardOption
          description="Advanced features for large-scale applications"
          title="Enterprise"
          value="enterprise"
        />
      </div>
    </RadioGroup>
  );
};

export const CustomStructureExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("custom1");
  return (
    <RadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <div className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-900 dark:text-zinc-50">
          <RadioItem size="base" value="custom1" />
          <div className="flex flex-col">
            <span className="font-medium">Custom Radio 1</span>
            <span className="text-sm text-zinc-500">
              Built with individual components
            </span>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-900 dark:text-zinc-50">
          <RadioItem size="base" value="custom2" />
          <div className="flex flex-col">
            <span className="font-medium">Custom Radio 2</span>
            <span className="text-sm text-zinc-500">
              Custom indicator usage
            </span>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};
