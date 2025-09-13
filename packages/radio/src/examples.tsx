"use client";

import { Radio as BaseRadio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import React from "react";

export const DefaultExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("option1");
  return (
    <BaseRadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="flex items-center space-x-2">
        <BaseRadio.Root nativeButton value="option1">
          Option 1
        </BaseRadio.Root>
      </div>
    </BaseRadioGroup>
  );
};

export const SizesExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("medium");
  return (
    <BaseRadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <BaseRadio.Root nativeButton value="small">
          Small Radio
        </BaseRadio.Root>
        <BaseRadio.Root nativeButton value="medium">
          Medium Radio
        </BaseRadio.Root>
        <BaseRadio.Root nativeButton value="large">
          Large Radio
        </BaseRadio.Root>
      </div>
    </BaseRadioGroup>
  );
};

export const WithDescriptionExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("pro");
  return (
    <BaseRadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <BaseRadio.Root nativeButton value="basic">
          <div className="flex flex-col text-left">
            <span className="font-medium">Basic Plan</span>
            <span className="text-sm text-zinc-500">
              Perfect for individuals getting started
            </span>
          </div>
        </BaseRadio.Root>
        <BaseRadio.Root nativeButton value="pro">
          <div className="flex flex-col text-left">
            <span className="font-medium">Pro Plan</span>
            <span className="text-sm text-zinc-500">
              Best for small teams and growing businesses
            </span>
          </div>
        </BaseRadio.Root>
        <BaseRadio.Root nativeButton value="enterprise">
          <div className="flex flex-col text-left">
            <span className="font-medium">Enterprise Plan</span>
            <span className="text-sm text-zinc-500">
              Advanced features for large organizations
            </span>
          </div>
        </BaseRadio.Root>
      </div>
    </BaseRadioGroup>
  );
};

export const DisabledExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("enabled");
  return (
    <BaseRadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <BaseRadio.Root nativeButton value="enabled">
          <div className="flex flex-col text-left">
            <span className="font-medium">Enabled Option</span>
            <span className="text-sm text-zinc-500">
              This option is available
            </span>
          </div>
        </BaseRadio.Root>
        <BaseRadio.Root disabled nativeButton value="disabled">
          <div className="flex flex-col text-left">
            <span className="font-medium">Disabled Option</span>
            <span className="text-sm text-zinc-500">
              This option is not available
            </span>
          </div>
        </BaseRadio.Root>
      </div>
    </BaseRadioGroup>
  );
};

export const CustomStructureExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string>("custom1");
  return (
    <BaseRadioGroup
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <div className="space-y-4">
        <div className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-900 dark:text-zinc-50">
          <BaseRadio.Root nativeButton value="custom1" />
          <div className="flex flex-col">
            <span className="font-medium">Custom Radio 1</span>
            <span className="text-sm text-zinc-500">
              Built with individual components
            </span>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-900 dark:text-zinc-50">
          <BaseRadio.Root nativeButton value="custom2" />
          <div className="flex flex-col">
            <span className="font-medium">Custom Radio 2</span>
            <span className="text-sm text-zinc-500">
              Custom indicator usage
            </span>
          </div>
        </div>
      </div>
    </BaseRadioGroup>
  );
};
