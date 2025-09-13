import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import {
  CheckboxCard,
  CheckboxCardIndicator,
  CheckboxCards,
} from "./components";
import {
  ControlledExample,
  DefaultExample,
  HorizontalExample,
  MixedStatesExample,
} from "./examples";

export const checkboxCardsConfig: ComponentConfig = {
  id: "checkbox-cards",
  name: "Checkbox Cards",
  description:
    "A checkbox group component that presents options as prominent, selectable cards with enhanced visual design. Ideal for presenting choices that benefit from additional visual space, such as pricing plans, feature comparisons, or options that need rich content like descriptions, icons, or pricing information.",
  category: "controls",
  icon: Square,
  importStatement: `import { CheckboxCards, CheckboxCard, CheckboxCardIndicator } from "@patternmode/checkbox-cards";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic checkbox card group for plan selection with pricing",
      component: DefaultExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled checkbox card group with state management",
      component: ControlledExample,
    },
    {
      id: "horizontal",
      title: "Horizontal Layout",
      description: "Horizontal grid layout for size selection",
      component: HorizontalExample,
    },
    {
      id: "mixed-states",
      title: "Mixed States",
      description: "Checkbox card group with disabled options",
      component: MixedStatesExample,
    },
  ],
  components: [
    {
      name: "Checkbox Cards",
      description: "Root container for checkbox card options with grid layout.",
      component: CheckboxCards,
      primary: true,
    },
    {
      name: "Checkbox Card",
      description: "Individual selectable card with enhanced styling.",
      component: CheckboxCard,
    },
    {
      name: "Checkbox Card Indicator",
      description:
        "Visual indicator showing selection state with checkmark design.",
      component: CheckboxCardIndicator,
    },
  ],
};
