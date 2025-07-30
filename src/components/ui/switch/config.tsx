import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SwitchExample, DefaultExample, CheckedExample, DisabledExample, SizesExample, FormExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "switch",
  name: "Switch",
  description:
    "A control that allows the user to toggle between checked and not checked.",
  category: "inputs" as const,
  icon: "ToggleLeft",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Switch } from "@/components/ui/switch/switch";`,
  componentId: "SwitchExample",
  props: [
    {
      name: "checked",
      type: "boolean",
      description: "Whether the switch is checked",
      defaultValue: false
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the switch is disabled",
      defaultValue: false
    },
    {
      name: "size",
      type: "select",
      description: "Size of the switch",
      options: ["sm", "md", "lg"],
      defaultValue: "md"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Switch",
      description: "A simple toggle switch",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "checked",
      title: "Checked by Default",
      description: "Switch that starts in the on position",
      code: jsxToString(<CheckedExample />),
    },
    {
      id: "disabled",
      title: "Disabled States",
      description: "Switches in disabled state",
      code: jsxToString(<DisabledExample />),
    },
    {
      id: "sizes",
      title: "Different Sizes",
      description: "Switches in various sizes",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "form",
      title: "In a Form",
      description: "Switch used within a form context",
      code: jsxToString(<FormExample />),
    },
  ]
};
