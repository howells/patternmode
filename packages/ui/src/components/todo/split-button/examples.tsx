"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { iconRegistry, MenuItem, MenuLabel, MenuSeparator, SplitButton } from "@patternmode/ui";

import React from "react";

// Pre-imported icons from registry with aliases
const {
  ChevronDown: ChevronDownIcon,
  Code: CodeIcon,
  Download: DownloadIcon,
  File: FileIcon,
  Image: ImageIcon,
} = iconRegistry;

export function SplitButtonExample() {
  return (
    <SplitButton
      buttonContent="Save"
      onButtonClick={() => console.log("Save clicked")}
    >
      <MenuItem>Save as Draft</MenuItem>
      <MenuItem>Save as Template</MenuItem>
      <MenuSeparator />
      <MenuItem>Export</MenuItem>
    </SplitButton>
  );
}

export function DefaultExample() {
  return (
    <div className="flex gap-2">
      <SplitButton variant="default" buttonContent="Default">
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
      </SplitButton>

      <SplitButton variant="secondary" buttonContent="Secondary">
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
      </SplitButton>

      <SplitButton variant="outline" buttonContent="Outline">
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
      </SplitButton>
    </div>
  );
}

export function WithIconsExample() {
  return (
    <SplitButton
      buttonContent="Download"
      leftIcon={DownloadIcon}
      dropdownIcon={ChevronDownIcon}
    >
      <MenuItem>
        <FileIcon className="mr-2 size-4" />
        Download PDF
      </MenuItem>
      <MenuItem>
        <ImageIcon className="mr-2 size-4" />
        Download Image
      </MenuItem>
      <MenuItem>
        <CodeIcon className="mr-2 size-4" />
        Download Source
      </MenuItem>
    </SplitButton>
  );
}

export function Sizes() {
  return (
    <div className="flex items-center gap-2">
      <SplitButton size="sm" buttonContent="Small">
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
      </SplitButton>

      <SplitButton size="default" buttonContent="Default">
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
      </SplitButton>
    </div>
  );
}

export function LoadingState() {
  return (
    <SplitButton
      buttonContent="Processing"
      isLoading={true}
      loadingText="Saving..."
    >
      <MenuItem>Save as Draft</MenuItem>
      <MenuItem>Save as Template</MenuItem>
    </SplitButton>
  );
}

export function Disabled() {
  return (
    <SplitButton
      buttonContent="Disabled"
      disabled={true}
    >
      <MenuItem>Action 1</MenuItem>
      <MenuItem>Action 2</MenuItem>
    </SplitButton>
  );
}

export function ComplexMenu() {
  return (
    <SplitButton
      buttonContent="Publish"
      onButtonClick={() => console.log("Publish clicked")}
    >
      <MenuLabel>Publish Options</MenuLabel>
      <MenuItem>Publish Now</MenuItem>
      <MenuItem>Schedule for Later</MenuItem>
      <MenuSeparator />

      <MenuLabel>Save Options</MenuLabel>
      <MenuItem>Save as Draft</MenuItem>
      <MenuItem>Save as Template</MenuItem>
      <MenuSeparator />

      <MenuItem>Preview</MenuItem>
      <MenuItem>Export</MenuItem>
    </SplitButton>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "SplitButtonExample",
    title: "Split Button",
    description: "Split Button example",
    component: SplitButtonExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
];
