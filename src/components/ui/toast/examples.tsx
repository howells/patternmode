"use client";

import React from "react";
import { useToast } from "@patternmode/ui";
import { Button } from "@patternmode/ui";

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