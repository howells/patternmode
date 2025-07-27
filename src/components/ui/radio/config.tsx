import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, CheckedExample, DisabledExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "radio",
  name: "Radio",
  description: "A radio button component for selecting a single option from a set.",
  category: "inputs" as const,
  icon: "Circle",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Radio } from "@/components/ui/radio/radio";`,
  componentId: "RadioExample",
  props: [
    {
      name: "checked",
      type: "boolean",
      description: "Whether the radio is checked",
      defaultValue: false
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the radio is disabled",
      defaultValue: false
    },
    {
      name: "value",
      type: "string",
      description: "The value of the radio button",
      defaultValue: "option1"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Radio",
      description: "A simple radio button",
      code: jsxToString(<DefaultExample />)
    },
    {
      id: "checked",
      title: "Checked Radio",
      description: "A radio button in checked state",
      code: jsxToString(<CheckedExample />)
    },
    {
      id: "disabled",
      title: "Disabled Radio",
      description: "A radio button in disabled state",
      code: jsxToString(<DisabledExample />)
    },
  ]
};