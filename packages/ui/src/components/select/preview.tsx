"use client";

import type { Size } from "@patternmode/styles/constants/sizes";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./component";

type SelectPreviewProps = {
	placeholder?: string;
	disabled?: boolean;
	hasError?: boolean;
	size?: Size;
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
};

export function SelectPreview(props: SelectPreviewProps) {
	const items = [
		{ label: props.placeholder || "Select a fruit...", value: null },
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Orange", value: "orange" },
		{ label: "Grape", value: "grape" },
		{ label: "Strawberry", value: "strawberry" },
		{ label: "Pineapple", value: "pineapple" },
	];

	return (
		<Select
			defaultValue={props.defaultValue}
			value={props.value}
			onValueChange={props.onValueChange}
			disabled={props.disabled}
			items={items}
		>
			<SelectTrigger
				className="w-[180px]"
				hasError={props.hasError}
				size={props.size}
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
				<SelectItem value="orange">Orange</SelectItem>
				<SelectItem value="grape">Grape</SelectItem>
				<SelectItem value="strawberry">Strawberry</SelectItem>
				<SelectItem value="pineapple">Pineapple</SelectItem>
			</SelectContent>
		</Select>
	);
}

// Preview props for prop explorer
export const selectPreviewProps = [
	{
		name: "placeholder",
		type: "string",
		description: "Placeholder text shown when no value is selected.",
		defaultValue: "Select a fruit...",
	},
	{
		name: "defaultValue",
		type: "select",
		description: "Default selected value.",
		options: [
			{ label: "None", value: "" },
			{ label: "Apple", value: "apple" },
			{ label: "Banana", value: "banana" },
			{ label: "Orange", value: "orange" },
			{ label: "Grape", value: "grape" },
		],
		defaultValue: "",
	},
	{
		name: "size",
		type: "select",
		description: "Size variant affecting padding and text size.",
		options: ["default", "sm"],
		defaultValue: "default",
	},
	{
		name: "disabled",
		type: "boolean",
		description: "Whether the select is disabled.",
		defaultValue: false,
	},
	{
		name: "hasError",
		type: "boolean",
		description: "Whether to display error styling.",
		defaultValue: false,
	},
];
