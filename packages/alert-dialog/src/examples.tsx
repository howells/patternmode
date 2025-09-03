"use client";

import { Button } from "@patternmode/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./component";

// Default alert dialog
export const DefaultExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button />}>Delete Account</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Destructive alert dialog
export const DestructiveExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="destructive" />}>
      Delete Account
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Account</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete your account and all associated data.
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Simple confirmation dialog
export const SimpleConfirmationExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="outline" />}>
      Clear Cache
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Clear Cache</AlertDialogTitle>
        <AlertDialogDescription>
          This will clear all cached data and may slow down the next page load.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Clear Cache</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Warning dialog
export const WarningExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="secondary" />}>
      Reset Settings
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Reset All Settings</AlertDialogTitle>
        <AlertDialogDescription>
          This will reset all your preferences to default values. You can change
          them again later in the settings panel.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep Current Settings</AlertDialogCancel>
        <AlertDialogAction>Reset to Defaults</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Custom styling example
export const CustomStyledExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="ghost" />}>
      Custom Dialog
    </AlertDialogTrigger>
    <AlertDialogContent className="max-w-md">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-blue-600">
          Custom Styled Dialog
        </AlertDialogTitle>
        <AlertDialogDescription className="text-zinc-500">
          This dialog demonstrates custom styling with different colors and
          sizing.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="text-zinc-600">Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
          Proceed
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
