"use client";

import React from "react";
import { SIZES } from "../../constants/sizes";
import { RadioGroup, RadioOption } from "./component";
import type { RadioOptionProps } from "./types";

export function RadioPreview(props: RadioOptionProps) {
	const [selectedValue, setSelectedValue] = React.useState<string>("option1");

	return (
		<RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
			<div className="space-y-3">
				<RadioOption
					value="option1"
					label={props.label || "Radio Option"}
					{...props}
				/>
				<RadioOption
					value="option2"
					label="Alternative Option"
					size={props.size}
					disabled={props.disabled}
				/>
				<RadioOption
					value="option3"
					label="Third Option"
					size={props.size}
					disabled={props.disabled}
				/>
			</div>
		</RadioGroup>
	);
}

// Preview props for prop explorer
export const radioPreviewProps = [
	{
		name: "label",
		type: "string",
		description: "The text label for the radio option.",
		defaultValue: "Radio Option",
	},
	{
		name: "description",
		type: "string",
		description: "Optional description text shown below the label.",
		defaultValue: "",
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Whether the radio option is disabled.",
		defaultValue: false,
	},
	{
		name: "size",
		type: "select",
		description: "Size variant affecting radio button and text sizing.",
		options: SIZES,
		defaultValue: "base",
	},
];
