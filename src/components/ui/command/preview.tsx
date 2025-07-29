import { File, Folder, Save, Settings, Terminal } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@patternmode/ui";

interface CommandExampleProps {
  size?: "sm" | "default" | "lg";
  placeholder?: string;
  emptyMessage?: string;
}

export function CommandExample({
  size = "default",
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
}: CommandExampleProps) {
  return (
    <div className="flex justify-center">
      <Command
        className="rounded-lg inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10 shadow-md w-72 max-w-2xl"
        size={size}
      >
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem leftIcon={File}>
              New File
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem leftIcon={Folder}>
              Open File
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem leftIcon={Save}>
              Save File
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem leftIcon={Settings}>Preferences</CommandItem>
            <CommandItem leftIcon={Terminal}>Terminal</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
