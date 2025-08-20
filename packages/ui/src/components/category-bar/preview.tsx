"use client";

import type { CategoryBarProps } from "./component";

import { CategoryBar } from "./component";

export function CategoryBarPreview(props: CategoryBarProps) {
	return (
		<CategoryBar
			values={[456, 351, 271, 191]}
			colors={[
				"blue",
				"emerald",
				"violet",
				"amber",
				"gray",
				"cyan",
				"pink",
				"lime",
				"fuchsia",
			]}
			showLabels={true}
			className="w-full max-w-96"
			{...props}
		/>
	);
}

// Preview props for prop explorer
export const categoryBarPreviewProps = [
	{
		name: "values",
		type: "array",
		description: "Array of numeric values for each category.",
		defaultValue: [456, 351, 271, 191],
	},
	{
		name: "colors",
		type: "array",
		description: "Color themes for each category.",
		defaultValue: ["blue", "teal", "amber", "rose"],
	},
	{
		name: "showLabels",
		type: "boolean",
		description: "Whether to show numeric labels above the bar.",
		defaultValue: true,
	},
];
