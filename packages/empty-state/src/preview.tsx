"use client";

import { Package } from "lucide-react";
import { EmptyState } from "./component";
import type { EmptyStateProps } from "./types";

export function EmptyStatePreview(props: Omit<EmptyStateProps, "title">) {
	return (
		<EmptyState
			icon={Package}
			title="No items found"
			description="Get started by creating your first item."
			primaryAction={{
				label: "Create Item",
				onClick: () => window.alert("Create item clicked"),
			}}
			secondaryAction={{
				label: "Learn More",
				href: "#",
			}}
			{...props}
		/>
	);
}

// Preview props for prop explorer
export const emptyStatePreviewProps = [
	{
		name: "title",
		type: "string",
		description: "The main heading/title of the empty state.",
		defaultValue: "No items found",
	},
	{
		name: "description",
		type: "string",
		description: "Optional description text below the title.",
		defaultValue: "Get started by creating your first item.",
	},
	{
		name: "variant",
		type: "select",
		description: "Visual variant of the empty state.",
		options: ["default", "minimal"],
		defaultValue: "default",
	},
	{
		name: "size",
		type: "select",
		description: "Size variant affecting spacing and icon size.",
		options: ["sm", "default", "lg"],
		defaultValue: "default",
	},
];
