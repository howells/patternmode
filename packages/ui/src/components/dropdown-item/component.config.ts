import type { ComponentConfig } from "../../lib/component-config-types";
import { ChevronDown } from "lucide-react";
import { DropdownItem } from "./component";
import {
  DropdownItemBasic,
  DropdownItemDestructive,
  DropdownItemSizes,
  DropdownItemStates,
  DropdownItemWithHints,
  DropdownItemWithIcons,
  DropdownItemWithShortcuts,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "dropdown-item",
  name: "DropdownItem",
  description: "A consistent dropdown item component that extends Button for use across dropdown components.",
  category: "actions",
  icon: ChevronDown,
  importStatement: `import { DropdownItem } from "@patternmode/ui/dropdown-item";`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Simple dropdown items with text content",
      component: DropdownItemBasic,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Items with left and right icons",
      component: DropdownItemWithIcons,
    },
    {
      id: "states",
      title: "States",
      description: "Different interaction states (normal, highlighted, selected, disabled)",
      component: DropdownItemStates,
    },
    {
      id: "with-shortcuts",
      title: "With Shortcuts",
      description: "Items with keyboard shortcuts",
      component: DropdownItemWithShortcuts,
    },
    {
      id: "with-hints",
      title: "With Hints",
      description: "Items with hint text on the right",
      component: DropdownItemWithHints,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different size variants",
      component: DropdownItemSizes,
    },
    {
      id: "destructive",
      title: "Destructive",
      description: "Destructive actions with warning styling",
      component: DropdownItemDestructive,
    },
  ],
  components: [
    {
      name: "DropdownItem",
      description: "Consistent dropdown item built on Button foundation",
      component: DropdownItem,
    },
  ],
};
