"use client";

import { Button } from "@patternmode/button";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from ".";

export const DefaultExample = () => (
  <Popover>
    <PopoverTrigger render={<Button type="button" />}>Click me</PopoverTrigger>
    <PopoverContent>
      <PopoverTitle>Settings</PopoverTitle>
      <PopoverDescription>
        Adjust your account preferences and notification settings.
      </PopoverDescription>
      <div className="mt-4 flex justify-end">
        <PopoverClose className="rounded border px-3 py-1 text-sm hover:bg-zinc-50">
          Close
        </PopoverClose>
      </div>
    </PopoverContent>
  </Popover>
);

export const WithArrowExample = () => (
  <Popover>
    <PopoverTrigger className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
      Show Details
    </PopoverTrigger>
    <PopoverContent align="start" side="top" sideOffset={15}>
      <PopoverArrow />
      <PopoverTitle>Product Details</PopoverTitle>
      <PopoverDescription>
        This product includes advanced features and premium support.
      </PopoverDescription>
      <div className="mt-4 flex justify-between">
        <PopoverClose className="rounded border px-3 py-1 text-sm hover:bg-zinc-50">
          Cancel
        </PopoverClose>
        <button
          className="rounded bg-zinc-500 px-3 py-1 text-sm text-white hover:bg-zinc-600"
          type="button"
        >
          Learn More
        </button>
      </div>
    </PopoverContent>
  </Popover>
);

export const WithBackdropExample = () => (
  <Popover>
    <PopoverTrigger className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
      Important Action
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverTitle>Confirm Action</PopoverTitle>
        <PopoverDescription>
          This action cannot be undone. Please confirm your decision.
        </PopoverDescription>
        <div className="mt-4 flex justify-end space-x-2">
          <PopoverClose className="rounded border px-3 py-1 text-sm hover:bg-zinc-50">
            Cancel
          </PopoverClose>
          <button
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            type="button"
          >
            Confirm
          </button>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </Popover>
);
