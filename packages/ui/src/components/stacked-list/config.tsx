import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, EmptyStateExample, InCardExample, InteractiveExample, StackedListExample, WithIconsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "stacked-list",
  name: "Stacked List",
  description:
    "A list component that displays items in a vertically stacked layout with dividers and structured content.",
  category: "data" as const,
  icon: "List",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { StackedList } from "@patternmode/ui";`,
  componentId: "StackedListExample",
  props: [
    {
      name: "showDividers",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to show dividers between list items",
    },
    {
      name: "gap",
      type: "number",
      defaultValue: "0",
      description: "Gap between list items",
    },
    {
      name: "padding",
      type: "number",
      defaultValue: "4",
      description: "Padding around the list container",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Stacked List",
      description:
        "A list with team members showing avatars, names, and actions",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "in-card",
      title: "In Card Container",
      description: "Stacked list inside a card with recent activity",
      code: jsxToString(<InCardExample />),
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "List items with icons and status badges",
      code: jsxToString(<WithIconsExample />),
    },
    {
      id: "interactive",
      title: "Interactive Items",
      description: "Clickable list items with different interaction patterns",
      code: jsxToString(<InteractiveExample />),
    },
    {
      id: "empty-state",
      title: "Empty State",
      description: "List with empty state when no items are present",
      code: jsxToString(<EmptyStateExample />),
    },
  ],
};
