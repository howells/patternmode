"use client";

import { Info } from "lucide-react";
import { Callout } from "./component";
import type { CalloutProps } from "./types";

export function CalloutPreview(props: CalloutProps) {
	return (
		<Callout title="Important Information" icon={Info} {...props}>
			This callout contains important information that requires your attention.
		</Callout>
	);
}

// Preview props for prop explorer
export const calloutPreviewProps = [
	{
		name: "title",
		type: "string",
		description:
			"Optional title text for the callout displayed prominently at the top.",
		defaultValue: "Important Information",
	},
	{
		name: "variant",
		type: "select",
		description:
			"Visual style variant that controls the color scheme to indicate message type.",
		defaultValue: "default",
		options: ["default", "success", "error", "warning", "neutral"],
	},
];
