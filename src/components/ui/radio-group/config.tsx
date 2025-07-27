import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { RadioGroupExample, DefaultExample, HorizontalExample, DisabledExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "radio-group",
  name: "Radio Group",
  description: "A set of radio buttons where only one option can be selected at a time.",
  category: "inputs" as const,
  icon: "Circle",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group/radio-group";`,
  componentId: "RadioGroupExample",
  props: [
    {
      name: "value",
      type: "string",
      description: "Selected value",
      defaultValue: "option1"
    },
    {
      name: "orientation",
      type: "select",
      description: "Layout orientation",
      options: ["horizontal", "vertical"],
      defaultValue: "vertical"
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the radio group is disabled",
      defaultValue: false
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Radio Group",
      description: "A simple radio group with labels",
      code: jsxToString(<DefaultExample />),},
    {
      id: "horizontal",
      title: "Horizontal Radio Group",
      description: "Radio buttons arranged horizontally",
      code: jsxToString(<HorizontalExample />),},
    {
      id: "disabled",
      title: "Disabled Radio Group",
      description: "Radio group in disabled state",
      code: jsxToString(<DisabledExample />),},
  ]
};