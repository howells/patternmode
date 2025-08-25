"use client";

import * as React from "react";
import { Button } from "@patternmode/button";
import { Input } from "@patternmode/input";
import { Label } from "@patternmode/label";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./component";

export function DefaultExample() {
  return (
    <Sheet>
      <SheetTrigger className="px-3 py-2 rounded border">Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="@username" />
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="primary">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function SettingsExample() {
  return (
    <Sheet>
      <SheetTrigger className="px-3 py-2 rounded border">Open Settings</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your application preferences.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Enable notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Use dark mode
            </label>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose className="px-3 py-2 rounded border">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function InformationExample() {
  return (
    <Sheet>
      <SheetTrigger className="px-3 py-2 rounded border">Open Info</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Information</SheetTitle>
          <SheetDescription>Details about this feature.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-2 text-sm">
            <p>This sheet shows informational content with a simple close action.</p>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose className="px-3 py-2 rounded border">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ContactFormExample() {
  return (
    <Sheet>
      <SheetTrigger className="px-3 py-2 rounded border">Contact Us</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Form</SheetTitle>
          <SheetDescription>Send us a message.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea id="message" className="w-full rounded border p-2" rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <SheetClose asChild>
                <Button variant="secondary">Cancel</Button>
              </SheetClose>
              <Button variant="primary" type="submit">Send</Button>
            </div>
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

