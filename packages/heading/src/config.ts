import type { ComponentConfig } from "@patternmode/config/component-types";
import { Type } from "lucide-react";
import { Heading } from "./component";
import { CustomStyleExample, DefaultExample, LevelsExample, SemanticHierarchyExample } from "./examples";

export const headingConfig: ComponentConfig = {
  id: "heading",
  name: "Heading",
  description: "Heading component with hierarchical levels and consistent typography styling.",
  category: "typography",
  featured: true,
  icon: Type,
  importStatement: `import { Heading } from "@patternmode/ui/heading";`,
  examples: [
    { id: "default", title: "Default", description: "Basic heading component", component: DefaultExample },
    { id: "levels", title: "Heading Levels", description: "All heading levels from h1 to h6", component: LevelsExample },
    { id: "semantic-hierarchy", title: "Semantic Hierarchy", description: "Example of proper heading hierarchy in an article", component: SemanticHierarchyExample },
    { id: "custom-style", title: "Custom Styling", description: "Headings with custom styling and classes", component: CustomStyleExample }
  ],
  components: [
    {
      name: "Heading",
      description: "Styled heading component with semantic hierarchy",
      component: Heading,
      primary: true,
    },
  ],
};

