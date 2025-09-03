"use client";

import { Button } from "@patternmode/button";
import { useState } from "react";
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
} from "./component";

export const DefaultExample = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger render={<Button>Open Menu</Button>} />
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Navigation Menu</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Navigate to different sections of the application
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <nav className="space-y-4">
            <a
              className="block rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="block rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="/projects"
            >
              Projects
            </a>
            <a
              className="block rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="/settings"
            >
              Settings
            </a>
            <a
              className="block rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="/profile"
            >
              Profile
            </a>
          </nav>
        </ResponsiveDrawerBody>
        <ResponsiveDrawerFooter>
          <ResponsiveDrawerClose
            render={<Button variant="outline">Close</Button>}
          />
        </ResponsiveDrawerFooter>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};

export const FormExample = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger render={<Button>Add Item</Button>} />
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Add New Item</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Fill out the form below to add a new item to your collection
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block font-medium text-sm">Name</label>
              <input
                className="w-full rounded-md border p-2"
                placeholder="Enter item name"
                type="text"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-sm">Category</label>
              <select className="w-full rounded-md border p-2">
                <option>Select category</option>
                <option>Documents</option>
                <option>Images</option>
                <option>Videos</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-sm">
                Description
              </label>
              <textarea
                className="w-full rounded-md border p-2"
                placeholder="Enter description"
                rows={3}
              />
            </div>
          </form>
        </ResponsiveDrawerBody>
        <ResponsiveDrawerFooter>
          <div className="flex w-full gap-2">
            <Button className="flex-1">Save</Button>
            <ResponsiveDrawerClose
              render={
                <Button className="flex-1" variant="outline">
                  Cancel
                </Button>
              }
            />
          </div>
        </ResponsiveDrawerFooter>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};

export const ControlledExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Drawer State:</strong> {open ? "Open" : "Closed"}
      </div>

      <ResponsiveDrawer onOpenChange={setOpen} open={open}>
        <ResponsiveDrawerTrigger render={<Button>Open Settings</Button>} />
        <ResponsiveDrawerContent>
          <ResponsiveDrawerHeader>
            <ResponsiveDrawerTitle>Settings</ResponsiveDrawerTitle>
            <ResponsiveDrawerDescription>
              Manage your account settings and preferences
            </ResponsiveDrawerDescription>
          </ResponsiveDrawerHeader>
          <ResponsiveDrawerBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <input type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <input defaultChecked type="checkbox" />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-save</span>
                <input defaultChecked type="checkbox" />
              </div>
            </div>
          </ResponsiveDrawerBody>
          <ResponsiveDrawerFooter>
            <div className="flex w-full gap-2">
              <Button className="flex-1">Save Changes</Button>
              <ResponsiveDrawerClose
                render={
                  <Button className="flex-1" variant="outline">
                    Cancel
                  </Button>
                }
              />
            </div>
          </ResponsiveDrawerFooter>
        </ResponsiveDrawerContent>
      </ResponsiveDrawer>

      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} size="sm" variant="outline">
          Open Programmatically
        </Button>
        <Button onClick={() => setOpen(false)} size="sm" variant="outline">
          Close Programmatically
        </Button>
      </div>
    </div>
  );
};

export const SimpleExample = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger
        render={<Button variant="outline">Quick Actions</Button>}
      />
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Quick Actions</ResponsiveDrawerTitle>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <div className="grid gap-2">
            <Button className="justify-start" variant="outline">
              Create New Project
            </Button>
            <Button className="justify-start" variant="outline">
              Import Data
            </Button>
            <Button className="justify-start" variant="outline">
              Export Settings
            </Button>
            <Button className="justify-start" variant="outline">
              Contact Support
            </Button>
          </div>
        </ResponsiveDrawerBody>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};
