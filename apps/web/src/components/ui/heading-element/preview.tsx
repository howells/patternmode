import React from "react";
import { HeadingElement } from "@patternmode/ui";

// Example component for preview system
export const HeadingElementExample = ({
  level = 1,
  children = "Heading Text",
  className = "",
  ...props
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: string;
  className?: string;
  [key: string]: unknown;
}) => {
  return (
    <div className="flex justify-center">
      <HeadingElement level={level} className={className} {...props}>
        {children}
      </HeadingElement>
    </div>
  );
};

// Default export for the preview system
export function Example() {
  return <HeadingElementExample />;
}
