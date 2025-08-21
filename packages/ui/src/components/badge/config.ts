import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tag } from "lucide-react";
import { Badge } from "./component";
import {
	BorderedExample,
	ComplexExample,
	DefaultExample,
	DismissExample,
	RoundedExample,
	SizesExample,
	StatusDotExample,
	VariantsExample,
	WithIconsExample,
} from "./examples";

export const badgeConfig: ComponentConfig = {
	id: "badge",
	name: "Badge",
	description:
		"Small status indicator component for labels, counts, and categorical information.",
	category: "visual",
	featured: true,
	icon: Tag,
	importStatement: `import { Badge } from "@patternmode/ui/badge";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic badge with default styling",
			component: DefaultExample,
		},
		{
			id: "with-icons",
			title: "With Icons",
			description: "Badge with left and right icons",
			component: WithIconsExample,
		},
		{
			id: "dismiss",
			title: "Dismissible",
			description: "Badges that can be removed with dismiss button",
			component: DismissExample,
		},
		{
			id: "variants",
			title: "Variants",
			description: "Different color variants and semantic meanings",
			component: VariantsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Different badge sizes",
			component: SizesExample,
		},
		{
			id: "rounded",
			title: "Rounded",
			description: "Pill-shaped badges with rounded corners",
			component: RoundedExample,
		},
		{
			id: "border",
			title: "Bordered",
			description: "Badges with border outline",
			component: BorderedExample,
		},
		{
			id: "status-dot",
			title: "Status Dot",
			description: "Badges with status indicator dots",
			component: StatusDotExample,
		},
		{
			id: "complex",
			title: "Complex",
			description: "Advanced examples combining multiple features",
			component: ComplexExample,
		},
	],
	components: [
		{
			name: "Badge",
			description: "Status indicator component for categorical information",
			component: Badge,
		},
	],
};
