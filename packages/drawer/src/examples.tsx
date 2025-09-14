"use client";

import { Text } from "@patternmode/text";
// Use basic HTML elements to avoid cross-package imports in examples
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from ".";

export const DefaultExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button className="rounded border px-3 py-2" type="button">
        Open Drawer
      </button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>
          Basic drawer with header and footer.
        </DrawerDescription>
      </DrawerHeader>
      <Text>Drawer content goes here.</Text>
      <DrawerFooter>
        <DrawerClose asChild>
          <button className="rounded border px-3 py-2" type="button">
            Close
          </button>
        </DrawerClose>
        <button className="rounded border px-3 py-2" type="button">
          Confirm
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const FormExample = () => {
  const nameId = React.useId();
  const emailId = React.useId();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded border px-3 py-2" type="button">
          Edit Profile
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Update your profile information.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 p-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right" htmlFor={nameId}>
              Name
            </label>
            <input
              className="col-span-3 rounded border px-2 py-1"
              defaultValue="John Doe"
              id={nameId}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right" htmlFor={emailId}>
              Email
            </label>
            <input
              className="col-span-3 rounded border px-2 py-1"
              defaultValue="john@example.com"
              id={emailId}
            />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="rounded border px-3 py-2" type="button">
              Cancel
            </button>
          </DrawerClose>
          <button className="rounded border px-3 py-2" type="button">
            Save changes
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const SettingsExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button className="rounded border px-3 py-2" type="button">
        Settings
      </button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>Various configuration options.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <button className="rounded border px-3 py-2" type="button">
            Close
          </button>
        </DrawerClose>
        <button className="rounded border px-3 py-2" type="button">
          Apply
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
