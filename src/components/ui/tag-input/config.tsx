import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { TagInputExample, DefaultExample, WithInitialValuesExample, WithMaxTagsExample, WithTagCreationExample, CustomTagRenderingExample, DisabledExample, WithHookExample, ComplexExample, BlogPostTagsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "tag-input",
  name: "Tag Input",
  description:
    "A multi-select input component for selecting and creating tags with inline display, built with Downshift for accessibility.",
  category: "forms" as const,
  icon: "Tags",

  installation: {
    npm: "@downshift-js/downshift",
  },
  importStatement: `import { TagInput } from "@/components/ui/tag-input";`,
  componentId: "TagInputExample",
  props: [
    {
      name: "options",
      type: "TagOption[]",
      description: "Array of available tag options",
      defaultValue: "[]",
    },
    {
      name: "value",
      type: "string[]",
      description: "Currently selected tag values",
      defaultValue: "[]",
    },
    {
      name: "onValueChange",
      type: "(values: string[]) => void",
      description: "Callback when selection changes",
      defaultValue: "",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text for the input",
      defaultValue: "Add tags...",
    },
    {
      name: "selectedPlaceholder",
      type: "string",
      description: "Placeholder text when tags are selected",
      defaultValue: "Add more tags...",
    },
    {
      name: "maxTags",
      type: "number",
      description: "Maximum number of tags that can be selected",
      defaultValue: "",
    },
    {
      name: "allowCreate",
      type: "boolean",
      description: "Whether to allow creating new tags not in options",
      defaultValue: false,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Whether the input is disabled",
      defaultValue: false,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for container",
      defaultValue: "",
    },
    {
      name: "showBasic",
      type: "boolean",
      description: "Show basic tag input example",
      defaultValue: true,
    },
    {
      name: "showWithUsers",
      type: "boolean",
      description: "Show tag input with user avatars example",
      defaultValue: false,
    },
    {
      name: "showWithCreation",
      type: "boolean",
      description: "Show tag input with tag creation example",
      defaultValue: false,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Tag Input",
      description: "Simple tag input for selecting multiple technologies",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-initial-values",
      title: "With Initial Values",
      description: "Tag input with pre-selected values",
      code: jsxToString(<WithInitialValuesExample />),
    },
    {
      id: "with-max-tags",
      title: "With Max Tags Limit",
      description: "Tag input with maximum selection limit",
      code: jsxToString(<WithMaxTagsExample />),
    },
    {
      id: "with-tag-creation",
      title: "With Tag Creation",
      description: "Allow creating new tags on-the-fly",
      code: jsxToString(<WithTagCreationExample />),
    },
    {
      id: "custom-rendering",
      title: "Custom Tag Rendering",
      description: "Custom rendering for both tags and dropdown items",
      code: jsxToString(<CustomTagRenderingExample />),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Tag input in disabled state",
      code: jsxToString(<DisabledExample />),
    },
    {
      id: "with-hook",
      title: "Using Hook",
      description: "Tag input with useTagInput hook for state management",
      code: jsxToString(<WithHookExample />),
    },
    {
      id: "complex",
      title: "Complex Example",
      description: "Location selector with creation and limits",
      code: jsxToString(<ComplexExample />),
    },
    {
      id: "blog-post-tags",
      title: "Blog Post Tags",
      description: "Real-world example for blog post tagging",
      code: jsxToString(<BlogPostTagsExample />),
    },
  ],
};
