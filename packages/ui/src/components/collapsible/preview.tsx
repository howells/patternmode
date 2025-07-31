"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CollapsibleExample = ({
    defaultOpen = false,
    disabled = false,
    title = "Click to expand",
    closedIcon,
    openIcon,
    ...props
  }: {
    defaultOpen?: boolean;
    disabled?: boolean;
    title?: string;
    closedIcon?: React.ComponentType<{ className?: string }>;
    openIcon?: React.ComponentType<{ className?: string }>;
    [key: string]: unknown;
  }) => {
    const [open, setOpen] = React.useState(defaultOpen);

    // Update state when defaultOpen prop changes
    React.useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);

    return (
      <div className="w-full max-w-md">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          disabled={disabled}
          {...props}
        >
          <CollapsibleTrigger closedIcon={closedIcon} openIcon={openIcon}>
            {title}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                This is the collapsible content that can be expanded or collapsed.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                You can put any content here, including other components, lists,
                or rich text.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };
