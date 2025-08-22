"use client";

import React from "react";
import { Button } from "@patternmode/button";
import { Text } from "@patternmode/text";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./component";

type DialogProps = React.ComponentProps<typeof Dialog> & {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function DialogPreview(props: DialogProps) {
	const [open, setOpen] = React.useState(false);

	const { open: _, onOpenChange: __, ...restProps } = props;

	return (
		<Dialog open={open} onOpenChange={setOpen} {...restProps}>
			<DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogDescription>
						This is a dialog description that explains what the dialog is for.
					</DialogDescription>
				</DialogHeader>
				<Text>Dialog content goes here.</Text>
				<DialogFooter>
					<DialogClose render={<Button variant="secondary" />}>
						Cancel
					</DialogClose>
					<Button>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// Preview props for prop explorer
export const dialogPreviewProps = [
	{
		name: "open",
		type: "boolean",
		description: "Controls whether the dialog is open (controlled mode).",
		defaultValue: false,
	},
];
