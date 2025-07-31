"use client";

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
} from "@patternmode/ui";

export function Example() {
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Open Settings
        </button>
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent>
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Settings</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Manage your account settings and preferences.
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ResponsiveDrawerBody>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Notifications
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Push notifications</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Theme
              </h3>
              <select className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </ResponsiveDrawerBody>
        <ResponsiveDrawerFooter>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
          <ResponsiveDrawerClose>
            <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600">
              Cancel
            </button>
          </ResponsiveDrawerClose>
        </ResponsiveDrawerFooter>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
}
