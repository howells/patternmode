"use client";

// Use basic HTML elements to avoid cross-package imports in examples
import { Text } from "@patternmode/text";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./component";

export const DefaultExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button type="button" className="px-3 py-2 border rounded">Open Drawer</button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>Basic drawer with header and footer.</DrawerDescription>
      </DrawerHeader>
      <Text>Drawer content goes here.</Text>
      <DrawerFooter>
        <DrawerClose asChild>
          <button type="button" className="px-3 py-2 border rounded">Close</button>
        </DrawerClose>
        <button type="button" className="px-3 py-2 border rounded">Confirm</button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const FormExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button type="button" className="px-3 py-2 border rounded">Edit Profile</button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
        <DrawerDescription>Update your profile information.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">Name</label>
          <input id="name" defaultValue="John Doe" className="col-span-3 border rounded px-2 py-1" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">Email</label>
          <input id="email" defaultValue="john@example.com" className="col-span-3 border rounded px-2 py-1" />
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <button type="button" className="px-3 py-2 border rounded">Cancel</button>
        </DrawerClose>
        <button type="button" className="px-3 py-2 border rounded">Save changes</button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const SettingsExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button type="button" className="px-3 py-2 border rounded">Settings</button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>Various configuration options.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <button type="button" className="px-3 py-2 border rounded">Close</button>
        </DrawerClose>
        <button type="button" className="px-3 py-2 border rounded">Apply</button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
