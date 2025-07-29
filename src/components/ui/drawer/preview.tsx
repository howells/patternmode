import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@patternmode/ui";

// Example component for preview system
export const DrawerExample = ({
  direction = "right",
  ...props
}: {
  direction?: "left" | "right" | "top" | "bottom";
  [key: string]: unknown;
}) => {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2">
          Open Drawer ({direction})
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Drawer Content</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            This drawer opens from the {direction} side.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};