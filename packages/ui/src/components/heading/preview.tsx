import { Heading } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  HeadingExample = ({
    level = 1,
    children = "Heading Text",
    ...props
  }: {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: string;
    [key: string]: unknown;
  }) => {
    return (
      <Heading level={level} {...props}>
        {children}
      </Heading>
    );
  };
