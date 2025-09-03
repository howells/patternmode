"use client";

import { Button } from "@patternmode/button";
// Use simple buttons to avoid cross-package imports for preview
import { Text } from "@patternmode/text";
import React from "react";
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

export function DialogPreview(props: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const { open: _omit, onOpenChange: _omit2, ...restProps } = props;
  return (
    <Dialog onOpenChange={setOpen} open={open} {...restProps}>
      <DialogTrigger render={<Button type="button" />}>
        Open Dialog
      </DialogTrigger>
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
}

export const dialogPreviewProps = [
  {
    name: "open",
    type: "boolean",
    description: "Controls whether the dialog is open (controlled mode).",
    defaultValue: false,
  },
];
