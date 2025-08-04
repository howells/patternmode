import type { ComponentConfig } from "../../lib/component-config-types";
import { Type } from "lucide-react";
import { Code, Strong, Text, TextLink } from "./component";
import {
  BasicExample,
  ColorInheritanceExample,
  SemanticElementsExample,
  SizesExample,
  TechnicalDocumentationExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "text",
  name: "Text",
  description: "Typography component with consistent text styling and semantic meaning.",
  category: "display",
  featured: true,
  icon: Type,
  importStatement: `import { Text, TextLink, Strong, Code } from "@patternmode/ui/text";`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Basic text paragraphs",
      component: BasicExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different text sizes from 2xs to xl",
      component: SizesExample,
    },
    {
      id: "semantic-elements",
      title: "Semantic Elements",
      description: "Text with strong, code, and link elements",
      component: SemanticElementsExample,
    },
    {
      id: "color-inheritance",
      title: "Color Inheritance",
      description: "Text inheriting colors from parent elements",
      component: ColorInheritanceExample,
    },
    {
      id: "technical-documentation",
      title: "Technical Documentation",
      description: "Example of technical content with inline elements",
      component: TechnicalDocumentationExample,
    },
  ],
  components: [
    {
      name: "Text",
      description: "Main text component for paragraph content",
      component: Text,
      primary: true,
    },
    {
      name: "TextLink",
      description: "Link component for navigation within text",
      component: TextLink,
    },
    {
      name: "Strong",
      description: "Strong text component for emphasis",
      component: Strong,
    },
    {
      name: "Code",
      description: "Inline code component for code snippets",
      component: Code,
    },
  ],
};
