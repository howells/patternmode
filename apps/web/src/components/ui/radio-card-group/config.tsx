import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { RadioCardGroupExample, DefaultExample, HorizontalExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "radio-card-group",
  name: "Radio Card Group",
  description: "A group of selectable cards that behave like radio buttons.",
  category: "inputs" as const,
  icon: "Circle",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { RadioCardGroup, RadioCard } from "@patternmode/ui";`,
  componentId: "RadioCardGroupExample",
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
  ],
  examples: [
    {
      id: "default",
      title: "Basic Radio Card Group",
      description: "A group of selectable cards",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "horizontal",
      title: "Horizontal Layout",
      description: "Radio cards arranged horizontally",
      code: jsxToString(<HorizontalExample />),
    },
  ]
};
