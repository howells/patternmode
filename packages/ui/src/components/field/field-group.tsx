import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

function FieldGroup({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex w-full flex-col gap-6", className)}
      data-slot="field-group"
      {...props}
    />
  );
}

export { FieldGroup };
