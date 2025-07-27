import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { TabsExample, LineNoDividerExample, SolidExample } from "./examples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export const componentConfig: ComponentConfig = {
  id: "tabs",
  name: "Tabs",
  description:
    "A set of layered sections of content—known as tab panels—that are displayed one at a time. Features Geist-style design with clean line indicators.",
  category: "navigation" as const,
  icon: "Tabs",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";`,
  componentId: "TabsExample",
  props: [
    {
      name: "variant",
      type: "select",
      options: ["line", "solid"],
      defaultValue: "line",
      description: "The visual style of the tabs.",
    },
    {
      name: "size",
      type: "select",
      options: ["default", "sm", "lg"],
      defaultValue: "default",
      description: "The size of the tabs (affects solid variant only).",
    },
    {
      name: "hideDivider",
      type: "boolean",
      defaultValue: false,
      description: "Hide the bottom divider line (line variant only).",
    },
    {
      name: "defaultValue",
      type: "string",
      defaultValue: "tab1",
      description: "The default active tab.",
    },
  ],
  examples: [
    {
      id: "tabs",
      title: "Line Style (Default)",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time. Features Geist-style design with clean line indicators.",
      code: jsxToString(<TabsExample />),
    },
    {
      id: "line-no-divider",
      title: "Line Without Divider",
      description: "Clean tabs without the bottom divider line",
      code: jsxToString(<LineNoDividerExample />),
    },
    {
      id: "solid",
      title: "Solid Variant",
      description:
        "Traditional tabs with solid background and rounded indicator",
      code: jsxToString(<SolidExample />),
    },
  ],
};
