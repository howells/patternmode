"use client";

import { ChevronDown, Code, Download, File, Image } from "lucide-react";
import React from "react";
import { MenuItem, MenuLabel, MenuSeparator } from "../menu";
import { SplitButton } from "./component";

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
      leftIcon={Download}
      dropdownIcon={ChevronDown}
    >
      <MenuItem>
        <File className="mr-2 size-4" />
        Download PDF
      </MenuItem>
      <MenuItem>
        <Image className="mr-2 size-4" />
        Download Image
      </MenuItem>
      <MenuItem>
        <Code className="mr-2 size-4" />
        Download Source
      </MenuItem>
    </SplitButton>
  );
}

export function SizesExample() {
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

export function LoadingExample() {
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

export function DisabledExample() {
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

export function ComplexMenuExample() {
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
