import { ChevronsUpDown } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
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
		{
			id: "multiple-selection",
			title: "Multiple Selection",
			description: "Select component with multiple value selection",
			component: MultipleSelectionExample,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Controlled select with external state management",
			component: ControlledExample,
		},
		{
			id: "object-values",
			title: "Object Values",
			description: "Select working with complex data objects",
			component: ObjectValuesExample,
		},
		{
			id: "custom-render",
			title: "Custom Render",
			description: "Select with custom value rendering and display",
			component: CustomRenderValueExample,
		},
	],
	components: [
		{
			name: "Select",
			description:
				"Root container component that manages select state and behavior.",
			component: Select,
			primary: true,
		},
		{
			name: "Select Trigger",
			description:
				"Clickable trigger that opens the dropdown and displays current value.",
			component: SelectTrigger,
		},
		{
			name: "Select Value",
			description:
				"Displays the selected value or placeholder text within the trigger.",
			component: SelectValue,
		},
		{
			name: "Select Content",
			description:
				"Dropdown container that holds all select options with positioning.",
			component: SelectContent,
		},
		{
			name: "Select Item",
			description:
				"Individual selectable option with hover and selection states.",
			component: SelectItem,
		},
		{
			name: "Select Group",
			description: "Groups related options together for better organization.",
			component: SelectGroup,
		},
		{
			name: "Select Group Label",
			description: "Label for option groups with muted styling.",
			component: SelectGroupLabel,
		},
		{
			name: "Select Separator",
			description: "Visual separator for dividing groups of options.",
			component: SelectSeparator,
		},
		{
			name: "Select Arrow",
			description: "Arrow pointer that connects dropdown to trigger element.",
			component: SelectArrow,
		},
	],
};
