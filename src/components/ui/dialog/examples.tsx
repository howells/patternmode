"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@patternmode/ui";
import { Button } from "@patternmode/ui";
import { Input } from "@patternmode/ui";

// Default dialog
export const DefaultExample = () => (
  <Dialog>
    <DialogTrigger render={<Button />}>
      Open Dialog
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description that explains what the dialog is for.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p>Dialog content goes here.</p>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="secondary" />}>
          Cancel
        </DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// With form
export const WithFormExample = () => (
  <Dialog>
    <DialogTrigger render={<Button />}>
      Edit Profile
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">
            Name
          </label>
          <Input
            id="name"
            defaultValue="John Doe"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">
            Email
          </label>
          <Input
            id="email"
            defaultValue="john@example.com"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="secondary" />}>
          Cancel
        </DialogClose>
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Confirmation dialog
export const ConfirmationExample = () => (
  <Dialog>
    <DialogTrigger render={<Button variant="destructive" />}>
      Delete Account
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={<Button variant="secondary" />}>
          Cancel
        </DialogClose>
        <Button variant="destructive">Delete Account</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Controlled dialog
export const ControlledExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        Open Controlled Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            This dialog's open state is controlled externally.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Current state: {open ? 'Open' : 'Closed'}</p>
          <Button onClick={() => setOpen(false)}>
            Close from inside
          </Button>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};export const DialogExample = DefaultExample;
