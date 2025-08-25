"use client";

import { useState } from "react";
// Use basic elements to avoid cross-package imports in examples
import { Text } from "@patternmode/text";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./component";

export const DefaultExample = () => (
  <Dialog>
    <DialogTrigger render={<button type="button" className="px-3 py-2 border rounded" />}>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description that explains what the dialog is for.
        </DialogDescription>
      </DialogHeader>
      <Text>Dialog content goes here.</Text>
      <DialogFooter>
        <DialogClose render={<button type="button" className="px-3 py-2 border rounded" />}>Cancel</DialogClose>
        <button type="button" className="px-3 py-2 border rounded">Confirm</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithFormExample = () => (
  <Dialog>
    <DialogTrigger render={<button type="button" className="px-3 py-2 border rounded" />}>Edit Profile</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">Name</label>
          <input id="name" defaultValue="John Doe" className="col-span-3 border rounded px-2 py-1" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">Email</label>
          <input id="email" defaultValue="john@example.com" className="col-span-3 border rounded px-2 py-1" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<button type="button" className="px-3 py-2 border rounded" />}>Cancel</DialogClose>
        <button type="button" className="px-3 py-2 border rounded">Save changes</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const ConfirmationExample = () => (
  <Dialog>
    <DialogTrigger render={<button type="button" className="px-3 py-2 border rounded" />}>Delete Account</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={<button type="button" className="px-3 py-2 border rounded" />}>Cancel</DialogClose>
        <button type="button" className="px-3 py-2 border rounded">Delete Account</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const ControlledExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button type="button" className="px-3 py-2 border rounded" />}>Open Controlled Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>This dialog's open state is controlled externally.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Current state: {open ? "Open" : "Closed"}</p>
          <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 border rounded">Close from inside</button>
        </div>
        <DialogFooter>
          <DialogClose render={<button type="button" className="px-3 py-2 border rounded" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
