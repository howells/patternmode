import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, DisabledExample, DisabledScrubAreaExample, FullWidthExample, NumberFieldExample, WithConstraintsExample, WithoutSteppersExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "number-field",
  name: "Number Field",
  description: "A number input field built on Base UI with stepper controls, scrubbing functionality, and full keyboard navigation.",
  category: "inputs" as const,
  icon: "Hash",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { NumberField } from "@patternmode/ui";`,
  componentId: "NumberFieldExample",
  props: [
    {
      name: "value",
      type: "number",
      defaultValue: 0,
      description: "The current value of the number field."
    },
    {
      name: "defaultValue",
      type: "number",
      defaultValue: 0,
      description: "The default value of the number field."
    },
    {
      name: "min",
      type: "number",
      defaultValue: undefined,
      description: "The minimum allowed value."
    },
    {
      name: "max",
      type: "number",
      defaultValue: undefined,
      description: "The maximum allowed value."
    },
    {
      name: "step",
      type: "number",
      defaultValue: 1,
      description: "The step increment when using arrow keys or steppers."
    },
    {
      name: "largeStep",
      type: "number",
      defaultValue: 10,
      description: "The large step increment when holding shift."
    },
    {
      name: "showSteppers",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show the stepper buttons."
    },
    {
      name: "allowScrub",
      type: "boolean",
      defaultValue: true,
      description: "Whether to enable mouse scrubbing on the label."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the number field is disabled."
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: false,
      description: "Whether the number field spans full width."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A number input field built on Base UI with stepper controls, scrubbing functionality, and full keyboard navigation.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-constraints",
      title: "With Constraints",
      description: "Number field with min, max, and step constraints.",
      code: jsxToString(<WithConstraintsExample />),
    },
    {
      id: "without-steppers",
      title: "Without Steppers",
      description: "Clean number input without visible stepper controls.",
      code: jsxToString(<WithoutSteppersExample />),
    },
    {
      id: "disabled-scrub-area",
      title: "Without Scrub Area",
      description: "Number field with regular label (no mouse scrubbing).",
      code: jsxToString(<DisabledScrubAreaExample />),
    },
    {
      id: "full-width",
      title: "Full Width",
      description: "Number field that spans the full width of its container.",
      code: jsxToString(<FullWidthExample />),
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled number field that cannot be interacted with.",
      code: jsxToString(<DisabledExample />),
    },
  ]
};