"use client";

import { Toolbar, ToolbarButton, ToolbarSeparator } from "./component";
import type { ToolbarProps } from "./types";

export function ToolbarPreview(props: ToolbarProps) {
	return (
		<Toolbar {...props}>
			<ToolbarButton>Bold</ToolbarButton>
			<ToolbarButton>Italic</ToolbarButton>
			<ToolbarButton>Underline</ToolbarButton>
			<ToolbarSeparator />
			<ToolbarButton>Link</ToolbarButton>
			<ToolbarButton>Image</ToolbarButton>
		</Toolbar>
	);
}

// Preview props for prop explorer
export const toolbarPreviewProps = [
	{
		name: "variant",
		type: "select",
		description: "Visual variant of the toolbar.",
		options: ["default", "border", "floating"],
		defaultValue: "default",
	},
	{
		name: "size",
		type: "select",
		description: "Size variant affecting padding and button dimensions.",
		options: ["sm", "default", "lg"],
		defaultValue: "default",
	},
];
