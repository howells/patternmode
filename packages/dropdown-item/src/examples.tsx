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
    <DropdownItem rightIcon={Check} selected>
      Selected with Check
    </DropdownItem>
    <DropdownItem disabled>Disabled</DropdownItem>
  </div>
);

export const DropdownItemWithShortcutsExample = () => (
  <div className="w-64 space-y-1">
    <DropdownItem kbd="⌘K" leftIcon={Search}>
      Quick Search
    </DropdownItem>
    <DropdownItem kbd="⌘," leftIcon={Settings}>
      Preferences
    </DropdownItem>
    <DropdownItem kbd="⌘P" leftIcon={User}>
      Profile
    </DropdownItem>
  </div>
);

export const DropdownItemWithHintsExample = () => (
  <div className="w-64 space-y-1">
    <DropdownItem hint="Admin" leftIcon={User}>
      John Doe
    </DropdownItem>
    <DropdownItem hint="Member" leftIcon={User}>
      Jane Smith
    </DropdownItem>
    <DropdownItem hint="Guest" leftIcon={User}>
      Charlie Wilson
    </DropdownItem>
  </div>
);

export const DropdownItemSizesExample = () => (
  <div className="w-64 space-y-1">
    <DropdownItem leftIcon={User} size="sm">
      Small Item
    </DropdownItem>
    <DropdownItem leftIcon={User}>Default Item</DropdownItem>
    <DropdownItem leftIcon={User} size="lg">
      Large Item
    </DropdownItem>
  </div>
);

export const DropdownItemDestructiveExample = () => (
  <div className="w-64 space-y-1">
    <DropdownItem leftIcon={User}>Edit User</DropdownItem>
    <DropdownItem leftIcon={Settings}>Settings</DropdownItem>
    <DropdownItem leftIcon={Trash2} variant="destructive">
      Delete User
    </DropdownItem>
  </div>
);
