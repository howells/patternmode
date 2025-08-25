import type { PreviewProps as PropMetadata } from "@/types/preview-props";

import React from "react";

import type { PropControlProps } from "./types";

import { getPropOverride } from "../prop-overrides";
import {
  BooleanControl,
  DateControl,
  IconControl,
  NumberControl,
  SelectControl,
  TextareaControl,
  TextControl,
} from "./index";

type ControlFactoryProps = {
  prop: PropMetadata;
  currentValue: unknown;
  onValueChange: (value: unknown) => void;
  componentName?: string;
};

export function ControlFactory({ prop, currentValue, onValueChange, componentName }: ControlFactoryProps) {
  const controlProps: PropControlProps = {
    prop,
    currentValue,
    onValueChange,
  };

  // Check for component-specific prop overrides first
  if (componentName) {
    const propOverride = getPropOverride(componentName, prop.name);
    if (propOverride) {
      return propOverride.render(controlProps) as React.ReactElement;
    }
  }

  // Auto-detect icon props by name and use IconSelect
  if (prop.type === "icon" || prop.name === "icon" || prop.name.includes("Icon") || prop.name.endsWith("icon") || prop.name === "fallbackIcon") {
    return <IconControl {...controlProps} />;
  }

  // Handle different prop types
  switch (prop.type) {
    case "boolean":
      return <BooleanControl {...controlProps} />;

    case "select":
      if (prop.options) {
        return <SelectControl {...controlProps} />;
      }
      break;

    case "icon":
      return <IconControl {...controlProps} />;

    case "number":
      return <NumberControl {...controlProps} />;

    case "date":
      return <DateControl {...controlProps} />;

    case "textarea":
      return <TextareaControl {...controlProps} />;

    default:
      // Default to text input
      return <TextControl {...controlProps} />;
  }

  // Fallback to text control
  return <TextControl {...controlProps} />;
}
