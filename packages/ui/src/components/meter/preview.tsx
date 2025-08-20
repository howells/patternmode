"use client";

import { Meter } from "./component";
import type { MeterProps } from "./types";

export function MeterPreview(props: MeterProps) {
	return <Meter value={65} {...props} />;
}

// Preview props for prop explorer
export const meterPreviewProps = [
	{
		name: "value",
		type: "number",
		description: "Current numeric value to display within the meter range.",
		defaultValue: 65,
	},
	{
		name: "min",
		type: "number",
		description: "Minimum value for the meter range.",
		defaultValue: 0,
	},
	{
		name: "max",
		type: "number",
		description: "Maximum value for the meter range.",
		defaultValue: 100,
	},
	{
		name: "variant",
		type: "select",
		description: "Color scheme variant for the meter appearance.",
		options: [
			"default",
			"neutral",
			"success",
			"info",
			"warning",
			"error",
			"critical",
			"positive",
			"negative",
		],
		defaultValue: "default",
	},
];
