"use client";

// Use a simple button to avoid cross-package coupling
import { Text } from "@patternmode/text";
import React from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./component";

export function DrawerPreview() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button type="button" className="px-3 py-2 border rounded">
					Open Drawer
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>Drawer description goes here.</DrawerDescription>
				</DrawerHeader>
				<Text>Content</Text>
				<DrawerFooter>
					<DrawerClose asChild>
						<button type="button" className="px-3 py-2 border rounded">
							Close
						</button>
					</DrawerClose>
					<button type="button" className="px-3 py-2 border rounded">
						Save
					</button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export const drawerPreviewProps = [];
