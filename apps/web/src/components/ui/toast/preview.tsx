"use client";

import { Button } from "@patternmode/ui";
import { Toast, useToast } from "@patternmode/ui";

export function ToastExample() {
  const toast = useToast();

  return (
    <Toast.Provider>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() =>
              toast.success(
                "Success!",
                "Your changes have been saved successfully."
              )
            }
          >
            Show Success Toast
          </Button>

          <Button
            variant="destructive"
            onClick={() =>
              toast.error("Error", "Something went wrong. Please try again.")
            }
          >
            Show Error Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Info", "This is an informational message.")
            }
          >
            Show Info Toast
          </Button>
        </div>
      </div>
    </Toast.Provider>
  );
}
