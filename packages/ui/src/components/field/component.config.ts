import type { ComponentConfig } from "../../lib/component-config-types";
import { Square } from "lucide-react";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel, FieldValidity } from "./component";
import { CompleteFieldExample, DefaultExample, WithDescriptionExample, WithErrorExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "field",
  name: "Field",
  description: "A collection of components for creating accessible form fields with labels, controls, descriptions, and error handling. Built on Base UI Field for comprehensive form validation and accessibility support.",
  category: "forms",
  icon: Square,
  importStatement: `import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@patternmode/ui/field";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic field with label and input control",
      component: DefaultExample,
    },
    {
      id: "with-description",
      title: "With Description",
      description: "Field with helpful description text",
      component: WithDescriptionExample,
    },
    {
      id: "with-error",
      title: "With Error",
      description: "Field showing validation error state",
      component: WithErrorExample,
    },
    {
      id: "complete-field",
      title: "Complete Field",
      description: "Field with all components: label, control, description, and error",
      component: CompleteFieldExample,
    },
  ],
  components: [
    {
      name: "Field",
      description: "Root field component for grouping form controls",
      component: Field,
      primary: true,
    },
    {
      name: "FieldLabel",
      description: "Accessible label component for form controls",
      component: FieldLabel,
    },
    {
      name: "FieldControl",
      description: "Form control wrapper with validation integration",
      component: FieldControl,
    },
    {
      name: "FieldDescription",
      description: "Helper text component for additional context",
      component: FieldDescription,
    },
    {
      name: "FieldError",
      description: "Error message component for validation feedback",
      component: FieldError,
    },
    {
      name: "FieldValidity",
      description: "Validation state component for programmatic access",
      component: FieldValidity,
    },
  ],
};
