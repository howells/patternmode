"use client";

import type { DropdownItemProps } from "./dropdown-item";
import { Check, Search, Settings, User } from "lucide-react";
import { DropdownItem } from "./dropdown-item";

export function DropdownItemExample(_props: DropdownItemProps) {
  return (
    <div className="w-56 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 shadow-lg">
      <DropdownItem leftIcon={User}>User Profile</DropdownItem>
      <DropdownItem leftIcon={Settings} kbd="⌘,">Settings</DropdownItem>
      <DropdownItem leftIcon={Search} selected rightIcon={Check}>Search</DropdownItem>
      <div className="border-t border-zinc-200 dark:border-zinc-800 my-1" />
      <DropdownItem disabled>Disabled Option</DropdownItem>
    </div>
  );
}
