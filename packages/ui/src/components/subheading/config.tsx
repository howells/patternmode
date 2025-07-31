import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { DefaultExample, LevelsExample, SubheadingExample, WithContentExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "subheading",
  name: "Subheading",
  description:
    "A styled subheading component for section titles and content organization.",
  category: "text" as const,
  icon: "Heading2",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Subheading } from "@patternmode/ui";`,
  componentId: "SubheadingExample",
  props: [
    {
      name: "level",
      type: "select",
      description: "Heading level",
      options: ["1", "2", "3", "4", "5", "6"],
      defaultValue: "3"
    },
    {
      name: "children",
      type: "string",
      description: "Subheading text",
      defaultValue: "Section Title"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Subheading",
      description: "A simple subheading component",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "levels",
      title: "Different Levels",
      description: "Subheadings at different hierarchy levels",
      code: jsxToString(<LevelsExample />),
    },
    {
      id: "with-content",
      title: "Subheading with Content",
      description: "Subheading used to organize content sections",
      code: jsxToString(<WithContentExample />),
    },
  ]
};
