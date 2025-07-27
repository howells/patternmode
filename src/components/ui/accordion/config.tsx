import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import React from "react";
import { DefaultExample, MultipleOpenExample } from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "accordion",
  name: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each control a panel of content.",
  category: "data" as const,
  icon: "ChevronDown",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion/accordion";`,
  componentId: "AccordionExample",

  // Props that users can experiment with
  props: [
    {
      name: "openMultiple",
      type: "boolean",
      description:
        "If true, multiple accordion items can be open at the same time.",
      defaultValue: false,
    },
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic accordion with default settings.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "multiple-open",
      title: "Multiple Open",
      description: "Accordion allowing multiple items to be open.",
      code: jsxToString(<MultipleOpenExample />),
    },
  ],
};
