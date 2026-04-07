"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import type { ComponentSize } from "../../lib/size";
import { DocumentListProvider } from "./document-list-context";

const documentListVariants = cva("group/document-list flex flex-col", {
  variants: {
    variant: {
      divided: "divide-y divide-border",
      separated: "gap-3",
      grouped: "overflow-hidden rounded-3xl border border-border bg-card",
    },
  },
  defaultVariants: {
    variant: "grouped",
  },
});

export interface DocumentListProps
  extends Omit<React.ComponentProps<"ul">, "ref" | "defaultValue">,
    VariantProps<typeof documentListVariants> {
  /** Default selection value (uncontrolled) */
  defaultValue?: string[];
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void;
  ref?: React.Ref<HTMLUListElement>;
  /** Enable selection mode */
  selectable?: boolean;
  /** Size scale for items */
  size?: ComponentSize;
  /** Controlled selection value */
  value?: string[];
}

/**
 * DocumentList UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 * Uses variant-based styling via class-variance-authority.
 */
export function DocumentList({
  className,
  variant = "grouped",
  size = "base",
  selectable = false,
  value,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: DocumentListProps) {
  return (
    <DocumentListProvider
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      selectable={selectable}
      size={size}
      value={value}
    >
      <ul
        className={cn(documentListVariants({ variant, className }))}
        data-component="document-list"
        data-selectable={selectable || undefined}
        data-variant={variant}
        ref={ref}
        {...props}
      />
    </DocumentListProvider>
  );
}
