"use client";

import type { ButtonProps } from "./button";

import { Button } from "@patternmode/ui";
import { Save } from "lucide-react";
import React from "react";

export function ButtonExample(props: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Button
      leftIcon={Save}
      isLoading={isLoading}
      loadingText="Saving..."
      onClick={handleClick}
      {...props}
    >
      Save Changes
    </Button>
  );
}
