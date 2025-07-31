import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { ControlledExample, DefaultExample, PopoverExample, PositionsExample, RichContentExample, WithArrowExample, WithCloseExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "popover",
  name: "Popover",
  description: "Popover component built on Base UI with customizable positioning and rich content support.",
  category: "overlay" as const,
  icon: "MessageCircle",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Popover, PopoverContent, PopoverTrigger } from "@patternmode/ui";`,
  componentId: "PopoverExample",
  props: [
    {
      name: "open",
      type: "boolean",
      defaultValue: false,
      description: "Controlled open state of the popover."
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: false,
      description: "Default open state when uncontrolled."
    },
    {
      name: "onOpenChange",
      type: "function",
      defaultValue: undefined,
      description: "Event handler called when the open state changes."
    },
    {
      name: "placement",
      type: "select",
      options: ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"],
      defaultValue: "bottom",
      description: "The placement of the popover relative to its trigger."
    },
    {
      name: "offset",
      type: "number",
      defaultValue: 8,
      description: "The distance between the popover and its trigger."
    },
    {
      name: "arrow",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show an arrow pointing to the trigger."
    },
    {
      name: "sideOffset",
      type: "number",
      defaultValue: 0,
      description: "The distance from the side when using side placements."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Popover component built on Base UI with customizable positioning and rich content support.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "positions",
      title: "Positions",
      description: "Popovers positioned on different sides.",
      code: jsxToString(<PositionsExample />),
    },
    {
      id: "with-arrow",
      title: "With Arrow",
      description: "Popover with pointing arrow.",
      code: jsxToString(<WithArrowExample />),
    },
    {
      id: "with-close",
      title: "With Close Button",
      description: "Popover with a close button in the header.",
      code: jsxToString(<WithCloseExample />),
    },
    {
      id: "rich-content",
      title: "Rich Content",
      description: "Popover with custom content including buttons and form elements.",
      code: jsxToString(<RichContentExample />),
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Popover with controlled open state.",
      code: jsxToString(<ControlledExample />),
    },
  ]
};
