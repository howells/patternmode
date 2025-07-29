import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { ToggleExample, DefaultExample, WithIconExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "toggle",
  name: "Toggle",
  description: "A two-state button that can be either on or off.",
  category: "inputs" as const,
  icon: "ToggleLeft",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Toggle } from "@/components/ui/toggle/toggle";`,
  props: [
    {
      name: "children",
      type: "string",
      defaultValue: "Toggle",
      description: "The toggle button content."
    },
    {
      name: "pressed",
      type: "boolean",
      defaultValue: false,
      description: "The pressed state of the toggle."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Disable the toggle."
    },
    {
      name: "variant",
      type: "select",
      options: ["default", "outline"],
      defaultValue: "default",
      description: "The visual style variant."
    },
    {
      name: "size",
      type: "select",
      options: ["default", "sm", "icon", "icon-sm"],
      defaultValue: "default",
      description: "The size of the toggle."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "A two-state button that can be either on or off.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "with-icon",
      title: "With Icon",
      description: "A toggle button with an icon",
      code: jsxToString(<WithIconExample />)}
  ]
};
