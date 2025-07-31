import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { InspectorExample, NestedExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "inspector",
  name: "Inspector",
  description: "A component for inspecting and debugging component properties and state.",
  category: "media" as const,
  componentId: "inspector",
  icon: "Search",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Inspector } from "@patternmode/ui";`,
  props: [
    {
      name: "data",
      type: "string",
      defaultValue: "{}",
      description: "The data object to inspect."
    },
    {
      name: "expanded",
      type: "boolean",
      defaultValue: true,
      description: "Whether the inspector is expanded by default."
    }
  ],
  examples: [
    {
      id: "inspector",
      title: "Basic Inspector",
      description: "A component for inspecting and debugging component properties and state.",
      code: jsxToString(<InspectorExample />),
    },
    {
      id: "nested",
      title: "Nested Data Inspector",
      description: "Inspector with nested object data",
      code: jsxToString(<NestedExample />),
    },
  ]
};
