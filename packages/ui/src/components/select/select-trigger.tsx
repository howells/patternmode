"use client";

import { cn } from "@patternmode/ui/utils/cn";
import {
  Icon as SelectIcon,
  Trigger as SelectTriggerPrimitive,
} from "@radix-ui/react-select";
import type { VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import type { WithTestId } from "../../lib/types";
import { Button, type buttonVariants } from "../button";
import { Icon } from "../icon";

/** select trigger button */

function SelectTrigger({
  className,
  children,
  testId,
  variant = "secondary",
  size = "lg",
  appearance = "outline",
  radius = "rounded",
  ...props
}: WithTestId<
  Omit<React.ComponentProps<typeof SelectTriggerPrimitive>, "asChild"> &
    VariantProps<typeof buttonVariants>
>) {
  return (
    <SelectTriggerPrimitive asChild>
      <Button
        appearance={appearance}
        className={cn(
          "justify-between bg-input data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
          className,
        )}
        data-component="select-trigger"
        data-slot="select-trigger"
        data-testid={testId}
        pressed={false}
        radius={radius}
        size={size}
        variant={variant}
        {...props}
      >
        {children}
        <SelectIcon asChild>
          <Icon className="opacity-50" icon={ChevronDown} size="xs" />
        </SelectIcon>
      </Button>
    </SelectTriggerPrimitive>
  );
}

export { SelectTrigger };
