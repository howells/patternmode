"use client";

import { Button } from "@patternmode/button";
import { PopoverTrigger } from "@patternmode/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { TriggerProps } from "../types";

export const Trigger = ({
  ref: forwardedRef,
  className,
  children,
  placeholder,
  hasError,
  icon: IconComponent = CalendarIcon,
  size = "base",
  ...props
}: TriggerProps) => {
  return (
    <PopoverTrigger
      render={
        <Button leftIcon={IconComponent} ref={forwardedRef} size={size} textAlign="left" {...props} />
      }
    >
      {children || placeholder ? <span>{placeholder}</span> : null}
    </PopoverTrigger>
  );
};

Trigger.displayName = "DatePicker.Trigger";

