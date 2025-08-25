"use client";

import { Popover as BasePopover } from "@base-ui-components/react/popover";
import type { useRender } from "@base-ui-components/react/use-render";
import type { Size } from "@patternmode/config/sizes";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { ButtonProps } from "@patternmode/button";
import { Button } from "@patternmode/button";

type PopoverProps = React.ComponentPropsWithoutRef<typeof BasePopover.Root>;

const Popover = (props: PopoverProps) => (
  <BasePopover.Root data-testid="popover" {...props} />
);

type PopoverTriggerProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Trigger> | null>;
  className?: string;
  render?: useRender.RenderProp<Record<string, unknown>>;
  variant?: ButtonProps["variant"];
  size?: Size;
  leftIcon?: ButtonProps["leftIcon"];
  rightIcon?: ButtonProps["rightIcon"];
  icon?: ButtonProps["icon"];
  fullWidth?: ButtonProps["fullWidth"];
  rounded?: ButtonProps["rounded"];
} & React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>;

const PopoverTrigger = ({
  ref,
  className,
  children,
  render,
  variant = "outline",
  size,
  leftIcon,
  rightIcon,
  icon,
  fullWidth,
  rounded,
  ...props
}: PopoverTriggerProps) => {
  const defaultRender = (
    <Button
      variant={variant}
      size={size}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      icon={icon}
      fullWidth={fullWidth}
      rounded={rounded}
      className={cx("cursor-pointer", className)}
    />
  );

  return (
    <BasePopover.Trigger ref={ref} render={render || defaultRender} {...props}>
      {children}
    </BasePopover.Trigger>
  );
};
PopoverTrigger.displayName = "PopoverTrigger";

type _PopoverPortalProps = React.ComponentPropsWithoutRef<typeof BasePopover.Portal>;

const PopoverPortal = BasePopover.Portal;

type PopoverBackdropProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Backdrop> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop>;

const PopoverBackdrop = ({ ref, className, ...props }: PopoverBackdropProps) => (
  <BasePopover.Backdrop
    ref={ref}
    className={cx(
      "fixed inset-0 z-40",
      "bg-black/20 dark:bg-black/40",
      "data-[starting-style]:animate-in data-[ending-style]:animate-out",
      "data-[starting-style]:fade-in data-[ending-style]:fade-out",
      className,
    )}
    {...props}
  />
);
PopoverBackdrop.displayName = "PopoverBackdrop";

type PopoverPositionerProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Positioner> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>;

const PopoverPositioner = ({ ref, className, ...props }: PopoverPositionerProps) => (
  <BasePopover.Positioner
    ref={ref}
    className={cx(
      "fixed inset-0 z-50 flex items-center justify-center",
      "data-[starting-style]:animate-in data-[ending-style]:animate-out",
      className,
    )}
    {...props}
  />
);
PopoverPositioner.displayName = "PopoverPositioner";

type PopoverContentProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Popup> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Popup>;

const PopoverContent = ({ ref, className, ...props }: PopoverContentProps) => (
  <PopoverPositioner>
    <BasePopover.Popup
      ref={ref}
      className={cx(
        "z-50 w-72 rounded-md border bg-white dark:bg-[#090E1A] shadow-md outline-hidden",
        "p-4",
        "transition-all duration-150",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className,
      )}
      tremor-id="tremor-raw"
      {...props}
    />
  </PopoverPositioner>
);
PopoverContent.displayName = "PopoverContent";

type PopoverTitleProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Title> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Title>;

const PopoverTitle = ({ ref, className, ...props }: PopoverTitleProps) => (
  <BasePopover.Title
    ref={ref}
    render={<h3 className={cx("text-lg font-semibold text-zinc-900 dark:text-zinc-50", className)} />}
    {...props}
  />
);
PopoverTitle.displayName = "PopoverTitle";

type PopoverDescriptionProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Description> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Description>;

const PopoverDescription = ({ ref, className, ...props }: PopoverDescriptionProps) => (
  <BasePopover.Description
    ref={ref}
    render={<p className={cx("text-sm text-zinc-600 dark:text-zinc-400", className)} />}
    {...props}
  />
);
PopoverDescription.displayName = "PopoverDescription";

type PopoverCloseProps = React.ComponentPropsWithoutRef<typeof BasePopover.Close>;
const PopoverClose = ({ className, ...props }: PopoverCloseProps) => (
  <BasePopover.Close className={cx("outline-hidden", className)} {...props} />
);
PopoverClose.displayName = "PopoverClose";

type PopoverArrowProps = React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>;
const PopoverArrow = (props: PopoverArrowProps) => <BasePopover.Arrow {...props} />;
PopoverArrow.displayName = "PopoverArrow";


export type { PopoverProps };
export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverArrow,
  PopoverPositioner,
};
