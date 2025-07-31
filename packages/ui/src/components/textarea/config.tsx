import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, DisabledExample, FixedHeightExample, FormIntegrationExample, PerformanceExample, WithContentExample, WithErrorExample, WithHeightCallbackExample, WithRowConstraintsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "textarea",
  name: "Textarea",
  description:
    "Auto-resizing multi-line text input component built on react-textarea-autosize with configurable constraints and error states.",
  category: "inputs" as const,
  icon: "Type",

  installation: {
    npm: "react-textarea-autosize",
  },
  importStatement: `import { Textarea } from "@/components/ui/textarea";`,
  componentId: "TextareaExample",
  props: [
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text shown when empty",
      defaultValue: "",
    },
    {
      name: "value",
      type: "string",
      description: "Current value of the textarea",
      defaultValue: "",
    },
    {
      name: "onChange",
      type: "(event: ChangeEvent<HTMLTextAreaElement>) => void",
      description: "Callback fired when value changes",
      defaultValue: "",
    },
    {
      name: "hasError",
      type: "boolean",
      description: "Whether to display error styling",
      defaultValue: false,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the textarea is disabled",
      defaultValue: false,
    },
    {
      name: "autoResize",
      type: "boolean",
      description: "Whether to enable auto-resizing functionality",
      defaultValue: true,
    },
    {
      name: "minRows",
      type: "number",
      description: "Minimum number of rows to display",
      defaultValue: 3,
    },
    {
      name: "maxRows",
      type: "number",
      description: "Maximum number of rows before scrolling",
      defaultValue: "",
    },
    {
      name: "onHeightChange",
      type: "(height: number, meta: { rowHeight: number }) => void",
      description: "Callback fired when textarea height changes",
      defaultValue: "",
    },
    {
      name: "cacheMeasurements",
      type: "boolean",
      description: "Cache measurements for better performance",
      defaultValue: false,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
      defaultValue: "",
    },
    {
      name: "showWithContent",
      type: "boolean",
      description: "Show textarea with initial content in preview",
      defaultValue: false,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Auto-Resizing Textarea",
      description:
        "Basic textarea that automatically adjusts height based on content",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-content",
      title: "With Initial Content",
      description: "Textarea with pre-filled content demonstrating auto-resize",
      code: jsxToString(<WithContentExample />),
    },
    {
      id: "with-row-constraints",
      title: "With Row Constraints",
      description: "Textarea with minimum and maximum row limits",
      code: jsxToString(<WithRowConstraintsExample />),
    },
    {
      id: "with-error",
      title: "Error State",
      description: "Textarea with error styling and validation",
      code: jsxToString(<WithErrorExample />),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Non-interactive textarea with disabled styling",
      code: jsxToString(<DisabledExample />),
    },
    {
      id: "fixed-height",
      title: "Fixed Height",
      description: "Textarea with auto-resize disabled for fixed height",
      code: jsxToString(<FixedHeightExample />),
    },
    {
      id: "with-height-callback",
      title: "Height Change Tracking",
      description: "Textarea with callback to track height changes",
      code: jsxToString(<WithHeightCallbackExample />),
    },
    {
      id: "form-integration",
      title: "Form Integration",
      description: "Complete form example with multiple textareas",
      code: jsxToString(<FormIntegrationExample />),
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Textarea with measurement caching for better performance",
      code: jsxToString(<PerformanceExample />),
    },
  ],
};
