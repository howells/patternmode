import type { ComponentConfig } from "../../lib/component-config-types";
import { Square } from "lucide-react";
import { Fieldset, FieldsetLegend } from "./component";
import { ContactFieldsetExample, DefaultExample, DisabledFieldsetExample, SettingsFieldsetExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "fieldset",
  name: "Fieldset",
  description: "Components for grouping related form fields with semantic HTML structure. Built on Base UI Fieldset using native fieldset elements for accessibility and proper form organization.",
  category: "forms",
  icon: Square,
  importStatement: `import { Fieldset, FieldsetLegend } from "@patternmode/ui/fieldset";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic fieldset with personal information fields",
      component: DefaultExample,
    },
    {
      id: "contact-fieldset",
      title: "Contact Details",
      description: "Fieldset grouping contact information fields",
      component: ContactFieldsetExample,
    },
    {
      id: "settings-fieldset",
      title: "Settings",
      description: "Fieldset with checkboxes and descriptions",
      component: SettingsFieldsetExample,
    },
    {
      id: "disabled-fieldset",
      title: "Disabled",
      description: "Disabled fieldset with all controls disabled",
      component: DisabledFieldsetExample,
    },
  ],
  components: [
    {
      name: "Fieldset",
      description: "Root fieldset component for grouping related form fields",
      component: Fieldset,
      primary: true,
    },
    {
      name: "FieldsetLegend",
      description: "Legend component for labeling fieldset groups",
      component: FieldsetLegend,
    },
  ],
};
