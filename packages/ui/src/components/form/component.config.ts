import type { ComponentConfig } from "../../lib/component-config-types";
import { FileText } from "lucide-react";
import { Form, FormControl, FormDescription, FormError, FormField, FormItem, FormLabel } from "./component";
import { DefaultExample, HorizontalLayoutExample, HTML5ValidationExample, RegistrationFormExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "form",
  name: "Form",
  description: "A modern form system that integrates Base UI Form components with Zod validation for type-safe, accessible forms. Provides comprehensive form building blocks with automatic validation, error handling, and accessibility features.",
  category: "forms",
  icon: FileText,
  importStatement: `import { Form, FormField, FormControl, FormLabel, FormDescription, FormError } from "@patternmode/ui/form";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic form with Zod validation and error handling",
      component: DefaultExample,
    },
    {
      id: "html5-validation",
      title: "HTML5 Validation",
      description: "Form using native HTML5 validation constraints",
      component: HTML5ValidationExample,
    },
    {
      id: "registration-form",
      title: "Registration Form",
      description: "Complex form with custom layout and validation",
      component: RegistrationFormExample,
    },
    {
      id: "horizontal-layout",
      title: "Horizontal Layout",
      description: "Form with horizontal field layout for checkboxes",
      component: HorizontalLayoutExample,
    },
  ],
  components: [
    {
      name: "Form",
      description: "Root form component with integrated Zod validation",
      component: Form,
      primary: true,
    },
    {
      name: "FormField",
      description: "Complete form field with label, control, description, and error",
      component: FormField,
    },
    {
      name: "FormControl",
      description: "Form control component with styling and validation states",
      component: FormControl,
    },
    {
      name: "FormLabel",
      description: "Form label component with consistent styling",
      component: FormLabel,
    },
    {
      name: "FormDescription",
      description: "Form description component for help text",
      component: FormDescription,
    },
    {
      name: "FormError",
      description: "Form error message component for validation feedback",
      component: FormError,
    },
    {
      name: "FormItem",
      description: "Form item container for grouping field components",
      component: FormItem,
    },
  ],
};
