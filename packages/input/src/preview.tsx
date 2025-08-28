"use client";

import type { Size } from "@patternmode/config/sizes";
import { sizes } from "@patternmode/config/sizes";
import type React from "react";
import { Input } from "./component";

export type InputPreviewProps = {
	placeholder?: string;
	size?: Size;
	type?: React.HTMLInputTypeAttribute;
	hasError?: boolean;
	disabled?: boolean;
};

export function InputPreview({
	placeholder = "Enter text...",
	size = "base",
	type = "text",
	hasError = false,
	disabled = false,
}: InputPreviewProps) {
	return (
		<Input
			placeholder={placeholder}
			size={size}
			type={type}
			hasError={hasError}
			disabled={disabled}
		/>
	);
}

export const inputPreviewProps = [
	{ name: "placeholder", type: "string", defaultValue: "Enter text..." },
	{
		name: "size",
		type: "select",
		options: Object.keys(sizes),
		defaultValue: "base",
	},
	{
		name: "type",
		type: "select",
		options: ["text", "email", "password", "search", "number"],
		defaultValue: "text",
	},
	{ name: "hasError", type: "boolean", defaultValue: false },
	{ name: "disabled", type: "boolean", defaultValue: false },
];
