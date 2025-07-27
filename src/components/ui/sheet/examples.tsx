"use client";

import React from "react";
import {
  Drawer as Sheet,
  DrawerClose as SheetClose,
  DrawerContent as SheetContent,
  DrawerDescription as SheetDescription,
  DrawerFooter as SheetFooter,
  DrawerHeader as SheetHeader,
  DrawerTitle as SheetTitle,
  DrawerTrigger as SheetTrigger,
} from "./sheet";
import { Button } from "../button";

// Config example ID: "default" -> export name: DefaultExample
export function DefaultExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              value="Pedro Duarte"
              className="col-span-3 rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              value="@peduarte"
              className="col-span-3 rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Config example ID: "sides" -> export name: SidesExample
export function SidesExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Sheet from top</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet from right</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Sheet from bottom</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet from left</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Additional examples (not referenced in config but good to have)

export function BasicSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <button>Open Sheet</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a description of the sheet content.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
        <SheetFooter>
          <SheetClose>
            <button>Close</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function SheetWithForm() {
  return (
    <Sheet>
      <SheetTrigger>
        <button>Edit Profile</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4 py-4">
          <div>
            <label>Name</label>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" defaultValue="john@example.com" />
          </div>
        </form>
        <SheetFooter>
          <button type="submit">Save Changes</button>
          <SheetClose>
            <button>Cancel</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}