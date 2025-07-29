"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@patternmode/ui";

interface PopoverExampleProps {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  showArrow?: boolean;
  showClose?: boolean;
}

export function PopoverExample({
  side = "bottom",
  align = "center",
  sideOffset = 10,
  showArrow = false,
  showClose = false,
}: PopoverExampleProps) {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Basic popover */}
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger>Open Popover</PopoverTrigger>
          <PopoverContent side={side} align={align} sideOffset={sideOffset}>
            {showArrow && <PopoverArrow />}
            <div className="space-y-2">
              {showClose && (
                <div className="flex items-start justify-between">
                  <PopoverTitle>Popover Title</PopoverTitle>
                  <PopoverClose
                    render={
                      <button className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-50" />
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M12.207 4.793a1 1 0 010 1.414L9.414 9l2.793 2.793a1 1 0 01-1.414 1.414L8 10.414l-2.793 2.793a1 1 0 01-1.414-1.414L6.586 9 3.793 6.207a1 1 0 011.414-1.414L8 7.586l2.793-2.793a1 1 0 011.414 0z" />
                    </svg>
                  </PopoverClose>
                </div>
              )}
              {!showClose && <PopoverTitle>Popover Title</PopoverTitle>}
              <PopoverDescription>
                This is a popover description with some helpful information
                about the content.
              </PopoverDescription>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Position examples */}
      <div className="flex justify-center gap-4">
        <Popover>
          <PopoverTrigger>Top</PopoverTrigger>
          <PopoverContent side="top">
            <PopoverTitle>Top Position</PopoverTitle>
            <PopoverDescription>
              This popover appears above the trigger.
            </PopoverDescription>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>Right</PopoverTrigger>
          <PopoverContent side="right">
            <PopoverTitle>Right Position</PopoverTitle>
            <PopoverDescription>
              This popover appears to the right of the trigger.
            </PopoverDescription>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>Bottom</PopoverTrigger>
          <PopoverContent side="bottom">
            <PopoverTitle>Bottom Position</PopoverTitle>
            <PopoverDescription>
              This popover appears below the trigger.
            </PopoverDescription>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>Left</PopoverTrigger>
          <PopoverContent side="left">
            <PopoverTitle>Left Position</PopoverTitle>
            <PopoverDescription>
              This popover appears to the left of the trigger.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      </div>

      {/* Rich content example */}
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger>User Menu</PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-3">
              <div>
                <PopoverTitle>John Doe</PopoverTitle>
                <PopoverDescription>john.doe@example.com</PopoverDescription>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <div className="space-y-1">
                  <button className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                    Profile Settings
                  </button>
                  <button className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                    Billing
                  </button>
                  <button className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                    Team
                  </button>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <button className="flex w-full items-center px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                  Sign out
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Controlled example */}
      <div className="flex justify-center gap-4">
        <Popover open={controlledOpen} onOpenChange={setControlledOpen}>
          <PopoverTrigger>Controlled</PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Controlled State</PopoverTitle>
            <PopoverDescription>
              This popover's open state is controlled externally.
            </PopoverDescription>
            <div className="mt-3">
              <Button onClick={() => setControlledOpen(false)} size="sm">
                Close from inside
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => setControlledOpen(!controlledOpen)}
          variant="outline"
          size="sm"
        >
          Toggle: {controlledOpen ? "Open" : "Closed"}
        </Button>
      </div>
    </div>
  );
}
