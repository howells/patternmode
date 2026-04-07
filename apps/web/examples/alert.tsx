"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@patternmode/ui/components/alert";

export default function AlertExample() {
  return (
    <div className="flex flex-col gap-3">
      <Alert>
        <AlertTitle>Default alert</AlertTitle>
        <AlertDescription>
          This is a standard informational alert message.
        </AlertDescription>
      </Alert>
      <Alert variant="default">
        <AlertTitle>Accent alert</AlertTitle>
        <AlertDescription>
          This alert highlights an important update.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive alert</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
