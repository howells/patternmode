"use client";

import { Button } from "@patternmode/button";
// Use basic elements to avoid cross-package imports in examples
import { Text } from "@patternmode/text";
import { useId, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";

export const DefaultExample = () => (
  <Dialog>
    <DialogTrigger render={<Button type="button" />}>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description that explains what the dialog is for.
        </DialogDescription>
      </DialogHeader>
      <Text>Dialog content goes here.</Text>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="button" variant="primary">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithFormExample = () => {
  const nameId = useId();
  const emailId = useId();
  return (
    <Dialog>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
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
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="button" variant="primary">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ConfirmationExample = () => (
  <Dialog>
    <DialogTrigger render={<Button type="button" variant="outline" />}>
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
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="button" variant="destructive">
          Delete Account
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const ControlledExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
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
          <p>Current state: {open ? "Open" : "Closed"}</p>
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="secondary"
          >
            Close from inside
          </Button>
        </div>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
