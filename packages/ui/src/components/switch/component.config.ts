import type { ComponentConfig } from "../../lib/component-config-types";
import { ToggleRight } from "lucide-react";
import { Switch } from "./component";
import {
  CheckedExample,
  ControlledExample,
  DefaultExample,
  DisabledExample,
  FormExample,
  SizesExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "switch",
  name: "Switch",
  description: "A binary toggle switch component for on/off states with smooth animations and full accessibility support.",
  category: "inputs",
  icon: ToggleRight,
  importStatement: `import { Switch } from "@patternmode/ui/switch";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic switch with label",
      component: DefaultExample,
    },
    {
      id: "checked",
      title: "Checked",
      description: "Switch with default checked state",
      component: CheckedExample,
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Available switch sizes",
      component: SizesExample,
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disabled switches in both states",
      component: DisabledExample,
    },
    {
      id: "form",
      title: "Form",
      description: "Switch in form context",
      component: FormExample,
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Controlled switch with external buttons",
      component: ControlledExample,
    },
  ],
  components: [
    {
      name: "Switch",
      description: "Binary toggle switch for on/off states",
      component: Switch,
    },
  ],
};
