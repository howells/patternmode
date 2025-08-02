"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@patternmode/ui";

import React, { useState } from "react";

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger>Open Popover</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>
          This is a popover description with some helpful information.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export function DefaultExample() {
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger>Top</PopoverTrigger>
        <PopoverContent side="top">
          <PopoverTitle>Top Popover</PopoverTitle>
          <PopoverDescription>
            Positioned above the trigger.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>Bottom</PopoverTrigger>
        <PopoverContent side="bottom">
          <PopoverTitle>Bottom Popover</PopoverTitle>
          <PopoverDescription>
            Positioned below the trigger.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>Right</PopoverTrigger>
        <PopoverContent side="right">
          <PopoverTitle>Right Popover</PopoverTitle>
          <PopoverDescription>
            Positioned to the right of the trigger.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function PositionsExample() {
  return (
    <Popover>
      <PopoverTrigger>With Arrow</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverTitle>Popover with Arrow</PopoverTitle>
        <PopoverDescription>
          This popover has a pointing arrow for better visual connection.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export function WithArrowExample() {
  return (
    <Popover>
      <PopoverTrigger>With Close Button</PopoverTrigger>
      <PopoverContent>
        <div className="flex items-start justify-between">
          <PopoverTitle>Settings</PopoverTitle>
          <PopoverClose
            render={<button className="text-zinc-400 hover:text-zinc-900" />}
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
        <PopoverDescription>
          Adjust your preferences and settings here.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export function WithCloseExample() {
  return (
    <Popover>
      <PopoverTrigger>User Menu</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <PopoverTitle>John Doe</PopoverTitle>
            <PopoverDescription>john.doe@example.com</PopoverDescription>
          </div>

          <div className="border-t pt-3">
            <div className="space-y-2">
              <div className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100 cursor-pointer">
                Profile Settings
              </div>
              <div className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100 cursor-pointer">
                Billing
              </div>
              <div className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100 cursor-pointer">
                Team
              </div>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex w-full items-center rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
              Sign out
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function RichContentExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>Controlled Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Controlled State</PopoverTitle>
          <PopoverDescription>
            This popover's open state is controlled externally.
          </PopoverDescription>
          <div className="mt-3">
            <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-md">
              Close from inside
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={() => setOpen(!open)} variant="outline">
        Toggle:
        {" "}
        {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>Controlled Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Controlled State</PopoverTitle>
          <PopoverDescription>
            This popover's open state is controlled externally.
          </PopoverDescription>
          <div className="mt-3">
            <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-md">
              Close from inside
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={() => setOpen(!open)} variant="outline">
        Toggle:
        {" "}
        {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "PopoverExample",
    title: "Popover",
    description: "Popover example",
    component: PopoverExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "PositionsExample",
    title: "Positions",
    description: "Positions example",
    component: PositionsExample,
  },
  {
    id: "WithArrowExample",
    title: "With Arrow",
    description: "With Arrow example",
    component: WithArrowExample,
  },
  {
    id: "WithCloseExample",
    title: "With Close",
    description: "With Close example",
    component: WithCloseExample,
  },
  {
    id: "RichContentExample",
    title: "Rich Content",
    description: "Rich Content example",
    component: RichContentExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
];
