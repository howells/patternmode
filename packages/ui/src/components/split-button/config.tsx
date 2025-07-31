import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import {
    DefaultExample,
    SplitButtonExample,
    WithIconsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "split-button",
  name: "Split Button",
  description: "A button with a dropdown menu for secondary actions.",
  category: "inputs" as const,
  icon: "SeparatorVertical",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { SplitButton } from "@patternmode/ui";`,
  componentId: "SplitButtonExample",
  props: [
    {
      name: "variant",
      type: "select",
      description: "Button variant",
      options: ["default", "outline", "ghost", "destructive"],
      defaultValue: "default",
    },
    {
      name: "size",
      type: "select",
      description: "Button size",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Split Button",
      description: "A button with dropdown for additional actions",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-icons",
      title: "Split Button with Icons",
      description: "Split button with icons in menu items",
      code: jsxToString(<WithIconsExample />),
    },
  ],
};
