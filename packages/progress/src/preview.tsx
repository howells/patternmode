"use client";

import { ProgressBar } from "./component";
import type { ProgressBarProps } from "./types";

export function ProgressPreview(props: Omit<ProgressBarProps, "value">) {
    return <ProgressBar value={75} showValue={true} {...props} />;
}

// Preview props for prop explorer
export const progressPreviewProps = [
	{
		name: "value",
		type: "number",
		description: "The current progress value (0-100).",
		defaultValue: 75,
	},
	{
		name: "showValue",
		type: "boolean",
		description: "Whether to display the progress percentage.",
		defaultValue: true,
	},
	{
		name: "label",
		type: "string",
		description: "Accessible label for the progress bar.",
		defaultValue: "",
	},
	{
		name: "variant",
		type: "select",
		description: "Visual style variant for different states.",
		options: ["default", "success", "warning", "error"],
		defaultValue: "default",
	},
];
