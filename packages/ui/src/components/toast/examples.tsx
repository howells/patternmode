"use client";

import { Button, useToast } from "@patternmode/ui";
import React from "react";

export function DefaultExample() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.success("Success!", "Your changes have been saved.");
      }}
    >
      Show Toast
    </Button>
  );
}
