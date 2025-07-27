import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { HeadingElementExample, DefaultExample, AllLevelsExample, StyledExample, AccessibilityExample, SemanticHierarchyExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "heading-element",
  name: "Heading Element",
  description:
    "A semantic heading element component that dynamically renders the appropriate HTML heading tag (h1-h6) based on the level prop. Provides the foundation for styled heading components while maintaining semantic HTML structure.",
  category: "text" as const,
  icon: "Heading",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { HeadingElement } from "@/components/ui/heading-element/heading-element";`,
  componentId: "HeadingElementExample",
  props: [
    {
      name: "level",
      type: "select",
      defaultValue: "1",
      description:
        "Heading level determining which HTML element to render (h1-h6).",
      options: [
        { value: "1", label: "1 (h1)" },
        { value: "2", label: "2 (h2)" },
        { value: "3", label: "3 (h3)" },
        { value: "4", label: "4 (h4)" },
        { value: "5", label: "5 (h5)" },
        { value: "6", label: "6 (h6)" },
      ],
    },
    {
      name: "children",
      type: "textarea",
      defaultValue: "Heading Text",
      description: "The heading content to display.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: "",
      description: "Additional CSS classes for styling.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic heading elements with different levels.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "all-levels",
      title: "All Levels",
      description: "All six heading levels (h1-h6) displayed together.",
      code: jsxToString(<AllLevelsExample />),
    },
    {
      id: "styled",
      title: "Custom Styling",
      description: "Heading elements with custom CSS classes and styling.",
      code: jsxToString(<StyledExample />),
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description:
        "Heading elements with accessibility attributes and screen reader considerations.",
      code: jsxToString(<AccessibilityExample />),
    },
    {
      id: "semantic-hierarchy",
      title: "Semantic Hierarchy",
      description:
        "Real-world example showing proper heading hierarchy in article content.",
      code: jsxToString(<SemanticHierarchyExample />),
    },
  ],
};
