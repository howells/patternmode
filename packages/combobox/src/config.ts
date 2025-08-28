import type { ComponentConfig } from "@patternmode/config/component-types";
import { ChevronsUpDown } from "lucide-react";
import { Combobox } from "./component";
import {
	AsyncExample,
	CustomRenderingExample,
	DefaultExample,
	DisabledExample,
	ErrorExample,
	SizesExample,
} from "./examples";

export const comboboxConfig: ComponentConfig = {
	id: "combobox",
	name: "Combobox",
	description:
		"Searchable dropdown component combining input and select functionality. Built on Downshift for accessibility with optional async data and infinite scroll.",
	category: "controls",
	icon: ChevronsUpDown,
	importStatement: `import { Combobox } from "@patternmode/combobox";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic combobox with static options",
			component: DefaultExample,
		},
		{
			id: "async",
			title: "Async Data",
			description: "Dynamic data fetching with search",
			component: AsyncExample,
		},
		{
			id: "custom-rendering",
			title: "Custom Rendering",
			description: "Custom item rendering with colors",
			component: CustomRenderingExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Different size variants",
			component: SizesExample,
		},
		{
			id: "error",
			title: "Error State",
			description: "Combobox with error styling",
			component: ErrorExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled combobox state",
			component: DisabledExample,
		},
	],
	components: [
		{
			name: "Combobox",
			description: "Searchable dropdown with autocomplete functionality",
			component: Combobox,
		},
	],
};
