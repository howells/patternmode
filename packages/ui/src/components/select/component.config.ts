import type { ComponentConfig } from "../../lib/component-config-types";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectArrow,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./component";
import { DefaultExample, DisabledExample, ErrorStateExample, FormIntegrationExample, SmallSizeExample, WithGroupsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "select",
  name: "Select",
  description: "A select dropdown component built on Base UI's Select primitive. Provides accessible dropdown selection with keyboard navigation, search, and proper focus management with customizable styling.",
  category: "controls",
  icon: ChevronDown,
  importStatement: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator } from "@patternmode/ui/select";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic select dropdown with simple options",
      component: DefaultExample,
    },
    {
      id: "with-groups",
      title: "With Groups",
      description: "Select with grouped options and separators",
      component: WithGroupsExample,
    },
    {
      id: "small-size",
      title: "Small Size",
      description: "Compact select for space-constrained layouts",
      component: SmallSizeExample,
    },
    {
      id: "error-state",
      title: "Error State",
      description: "Select with error styling for form validation",
      component: ErrorStateExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled select variations",
      component: DisabledExample,
    },
    {
      id: "form-select",
      title: "Form Integration",
      description: "Select integrated within a complete form",
      component: FormIntegrationExample,
    },
  ],
  components: [
    {
      name: "Select",
      description: "Root container component that manages select state and behavior.",
      component: Select,
      primary: true,
    },
    {
      name: "SelectTrigger",
      description: "Clickable trigger that opens the dropdown and displays current value.",
      component: SelectTrigger,
    },
    {
      name: "SelectValue",
      description: "Displays the selected value or placeholder text within the trigger.",
      component: SelectValue,
    },
    {
      name: "SelectContent",
      description: "Dropdown container that holds all select options with positioning.",
      component: SelectContent,
    },
    {
      name: "SelectItem",
      description: "Individual selectable option with hover and selection states.",
      component: SelectItem,
    },
    {
      name: "SelectGroup",
      description: "Groups related options together for better organization.",
      component: SelectGroup,
    },
    {
      name: "SelectGroupLabel",
      description: "Label for option groups with muted styling.",
      component: SelectGroupLabel,
    },
    {
      name: "SelectSeparator",
      description: "Visual separator for dividing groups of options.",
      component: SelectSeparator,
    },
    {
      name: "SelectArrow",
      description: "Arrow pointer that connects dropdown to trigger element.",
      component: SelectArrow,
    },
  ],
};
