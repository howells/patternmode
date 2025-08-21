import { Star } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import { Icon } from "./component";
import {
	CustomStrokeExample,
	DefaultExample,
	LayoutExample,
	SizesExample,
	WithBackgroundExample,
} from "./examples";

export const iconConfig: ComponentConfig = {
	id: "icon",
	name: "Icon",
	description:
		"Centralized icon system providing consistent sizing, styling, and error handling for Lucide React icons across all UI components. Features graceful fallbacks, dynamic icon loading support, and flexible sizing options.",
	category: "visual",
	icon: Star,
	importStatement: `import { Icon } from "@patternmode/ui/icon";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic icon usage with default settings",
			component: DefaultExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "All available icon sizes from xs to 3xl",
			component: SizesExample,
		},
		{
			id: "with-text",
			title: "With Text",
			description: "Icons paired with text labels in common UI patterns",
			component: WithBackgroundExample,
		},
		{
			id: "custom-stroke",
			title: "Custom Stroke",
			description: "Different stroke widths for varying visual weight",
			component: CustomStrokeExample,
		},
		{
			id: "layout",
			title: "Layout",
			description: "Various layout approaches for icon spacing and alignment",
			component: LayoutExample,
		},
	],
	components: [
		{
			name: "Icon",
			description:
				"Primary icon component with consistent sizing and error handling",
			component: Icon,
			primary: true,
		},
	],
};
