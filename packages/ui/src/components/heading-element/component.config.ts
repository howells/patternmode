import type { ComponentConfig } from "../../lib/component-config-types";
import { Heading } from "lucide-react";
import { HeadingElement } from "./component";

export const componentConfig: ComponentConfig = {
  id: "heading-element",
  name: "Heading Element",
  description: "Semantic heading element component with proper HTML heading structure (h1-h6).",
  category: "typography",
  icon: Heading,
  importStatement: `import { HeadingElement } from "@patternmode/ui/heading-element";`,
  examples: [],
  components: [
    {
      name: "HeadingElement",
      description: "Semantic heading element with configurable level",
      component: HeadingElement,
      primary: true,
    },
  ],
};
