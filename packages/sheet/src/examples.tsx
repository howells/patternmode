"use client";

import { Button } from "@patternmode/button";
import { Input } from "@patternmode/input";
import { Label } from "@patternmode/label";
import { useId } from "react";
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
  const nameId = useId();
  const usernameId = useId();
  return (
    <Sheet>
      <SheetTrigger className="rounded border px-3 py-2">
        Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Name</Label>
              <Input id={nameId} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={usernameId}>Username</Label>
              <Input id={usernameId} placeholder="@username" />
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose>
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
      <SheetTrigger className="rounded border px-3 py-2">
        Open Settings
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your application preferences.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input defaultChecked type="checkbox" />
              Enable notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Use dark mode
            </label>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose className="rounded border px-3 py-2">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function InformationExample() {
  return (
    <Sheet>
      <SheetTrigger className="rounded border px-3 py-2">
        Open Info
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Information</SheetTitle>
          <SheetDescription>Details about this feature.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-2 text-sm">
            <p>
              This sheet shows informational content with a simple close action.
            </p>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose className="rounded border px-3 py-2">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ContactFormExample() {
  const emailId = useId();
  const messageId = useId();
  return (
    <Sheet>
      <SheetTrigger className="rounded border px-3 py-2">
        Contact Us
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Form</SheetTitle>
          <SheetDescription>Send us a message.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor={emailId}>Email</Label>
              <Input id={emailId} placeholder="you@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={messageId}>Message</Label>
              <textarea
                className="w-full rounded border p-2"
                id={messageId}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <SheetClose>
                <Button variant="secondary">Cancel</Button>
              </SheetClose>
              <Button type="submit" variant="primary">
                Send
              </Button>
            </div>
          </form>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
