"use client";

import React from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./component";

type DialogProps = React.ComponentProps<typeof Dialog> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DialogExample(props: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlledFromParent = props.open !== undefined;
  const open = isControlledFromParent ? props.open : internalOpen;
  const onOpenChange = isControlledFromParent ? props.onOpenChange : setInternalOpen;

  const { open: _, onOpenChange: __, ...restProps } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...restProps}>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
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
}

// Preview props for prop explorer
export const DialogPreviewProps = [
  {
    name: "open",
    type: "boolean",
    description: "Controls whether the dialog is open (controlled mode).",
    defaultValue: false,
  },
];
