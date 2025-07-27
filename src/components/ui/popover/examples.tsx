"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";
import { Button } from "../button/button";

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Open Popover</PopoverTrigger>
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
        <PopoverTrigger render={<Button />}>Top</PopoverTrigger>
        <PopoverContent side="top">
          <PopoverTitle>Top Popover</PopoverTitle>
          <PopoverDescription>
            Positioned above the trigger.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button />}>Bottom</PopoverTrigger>
        <PopoverContent side="bottom">
          <PopoverTitle>Bottom Popover</PopoverTitle>
          <PopoverDescription>
            Positioned below the trigger.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button />}>Right</PopoverTrigger>
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
      <PopoverTrigger render={<Button />}>With Arrow</PopoverTrigger>
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
      <PopoverTrigger render={<Button />}>With Close Button</PopoverTrigger>
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
      <PopoverTrigger render={<Button />}>User Menu</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <PopoverTitle>John Doe</PopoverTitle>
            <PopoverDescription>john.doe@example.com</PopoverDescription>
          </div>

          <div className="border-t pt-3">
            <div className="space-y-2">
              <button className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100">
                Profile Settings
              </button>
              <button className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100">
                Billing
              </button>
              <button className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-zinc-100">
                Team
              </button>
            </div>
          </div>

          <div className="border-t pt-3">
            <button className="flex w-full items-center rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50">
              Sign out
            </button>
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
        <PopoverTrigger render={<Button />}>Controlled Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Controlled State</PopoverTitle>
          <PopoverDescription>
            This popover's open state is controlled externally.
          </PopoverDescription>
          <div className="mt-3">
            <Button onClick={() => setOpen(false)} size="sm">
              Close from inside
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={() => setOpen(!open)} variant="outline">
        Toggle: {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button />}>Controlled Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Controlled State</PopoverTitle>
          <PopoverDescription>
            This popover's open state is controlled externally.
          </PopoverDescription>
          <div className="mt-3">
            <Button onClick={() => setOpen(false)} size="sm">
              Close from inside
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={() => setOpen(!open)} variant="outline">
        Toggle: {open ? "Open" : "Closed"}
      </Button>
    </div>
  );
}