import { Square } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import {
	Field,
	FieldControl,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "./component";
import {
	CompleteFieldExample,
	DefaultExample,
	WithDescriptionExample,
	WithErrorExample,
} from "./examples";

export const fieldConfig: ComponentConfig = {
	id: "field",
	name: "Field",
	description:
		"A collection of components for creating accessible form fields with labels, controls, descriptions, and error handling. Built on Base UI Field for comprehensive form validation and accessibility support.",
	category: "forms",
	featured: true,
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
			description:
				"Field with all components: label, control, description, and error",
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
			name: "Field Label",
			description: "Accessible label component for form controls",
			component: FieldLabel,
		},
		{
			name: "Field Control",
			description: "Form control wrapper with validation integration",
			component: FieldControl,
		},
		{
			name: "Field Description",
			description: "Helper text component for additional context",
			component: FieldDescription,
		},
		{
			name: "Field Error",
			description: "Error message component for validation feedback",
			component: FieldError,
		},
	],
};
