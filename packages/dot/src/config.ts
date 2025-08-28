import type { ComponentConfig } from "@patternmode/config/component-types";
import { Circle } from "lucide-react";
import { Dot } from "./component";
import {
	AnimatedExample,
	BasicExample,
	ColorVariantsExample,
	DotExample,
	SemanticVariantsExample,
	SizesExample,
	WithLabelsExample,
	WithoutLabelsExample,
} from "./examples";

export const dotConfig: ComponentConfig = {
	id: "dot",
	name: "Dot",
	description:
		"Small circular indicator component for status, notifications, or decorative purposes.",
	category: "visual",
	icon: Circle,
	importStatement: `import { Dot } from "@patternmode/dot";`,
	examples: [
		{
			id: "basic",
			title: "Basic",
			description: "Basic dots with different semantic variants",
			component: BasicExample,
		},
		{
			id: "semantic-variants",
			title: "Semantic Variants",
			description: "Semantic status variants with labels",
			component: SemanticVariantsExample,
		},
		{
			id: "color-variants",
			title: "Color Variants",
			description: "All available Tailwind color variants",
			component: ColorVariantsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Different sizes (sm, default, lg)",
			component: SizesExample,
		},
		{
			id: "with-labels",
			title: "With Labels",
			description: "Dots with descriptive text labels",
			component: WithLabelsExample,
		},
		{
			id: "without-labels",
			title: "Without Labels",
			description: "Plain dots without text",
			component: WithoutLabelsExample,
		},
		{
			id: "animated",
			title: "Animated",
			description: "Animated dots for active states",
			component: AnimatedExample,
		},
		{
			id: "deployment-status",
			title: "Deployment Status",
			description: "Real-world example showing deployment status",
			component: DotExample,
		},
	],
	components: [
		{
			name: "Dot",
			description: "Circular indicator for status and notifications",
			component: Dot,
		},
	],
};
