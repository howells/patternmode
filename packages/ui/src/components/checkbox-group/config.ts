import type { ComponentConfig } from "../../lib/component-config-types";
import { CheckSquare } from "lucide-react";
import { CheckboxGroup, CheckboxGroupItem } from "./component";
import {
  ControlledExample,
  DefaultExample,
  DisabledExample,
  HorizontalExample,
  MixedStatesExample,
  RequiredExample,
  WithDefaultExample,
} from "./examples";

export const checkboxGroupConfig: ComponentConfig = {
  id: "checkbox-group",
  name: "Checkbox Group",
  description: "A powerful checkbox group component for managing multiple checkbox selections with comprehensive state management and accessibility.",
  category: "controls",
  icon: CheckSquare,
  importStatement: `import { CheckboxGroup, CheckboxGroupItem } from "@patternmode/ui/checkbox-group";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic checkbox group with multiple options",
      component: DefaultExample,
    },
    {
      id: "with-default",
      title: "With Default",
      description: "Checkbox group with pre-selected values",
      component: WithDefaultExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled checkbox group",
      component: DisabledExample,
    },
    {
      id: "mixed-states",
      title: "Mixed States",
      description: "Group with individual disabled items",
      component: MixedStatesExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled checkbox group with state management",
      component: ControlledExample,
    },
    {
      id: "horizontal",
      title: "Horizontal",
      description: "Horizontal layout arrangement",
      component: HorizontalExample,
    },
    {
      id: "required",
      title: "Required",
      description: "Required selection with validation",
      component: RequiredExample,
    },
  ],
  components: [
    {
      component: CheckboxGroup,
      name: "Checkbox Group",
      primary: true,
      description: "Root container for managing multiple checkbox selections.",
    },
    {
      component: CheckboxGroupItem,
      name: "Checkbox Group Item",
      description: "Individual checkbox item within the group.",
    },
  ],
};
