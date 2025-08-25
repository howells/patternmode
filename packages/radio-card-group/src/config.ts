import type { ComponentConfig } from "@patternmode/config/component-types";
import { Square } from "lucide-react";
import { RadioCardGroup, RadioCardIndicator, RadioCardItem } from "./component";
import {
	ControlledExample,
	DefaultExample,
	DisabledExample,
	HorizontalExample,
	ShippingExample,
} from "./examples";

export const radioCardGroupConfig: ComponentConfig = {
	id: "radio-card-group",
	name: "Radio Card Group",
	description:
		"A radio group component that presents options as prominent, selectable cards with enhanced visual design. Ideal for presenting choices that benefit from additional visual space, such as pricing plans, feature comparisons, or options that need rich content like descriptions, icons, or pricing information.",
	category: "controls",
	icon: Square,
	importStatement: `import { RadioCardGroup, RadioCardItem, RadioCardIndicator } from "@patternmode/radio-card-group";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic radio card group for plan selection with pricing",
			component: DefaultExample,
		},
		{
			id: "shipping",
			title: "Shipping Options",
			description: "Radio cards for shipping method selection with icons",
			component: ShippingExample,
		},
		{
			id: "horizontal",
			title: "Horizontal Layout",
			description: "Horizontal grid layout for size selection",
			component: HorizontalExample,
		},
		{
			id: "disabled",
			title: "With Disabled Option",
			description: "Radio card group with disabled options",
			component: DisabledExample,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Controlled radio card group with external buttons",
			component: ControlledExample,
		},
	],
	components: [
		{
			name: "Radio Card Group",
			description: "Root container for radio card options with grid layout.",
			component: RadioCardGroup,
			primary: true,
		},
		{
			name: "Radio Card Item",
			description: "Individual selectable card item with enhanced styling.",
			component: RadioCardItem,
		},
		{
			name: "Radio Card Indicator",
			description:
				"Visual indicator showing selection state with circular design.",
			component: RadioCardIndicator,
		},
	],
};
