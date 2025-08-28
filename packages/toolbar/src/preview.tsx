"use client";

import {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarInput,
	ToolbarLink,
	ToolbarSeparator,
} from "./component";

export function ToolbarPreview() {
	return (
		<Toolbar>
			<ToolbarGroup>
				<ToolbarButton>Bold</ToolbarButton>
				<ToolbarButton>Italic</ToolbarButton>
				<ToolbarButton>Underline</ToolbarButton>
				<ToolbarSeparator />
				<ToolbarLink href="#">Link</ToolbarLink>
			</ToolbarGroup>
			<ToolbarInput placeholder="Search..." />
		</Toolbar>
	);
}

export const toolbarPreviewProps = [];
