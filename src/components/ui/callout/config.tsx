import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, SuccessExample, ErrorExample, WarningExample, NeutralExample, WithIconExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "callout",
  name: "Callout",
  description:
    "An alert component that displays important information with optional icon and variant styling.",
  category: "feedback" as const,
  icon: "MessageCircle",

  importStatement: `import { Callout } from "@/components/ui/callout";`,
  componentId: "CalloutExample",
  props: [
    {
      name: "title",
      type: "string",
      defaultValue: "Important Information",
      description:
        "The title text displayed in the callout. Either title or children must be provided.",
      required: false
    },
    {
      name: "variant",
      type: "select",
      options: ["default", "success", "error", "warning", "neutral"],
      defaultValue: "default",
      description: "The variant style of the callout."
    },
    {
      name: "icon",
      type: "icon",
      defaultValue: "Info",
      description: "Optional icon displayed before the title."
    },
    {
      name: "children",
      type: "textarea",
      defaultValue:
        "This callout contains important information that requires your attention. It can include multiple sentences and longer content to demonstrate how the component handles extended text. The callout will automatically adjust its height to accommodate the content while maintaining proper styling and readability.",
      description: "The content displayed below the title."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic callout with default styling.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "success",
      title: "Success",
      description: "Success callout for positive feedback.",
      code: jsxToString(<SuccessExample />)},
    {
      id: "error",
      title: "Error",
      description: "Error callout for warnings or errors.",
      code: jsxToString(<ErrorExample />)},
    {
      id: "warning",
      title: "Warning",
      description: "Warning callout for important notices.",
      code: jsxToString(<WarningExample />)},
    {
      id: "neutral",
      title: "Neutral",
      description: "Neutral callout for general information.",
      code: jsxToString(<NeutralExample />)},
    {
      id: "with-icon",
      title: "With Icon",
      description: "Callout with an icon.",
      code: jsxToString(<WithIconExample />)}
  ]
};
