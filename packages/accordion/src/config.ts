import type { ComponentConfig } from "@patternmode/config/component-types";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./component";
import {
  DefaultExample,
  MixedContentExample,
  MultipleOpenExample,
} from "./examples";

export const accordionConfig: ComponentConfig = {
  id: "accordion",
  name: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content.",
  category: "layout",
  icon: ChevronDown,
  importStatement: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@patternmode/accordion";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic accordion with default settings",
      component: DefaultExample,
    },
    {
      id: "multiple-open",
      title: "Multiple Open",
      description: "Allow multiple items to be open simultaneously",
      component: MultipleOpenExample,
    },
    {
      id: "mixed-content",
      title: "Mixed Content",
      description: "Accordion with various content types",
      component: MixedContentExample,
    },
  ],
  components: [
    {
      name: "Accordion",
      description: "The root accordion container",
      component: Accordion,
    },
    {
      name: "Accordion Item",
      description: "Individual accordion item",
      component: AccordionItem,
    },
    {
      name: "Accordion Trigger",
      description: "Clickable trigger for accordion item",
      component: AccordionTrigger,
    },
    {
      name: "Accordion Content",
      description: "Collapsible content area",
      component: AccordionContent,
    },
  ],
};
