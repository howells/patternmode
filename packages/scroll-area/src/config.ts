import type { ComponentConfig } from "@patternmode/config/component-types";
import { ScrollText } from "lucide-react";
import { ScrollArea, ScrollBar } from "./component";
import {
  BothDirectionsExample,
  CustomStyledExample,
  DefaultExample,
  HorizontalExample,
} from "./examples";

export const scrollAreaConfig: ComponentConfig = {
  id: "scroll-area",
  name: "Scroll Area",
  description:
    "Custom scrollable areas with styled scrollbars built on Base UI ScrollArea. Provides cross-browser consistent scrolling behavior with customizable appearance and smooth interactions.",
  category: "layout",
  icon: ScrollText,
  importStatement: `import { ScrollArea, ScrollBar } from "@patternmode/scroll-area";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic vertical scroll area with a list of items",
      component: DefaultExample,
    },
    {
      id: "horizontal",
      title: "Horizontal",
      description: "Horizontal scrolling for image galleries or wide content",
      component: HorizontalExample,
    },
    {
      id: "both-directions",
      title: "Both Directions",
      description:
        "Scroll area that supports both vertical and horizontal scrolling",
      component: BothDirectionsExample,
    },
    {
      id: "custom-styled",
      title: "Custom Styled",
      description: "Scroll area with custom scrollbar colors and styling",
      component: CustomStyledExample,
    },
  ],
  components: [
    {
      name: "Scroll Area",
      description:
        "Main scrollable container with customizable scrollbars and orientations.",
      component: ScrollArea,
      primary: true,
    },
    {
      name: "Scroll Bar",
      description:
        "Standalone scrollbar component for custom scroll implementations.",
      component: ScrollBar,
    },
  ],
};
