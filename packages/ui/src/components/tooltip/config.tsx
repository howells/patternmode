import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { ControlledExample, NoArrowExample, PositionsExample, RichContentExample, SizesExample, TooltipExample, VariantsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "tooltip",
  name: "Tooltip",
  description: "Tooltip component built on Base UI with customizable positioning and styling variants.",
  category: "overlay" as const,
  icon: "Info",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Tooltip, TooltipContent, TooltipTrigger } from "@patternmode/ui";`,
  componentId: "TooltipExample",
  props: [
    {
      name: "content",
      type: "string",
      defaultValue: "Tooltip content",
      description: "The tooltip content."
    },
    {
      name: "side",
      type: "select",
      options: ["top", "right", "bottom", "left"],
      defaultValue: "top",
      description: "The preferred side of the trigger to place the tooltip."
    },
    {
      name: "variant",
      type: "select",
      options: ["default", "dark", "light"],
      defaultValue: "default",
      description: "The visual style variant."
    },
    {
      name: "size",
      type: "select",
      options: ["sm", "default"],
      defaultValue: "default",
      description: "The size of the tooltip."
    },
    {
      name: "showArrow",
      type: "boolean",
      defaultValue: true,
      description: "Show the tooltip arrow."
    },
    {
      name: "delayDuration",
      type: "number",
      defaultValue: 500,
      description: "The delay in milliseconds before showing the tooltip."
    }
  ],
  examples: [
    {
      id: "tooltip",
      title: "Default",
      description: "Tooltip component built on Base UI with customizable positioning and styling variants.",
      code: jsxToString(<TooltipExample />),
    },
    {
      id: "positions",
      title: "Positions",
      description: "Tooltips positioned on different sides.",
      code: jsxToString(<PositionsExample />),
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different visual variants of tooltips.",
      code: jsxToString(<VariantsExample />),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants of tooltips.",
      code: jsxToString(<SizesExample />),
    },
    {
      id: "no-arrow",
      title: "Without Arrow",
      description: "Tooltip without the pointing arrow.",
      code: jsxToString(<NoArrowExample />),
    },
    {
      id: "rich-content",
      title: "Rich Content",
      description: "Tooltip with rich JSX content.",
      code: jsxToString(<RichContentExample />),
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Tooltip with controlled open state.",
      code: jsxToString(<ControlledExample />),
    },
  ],
};