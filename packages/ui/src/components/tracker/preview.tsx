"use client";

import type { TrackerProps } from "./component";
import { Tracker } from "./component";

export function TrackerPreview(props: TrackerProps) {
	const data = [
		{ color: "bg-emerald-500", tooltip: "Operational" },
		{ color: "bg-emerald-500", tooltip: "Operational" },
		{ color: "bg-yellow-500", tooltip: "Degraded" },
		{ color: "bg-emerald-500", tooltip: "Operational" },
		{ color: "bg-red-500", tooltip: "Down" },
		{ color: "bg-emerald-500", tooltip: "Operational" },
	];

	return (
		<div className="flex justify-center items-center w-full">
			<Tracker data={data} {...props} />
		</div>
	);
}

// Preview props for prop explorer
export const trackerPreviewProps = [
	{
		name: "size",
		type: "select",
		description: "Size variant of the tracker blocks.",
		options: ["xs", "sm", "default", "lg"],
		defaultValue: "default",
	},
	{
		name: "hoverEffect",
		type: "boolean",
		description:
			"Enable hover effects (opacity change) on all blocks in the tracker.",
		defaultValue: false,
	},
];
