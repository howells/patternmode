"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, Button } from "@patternmode/ui";

import React from "react";

// Default alert dialog
export const DefaultExample = () => (
  <AlertDialog>
    <AlertDialogTrigger render={<Button />}>Delete Account</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
      <div className="flex justify-end space-x-2">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </div>
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
      <AlertDialogTitle>Delete Account</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your account and all associated data. This
        action cannot be undone.
      </AlertDialogDescription>
      <div className="flex justify-end space-x-2">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">
          Delete Account
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "DestructiveExample",
    title: "Destructive",
    description: "Destructive example",
    component: DestructiveExample,
  },
];
