import { ChevronsUpDown } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { SelectNative } from "./component";
import {
	DefaultExample,
	DisabledExample,
	ErrorStateExample,
	MultipleExample,
	WithGroupsExample,
	WithLabelExample,
} from "./examples";

export const selectNativeConfig: ComponentConfig = {
	id: "select-native",
	name: "Select Native",
	description:
		"A styled native HTML select component with consistent design system styling. Provides platform-native behavior, mobile optimization, and accessibility features using the native HTML select element.",
	category: "controls",
	icon: ChevronsUpDown,
	importStatement: `import { SelectNative } from "@patternmode/ui/select-native";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic native select with options",
			component: DefaultExample,
		},
		{
			id: "with-label",
			title: "With Label",
			description: "Select with proper label association",
			component: WithLabelExample,
		},
		{
			id: "with-groups",
			title: "With Groups",
			description: "Select with optgroup organization",
			component: WithGroupsExample,
		},
		{
			id: "error-state",
			title: "Error State",
			description: "Select with error styling and validation",
			component: ErrorStateExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled select variations",
			component: DisabledExample,
		},
		{
			id: "multiple",
			title: "Multiple",
			description: "Multiple selection with native behavior",
			component: MultipleExample,
		},
	],
	components: [
		{
			name: "Select Native",
			description:
				"Native HTML select element with consistent styling and accessibility features.",
			component: SelectNative,
			primary: true,
		},
	],
};
