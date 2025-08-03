"use client";

import type { SheetProps } from "./component";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./component";

export function SheetExample(props: SheetProps) {
  return (
    <Sheet {...props}>
      <SheetTrigger className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet component that slides in from the side.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
