"use client";

import type { SubheadingProps } from "./component";
import { Subheading } from "./component";

export function SubheadingPreview(props: SubheadingProps) {
	return (
		<Subheading {...props}>{props.children || "Section Subheading"}</Subheading>
	);
}

export const subheadingPreviewProps = [
	{
		name: "children",
		type: "string",
		description: "Text content of the subheading.",
		defaultValue: "Section Subheading",
	},
	{
		name: "level",
		type: "select",
		description:
			"Heading level determining which HTML element to render (h1-h6).",
		options: [1, 2, 3, 4, 5, 6],
		defaultValue: 2,
	},
];
