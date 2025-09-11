"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Button, type ButtonProps } from "@patternmode/button";
import type React from "react";

/**
 * Button-styled trigger for AlertDialog that accepts all `@patternmode/button` props.
 * Renders the Base UI Trigger via the Button's `render` prop to avoid nested buttons.
 */
export const AlertDialogTrigger = ({
  ref,
  children,
  className,
  ...props
}: ButtonProps &
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger> & {
    ref?: React.RefObject<React.ElementRef<typeof BaseAlertDialog.Trigger> | null>;
  }) => (
  <Button
    className={className}
    render={<BaseAlertDialog.Trigger ref={ref} />}
    {...props}
  >
    {children}
  </Button>
);
