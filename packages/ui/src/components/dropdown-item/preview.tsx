import { User } from "lucide-react";
import { DropdownItem } from "./component";

export const DropdownItemExample = () => (
  <div className="w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1">
    <DropdownItem leftIcon={User}>User Profile</DropdownItem>
    <DropdownItem selected>Selected Item</DropdownItem>
    <DropdownItem>Normal Item</DropdownItem>
  </div>
);
