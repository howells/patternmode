import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { buttonSizeOptions } from "../button/button";
import { LineIndicatorTestExample, LineNoDividerExample, LineWithIconsExample, SolidExample, SolidWithIconsExample, TabsExample } from "./examples";

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
  importStatement: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";`,
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
      options: buttonSizeOptions,
      defaultValue: "default",
      description: "The size of the tabs (inherits from Button component sizes).",
    },
    {
      name: "hideDivider",
      type: "boolean",
      defaultValue: false,
      description: "Hide the bottom divider line (line variant only).",
    },
    {
      name: "showIcons",
      type: "boolean",
      defaultValue: false,
      description: "Show icons in tab triggers (works for both variants).",
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
      id: "line-indicator-test",
      title: "Line Indicator Test",
      description: "Test example to verify the line indicator animates properly with different tab widths",
      code: jsxToString(<LineIndicatorTestExample />),
    },
    {
      id: "line-with-icons",
      title: "Line Style with Icons",
      description: "Line variant tabs with left icons using Button component",
      code: jsxToString(<LineWithIconsExample />),
    },
    {
      id: "solid",
      title: "Solid Variant",
      description:
        "Traditional tabs with solid background and rounded indicator",
      code: jsxToString(<SolidExample />),
    },
    {
      id: "solid-with-icons",
      title: "Solid Variant with Icons",
      description: "Solid variant tabs with left icons using Button component",
      code: jsxToString(<SolidWithIconsExample />),
    },
  ],
};
