"use client";

import { Button } from "@patternmode/button";
import { Text } from "@patternmode/text";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from ".";

export function DrawerPreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description goes here.</DrawerDescription>
        </DrawerHeader>
        <Text>Content</Text>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DrawerClose>
          <Button type="button" variant="primary">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const drawerPreviewProps: readonly unknown[] = [];
