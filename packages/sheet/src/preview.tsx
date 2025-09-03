"use client";

import { Button } from "@patternmode/button";
// react import removed; not used here
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

export function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button type="button" variant="outline">
          Open Sheet
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Preview Sheet</SheetTitle>
          <SheetDescription>
            Use this panel to preview content.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
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

export const sheetPreviewProps: readonly unknown[] = [];
