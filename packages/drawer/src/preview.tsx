"use client";

import { Button } from "@patternmode/button";
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
				<Button variant="outline" type="button">Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>Drawer description goes here.</DrawerDescription>
				</DrawerHeader>
				<Text>Content</Text>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline" type="button">Close</Button>
					</DrawerClose>
					<Button variant="primary" type="button">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export const drawerPreviewProps = [];
