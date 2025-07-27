import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { TrackerExample, TrackerExample } from "./examples";
import { Tracker } from "./tracker";

export const componentConfig: ComponentConfig = {
  id: "tracker",
  name: "Tracker",
  description: "A visual progress tracker showing steps or stages in a process.",
  category: "utility" as const,
  icon: "GitCommitHorizontal",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Tracker } from "@/components/ui/tracker/tracker";`,
  componentId: "TrackerExample",
  props: [
    {
      name: "data",
      type: "string",
      defaultValue: "[]",
      description: "The tracker data array."
    },
  ],
  examples: [
    {
      id: "tracker",
      title: "Basic Tracker",
      description: "A visual progress tracker showing steps or stages in a process.",
      code: jsxToString(<Basic />)}
  ]
};
