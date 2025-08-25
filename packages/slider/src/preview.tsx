"use client";

import { Slider } from "./component";
import type { SliderProps } from "./types";

export function SliderPreview(props: SliderProps) {
	return (
		<div className="w-full space-y-4">
			<Slider defaultValue={[50]} max={100} min={0} step={1} {...props} />
		</div>
	);
}

// Preview props for prop explorer
export const sliderPreviewProps = [
	{
		name: "defaultValue",
		type: "number",
		description: "Default value of the slider (single value).",
		defaultValue: 50,
	},
	{
		name: "min",
		type: "number",
		description: "Minimum value of the slider range.",
		defaultValue: 0,
	},
	{
		name: "max",
		type: "number",
		description: "Maximum value of the slider range.",
		defaultValue: 100,
	},
	{
		name: "step",
		type: "number",
		description: "Step increment for the slider values.",
		defaultValue: 1,
	},
	{
		name: "showValue",
		type: "boolean",
		description: "Whether to display the current value above the slider.",
		defaultValue: false,
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Whether the slider is disabled.",
		defaultValue: false,
	},
	{
		name: "orientation",
		type: "select",
		description: "Orientation of the slider.",
		options: ["horizontal", "vertical"],
		defaultValue: "horizontal",
	},
	{
		name: "ariaLabelThumb",
		type: "string",
		description: "Aria label for the slider thumb for accessibility.",
		defaultValue: "Volume control",
	},
];
