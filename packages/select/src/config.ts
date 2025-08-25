import type { ComponentConfig } from "@patternmode/config/component-types";
import { ChevronsUpDown } from "lucide-react";
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
import {
  ControlledExample,
  CustomRenderValueExample,
  DefaultExample,
  DisabledExample,
  ErrorStateExample,
  FormIntegrationExample,
  MultipleSelectionExample,
  ObjectValuesExample,
  SmallSizeExample,
  WithGroupsExample,
} from "./examples";

export const selectConfig: ComponentConfig = {
  id: "select",
  name: "Select",
  description:
    "A select dropdown component built on Base UI's Select primitive. Provides accessible dropdown selection with keyboard navigation, search, and proper focus management with customizable styling.",
  category: "controls",
  featured: true,
  icon: ChevronsUpDown,
  importStatement: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator } from "@patternmode/select";`,
  examples: [
    { id: "default", title: "Default", description: "Basic select dropdown with simple options", component: DefaultExample },
    { id: "with-groups", title: "With Groups", description: "Organize options in groups", component: WithGroupsExample },
    { id: "multiple", title: "Multiple", description: "Multiple selection support", component: MultipleSelectionExample },
    { id: "controlled", title: "Controlled", description: "Control via state", component: ControlledExample },
    { id: "objects", title: "Object Values", description: "Map IDs to objects", component: ObjectValuesExample },
    { id: "custom-value", title: "Custom Value Render", description: "Custom value rendering", component: CustomRenderValueExample },
    { id: "error", title: "Error State", description: "Error styles", component: ErrorStateExample },
    { id: "disabled", title: "Disabled", description: "Disabled state", component: DisabledExample },
    { id: "small", title: "Small Size", description: "Compact trigger", component: SmallSizeExample },
    { id: "form", title: "Form Integration", description: "Usage in forms", component: FormIntegrationExample },
  ],
  components: [
    { name: "Select", description: "Root component", component: Select, primary: true },
    { name: "SelectTrigger", description: "Opens dropdown", component: SelectTrigger },
    { name: "SelectValue", description: "Selected value", component: SelectValue },
    { name: "SelectContent", description: "Dropdown popup", component: SelectContent },
    { name: "SelectItem", description: "Option item", component: SelectItem },
    { name: "SelectGroup", description: "Option group", component: SelectGroup },
    { name: "SelectGroupLabel", description: "Group label", component: SelectGroupLabel },
    { name: "SelectSeparator", description: "Group separator", component: SelectSeparator },
    { name: "SelectArrow", description: "Popup arrow", component: SelectArrow },
  ],
};
