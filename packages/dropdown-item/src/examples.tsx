"use client";

import { Check, Search, Settings, Trash2, User } from "lucide-react";
import { DropdownItem } from "./component";

export const DropdownItemBasicExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem>Option 1</DropdownItem>
		<DropdownItem>Option 2</DropdownItem>
		<DropdownItem>Option 3</DropdownItem>
	</div>
);

export const DropdownItemWithIconsExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem leftIcon={User}>User Profile</DropdownItem>
		<DropdownItem leftIcon={Settings}>Settings</DropdownItem>
		<DropdownItem leftIcon={Search} rightIcon={Check}>
			Search with Check
		</DropdownItem>
	</div>
);

export const DropdownItemStatesExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem>Normal</DropdownItem>
		<DropdownItem highlighted>Highlighted</DropdownItem>
		<DropdownItem selected rightIcon={Check}>
			Selected with Check
		</DropdownItem>
		<DropdownItem disabled>Disabled</DropdownItem>
	</div>
);

export const DropdownItemWithShortcutsExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem leftIcon={Search} kbd="⌘K">
			Quick Search
		</DropdownItem>
		<DropdownItem leftIcon={Settings} kbd="⌘,">
			Preferences
		</DropdownItem>
		<DropdownItem leftIcon={User} kbd="⌘P">
			Profile
		</DropdownItem>
	</div>
);

export const DropdownItemWithHintsExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem leftIcon={User} hint="Admin">
			John Doe
		</DropdownItem>
		<DropdownItem leftIcon={User} hint="Member">
			Jane Smith
		</DropdownItem>
		<DropdownItem leftIcon={User} hint="Guest">
			Charlie Wilson
		</DropdownItem>
	</div>
);

export const DropdownItemSizesExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem size="sm" leftIcon={User}>
			Small Item
		</DropdownItem>
		<DropdownItem leftIcon={User}>Default Item</DropdownItem>
		<DropdownItem size="lg" leftIcon={User}>
			Large Item
		</DropdownItem>
	</div>
);

export const DropdownItemDestructiveExample = () => (
	<div className="w-64 space-y-1">
		<DropdownItem leftIcon={User}>Edit User</DropdownItem>
		<DropdownItem leftIcon={Settings}>Settings</DropdownItem>
		<DropdownItem variant="destructive" leftIcon={Trash2}>
			Delete User
		</DropdownItem>
	</div>
);
