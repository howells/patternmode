import type { ComponentConfig } from "@patternmode/config/component-types";
import { List } from "lucide-react";
import {
	DescriptionDetails,
	DescriptionList,
	DescriptionTerm,
} from "./component";
import {
	DefaultExample,
	ProjectDetailsExample,
	SystemInfoExample,
	UserProfileExample,
} from "./examples";

export const descriptionListConfig: ComponentConfig = {
	id: "description-list",
	name: "Description List",
	description:
		"Semantic components for creating accessible description lists with responsive grid layout.",
	category: "display",
	icon: List,
	importStatement: `import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@patternmode/ui/description-list";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic description list with term-detail pairs",
			component: DefaultExample,
		},
		{
			id: "user-profile",
			title: "User Profile",
			description: "User profile information display",
			component: UserProfileExample,
		},
		{
			id: "project-details",
			title: "Project Details",
			description: "Project information with status indicators",
			component: ProjectDetailsExample,
		},
		{
			id: "system-info",
			title: "System Info",
			description: "System information with monospace values",
			component: SystemInfoExample,
		},
	],
	components: [
		{
			name: "Description List",
			description:
				"Root container for description lists with semantic HTML structure.",
			component: DescriptionList,
			primary: true,
		},
		{
			name: "Description Term",
			description:
				"Term component representing the label in a description list.",
			component: DescriptionTerm,
		},
		{
			name: "Description Details",
			description:
				"Details component representing the value in a description list.",
			component: DescriptionDetails,
		},
	],
};
