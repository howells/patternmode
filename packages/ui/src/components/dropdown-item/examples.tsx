import { Check, Search, Settings, Trash2, User } from "lucide-react";
import { DropdownItem } from "./component";

export const DropdownItemBasic = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </div>
);

export const DropdownItemWithIcons = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem leftIcon={User}>User Profile</DropdownItem>
    <DropdownItem leftIcon={Settings}>Settings</DropdownItem>
    <DropdownItem leftIcon={Search} rightIcon={Check}>Search</DropdownItem>
  </div>
);

export const DropdownItemStates = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem>Normal</DropdownItem>
    <DropdownItem highlighted>Highlighted</DropdownItem>
    <DropdownItem selected rightIcon={Check}>Selected</DropdownItem>
    <DropdownItem disabled>Disabled</DropdownItem>
  </div>
);

export const DropdownItemWithShortcuts = () => (
  <div className="w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem leftIcon={Search} kbd="⌘K">Quick Search</DropdownItem>
    <DropdownItem leftIcon={Settings} kbd="⌘,">Preferences</DropdownItem>
    <DropdownItem leftIcon={User} kbd="⌘P">Profile</DropdownItem>
  </div>
);

export const DropdownItemWithHints = () => (
  <div className="w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem leftIcon={User} hint="Admin">John Doe</DropdownItem>
    <DropdownItem leftIcon={User} hint="Member">Jane Smith</DropdownItem>
    <DropdownItem leftIcon={User} hint="Guest">Bob Wilson</DropdownItem>
  </div>
);

export const DropdownItemSizes = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 space-y-1">
    <div className="text-xs text-zinc-500 px-2 py-1">Small</div>
    <DropdownItem size="sm" leftIcon={User}>Small Item</DropdownItem>

    <div className="text-xs text-zinc-500 px-2 py-1 mt-2">Default</div>
    <DropdownItem leftIcon={User}>Default Item</DropdownItem>

    <div className="text-xs text-zinc-500 px-2 py-1 mt-2">Large</div>
    <DropdownItem size="lg" leftIcon={User}>Large Item</DropdownItem>
  </div>
);

export const DropdownItemDestructive = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem leftIcon={User}>Edit User</DropdownItem>
    <DropdownItem leftIcon={Settings}>Settings</DropdownItem>
    <div className="border-t border-zinc-200 dark:border-zinc-800 my-1" />
    <DropdownItem variant="destructive" leftIcon={Trash2}>Delete User</DropdownItem>
  </div>
);
