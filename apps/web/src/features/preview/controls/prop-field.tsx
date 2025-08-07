import type { PreviewProps } from "@patternmode/ui/types/preview-props-type";

import { Field, FieldLabel } from "@patternmode/ui/components/field";
import { VStack } from "@patternmode/ui/components/stack";
import { Tooltip } from "@patternmode/ui/components/tooltip";
import { cx } from "@patternmode/ui/utils/cx";
import { HelpCircle } from "lucide-react";
import React from "react";

type PropFieldProps = {
  prop: PreviewProps;
  children: React.ReactNode;
  className?: string;
};

export function PropField({ prop, children, className }: PropFieldProps) {
  return (
    <VStack className="space-y-2">
      <Field className={cx("", className)}>
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
    </VStack>
  );
}
