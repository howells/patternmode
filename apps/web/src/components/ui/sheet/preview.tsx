"use client";

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
} from "@patternmode/ui";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Configure Settings
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Application Settings</SheetTitle>
          <SheetDescription>
            Configure your application preferences and settings.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                General
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                    defaultValue="My App"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
                    rows={3}
                    defaultValue="A modern application built with React and TypeScript."
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Enable notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Auto-save changes</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Show keyboard shortcuts</span>
                </label>
              </div>
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Settings
          </button>
          <SheetClose>
            <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600">
              Cancel
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
