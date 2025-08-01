import { HelpCircle } from "lucide-react";
import React from "react";

import { Field, FieldLabel, Tooltip } from "@patternmode/ui";

import type { PropMetadata } from "../../../lib/prop-explorer";

import { cx } from "../../../lib/utils";

type PropFieldProps = {
  prop: PropMetadata;
  children: React.ReactNode;
  className?: string;
};

export function PropField({ prop, children, className }: PropFieldProps) {
  return (
    <div className="space-y-2">
      <Field className={cx("gap-y-2 flex flex-col", className)}>
        <div className="flex items-center gap-1">
          <FieldLabel>{prop.name}</FieldLabel>
          {prop.description && (
            <Tooltip content={prop.description}>
              <HelpCircle className="size-3 text-zinc-500 dark:text-zinc-400" />
            </Tooltip>
          )}
        </div>
        {children}
      </Field>
    </div>
  );
}
