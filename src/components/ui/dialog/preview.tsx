"use client";

import { Button } from "@patternmode/ui";
import { FormControl, FormField } from "@patternmode/ui";
import { X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@patternmode/ui";

interface DialogExampleProps {
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export function DialogExample({
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: DialogExampleProps) {
  const [open, setOpen] = useState(false);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
        <DialogContent
          className={sizeClasses[size]}
          data-close-on-overlay-click={closeOnOverlayClick}
        >
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </div>
              {showCloseButton && (
                <DialogClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0"
                      leftIcon={X}
                    />
                  }
                >
                  Close dialog
                </DialogClose>
              )}
            </div>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <FormField name="name" label="Name">
                <FormControl defaultValue="John Doe" />
              </FormField>
              <FormField name="email" label="Email">
                <FormControl type="email" defaultValue="john@example.com" />
              </FormField>
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
    </div>
  );
}
