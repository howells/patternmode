"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Button, type ButtonProps } from "@patternmode/button";
import type React from "react";

/**
 * Button-styled trigger for AlertDialog that accepts all `@patternmode/button` props.
 * Uses Base UI Trigger's render prop to render a Button, avoiding nested buttons.
 */
export const AlertDialogTrigger = ({
  ref,
  children,
  className,
  ...props
}: ButtonProps &
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger> & {
    ref?: React.RefObject<React.ElementRef<
      typeof BaseAlertDialog.Trigger
    > | null>;
  }) => (
  <BaseAlertDialog.Trigger
    ref={ref}
    render={
      <Button className={className} {...props}>
        {children}
      </Button>
    }
  />
);
