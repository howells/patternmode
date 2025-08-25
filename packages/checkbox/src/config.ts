import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { Checkbox } from "./component";
import { CheckedExample, ControlledExample, DefaultExample, DisabledExample, GroupExample, IndeterminateExample, IndeterminateParentExample, SizesExample, WithLabelExample } from "./examples";

export const checkboxConfig: ComponentConfig = {
  id: "checkbox",
  name: "Checkbox",
  description: "A versatile checkbox input component with full accessibility support and indeterminate state capabilities.",
  category: "controls",
  featured: true,
  icon: Square,
  importStatement: `import { Checkbox } from "@patternmode/checkbox";`,
  examples: [
    { id: "default", title: "Default", description: "Basic unchecked checkbox", component: DefaultExample },
    { id: "checked", title: "Checked", description: "Pre-checked checkbox state", component: CheckedExample },
    { id: "indeterminate", title: "Indeterminate", description: "Partially checked state for parent checkboxes", component: IndeterminateExample },
    { id: "disabled", title: "Disabled", description: "Disabled checkboxes in various states", component: DisabledExample },
    { id: "with-label", title: "With Label", description: "Checkbox with associated text label", component: WithLabelExample },
    { id: "controlled", title: "Controlled", description: "Controlled checkbox with state management", component: ControlledExample },
    { id: "group", title: "Group", description: "Multiple checkboxes working together", component: GroupExample },
    { id: "indeterminate-parent", title: "Indeterminate Parent", description: "Parent checkbox with indeterminate state based on children", component: IndeterminateParentExample },
    { id: "sizes", title: "Sizes", description: "Different checkbox sizes", component: SizesExample },
  ],
  components: [{ name: "Checkbox", description: "Checkbox input for boolean selections with indeterminate state support", component: Checkbox }],
};

