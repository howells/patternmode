import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { ColoredExample, ComplexExample, DefaultExample, DismissibleExample, WithAvatarsExample, WithCountsExample, WithLabelsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "tag",
  name: "Tag",
  description:
    "A label or keyword used to categorize or describe content with optional dismiss functionality.",
  category: "feedback" as const,
  icon: "Tag",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Tag } from "@/components/ui/tag";`,
  componentId: "TagExample",
  props: [
    {
      name: "value",
      type: "string",
      description: "The main text content of the tag",
      defaultValue: "Design",
    },
    {
      name: "label",
      type: "string",
      description: "Optional label text (e.g., 'Department', 'Location')",
      defaultValue: "",
    },
    {
      name: "count",
      type: "string | number",
      description: "Optional count or secondary text",
      defaultValue: "",
    },
    {
      name: "dismissible",
      type: "boolean",
      description: "Whether the tag can be dismissed",
      defaultValue: false,
    },
    {
      name: "dismissAriaLabel",
      type: "string",
      description: "Aria label for the dismiss button",
      defaultValue: "Remove tag",
    },
    {
      name: "avatar",
      type: "object",
      description:
        "Avatar configuration for user tags (object with src, alt, initials)",
      defaultValue: "",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
      defaultValue: "",
    },
    {
      name: "showBasicTags",
      type: "boolean",
      description: "Show multiple basic tags example",
      defaultValue: false,
    },
    {
      name: "showWithLabels",
      type: "boolean",
      description: "Show tags with labels example",
      defaultValue: false,
    },
    {
      name: "showWithCounts",
      type: "boolean",
      description: "Show tags with counts example",
      defaultValue: false,
    },
    {
      name: "showDismissible",
      type: "boolean",
      description: "Show dismissible tags example",
      defaultValue: false,
    },
    {
      name: "showWithAvatars",
      type: "boolean",
      description: "Show tags with avatars example",
      defaultValue: false,
    },
    {
      name: "showComplex",
      type: "boolean",
      description: "Show complex tags example",
      defaultValue: false,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Tags",
      description: "Simple tags for categorizing content",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-labels",
      title: "With Labels",
      description: "Tags with descriptive labels",
      code: jsxToString(<WithLabelsExample />),
    },
    {
      id: "with-counts",
      title: "With Counts",
      description: "Tags displaying counts or additional information",
      code: jsxToString(<WithCountsExample />),
    },
    {
      id: "dismissible",
      title: "Dismissible Tags",
      description: "Tags that can be removed by the user",
      code: jsxToString(<DismissibleExample />),
    },
    {
      id: "with-avatars",
      title: "With Avatars",
      description: "Tags displaying user avatars",
      code: jsxToString(<WithAvatarsExample />),
    },
    {
      id: "complex",
      title: "Complex Example",
      description: "Advanced tag usage with multiple features",
      code: jsxToString(<ComplexExample />),
    },
    {
      id: "colored",
      title: "Colored Tags",
      description: "Tags with custom colors for different states",
      code: jsxToString(<ColoredExample />),
    },
  ],
};
