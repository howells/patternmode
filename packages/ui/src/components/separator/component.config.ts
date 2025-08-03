import type { ComponentConfig } from "../../lib/component-config-types";
import { Minus } from "lucide-react";
import { Separator } from "./component";
import { ContentSectionsExample, DefaultExample, SizesExample, VariantsExample, VerticalExample, WithTextExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "separator",
  name: "Separator",
  description: "A visual separator component built on Base UI's Separator primitive for content division. Provides accessible visual division elements with horizontal and vertical orientations, multiple styling variants, and optional text labels.",
  category: "ui",
  icon: Minus,
  importStatement: `import { Separator } from "@patternmode/ui/separator";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic horizontal separator for dividing content",
      component: DefaultExample,
    },
    {
      id: "with-text",
      title: "With Text",
      description: "Separator with centered text label",
      component: WithTextExample,
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Vertical separator for navigation and inline content",
      component: VerticalExample,
    },
    {
      id: "variants",
      title: "Variants",
      description: "Different visual style variants (subtle, default, strong)",
      component: VariantsExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different sizes and spacing options",
      component: SizesExample,
    },
    {
      id: "content-sections",
      title: "Content Sections",
      description: "Using separators to organize content sections",
      component: ContentSectionsExample,
    },
  ],
  components: [
    {
      name: "Separator",
      description: "Visual separator element for creating content divisions and structure.",
      component: Separator,
      primary: true,
    },
  ],
};
