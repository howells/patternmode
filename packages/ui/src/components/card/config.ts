import type { ComponentConfig } from "../../lib/component-config-types";
import { Square } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeading,
} from "./component";
import {
  CompactExample,
  CustomStylingExample,
  DashedExample,
  DefaultExample,
  FillHeightExample,
  FullStructureExample,
  GridExample,
  InteractiveExample,
  NestedExample,
  NoPaddingExample,
  ProductCardExample,
  WithTitleExample,
} from "./examples";

export const cardConfig: ComponentConfig = {
  id: "card",
  name: "Card",
  description: "Container component with consistent styling for grouping related content.",
  category: "display",
  featured: true,
  icon: Square,
  importStatement: `import { Card, CardHeader, CardHeading, CardDescription, CardContent, CardFooter } from "@patternmode/ui/card";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic card with simple content",
      component: DefaultExample,
    },
    {
      id: "full-structure",
      title: "Full Structure",
      description: "Card with header, content, and footer sections",
      component: FullStructureExample,
    },
    {
      id: "with-title",
      title: "With Title",
      description: "Card with header and title",
      component: WithTitleExample,
    },
    {
      id: "compact",
      title: "Compact",
      description: "Card with reduced padding",
      component: CompactExample,
    },
    {
      id: "no-padding",
      title: "No Padding",
      description: "Card with custom padding structure",
      component: NoPaddingExample,
    },
    {
      id: "dashed",
      title: "Dashed",
      description: "Dashed border variant for drop zones",
      component: DashedExample,
    },
    {
      id: "custom-styling",
      title: "Custom Styling",
      description: "Card with custom color theme",
      component: CustomStylingExample,
    },
    {
      id: "nested",
      title: "Nested",
      description: "Cards nested within other cards",
      component: NestedExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Clickable card using render prop",
      component: InteractiveExample,
    },
    {
      id: "grid",
      title: "Grid",
      description: "Cards arranged in a grid layout",
      component: GridExample,
    },
    {
      id: "fill-height",
      title: "Fill Height",
      description: "Cards that fill container height",
      component: FillHeightExample,
    },
    {
      id: "product-card",
      title: "Product Card",
      description: "Example of a product card layout",
      component: ProductCardExample,
    },
  ],
  components: [
    {
      name: "Card",
      description: "Main card container with flexible styling options",
      component: Card,
      primary: true,
    },
    {
      name: "CardHeader",
      description: "Header section for titles and actions",
      component: CardHeader,
    },
    {
      name: "CardHeading",
      description: "Title heading with consistent typography",
      component: CardHeading,
    },
    {
      name: "CardDescription",
      description: "Description text with muted styling",
      component: CardDescription,
    },

    {
      name: "CardContent",
      description: "Main content area with standard padding",
      component: CardContent,
    },
    {
      name: "CardFooter",
      description: "Footer section for actions and additional content",
      component: CardFooter,
    },
  ],
};
