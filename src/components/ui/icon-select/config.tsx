import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { IconSelectExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "icon-select",
  name: "Icon Select",
  description:
    "A tree-shakable searchable icon picker with access to all 3,644+ Lucide React icons using dynamic loading.",
  category: "inputs" as const,
  icon: "Smile",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { IconSelect } from "@/components/ui/icon-select";`,
  componentId: "IconSelectExample",
  props: [
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Select an icon",
      description: "Placeholder text when no icon is selected."
    },
    {
      name: "value",
      type: "string",
      description: "The selected icon name."
    },
    {
      name: "onValueChange",
      type: "function",
      description: "Callback when icon selection changes."
    },
    {
      name: "iconStrokeWidth",
      type: "number",
      defaultValue: "1",
      description:
        "Stroke width for icons (uses centralized config by default)."
    }
  ],
  examples: [
    {
      id: "icon-select",
      title: "Default",
      description:
        "A tree-shakable icon picker with access to all Lucide React icons via dynamic loading.",
      code: jsxToString(<IconSelectExample />),
    }
  ]
};
