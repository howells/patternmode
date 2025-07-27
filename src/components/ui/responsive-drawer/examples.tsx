"use client";

import React from "react";
import {
  ResponsiveDrawer,
  ResponsiveDrawerBody,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerFooter,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "./responsive-drawer";

export function ResponsiveDrawerExample() {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger>
        <button>Open Drawer</button>
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Drawer Title</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            This drawer adapts to mobile and desktop.
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <p>Drawer content goes here.</p>
        </ResponsiveDrawerBody>
        <ResponsiveDrawerFooter>
          <ResponsiveDrawerClose>
            <button>Cancel</button>
          </ResponsiveDrawerClose>
        </ResponsiveDrawerFooter>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
}

export function DefaultExample() {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger>
        <button>Add Item</button>
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Add New Item</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Fill out the form below to add a new item.
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <form className="space-y-4">
            <div>
              <label>Name</label>
              <input type="text" placeholder="Enter item name" />
            </div>
            <div>
              <label>Description</label>
              <textarea rows={3} placeholder="Enter description" />
            </div>
          </form>
        </ResponsiveDrawerBody>
        <ResponsiveDrawerFooter>
          <button>Save</button>
          <ResponsiveDrawerClose>
            <button>Cancel</button>
          </ResponsiveDrawerClose>
        </ResponsiveDrawerFooter>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
}