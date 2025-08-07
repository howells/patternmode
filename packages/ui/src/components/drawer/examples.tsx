"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./component";

// Basic drawer example
export const DefaultExample = () => (
  <Drawer>
    <DrawerTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Open Drawer
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Basic Drawer</DrawerTitle>
        <DrawerDescription>
          This is a basic drawer with header and content.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This is the main content area of the drawer. You can put any content here.
        </p>
      </div>
      <DrawerFooter>
        <DrawerClose className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600">
          Close
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

// Form drawer example
export const FormExample = () => (
  <Drawer>
    <DrawerTrigger className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
      Add Item
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Add New Item</DrawerTitle>
        <DrawerDescription>
          Fill out the form below to add a new item.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </label>
          <input
            type="text"
            placeholder="Item name"
            className="w-full px-3 py-2 border  dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Description
          </label>
          <textarea
            placeholder="Item description"
            rows={3}
            className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <DrawerFooter>
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Item
        </button>
        <DrawerClose className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600">
          Cancel
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

// Settings drawer example
export const SettingsExample = () => (
  <Drawer>
    <DrawerTrigger className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
      Settings
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>
          Manage your account settings and preferences.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
            Appearance
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="theme" value="light" className="text-blue-600" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Light mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="theme" value="dark" className="text-blue-600" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Dark mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="theme" value="system" className="text-blue-600" defaultChecked />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">System</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
            Notifications
          </h4>
          <label className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Email notifications</span>
            <input type="checkbox" className="text-blue-600" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Push notifications</span>
            <input type="checkbox" className="text-blue-600" />
          </label>
        </div>
      </div>
      <DrawerFooter>
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save Changes
        </button>
        <DrawerClose className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600">
          Cancel
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
