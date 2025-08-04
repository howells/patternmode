"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./component";

export const DefaultExample = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Edit Profile
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Name
            </label>
            <input
              id="name"
              defaultValue="Daniel Howells"
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Username
            </label>
            <input
              id="username"
              defaultValue="@howells"
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save changes
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const SettingsExample = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="inline-flex items-center justify-center rounded-md border  dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Settings
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Application Settings</SheetTitle>
          <SheetDescription>
            Configure your application preferences and display options.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Display</h3>
            <div className="space-y-2">
              <label htmlFor="theme" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Theme
              </label>
              <select
                id="theme"
                defaultValue="system"
                className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="animations"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded  text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="animations" className="text-sm text-zinc-900 dark:text-zinc-50">
                Enable animations
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  id="email-notifications"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded  text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="email-notifications" className="text-sm text-zinc-900 dark:text-zinc-50">
                  Email notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="push-notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded  text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="push-notifications" className="text-sm text-zinc-900 dark:text-zinc-50">
                  Push notifications
                </label>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <button className="inline-flex items-center justify-center rounded-md border  dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              Cancel
            </button>
          </SheetClose>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Settings
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const ContactFormExample = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Contact Us
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Get in Touch</SheetTitle>
          <SheetDescription>
            Send us a message and we'll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Your Name *
            </label>
            <input
              id="contact-name"
              placeholder="Enter your full name"
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-subject" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Subject *
            </label>
            <input
              id="contact-subject"
              placeholder="What's this about?"
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Message *
            </label>
            <textarea
              id="contact-message"
              placeholder="Type your message here..."
              rows={4}
              className="w-full rounded-md border  dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 resize-none"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <button className="inline-flex items-center justify-center rounded-md border  dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              Cancel
            </button>
          </SheetClose>
          <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Send Message
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const InformationExample = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <button className="inline-flex items-center justify-center rounded-md border  dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          About
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>About This Component</SheetTitle>
          <SheetDescription>
            Learn more about the sheet component and its features.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Built with ARIA support and keyboard navigation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Responsive design that adapts to screen sizes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Smooth animations and transitions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                Customizable styling and layout
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3">Component Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Components:</span>
                <span className="text-zinc-900 dark:text-zinc-50">8 components</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Bundle Size:</span>
                <span className="text-zinc-900 dark:text-zinc-50">2.1kb gzipped</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Dependencies:</span>
                <span className="text-zinc-900 dark:text-zinc-50">Base UI Dialog</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Browser Support:</span>
                <span className="text-zinc-900 dark:text-zinc-50">Modern browsers</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">Usage Tips</h4>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>• Use sheets for detailed forms and settings panels</li>
              <li>• Sheets slide in from the right side of the screen</li>
              <li>• Click outside or press Escape to close</li>
              <li>• Perfect for desktop applications and workflows</li>
            </ul>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <button className="inline-flex items-center justify-center rounded-md border  dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              Close
            </button>
          </SheetClose>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View Documentation
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
