import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, WithDefaultExample, DisabledExample, MixedStatesExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "checkbox-group",
  name: "Checkbox Group",
  description: "A checkbox group component built on Base UI for managing multiple checkbox selections with accessible labeling.",
  category: "inputs" as const,
  icon: "CheckSquare",

  importStatement: `import { CheckboxGroup, CheckboxGroupItem } from "@/components/ui/checkbox-group";`,
  componentId: "CheckboxGroupExample",
  props: [
    {
      name: "label",
      type: "string",
      description: "The label text for the checkbox group."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether all checkboxes in the group are disabled."
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Default selected values (comma-separated)."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic checkbox group with multiple options.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "with-default",
      title: "With Default Selection",
      description: "Checkbox group with pre-selected options.",
      code: jsxToString(<WithDefaultExample />)},
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled checkbox group.",
      code: jsxToString(<DisabledExample />)},
    {
      id: "mixed-states",
      title: "Mixed States",
      description: "Checkbox group with individually disabled items.",
      code: jsxToString(<MixedStatesExample />)}
  ]
};