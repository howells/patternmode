import type { ComponentConfig } from "@patternmode/config/component-types";
import { ChevronDown } from "lucide-react";
import { DropdownItem } from "./component";
import {
	DropdownItemBasicExample,
	DropdownItemDestructiveExample,
	DropdownItemSizesExample,
	DropdownItemStatesExample,
	DropdownItemWithHintsExample,
	DropdownItemWithIconsExample,
	DropdownItemWithShortcutsExample,
} from "./examples";

export const dropdownItemConfig: ComponentConfig = {
	id: "dropdown-item",
	name: "Dropdown Item",
	description:
		"A consistent dropdown item component that extends Button for use across dropdown components.",
	category: "actions",
	icon: ChevronDown,
	importStatement: `import { DropdownItem } from "@patternmode/ui/dropdown-item";`,
	examples: [
		{
			id: "basic",
			title: "Basic",
			description: "Simple dropdown items with text content",
			component: DropdownItemBasicExample,
		},
		{
			id: "with-icons",
			title: "With Icons",
			description: "Items with left and right icons",
			component: DropdownItemWithIconsExample,
		},
		{
			id: "states",
			title: "States",
			description:
				"Different interaction states (normal, highlighted, selected, disabled)",
			component: DropdownItemStatesExample,
		},
		{
			id: "with-shortcuts",
			title: "With Shortcuts",
			description: "Items with keyboard shortcuts",
			component: DropdownItemWithShortcutsExample,
		},
		{
			id: "with-hints",
			title: "With Hints",
			description: "Items with hint text on the right",
			component: DropdownItemWithHintsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Different size variants",
			component: DropdownItemSizesExample,
		},
		{
			id: "destructive",
			title: "Destructive",
			description: "Destructive actions with warning styling",
			component: DropdownItemDestructiveExample,
		},
	],
	components: [
		{
			name: "Dropdown Item",
			description: "Consistent dropdown item built on Button foundation",
			component: DropdownItem,
		},
	],
};
