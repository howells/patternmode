"use client";

import { Button } from "@patternmode/button";
// Use basic elements to avoid cross-package imports in examples
import { Text } from "@patternmode/text";
import { useState } from "react";
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

export const DefaultExample = () => (
	<Dialog>
		<DialogTrigger render={<Button type="button" />}>Open Dialog</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Dialog Title</DialogTitle>
				<DialogDescription>
					This is a dialog description that explains what the dialog is for.
				</DialogDescription>
			</DialogHeader>
			<Text>Dialog content goes here.</Text>
			<DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
                Cancel
            </DialogClose>
            <Button type="button" variant="primary">
                Confirm
            </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export const WithFormExample = () => (
	<Dialog>
        <DialogTrigger render={<Button type="button" variant="outline" />}>
            Edit Profile
        </DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<label htmlFor="name" className="text-right">
						Name
					</label>
					<input
						id="name"
						defaultValue="John Doe"
						className="col-span-3 border rounded px-2 py-1"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<label htmlFor="email" className="text-right">
						Email
					</label>
					<input
						id="email"
						defaultValue="john@example.com"
						className="col-span-3 border rounded px-2 py-1"
					/>
				</div>
			</div>
			<DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
                Cancel
            </DialogClose>
            <Button type="button" variant="primary">
                Save changes
            </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export const ConfirmationExample = () => (
	<Dialog>
        <DialogTrigger render={<Button type="button" variant="outline" />}>
            Delete Account
        </DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Are you absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
                Cancel
            </DialogClose>
            <Button type="button" variant="destructive">
                Delete Account
            </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export const ControlledExample = () => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button type="button" variant="outline" />}>
            Open Controlled Dialog
        </DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Controlled Dialog</DialogTitle>
					<DialogDescription>
						This dialog's open state is controlled externally.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p>Current state: {open ? "Open" : "Closed"}</p>
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                    Close from inside
                </Button>
				</div>
				<DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>
                    Close
                </DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
