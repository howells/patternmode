import type { ComponentConfig } from "@patternmode/config/component-types";
import { ToggleLeft } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./components/toggle-group";
import {
  ButtonAlignmentExample,
  ControlledExample,
  DefaultExample,
  DisabledExample,
  MultipleSelectionExample,
  SizesExample,
  VariantsExample,
  VerticalExample,
  WithTextExample,
} from "./examples";

export const toggleGroupConfig: ComponentConfig = {
  id: "toggle-group",
  name: "Toggle Group",
  description:
    "A group of related toggle buttons that work together as a cohesive unit for multi-select or single-select interactions. Provides structured grouping with consistent styling and behavior, supporting both single-select and multi-select modes.",
  category: "controls",
  icon: ToggleLeft,
  importStatement: `import { ToggleGroup, ToggleGroupItem } from "@patternmode/toggle-group";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description:
        "Basic toggle group with icon-only buttons for alignment selection",
      component: DefaultExample,
    },
    {
      id: "multiple-selection",
      title: "Multiple Selection",
      description:
        "Toggle group supporting multiple selections for text formatting",
      component: MultipleSelectionExample,
    },
    {
      id: "with-text",
      title: "With Text",
      description: "Toggle group items with both icons and text labels",
      component: WithTextExample,
    },
    {
      id: "variants",
      title: "Variants",
      description:
        "Different visual style variants - default, outline, and ghost",
      component: VariantsExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description:
        "Toggle groups in different sizes - small, default, and large",
      component: SizesExample,
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Toggle group with vertical orientation layout",
      component: VerticalExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Toggle group in disabled state",
      component: DisabledExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled toggle group with external state management",
      component: ControlledExample,
    },
    {
      id: "button-alignment",
      title: "Button Alignment",
      description:
        "Toggle group aligned with regular buttons to demonstrate consistent heights",
      component: ButtonAlignmentExample,
    },
  ],
  components: [
    {
      name: "Toggle Group",
      description:
        "Root container for toggle group items with coordinated state management.",
      component: ToggleGroup,
      primary: true,
    },
    {
      name: "Toggle Group Item",
      description: "Individual toggle button within a toggle group.",
      component: ToggleGroupItem,
    },
  ],
};
