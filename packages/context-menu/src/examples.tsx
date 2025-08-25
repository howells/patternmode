"use client";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "./component";

export const DefaultExample = () => (
	<ContextMenu>
		<ContextMenuTrigger className="p-8 border rounded-lg text-center cursor-pointer">
			Right-click me
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem>Copy</ContextMenuItem>
			<ContextMenuItem>Paste</ContextMenuItem>
			<ContextMenuItem>Delete</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
);

export const WithShortcutsExample = () => (
	<ContextMenu>
		<ContextMenuTrigger className="p-8 border rounded-lg text-center cursor-pointer">
			Right-click for shortcuts
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
			<ContextMenuItem shortcut="⌘V">Paste</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuItem shortcut="⌫">Delete</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
);

export const WithSectionsExample = () => (
	<ContextMenu>
		<ContextMenuTrigger className="p-8 border rounded-lg text-center cursor-pointer">
			Right-click for organized menu
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem>New File</ContextMenuItem>
			<ContextMenuItem>New Folder</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuItem>Cut</ContextMenuItem>
			<ContextMenuItem>Copy</ContextMenuItem>
			<ContextMenuItem>Paste</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuItem>Delete</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
);
