import type { ComponentConfig } from "../../lib/component-config-types";

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
    // Core textarea props
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
      name: "name",
      type: "string",
      description: "Name attribute for form submission",
      defaultValue: "",
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the textarea",
      defaultValue: "",
    },
    {
      name: "required",
      type: "boolean",
      description: "Whether the textarea is required for form validation",
      defaultValue: false,
    },
    {
      name: "readOnly",
      type: "boolean",
      description: "Whether the textarea is read-only",
      defaultValue: false,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the textarea is disabled",
      defaultValue: false,
    },

    // Custom Textarea props
    {
      name: "hasError",
      type: "boolean",
      description: "Whether to display error styling for form validation",
      defaultValue: false,
    },
    {
      name: "autoResize",
      type: "boolean",
      description: "Whether to enable auto-resizing behavior using react-textarea-autosize. When true, uses TextareaAutosize component. When false, uses native textarea.",
      defaultValue: true,
    },

    // react-textarea-autosize props
    {
      name: "minRows",
      type: "number",
      description: "Minimum number of rows to display. The textarea will never be smaller than this height.",
      defaultValue: 3,
      min: 1,
    },
    {
      name: "maxRows",
      type: "number",
      description: "Maximum number of rows before scrolling. When content exceeds this height, the textarea will scroll instead of expanding.",
      defaultValue: undefined,
      min: 1,
    },
    {
      name: "onHeightChange",
      type: "(height: number, meta: { rowHeight: number }) => void",
      description: "Callback when textarea height changes. Useful for adjusting parent container layouts or tracking resize events.",
      defaultValue: "",
    },
    {
      name: "cacheMeasurements",
      type: "boolean",
      description: "Cache measurements for better performance. Enable this for textareas that resize frequently to avoid recalculating dimensions.",
      defaultValue: false,
    },

    // Standard HTML textarea props (when autoResize=false)
    {
      name: "rows",
      type: "number",
      description: "Number of visible text lines (only used when autoResize=false)",
      defaultValue: undefined,
      min: 1,
    },
    {
      name: "cols",
      type: "number",
      description: "Visible width of the text control (only used when autoResize=false)",
      defaultValue: undefined,
      min: 1,
    },

    // Styling props
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the textarea",
      defaultValue: "",
    },
    {
      name: "style",
      type: "React.CSSProperties",
      description: "Standard CSS style object. Note: When using react-textarea-autosize, height styles are managed internally.",
      defaultValue: undefined,
    },

    // Preview-only props (not part of actual component)
    {
      name: "showWithContent",
      type: "boolean",
      description: "Show textarea with initial content in preview (preview-only prop)",
      defaultValue: false,
    },
  ],
};
