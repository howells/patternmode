import { FileX } from "lucide-react";
import type { ComponentConfig } from "@patternmode/core/types/component-types";
import { EmptyState } from "./component";
import {
	DefaultExample,
	LargeSizeExample,
	MinimalExample,
	WithBothActionsExample,
} from "./examples";

export const emptyStateConfig: ComponentConfig = {
	id: "empty-state",
	name: "Empty State",
	description:
		"A component for displaying empty states when there's no content to show. Provides a structured layout with optional icon, title, description, and action buttons to guide users toward taking action.",
	category: "display",
	icon: FileX,
	importStatement: `import { EmptyState } from "@patternmode/ui/empty-state";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic empty state with icon and primary action",
			component: DefaultExample,
		},
		{
			id: "minimal",
			title: "Minimal",
			description: "Minimal variant without background styling",
			component: MinimalExample,
		},
		{
			id: "with-both-actions",
			title: "With Both Actions",
			description: "Empty state with primary and secondary actions",
			component: WithBothActionsExample,
		},
		{
			id: "large-size",
			title: "Large Size",
			description: "Large variant with increased spacing and heading",
			component: LargeSizeExample,
		},
	],
	components: [
		{
			name: "Empty State",
			description:
				"Empty state component with icon, title, description, and actions",
			component: EmptyState,
		},
	],
};
