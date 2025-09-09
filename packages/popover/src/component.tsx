"use client";

import { Popover as BasePopover } from "@base-ui-components/react/popover";
import type { useRender } from "@base-ui-components/react/use-render";
import type { ButtonProps } from "@patternmode/button";
import { Button } from "@patternmode/button";
import type { Size } from "@patternmode/config/sizes";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import type React from "react";

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
      className={cx("cursor-pointer", className)}
      fullWidth={fullWidth}
      icon={icon}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      rounded={rounded}
      size={size}
      variant={variant}
    />
  );

  return (
    <BasePopover.Trigger ref={ref} render={render || defaultRender} {...props}>
      {children}
    </BasePopover.Trigger>
  );
};
PopoverTrigger.displayName = "PopoverTrigger";

type _PopoverPortalProps = React.ComponentPropsWithoutRef<
  typeof BasePopover.Portal
>;

const PopoverPortal = BasePopover.Portal;

type PopoverBackdropProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Backdrop> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Backdrop>;

const PopoverBackdrop = ({
  ref,
  className,
  ...props
}: PopoverBackdropProps) => (
  <BasePopover.Backdrop
    className={cx(
      "fixed inset-0 z-40",
      "bg-black/20 dark:bg-black/40",
      "data-[ending-style]:animate-out data-[starting-style]:animate-in",
      "data-[starting-style]:fade-in data-[ending-style]:fade-out",
      className
    )}
    ref={ref}
    {...props}
  />
);
PopoverBackdrop.displayName = "PopoverBackdrop";

type PopoverPositionerProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Positioner> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>;

const PopoverPositioner = ({
  ref,
  className,
  ...props
}: PopoverPositionerProps) => (
  <BasePopover.Positioner
    className={cx(
      // Let Base UI handle positioning relative to the trigger.
      // Avoid full-viewport centering which misplaces the popup.
      "z-50",
      "data-[ending-style]:animate-out data-[starting-style]:animate-in",
      className
    )}
    ref={ref}
    {...props}
  />
);
PopoverPositioner.displayName = "PopoverPositioner";

type PopoverContentProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Popup> | null>;
  className?: string;
  side?: "bottom" | "left" | "right" | "top";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Popup>;

const PopoverContent = ({
  ref,
  className,
  side,
  align,
  sideOffset,
  collisionPadding,
  ...props
}: PopoverContentProps) => (
  <PopoverPortal>
    <PopoverPositioner
      align={align}
      collisionPadding={collisionPadding}
      side={side}
      sideOffset={sideOffset}
    >
      <BasePopover.Popup
        className={cx(
          floatingSurfaceVariants({ density: "compact", width: "auto" }).base(),
          "w-72 outline-hidden transition-all duration-150",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className
        )}
        ref={ref}
        {...props}
      />
    </PopoverPositioner>
  </PopoverPortal>
);
PopoverContent.displayName = "PopoverContent";

type PopoverTitleProps = {
  ref?: React.RefObject<React.ElementRef<typeof BasePopover.Title> | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Title>;

const PopoverTitle = ({ ref, className, ...props }: PopoverTitleProps) => (
  <BasePopover.Title
    className={cx("text-lg text-zinc-900 dark:text-zinc-50", className)}
    ref={ref}
    {...props}
  />
);
PopoverTitle.displayName = "PopoverTitle";

type PopoverDescriptionProps = {
  ref?: React.RefObject<React.ElementRef<
    typeof BasePopover.Description
  > | null>;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePopover.Description>;

const PopoverDescription = ({
  ref,
  className,
  ...props
}: PopoverDescriptionProps) => (
  <BasePopover.Description
    className={cx("text-sm text-zinc-600 dark:text-zinc-400", className)}
    ref={ref}
    {...props}
  />
);
PopoverDescription.displayName = "PopoverDescription";

type PopoverCloseProps = React.ComponentPropsWithoutRef<
  typeof BasePopover.Close
>;
const PopoverClose = ({ className, ...props }: PopoverCloseProps) => (
  <BasePopover.Close className={cx("outline-hidden", className)} {...props} />
);
PopoverClose.displayName = "PopoverClose";

type PopoverArrowProps = React.ComponentPropsWithoutRef<
  typeof BasePopover.Arrow
>;
const PopoverArrow = (props: PopoverArrowProps) => (
  <BasePopover.Arrow {...props} />
);
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
