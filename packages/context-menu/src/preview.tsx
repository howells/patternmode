"use client";

import type React from "react";
import { Button } from "@patternmode/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "./component";

type ContextMenuProps = React.ComponentProps<typeof ContextMenu> & {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function ContextMenuPreview(props: ContextMenuProps) {
	return (
        <ContextMenu {...props}>
            <ContextMenuTrigger>
                <Button variant="outline" type="button">
                    Right‑click me
                </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
				<ContextMenuItem>Copy</ContextMenuItem>
				<ContextMenuItem>Paste</ContextMenuItem>
				<ContextMenuItem>Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

// Preview props for prop explorer
export const contextMenuPreviewProps = [
	{
		name: "open",
		type: "boolean",
		description: "Controls whether the context menu is open (controlled mode).",
		defaultValue: false,
	},
];
