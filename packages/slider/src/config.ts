import type { ComponentConfig } from "@patternmode/config/component-types";
import { Minus } from "lucide-react";
import { Slider } from "./component";
import {
	CustomRangeExample,
	DefaultExample,
	DisabledExample,
	RangeExample,
	VerticalExample,
	WithValueExample,
} from "./examples";

export const sliderConfig: ComponentConfig = {
	id: "slider",
	name: "Slider",
	description:
		"Range slider component for selecting numeric values within a specified range with full keyboard accessibility and customizable appearance.",
	category: "controls",
	icon: Minus,
	importStatement: `import { Slider } from "@patternmode/slider";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic single value slider",
			component: DefaultExample,
		},
		{
			id: "range",
			title: "Range",
			description: "Range slider with two handles",
			component: RangeExample,
		},
		{
			id: "with-value",
			title: "With Value",
			description: "Slider with visible value display",
			component: WithValueExample,
		},
		{
			id: "custom-range",
			title: "Custom Range",
			description: "Slider with custom min/max and formatting",
			component: CustomRangeExample,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Disabled slider state",
			component: DisabledExample,
		},
		{
			id: "vertical",
			title: "Vertical",
			description: "Vertical orientation slider",
			component: VerticalExample,
		},
	],
	components: [
		{
			name: "Slider",
			description: "Range input slider for numeric value selection",
			component: Slider,
		},
	],
};
