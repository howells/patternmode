import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { CollapsibleExample, DefaultExample, DefaultOpenExample, DisabledExample, NestedContentExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "collapsible",
  name: "Collapsible",
  description:
    "A collapsible component built on Base UI for expandable content sections with smooth animations.",
  category: "data" as const,
  icon: "ChevronUp",

  importStatement: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";`,
  componentId: "CollapsibleExample",
  props: [
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: false,
      description: "Whether the collapsible is open by default."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the collapsible is disabled."
    },
    {
      name: "title",
      type: "string",
      defaultValue: "Click to expand",
      description: "The title text for the trigger."
    },
    {
      name: "closedIcon",
      type: "icon",
      description: "Icon to display when the collapsible is closed."
    },
    {
      name: "openIcon",
      type: "icon",
      description: "Icon to display when the collapsible is open."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic collapsible with trigger and content.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "default-open",
      title: "Default Open",
      description: "Collapsible that is open by default.",
      code: jsxToString(<DefaultOpenExample />)},
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled collapsible that cannot be interacted with.",
      code: jsxToString(<DisabledExample />)},
    {
      id: "nested-content",
      title: "Rich Content",
      description: "Collapsible with complex nested content.",
      code: jsxToString(<NestedContentExample />)}
  ]
};