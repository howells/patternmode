import React from "react";
// Configuration data - no React imports or JSX
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { DefaultExample, CustomLabelsExample, LongTextExample  } from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "copy-button",
  name: "Copy Button",
  description:
    "A button component that copies text to the clipboard with customizable labels and icons.",
  category: "utility" as const,
  icon: "Copy",

  installation: {
    npm: "lucide-react"
  },
  importStatement: `import { CopyButton } from "@/components/ui/copy-button/copy-button";`,
  componentId: "CopyButtonExample",

  // Props that users can experiment with
  props: [
    {
      name: "text",
      type: "string",
      description: "The text to copy to clipboard.",
      defaultValue: "Hello, World!"
    },
    {
      name: "copyLabel",
      type: "string",
      description: "Label shown before copying.",
      defaultValue: "Copy"
    },
    {
      name: "copiedLabel",
      type: "string",
      description: "Label shown after copying.",
      defaultValue: "Copied"
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the button is disabled.",
      defaultValue: false
    }
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic copy button with default styling.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "custom-labels",
      title: "Custom Labels",
      description: "Copy button with custom labels.",
      code: jsxToString(<CustomLabelsExample />)},
    {
      id: "long-text",
      title: "Long Text",
      description: "Copy button with longer text content.",
      code: jsxToString(<LongTextExample />)}
  ]
};
