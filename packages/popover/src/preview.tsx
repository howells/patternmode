"use client";

import type { PopoverProps } from "./component";
import { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "./component";

export function PopoverPreview(props: PopoverProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Click me</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Settings</PopoverTitle>
        <PopoverDescription>
          Adjust your account preferences and notification settings.
        </PopoverDescription>
        <div className="mt-4 flex justify-end">
          <PopoverClose className="px-3 py-1 text-sm border rounded hover:bg-zinc-50">Close</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const popoverPreviewProps = [
  { name: "open", type: "boolean", description: "Controls whether the popover is open (controlled mode).", defaultValue: false },
];
