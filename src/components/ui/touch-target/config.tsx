import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { TouchTargetExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "touch-target",
  name: "Touch Target",
  description: "A component that ensures touch targets meet accessibility guidelines for minimum size.",
  category: "utility" as const,
  icon: "Hand",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { TouchTarget } from "@patternmode/ui";`,
  componentId: "TouchTargetExample",
  props: [
    {
      name: "children",
      type: "string",
      defaultValue: "Interactive element",
      description: "The content to wrap with touch target."
    },
  ],
  examples: [
    {
      id: "touch-target",
      title: "Basic Touch Target",
      description: "A component that ensures touch targets meet accessibility guidelines for minimum size.",
      code: jsxToString(<TouchTargetExample />),
    },
  ],
};
