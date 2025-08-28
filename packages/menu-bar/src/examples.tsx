"use client";

import { Icon } from "@patternmode/icon";
import {
	ChevronRight,
	Edit,
	FileText,
	HelpCircle,
	Plus,
	Settings,
	Trash,
} from "lucide-react";
import {
	MenuBar,
	MenuBarContent,
	MenuBarItem,
	MenuBarMenu,
	MenuBarSeparator,
	MenuBarSubmenu,
	MenuBarSubmenuContent,
	MenuBarSubmenuTrigger,
	MenuBarTrigger,
} from "./component";

// Pre-imported icons from registry

export const DefaultExample = () => {
	return (
		<MenuBar>
			<MenuBarMenu>
				<MenuBarTrigger>File</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem>New</MenuBarItem>
					<MenuBarItem>Open</MenuBarItem>
					<MenuBarItem>Save</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>
			<MenuBarMenu>
				<MenuBarTrigger>Edit</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem>Cut</MenuBarItem>
					<MenuBarItem>Copy</MenuBarItem>
					<MenuBarItem>Paste</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>
		</MenuBar>
	);
};

export const WithIconsExample = () => {
	return (
		<MenuBar>
			<MenuBarMenu>
				<MenuBarTrigger>Actions</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem>
						<div className="flex items-center gap-2">
							<Icon icon={Plus} />
							New Item
						</div>
					</MenuBarItem>
					<MenuBarItem>
						<div className="flex items-center gap-2">
							<Icon icon={Edit} />
							Edit Item
						</div>
					</MenuBarItem>
					<MenuBarItem>
						<div className="flex items-center gap-2">
							<Icon icon={Trash} />
							Delete Item
						</div>
					</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>
		</MenuBar>
	);
};

export const WithSubmenusExample = () => {
	return (
		<MenuBar>
			<MenuBarMenu>
				<MenuBarTrigger>View</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem>Zoom In</MenuBarItem>
					<MenuBarItem>Zoom Out</MenuBarItem>
					<MenuBarSeparator />
					<MenuBarSubmenu>
						<MenuBarSubmenuTrigger>
							<div className="flex items-center justify-between w-full">
								Layout
								<Icon icon={ChevronRight} className="ml-auto" />
							</div>
						</MenuBarSubmenuTrigger>
						<MenuBarSubmenuContent>
							<MenuBarItem>Sidebar</MenuBarItem>
							<MenuBarItem>Panel</MenuBarItem>
							<MenuBarItem>Minimap</MenuBarItem>
						</MenuBarSubmenuContent>
					</MenuBarSubmenu>
				</MenuBarContent>
			</MenuBarMenu>
		</MenuBar>
	);
};

export const ApplicationMenuExample = () => {
	const handleAction = (action: string) => {
		console.log(`Menu action: ${action}`);
	};

	return (
		<MenuBar className="mb-4">
			<MenuBarMenu>
				<MenuBarTrigger>File</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem onSelect={() => handleAction("new")}>
						<div className="flex items-center gap-2">
							<Icon icon={Plus} />
							New Project
						</div>
					</MenuBarItem>
					<MenuBarItem onSelect={() => handleAction("open")}>
						<div className="flex items-center gap-2">
							<Icon icon={FileText} />
							Open...
						</div>
					</MenuBarItem>
					<MenuBarSeparator />
					<MenuBarItem onSelect={() => handleAction("save")}>Save</MenuBarItem>
					<MenuBarItem onSelect={() => handleAction("saveAs")}>
						Save As...
					</MenuBarItem>
					<MenuBarSeparator />
					<MenuBarItem onSelect={() => handleAction("exit")}>Exit</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>

			<MenuBarMenu>
				<MenuBarTrigger>Tools</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem onSelect={() => handleAction("settings")}>
						<div className="flex items-center gap-2">
							<Icon icon={Settings} />
							Settings
						</div>
					</MenuBarItem>
					<MenuBarItem onSelect={() => handleAction("extensions")}>
						Extensions
					</MenuBarItem>
					<MenuBarSeparator />
					<MenuBarItem onSelect={() => handleAction("command")}>
						Command Palette
					</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>

			<MenuBarMenu>
				<MenuBarTrigger>Help</MenuBarTrigger>
				<MenuBarContent>
					<MenuBarItem onSelect={() => handleAction("docs")}>
						<div className="flex items-center gap-2">
							<Icon icon={HelpCircle} />
							Documentation
						</div>
					</MenuBarItem>
					<MenuBarItem onSelect={() => handleAction("support")}>
						Support
					</MenuBarItem>
					<MenuBarSeparator />
					<MenuBarItem onSelect={() => handleAction("about")}>
						About
					</MenuBarItem>
				</MenuBarContent>
			</MenuBarMenu>
		</MenuBar>
	);
};
