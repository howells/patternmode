import { MessageCircle } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import { Tooltip } from "./component";
import {
	AlignmentExample,
	ArrowExample,
	ControlledExample,
	DefaultExample,
	DelayExample,
	IconButtonsExample,
	PositionsExample,
	RichContentExample,
	SizesExample,
	VariantsExample,
} from "./examples";

export const tooltipConfig: ComponentConfig = {
	id: "tooltip",
	name: "Tooltip",
	description:
		"A tooltip component built on Base UI's Tooltip primitive for displaying contextual information. Provides accessible hover/focus-triggered information popups with smart positioning, customizable delays, and smooth animations.",
	category: "overlay",
	featured: true,
	icon: MessageCircle,
	importStatement: `import { Tooltip } from "@patternmode/ui/tooltip";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic tooltip with simple text content",
			component: DefaultExample,
		},
		{
			id: "positions",
			title: "Positions",
			description: "Tooltip positioning on different sides of the trigger",
			component: PositionsExample,
		},
		{
			id: "variants",
			title: "Variants",
			description: "Different visual style variants - default and inverse",
			component: VariantsExample,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "Tooltips in different sizes - small, default, and large",
			component: SizesExample,
		},
		{
			id: "no-arrow",
			title: "Arrow Options",
			description: "Tooltips with and without pointing arrows",
			component: ArrowExample,
		},
		{
			id: "rich-content",
			title: "Rich Content",
			description: "Tooltips with complex JSX content and formatting",
			component: RichContentExample,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Controlled tooltip with external state management",
			component: ControlledExample,
		},
		{
			id: "delay",
			title: "Delay Options",
			description: "Tooltips with different show delay timings",
			component: DelayExample,
		},
		{
			id: "icon-tooltip",
			title: "Icon Tooltips",
			description: "Tooltips for icon-only buttons and help indicators",
			component: IconButtonsExample,
		},
		{
			id: "alignment",
			title: "Alignment",
			description: "Tooltip alignment options relative to the trigger element",
			component: AlignmentExample,
		},
	],
	components: [
		{
			name: "Tooltip",
			description:
				"Contextual information popup displayed on hover or focus interactions.",
			component: Tooltip,
			primary: true,
		},
	],
};
