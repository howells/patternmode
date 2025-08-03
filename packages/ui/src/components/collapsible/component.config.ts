import type { ComponentConfig } from "../../lib/component-config-types";
import { ChevronDown } from "lucide-react";
import {
  ChevronIcon,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./component";
import {
  CardStyleExample,
  ControlledExample,
  DefaultExample,
  DefaultOpenExample,
  DisabledExample,
  FaqExample,
  NestedContentExample,
  NestedExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "collapsible",
  name: "Collapsible",
  description: "Container component with show/hide functionality for progressive disclosure. Based on Base UI's Collapsible with smooth height-based animations and proper accessibility support.",
  category: "ui",
  icon: ChevronDown,
  importStatement: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@patternmode/ui/collapsible";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic collapsible with trigger and content",
      component: DefaultExample,
    },
    {
      id: "default-open",
      title: "Default Open",
      description: "Collapsible that starts in open state",
      component: DefaultOpenExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled collapsible that cannot be toggled",
      component: DisabledExample,
    },
    {
      id: "nested-content",
      title: "Rich Content",
      description: "Collapsible with complex nested content",
      component: NestedContentExample,
    },
    {
      id: "faq",
      title: "FAQ Style",
      description: "Multiple collapsibles in FAQ accordion style",
      component: FaqExample,
    },
    {
      id: "card-style",
      title: "Card Style",
      description: "Collapsible styled as a card with hover effects",
      component: CardStyleExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Externally controlled collapsible with buttons",
      component: ControlledExample,
    },
    {
      id: "nested",
      title: "Nested",
      description: "Nested collapsibles for hierarchical content",
      component: NestedExample,
    },
  ],
  components: [
    {
      component: Collapsible,
      name: "Collapsible",
      primary: true,
      description: "Root container for collapsible content sections.",
    },
    {
      component: CollapsibleTrigger,
      name: "CollapsibleTrigger",
      description: "Clickable header that toggles collapsible content.",
    },
    {
      component: CollapsibleContent,
      name: "CollapsibleContent",
      description: "Collapsible content area with smooth animations.",
    },
    {
      component: ChevronIcon,
      name: "ChevronIcon",
      description: "Simple chevron icon for collapsible indicators.",
    },
  ],
};
