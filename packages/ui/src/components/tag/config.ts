import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tag } from "lucide-react";

import { Tag as TagComponent } from "./component";
import {
	ColoredExample,
	ComplexExample,
	DefaultExample,
	DismissibleExample,
	WithAvatarsExample,
	WithCountsExample,
	WithLabelsExample,
} from "./examples";

export const tagConfig: ComponentConfig = {
	id: "tag",
	name: "Tag",
	description:
		"Label component for categorizing and tagging content with removable options.",
	category: "visual",
	icon: Tag,
	importStatement: `import { Tag } from "@patternmode/ui/tag";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic usage example",
			component: DefaultExample,
		},
		{
			id: "with-labels",
			title: "With Labels",
			description: "Example with custom labels",
			component: WithLabelsExample,
		},
		{
			id: "with-counts",
			title: "With Counts",
			description: "Tags with count indicators",
			component: WithCountsExample,
		},
		{
			id: "dismissible",
			title: "Dismissible",
			description: "Interactive tags that can be removed",
			component: DismissibleExample,
		},
		{
			id: "with-avatars",
			title: "With Avatars",
			description: "Tags with user avatars",
			component: WithAvatarsExample,
		},
		{
			id: "complex",
			title: "Complex",
			description: "Complex example with multiple features",
			component: ComplexExample,
		},
		{
			id: "colored",
			title: "Colored",
			description: "Tags with custom color schemes",
			component: ColoredExample,
		},
	],
	components: [
		{
			name: "Tag",
			description: "Label component for categorizing and tagging content",
			component: TagComponent,
		},
	],
};
