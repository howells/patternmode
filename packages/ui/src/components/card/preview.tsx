"use client";

import { Card } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CardExample = ({
    padding = 6,
    children = "This is a card component with some example content. It provides a clean container with subtle styling and shadow.",
    className,
    ...props
  }: {
    padding?: string | number;
    children?: string;
    className?: string;
    [key: string]: unknown;
  }) => {
  // Convert string values from props explorer to proper types
    const paddingValue = typeof padding === "string" ? Number(padding) : padding;

    return (
      <Card
        padding={
          paddingValue as
          | 0
          | 0.5
          | 1
          | 1.5
          | 2
          | 2.5
          | 3
          | 3.5
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | 11
          | 12
        }
        className={`max-w-xl ${className || ""}`}
        {...props}
      >
        {children}
      </Card>
    );
  };
