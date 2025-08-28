import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tag as LucideTag } from "lucide-react";
import { Tag } from "./component";
import {
	DefaultExample,
	DismissibleExample,
	TagsWithCountExample,
	WithLabelsExample,
} from "./examples";

export const tagConfig: ComponentConfig = {
	id: "tag",
	name: "Tag",
	description:
		"Label component for categorizing and tagging content with removable options.",
	category: "ui",
	icon: LucideTag,
	importStatement: `import { Tag } from "@patternmode/tag";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic tags",
			component: DefaultExample,
		},
		{
			id: "dismissible",
			title: "Dismissible",
			description: "Tags that can be removed",
			component: DismissibleExample,
		},
		{
			id: "with-labels",
			title: "Labeled Tags",
			description: "Tags with label and value pairs",
			component: WithLabelsExample,
		},
		{
			id: "with-counts",
			title: "Tags with Counts",
			description: "Tags displaying counts",
			component: TagsWithCountExample,
		},
	],
	components: [
		{ name: "Tag", description: "Label/tag component", component: Tag },
	],
};
