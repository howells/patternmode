"use client";

import { useState } from "react";
import { Button } from "@patternmode/button";
import {
	ResponsiveDrawer,
	ResponsiveDrawerBody,
	ResponsiveDrawerClose,
	ResponsiveDrawerContent,
	ResponsiveDrawerDescription,
	ResponsiveDrawerFooter,
	ResponsiveDrawerHeader,
	ResponsiveDrawerTitle,
	ResponsiveDrawerTrigger,
} from "./component";

export const DefaultExample = () => {
	return (
		<ResponsiveDrawer>
			<ResponsiveDrawerTrigger render={<Button>Open Menu</Button>} />
			<ResponsiveDrawerContent>
				<ResponsiveDrawerHeader>
					<ResponsiveDrawerTitle>Navigation Menu</ResponsiveDrawerTitle>
					<ResponsiveDrawerDescription>
						Navigate to different sections of the application
					</ResponsiveDrawerDescription>
				</ResponsiveDrawerHeader>
				<ResponsiveDrawerBody>
					<nav className="space-y-4">
						<a
							href="/dashboard"
							className="block p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							Dashboard
						</a>
						<a
							href="/projects"
							className="block p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							Projects
						</a>
						<a
							href="/settings"
							className="block p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							Settings
						</a>
						<a
							href="/profile"
							className="block p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
						>
							Profile
						</a>
					</nav>
				</ResponsiveDrawerBody>
				<ResponsiveDrawerFooter>
					<ResponsiveDrawerClose
						render={<Button variant="outline">Close</Button>}
					/>
				</ResponsiveDrawerFooter>
			</ResponsiveDrawerContent>
		</ResponsiveDrawer>
	);
};

export const FormExample = () => {
	return (
		<ResponsiveDrawer>
			<ResponsiveDrawerTrigger render={<Button>Add Item</Button>} />
			<ResponsiveDrawerContent>
				<ResponsiveDrawerHeader>
					<ResponsiveDrawerTitle>Add New Item</ResponsiveDrawerTitle>
					<ResponsiveDrawerDescription>
						Fill out the form below to add a new item to your collection
					</ResponsiveDrawerDescription>
				</ResponsiveDrawerHeader>
				<ResponsiveDrawerBody>
					<form className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-1">Name</label>
							<input
								type="text"
								placeholder="Enter item name"
								className="w-full p-2 border rounded-md"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Category</label>
							<select className="w-full p-2 border rounded-md">
								<option>Select category</option>
								<option>Documents</option>
								<option>Images</option>
								<option>Videos</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Description
							</label>
							<textarea
								rows={3}
								placeholder="Enter description"
								className="w-full p-2 border rounded-md"
							/>
						</div>
					</form>
				</ResponsiveDrawerBody>
				<ResponsiveDrawerFooter>
					<div className="flex gap-2 w-full">
						<Button className="flex-1">Save</Button>
						<ResponsiveDrawerClose
							render={
								<Button variant="outline" className="flex-1">
									Cancel
								</Button>
							}
						/>
					</div>
				</ResponsiveDrawerFooter>
			</ResponsiveDrawerContent>
		</ResponsiveDrawer>
	);
};

export const ControlledExample = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="space-y-4">
			<div className="text-sm">
				<strong>Drawer State:</strong> {open ? "Open" : "Closed"}
			</div>

			<ResponsiveDrawer open={open} onOpenChange={setOpen}>
				<ResponsiveDrawerTrigger render={<Button>Open Settings</Button>} />
				<ResponsiveDrawerContent>
					<ResponsiveDrawerHeader>
						<ResponsiveDrawerTitle>Settings</ResponsiveDrawerTitle>
						<ResponsiveDrawerDescription>
							Manage your account settings and preferences
						</ResponsiveDrawerDescription>
					</ResponsiveDrawerHeader>
					<ResponsiveDrawerBody>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span>Dark Mode</span>
								<input type="checkbox" />
							</div>
							<div className="flex items-center justify-between">
								<span>Notifications</span>
								<input type="checkbox" defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<span>Auto-save</span>
								<input type="checkbox" defaultChecked />
							</div>
						</div>
					</ResponsiveDrawerBody>
					<ResponsiveDrawerFooter>
						<div className="flex gap-2 w-full">
							<Button className="flex-1">Save Changes</Button>
							<ResponsiveDrawerClose
								render={
									<Button variant="outline" className="flex-1">
										Cancel
									</Button>
								}
							/>
						</div>
					</ResponsiveDrawerFooter>
				</ResponsiveDrawerContent>
			</ResponsiveDrawer>

			<div className="flex gap-2">
				<Button onClick={() => setOpen(true)} size="sm" variant="outline">
					Open Programmatically
				</Button>
				<Button onClick={() => setOpen(false)} size="sm" variant="outline">
					Close Programmatically
				</Button>
			</div>
		</div>
	);
};

export const SimpleExample = () => {
	return (
		<ResponsiveDrawer>
			<ResponsiveDrawerTrigger
				render={<Button variant="outline">Quick Actions</Button>}
			/>
			<ResponsiveDrawerContent>
				<ResponsiveDrawerHeader>
					<ResponsiveDrawerTitle>Quick Actions</ResponsiveDrawerTitle>
				</ResponsiveDrawerHeader>
				<ResponsiveDrawerBody>
					<div className="grid gap-2">
						<Button variant="outline" className="justify-start">
							Create New Project
						</Button>
						<Button variant="outline" className="justify-start">
							Import Data
						</Button>
						<Button variant="outline" className="justify-start">
							Export Settings
						</Button>
						<Button variant="outline" className="justify-start">
							Contact Support
						</Button>
					</div>
				</ResponsiveDrawerBody>
			</ResponsiveDrawerContent>
		</ResponsiveDrawer>
	);
};
