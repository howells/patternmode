"use client";

import React from "react";
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
} from "./component";

export const DefaultExample = () => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Click me
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Settings</PopoverTitle>
        <PopoverDescription>
          Adjust your account preferences and notification settings.
        </PopoverDescription>
        <div className="mt-4 flex justify-end">
          <PopoverClose className="px-3 py-1 text-sm border rounded hover:bg-zinc-50">
            Close
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const WithArrowExample = () => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Show Details
      </PopoverTrigger>
      <PopoverContent side="top" align="start" sideOffset={15}>
        <PopoverArrow />
        <PopoverTitle>Product Details</PopoverTitle>
        <PopoverDescription>
          This product includes advanced features and premium support.
        </PopoverDescription>
        <div className="mt-4 flex justify-between">
          <PopoverClose className="px-3 py-1 text-sm border rounded hover:bg-zinc-50">
            Cancel
          </PopoverClose>
          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            Learn More
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const WithBackdropExample = () => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
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
            <PopoverClose className="px-3 py-1 text-sm border rounded hover:bg-zinc-50">
              Cancel
            </PopoverClose>
            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
              Confirm
            </button>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
