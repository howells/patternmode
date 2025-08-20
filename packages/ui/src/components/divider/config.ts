import { Minus } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import { Divider } from "./component";
import {
	DefaultExample,
	SpacingExample,
	VerticalExample,
	WithTextExample,
} from "./examples";

export const dividerConfig: ComponentConfig = {
	id: "divider",
	name: "Divider",
	description:
		"A versatile divider component for visually separating content sections.",
	category: "layout",
	featured: true,
	icon: Minus,
	importStatement: `import { Divider } from "@patternmode/ui/divider";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic horizontal divider",
			component: DefaultExample,
		},
		{
			id: "with-text",
			title: "With Text",
			description: "Divider with centered text label",
			component: WithTextExample,
		},
		{
			id: "vertical",
			title: "Vertical",
			description: "Vertical divider for side-by-side content",
			component: VerticalExample,
		},
		{
			id: "spacing",
			title: "Spacing",
			description: "Different spacing options",
			component: SpacingExample,
		},
	],
	components: [
		{
			name: "Divider",
			description: "Visual separator component for dividing content sections",
			component: Divider,
		},
	],
};
