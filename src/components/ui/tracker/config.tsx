import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { TrackerExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "tracker",
  name: "Tracker",
  description: "A visual progress tracker showing steps or stages in a process.",
  category: "data" as const,
  icon: "GitCommitHorizontal",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Tracker } from "@/components/ui/tracker/tracker";`,
  props: [
    {
      name: "data",
      type: "string",
      defaultValue: '[{"color":"bg-emerald-500","tooltip":"Step 1: Completed"},{"color":"bg-blue-500","tooltip":"Step 2: In Progress"},{"color":"bg-zinc-300","tooltip":"Step 3: Pending"}]',
      description: "JSON string of tracker block data with color, tooltip, and other properties."
    },
    {
      name: "defaultBackgroundColor",
      type: "string",
      defaultValue: '"bg-zinc-400 dark:bg-zinc-400"',
      description: "Default background color for blocks without a specified color."
    },
    {
      name: "hoverEffect",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to apply hover opacity effect to blocks."
    },
  ],
  examples: [
    {
      id: "tracker",
      title: "Basic Tracker",
      description: "A visual progress tracker showing steps or stages in a process.",
      code: jsxToString(<TrackerExample />),
    },
  ],
};
