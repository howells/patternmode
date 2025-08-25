"use client";

import { Button } from "@patternmode/button";
import { Input } from "@patternmode/input";
import { Text } from "@patternmode/text";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./component";

export const DefaultExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button>Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Title</DrawerTitle>
        <DrawerDescription>Basic drawer with header and footer.</DrawerDescription>
      </DrawerHeader>
      <Text>Drawer content goes here.</Text>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Close</Button>
        </DrawerClose>
        <Button>Confirm</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const FormExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button>Edit Profile</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
        <DrawerDescription>Update your profile information.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">Name</label>
          <Input id="name" defaultValue="John Doe" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">Email</label>
          <Input id="email" defaultValue="john@example.com" className="col-span-3" />
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DrawerClose>
        <Button>Save changes</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const SettingsExample = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="secondary">Settings</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>Various configuration options.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Close</Button>
        </DrawerClose>
        <Button>Apply</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
