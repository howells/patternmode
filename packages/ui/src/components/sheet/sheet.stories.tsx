import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { SheetContent } from "./sheet-content";
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet-root";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review a primitive before promotion</SheetTitle>
          <SheetDescription>
            Sheets work well for side-by-side context, editing, and follow-up
            actions that should not replace the full screen.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Primitive name</Label>
            <Input defaultValue="Command palette" id="sheet-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-notes">Why upstream?</Label>
            <Textarea
              defaultValue="It is broadly reusable, visually stable, and fits the shared product shell layer."
              id="sheet-notes"
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="ghost">Keep local</Button>
          <Button variant="accent">Promote primitive</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="secondary">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side} sheet</SheetTitle>
              <SheetDescription>
                The same component can support side panels and slimmer mobile
                overlays without diverging from the house style.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
