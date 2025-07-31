import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SliderExample, DefaultExample, RangeExample, StepsExample, CustomRangeExample, DisabledExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "slider",
  name: "Slider",
  description: "An input where the user selects a value from within a given range.",
  category: "inputs" as const,
  icon: "SlidersHorizontal",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Slider } from "@patternmode/ui";`,
  componentId: "SliderExample",
  props: [
    {
      name: "value",
      type: "number",
      description: "The controlled value of the slider",
      defaultValue: 50
    },
    {
      name: "min",
      type: "number",
      description: "The minimum value",
      defaultValue: 0
    },
    {
      name: "max",
      type: "number",
      description: "The maximum value",
      defaultValue: 100
    },
    {
      name: "step",
      type: "number",
      description: "The step value",
      defaultValue: 1
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the slider is disabled",
      defaultValue: false
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Slider",
      description: "A simple slider with default settings",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "range",
      title: "Range Slider",
      description: "A slider with two handles for selecting a range",
      code: jsxToString(<RangeExample />),
    },
    {
      id: "steps",
      title: "Slider with Steps",
      description: "A slider with custom step increments",
      code: jsxToString(<StepsExample />),
    },
    {
      id: "custom-range",
      title: "Custom Range",
      description: "A slider with custom min and max values",
      code: jsxToString(<CustomRangeExample />),
    },
    {
      id: "disabled",
      title: "Disabled Slider",
      description: "A slider in disabled state",
      code: jsxToString(<DisabledExample />),
    },
  ]
};